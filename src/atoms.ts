import {atom} from "recoil";
import {AircraftData} from "flightradar24-client-ts/lib/types";

export const selectedFlightState = atom<AircraftData | undefined>({
        key: 'selectedFlight',
        default: undefined
    }
)