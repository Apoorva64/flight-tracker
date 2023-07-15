import {useQuery} from "@tanstack/react-query";
import "axios-jsonp";
import {useEffect, useRef} from "react";
import {InstancedMesh, Object3D} from "three";
import {fetchAllWithChunks} from "./radar.ts";
import {convertToCartesian} from "./utils.ts";
import {useRecoilState} from "recoil";
import {selectedFlightState} from "./atoms.ts";
import {ALTITUDE_FACTOR, EARTH_RADIUS, reductionFactor} from "./constants.ts";

const temp = new Object3D()
export default function Flights() {
    const {data} = useQuery({
            queryKey: ['flights'],
            queryFn: () => fetchAllWithChunks(undefined),
            refetchIntervalInBackground: true,
            refetchInterval: 20000,
        }
    )

    const [, setSelectedFlight] = useRecoilState(selectedFlightState);
    const instancedMeshRef = useRef<InstancedMesh>(null!)
    useEffect(() => {
        if (data) { // Set positions
            data.forEach((flight, i) => {
                    const cartesian = convertToCartesian(flight.trailEntity.lat, flight.trailEntity.lng, EARTH_RADIUS + flight.trailEntity.alt * ALTITUDE_FACTOR)
                    temp.position.set(cartesian.x, cartesian.y, cartesian.z)
                    temp.rotation.set(0, 0, 0)
                    temp.updateMatrix()
                    instancedMeshRef.current.setMatrixAt(i, temp.matrix)
                }
            )
            // Update the instance
            instancedMeshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [data])

    const scale = 14000 * reductionFactor
    return (
        <>
            <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, data?.length || 0]}
                           onClick={(e) => {
                               setSelectedFlight(data && e.instanceId && data[e.instanceId] || undefined)
                           }
                           }

            >
                <boxGeometry args={[scale, scale, scale]}/>
                <meshStandardMaterial color={'green'}
                                      emissive={'yellow'}
                                      emissiveIntensity={2}


                />
            </instancedMesh>
        </>

    )

}