// node modules
import React, {FC, useEffect, useRef, useState} from 'react'
import {useFrame, useLoader} from 'react-three-fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {a, useSpring} from '@react-spring/three'
import {Text} from "@react-three/drei";


// project level import
import {solarPath} from "../../../constants";
import {moveJoint} from "../../../utils/planet";
import {KukuGalaxyPlanetEnum} from "../../home/kuku-galaxy";
import isMobile from "../../../utils/is-mobile";
import {getStarFunctionName} from "../../../utils/planet";

type SolarPlanetProperties = {
    name: KukuGalaxyPlanetEnum
    properties?: any
    mouse?: any
    setPause?: any
    pause?: boolean | string
    setLoaded: (name: KukuGalaxyPlanetEnum) => any
    handlePushPlanet: (name: KukuGalaxyPlanetEnum) => any
}

const SolarPlanet: FC<SolarPlanetProperties> = ({name, properties, mouse, setPause, pause, setLoaded, handlePushPlanet}) => {

    // load object
    const object = useLoader(GLTFLoader, `${solarPath}/${name}.glb`);
    const mobileAccessing = isMobile().any;
    const [x, setX] = useState(0);
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (object) {
            setLoaded(name)
        }
    }, [object])

    // create a common spring that will be used later to interpolate other values
    const {spring} = useSpring({
        spring: active,
        config: {mass: 1, tension: 400, friction: 1000, precision: 0.01},
    })

    // @ts-ignore
    const scale = spring.to(
        [
            0,
            properties.scale[0],
        ],
        [
            properties.scale[0],
            properties.scale[0] * 10,
        ],
    );

    const group = useRef();

    useFrame(() => {
        moveJoint(mouse, object.scene, 40)
    })

    // auto rotate
    useFrame(() => {
        !pause && setX(x + 8);
    })

    useFrame(() => {
        moveJoint({
            current: {
                x,
                y: 0,
            }
        }, object.scene, 200)
    })

    return (
        <group
            ref={group}>
            <a.primitive
                onPointerOver={() => {
                    setPause(name);
                    !mobileAccessing && setActive(true)
                }}
                onPointerOut={() => {
                    setPause(false);
                    !mobileAccessing && setActive(false);
                }}
                onClick={() => {
                    handlePushPlanet(name);
                }}
                scale-x={scale}
                scale-y={scale}
                scale-z={scale}
                {...properties}
                object={object.scene}
            />
            {
                mobileAccessing && <Text
                    {...properties}
                    strokeColor={'white'}
                    font={"fonts/font.ttf"}
                    outlineColor={'white'}
                    scale={[properties.scale[0] / 2, properties.scale[1] / 2, properties.scale[2] / 2]}
                    position={[properties.position[0], properties.position[1], properties.position[2] + 2]}
                >
                    {
                        getStarFunctionName(name)
                    }
                </Text>
            }
        </group>
    )
}

export default SolarPlanet;
