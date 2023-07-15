import {TrailEntity} from "./types";
import queryString from 'query-string';
import {zones} from "./zones.ts";

const endpoint = 'https://corsproxy.io/?https://data-live.flightradar24.com/zones/fcgi/feed.js'

interface Options {
    inactive: boolean;
    onGround: boolean;
    gliders: boolean;
    MLAT: boolean;
    FAA: boolean;
    estimatedPositions: boolean;
    FLARM: boolean;
    ADSB: boolean;
    inAir: boolean
}


const defaults: Options = {
    FAA: true, // use US/Canada radar data source
    FLARM: true, // use FLARM data source
    MLAT: true, // use MLAT data source
    ADSB: true, // use ADS-B data source
    inAir: true, // fetch airborne aircraft
    onGround: false, // fetch (active) aircraft on ground
    inactive: false, // fetch inactive aircraft (on ground)
    gliders: true, // fetch gliders
    estimatedPositions: true, // if out of coverage
}

export interface AircraftData {
    id: string;
    modeSCode: string;
    trailEntity: TrailEntity
    aircraft: {
        model: {
            code: string;
        }
        registration: string;
    }
    flight: string;
    callsign: string;
    origin: string;
    destination: string;
    rateOfClimb: number;
    isOnGround: boolean;
    squawkCode: string;
    radar: string;
    isGlider: boolean;

}

const fetchFromRadar = async (north: number, west: number, south: number, east: number, opt: (Options | undefined)) => {
    opt = {
        ...defaults,
        ...opt,
    }

    const query = {
        // options
        bounds: [north, west, south, east].join(','),
        faa: opt.FAA ? '1' : '0',
        flarm: opt.FLARM ? '1' : '0',
        mlat: opt.MLAT ? '1' : '0',
        adsb: opt.ADSB ? '1' : '0',
        air: opt.inAir ? '1' : '0',
        gnd: opt.onGround ? '1' : '0',
        vehicles: opt.inactive ? '1' : '0',
        gliders: opt.gliders ? '1' : '0',
        estimated: opt.estimatedPositions ? '1' : '0',
    }

    const url = endpoint + '?' + queryString.stringify(query)
    const res = await fetch(url,
        {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.flightradar24.com/',
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:78.0) Gecko/20100101 Firefox/78.0',

            },
            method: 'GET',
            mode: 'cors',
            credentials: 'omit',
            cache: 'no-cache',
            referrerPolicy: 'no-referrer',
            body: null,
        }
    )
    if (!res.ok) {
        throw new Error(res.statusText)
    }
    const data = (await res.json()) as Record<string, never>
    const aircraft: AircraftData[] = []
    for (const id in data) {
        const d = data[id]
        if (!Array.isArray(d)) continue
        aircraft.push({
            id,
            modeSCode: d[0] ?? null, // ICAO aircraft registration number
            trailEntity: {
                lat: d[1],
                lng: d[2],
                hd: d[3], // in degrees
                alt: d[4], // in feet
                spd: d[5] ?? null, // in knots
                ts: d[10] ?? null, // timestamp
            },

            aircraft: {
                model: {
                    code: d[8] ?? null, // ICAO aircraft type designator
                },
                registration: d[9] ?? null,
            },
            flight: d[13] ?? null,
            callsign: d[16] ?? null, // ICAO ATC call signature
            origin: d[11] ?? null, // airport IATA code
            destination: d[12] ?? null, // airport IATA code
            rateOfClimb: d[15], // ft/min
            isOnGround: !!d[14],
            squawkCode: d[6], // https://en.wikipedia.org/wiki/Transponder_(aeronautics)
            radar: d[7], // F24 "radar" data source ID
            isGlider: !!d[17],
        })
    }

    return aircraft
}

export const fetchAllWithChunks = async (opt: (Options | undefined)) => {
    // 90 degree chunks
    const chunks = Object.values(zones).map((zone) => {
            return [
                zone.tl_y,
                zone.br_y,
                zone.tl_x,
                zone.br_x,
            ]
        }
    )

    const promises: Promise<AircraftData[]>[] = []
    const aircraft = new Set<AircraftData>()
    for (const chunk of chunks) {
        promises.push(fetchFromRadar(chunk[0], chunk[1], chunk[2], chunk[3], opt))
    }
    const results = await Promise.all(promises)
    for (const result of results) {
        for (const a of result) {
            aircraft.add(a)
        }
    }
    return Array.from(aircraft)
}

export {
    fetchFromRadar,
}