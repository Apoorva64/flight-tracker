import {useQuery} from "@tanstack/react-query";
import {useEffect, useRef} from "react";
import {InstancedMesh, Matrix4, Object3D, Texture, TextureLoader, Vector3} from "three";
import {convertToCartesian, flightRadarApi} from "./utils.ts";
import {useRecoilState} from "recoil";
import {selectedFlightState} from "./atoms.ts";
import {ALTITUDE_FACTOR, EARTH_RADIUS, reductionFactor} from "./constants.ts";
import PlaneTexture from "./assets/planeTexture.png";
import {useLoader} from "@react-three/fiber";

const temp = new Object3D()
export default function Flights() {
    const planeTexture = useLoader(TextureLoader, PlaneTexture) as Texture
    const {data: zones} = useQuery({
        queryKey: ['zones'],
        queryFn: () => flightRadarApi.fetchZones(),
    })

    const {data} = useQuery({
            queryKey: ['flights'],
            queryFn: () => flightRadarApi.fetchFromRadarMultiZone(
                zones!,
            ),
            refetchIntervalInBackground: true,
            refetchInterval: 20000,
            enabled: !!zones,
        }
    )

    const [, setSelectedFlight] = useRecoilState(selectedFlightState);
    const instancedMeshRef = useRef<InstancedMesh>(null!)
    const scale = 140000 * reductionFactor
    useEffect(() => {
        if (data) { // Set positions
            data.forEach((flight, i) => {
                    const cartesian = convertToCartesian(flight.trailEntity.lat, flight.trailEntity.lng, EARTH_RADIUS + flight.trailEntity.alt * ALTITUDE_FACTOR)
                    temp.position.set(cartesian.x, cartesian.y, cartesian.z)
                    temp.scale.set(scale, scale, scale / 5)
                    const target_vec = new Vector3(0, 0, 0);
                    const rotation_matrix = new Matrix4();

                    // const magnetic_north = convertToCartesian(81.3000,-110.8000,EARTH_RADIUS)
                    // const true_north = convertToCartesian(90,0,EARTH_RADIUS)
                    rotation_matrix.lookAt(temp.position, target_vec, new Vector3(0, 1, 0));
                    temp.quaternion.setFromRotationMatrix(rotation_matrix);
                    // rotate around axis passing through origin and temp.position
                    temp.rotateOnWorldAxis(temp.position, -(flight.trailEntity.hd) * Math.PI / 180);
                    temp.updateMatrix()
                    instancedMeshRef.current.setMatrixAt(i, temp.matrix)
                }
            )
            // Update the instance
            instancedMeshRef.current.instanceMatrix.needsUpdate = true
        }
    }, [data, scale])

    return (
        <>
            <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, data?.length || 0]}
                           onClick={(e) => {
                               setSelectedFlight(data && e.instanceId && data[e.instanceId] || undefined)
                           }
                           }

            >
                <planeGeometry args={[1, 1, 1, 1]}/>
                <meshStandardMaterial
                    map={planeTexture}
                    transparent={true}
                    opacity={0.8}
                    emissiveMap={planeTexture}
                    emissive={'white'}
                    emissiveIntensity={4}
                />

            </instancedMesh>
        </>

    )

}