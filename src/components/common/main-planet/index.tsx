// React Modules
import React, {FC, useEffect, useRef, useState} from 'react'

// Three Related
import * as THREE from 'three';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader'
import {useFrame, useLoader} from 'react-three-fiber'

// project level import
import PlanetObserver from "../camera-controller";
import {solarPath} from "../../../constants";
import {moveJoint} from "../../../utils/planet";
import {KukuGalaxyPlanetEnum} from "../../home/kuku-galaxy";
import isMobile from "../../../utils/is-mobile";

type MainPlanetProperties = {
    /**
     * @description 模型属性，继承Three.Primitive
     */
    properties?: any
    /**
     * @description 鼠标Event，用于计算位移和动画
     */
    mouse: any
    /**
     * @description 是否选中星球，是否暂停转动
     */
    pause: boolean | string
    /**
     * @description 设置加载成功
     */
    setLoaded: (name: KukuGalaxyPlanetEnum) => undefined
};

/**
 * @description 加载星球素材的函数组件
 * @param name
 * @param properties
 * @param mouse
 * @constructor
 */
const MainPlanet: FC<MainPlanetProperties> = ({properties, mouse, pause, setLoaded}) => {

    // define group and animation action ref
    const group = useRef()
    const actions = useRef()

    // 加载恒星模型
    const object = useLoader(FBXLoader, `${solarPath}/planet.fbx`);

    const mobileAccessing = isMobile().any;

    useEffect(() => {
        if (object) {
            // console.log(KukuGalaxyPlanetEnum.main);
            setLoaded(KukuGalaxyPlanetEnum.main)
        }
    }, [object])

    // 将恒星素材自己携带的动画进行播放
    const [mixer] = useState(() => new THREE.AnimationMixer(object));
    useFrame((state, delta) => mixer.update(delta));

    useEffect(() => {
        // @ts-ignore
        actions.current = {idle: mixer.clipAction(object.animations[0], group.current)}
        // @ts-ignore
        actions.current.idle.play()
        return () => object.animations.forEach((clip) => mixer.uncacheClip(clip))
    }, [])

    // 恒星自转以及随鼠标移动的转动事件
    const autoRotation = () => {
        // @ts-ignore
        group.current.rotation.y -= 0.005;
    }

    useFrame(() => {
        moveJoint(mouse, object)
    })

    useFrame(() => {
        !pause && autoRotation();
    })

    return (
        <>
            <group ref={group} dispose={null}>
                {/*@ts-ignore*/}
                <PlanetObserver pause={pause}/>
                <primitive{...properties} object={object}/>
            </group>
        </>
    )
}

export default MainPlanet;
