import {atom} from "recoil";
import {AircraftData} from "./radar.ts";

export const selectedFlightState = atom<AircraftData | undefined>({
        key: 'selectedFlight',
        default: undefined
    }
)