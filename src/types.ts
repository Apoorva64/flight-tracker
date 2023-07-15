


export interface Flight {
    identification: Identification;
    status: Status;
    level: string;
    promote: boolean;
    aircraft: Aircraft;
    airline?: Airline | null;
    owner?: null;
    airspace?: null;
    airport: Airport;
    flightHistory: FlightHistory;
    ems?: null;
    availability?: (string | null)[] | null;
    time: Time;
    trail?: (TrailEntity)[] | null;
    firstTimestamp: number;
    s: string;
}

export interface Identification {
    id: string;
    row: number;
    number: Number;
    callsign: string;
}

export interface Number {
    default?: string | null;
    alternative?: null;
}

export interface Status {
    live?: boolean | null;
    text?: string | null;
    icon?: string | null;
    estimated?: null;
    ambiguous: boolean;
    generic: Generic;
}

export interface Generic {
    status: Status1;
    eventTime: EventTime;
}

export interface Status1 {
    text?: string | null;
    type?: string | null;
    color?: string | null;
    diverted?: null;
}

export interface EventTime {
    utc?: number | null;
    local?: number | null;
}

export interface Aircraft {
    model: Model;
    countryId?: number | null;
    registration?: string | null;
    age?: null;
    msn?: null;
    images?: Images | null;
    hex?: string | null;
}

export interface Model {
    code: string;
    text: string;
}

export interface Images {
    thumbnails?: (ThumbnailsEntityOrMediumEntityOrLargeEntity)[] | null;
    medium?: (ThumbnailsEntityOrMediumEntityOrLargeEntity)[] | null;
    large?: (ThumbnailsEntityOrMediumEntityOrLargeEntity)[] | null;
}

export interface ThumbnailsEntityOrMediumEntityOrLargeEntity {
    src: string;
    link: string;
    copyright: string;
    source: string;
}

export interface Airline {
    name: string;
    short: string;
    code: Code;
    url: string;
}

export interface Code {
    iata?: string | null;
    icao: string;
}

export interface Airport {
    origin?: Origin | null;
    destination?: Destination | null;
    real?: null;
}

export interface Origin {
    name: string;
    code: Code1;
    position: Position;
    timezone: Timezone;
    visible: boolean;
    website?: string | null;
    info: Info;
}

export interface Code1 {
    iata: string;
    icao: string;
}

export interface Position {
    latitude: number;
    longitude: number;
    altitude: number;
    country: Country;
    region: Region;
}

export interface Country {
    id: number;
    name: string;
    code: string;
    codeLong: string;
}

export interface Region {
    city: string;
}

export interface Timezone {
    name: string;
    offset: number;
    offsetHours: string;
    abbr: string;
    abbrName: string;
    isDst: boolean;
}

export interface Info {
    terminal?: string | null;
    baggage?: null;
    gate?: string | null;
}

export interface Destination {
    name: string;
    code: Code1;
    position: Position;
    timezone: Timezone;
    visible: boolean;
    website: string;
    info: Info1;
}

export interface Info1 {
    terminal?: string | null;
    baggage?: string | null;
    gate?: null;
}

export interface FlightHistory {
    aircraft?: (AircraftEntity)[] | null;
}

export interface AircraftEntity {
    identification: Identification1;
    airport: Airport1;
    time: Time1;
}

export interface Identification1 {
    id: string;
    number: Number1;
}

export interface Number1 {
    default?: string | null;
}

export interface Airport1 {
    origin: Origin1;
    destination: DestinationOrOrigin;
}

export interface Origin1 {
    name: string;
    code: Code1;
    position: Position1;
    timezone: Timezone;
    visible: boolean;
    website?: string | null;
}

export interface Position1 {
    latitude: number;
    longitude: number;
    altitude: number;
    country: Country1;
    region: Region;
}

export interface Country1 {
    id?: number | null;
    name: string;
    code: string;
    codeLong?: string | null;
}

export interface DestinationOrOrigin {
    name: string;
    code: Code1;
    position: Position;
    timezone: Timezone;
    visible: boolean;
    website?: string | null;
}

export interface Time1 {
    real: Real;
}

export interface Real {
    departure: number;
}

export interface Time {
    scheduled: Scheduled;
    real: Real1;
    estimated: Estimated;
    other: Other;
    historical?: Historical | null;
}

export interface Scheduled {
    departure?: number | null;
    arrival?: number | null;
}

export interface Real1 {
    departure?: number | null;
    arrival?: null;
}

export interface Estimated {
    departure?: null;
    arrival?: number | null;
}

export interface Other {
    eta?: number | null;
    updated?: number | null;
}

export interface Historical {
    flighttime: string;
    delay: string;
}

export interface TrailEntity {
    lat: number;
    lng: number;
    alt: number;
    spd: number;
    ts: number;
    hd: number;
}
