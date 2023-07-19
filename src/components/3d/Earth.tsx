import {useLoader} from "@react-three/fiber";
import {Texture, TextureLoader} from "three";
import EarthColorMap from "../../assets/earthmap/8081_earthmap10k.jpg";
import EarthSpecularMap from "../../assets/earthmap/8081_earthspec10k.jpg";
import EarthBumpMap from "../../assets/earthmap/8081_earthbump10k.jpg";
import EarthNightMap from "../../assets/earthmap/5_night_16k.jpg";
import {Sphere} from "@react-three/drei";
import {EARTH_RADIUS} from "../../constants.ts";

export function Earth() {
    // load texture
    const [colorMap, specularMap, bumpMap, nightMap] = useLoader(TextureLoader, [
            EarthColorMap,
            EarthSpecularMap,
            EarthBumpMap,
            EarthNightMap
        ]
    ) as Texture[]
    return (
        <Sphere args={[EARTH_RADIUS, 50, 50]}>
            <meshPhongMaterial specularMap={specularMap}/>
            <meshStandardMaterial
                map={colorMap}
                bumpMap={bumpMap}
                bumpScale={0.01}
                displacementMap={bumpMap}
                displacementScale={0.01}
                displacementBias={0.0001}
                emissiveMap={nightMap}
                emissiveIntensity={5}
                emissive={0xaaaaaa}

            />
        </Sphere>
    )
}