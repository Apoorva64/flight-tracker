import {selectedFlightState} from "../../atoms.ts";
import {useRecoilValue} from "recoil";
import {useQuery} from "@tanstack/react-query";
import {convertToCartesian, flightRadarApi} from "../../utils.ts";
import {ALTITUDE_FACTOR, EARTH_RADIUS, reductionFactor} from "../../constants.ts";
import {Vector3} from "three";
import {Line} from "@react-three/drei";
import {useEffect} from "react";

export default function FlightTrail() {
    const selectedFlight = useRecoilValue(selectedFlightState);
    console.log(selectedFlight)
    const {data, refetch} = useQuery({
        queryKey: ['flight', selectedFlight?.id],
        queryFn: () => flightRadarApi.fetchFlight(selectedFlight?.id || ''),
        refetchInterval: 10000,
        enabled: !!selectedFlight,
        refetchOnWindowFocus: true,
    })
    useEffect(() => {
            refetch().catch((e) => console.error(e))
        }
        , [refetch, selectedFlight])


    const lineWidth = 20000000 * reductionFactor
    let points = data?.trail && data?.trail?.length > 6 && data?.trail?.map((trailPoint) => {
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

