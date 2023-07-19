import {CameraControls, Stars, Text} from "@react-three/drei";

import Flights from "./Flights.tsx";
import FlightTrail from "./FlightTrail.tsx";
import {Suspense} from "react";
import {EARTH_RADIUS} from "../../constants.ts";
import {Earth} from "./Earth.tsx";
import {Bloom,EffectComposer, Vignette} from "@react-three/postprocessing";


function Scene() {

    return (
        <Suspense fallback={
            <>
                <Text color="white" anchorX="center" anchorY="middle">
                    Loading...
                </Text>
            </>

        }>
            <Stars
                radius={100}
                depth={50}
                count={1000}
                factor={4}
                saturation={0}
                fade={true}

            />
            <CameraControls/>
            <Earth/>
            <pointLight position={[EARTH_RADIUS + 102, 0, 0]}
                        castShadow={true}
            />
            <Flights/>
            <FlightTrail/>
            <EffectComposer>
                <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                <Vignette eskil={false} offset={0.1} darkness={0.9} />
            </EffectComposer>
        </Suspense>
    )
}

export default Scene
