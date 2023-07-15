import {selectedFlightState} from "./atoms.ts";
import {useRecoilValue} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {convertToCartesian, fetchFlightDetails} from "./utils.ts";
import {ALTITUDE_FACTOR, EARTH_RADIUS, reductionFactor} from "./constants.ts";
import {Vector3} from "three";
import {Line} from "@react-three/drei";

export default function FlightTrail() {
    const selectedFlight = useRecoilValue(selectedFlightState);
    const {data} = useQuery({
        queryKey: ['flight', selectedFlight?.id],
        queryFn: () => fetchFlightDetails(selectedFlight?.id || ''),
        refetchInterval: 10000,
        enabled: !!selectedFlight,
        refetchOnWindowFocus: true,
    })
    const lineWidth = 20000000 * reductionFactor
    let points = data?.trail && data?.trail?.length > 6 && data?.trail?.filter(
        (trailPoint) => (data?.flightHistory?.aircraft && trailPoint.ts > data?.flightHistory?.aircraft[0].time.real.departure)
    ).map((trailPoint) => {
            const cartesian = convertToCartesian(trailPoint.lat, trailPoint.lng, EARTH_RADIUS + trailPoint.alt * ALTITUDE_FACTOR)
            return new Vector3(cartesian.x, cartesian.y, cartesian.z)
        }
    )
    if (!points || points.length < 2) {
        points = undefined
    }

    return (
        <Line
            points={points || [new Vector3(0, 0, 0), new Vector3(0.1, 0.1, 0.11)]}
            color={'green'}
            lineWidth={lineWidth}
        />

    )
}

