import {useFrame, useThree} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {useEffect} from "react";
import isMobile from "../../../utils/is-mobile";

/**
 * @description 继承自THREE.OrbitControls，操纵相机位置
 * @param pause
 * @constructor
 */
const PlanetObserver = ({pause}: { pause: boolean | string }) => {
    const {camera, gl} = useThree();
    const controls = new OrbitControls(camera, gl.domElement);
    const mobileAccessing = isMobile().any;

    // 预设属性
    controls.autoRotate = true; // 自动转动
    controls.enableZoom = false; // 禁用缩放
    controls.rotateSpeed = 0.5; // 拖动转速
    controls.enableDamping = true; // 拖动结束后的弹性效果

    // 禁止纵向拖动
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    // rAF更新视角
    useFrame(() => controls.update())

    useEffect(
        () => {
            // 如果选中行星，暂停control
            controls.autoRotate = !pause;

            // 如果选中行星，清空一次预设
            if (pause && !mobileAccessing) {
                controls.dispose();
            }
            return () => {
                controls.dispose();
            };
        },
        [camera, gl, pause]
    );

    return null;
};

export default PlanetObserver
