import * as THREE from "three";
import {KukuGalaxyPlanetEnum} from "../components/home/kuku-galaxy";

export function getMousePosition(e: MouseEvent) {
    return {x: e.clientX, y: e.clientY}
}

export function getMouseDegrees(x: number, y: number, degreeLimit: number) {
    let dx = 0,
        dy = 0,
        xdiff,
        xPercentage,
        ydiff,
        yPercentage

    let w = {x: window.innerWidth, y: window.innerHeight}

    // Left (Rotates neck left between 0 and -degreeLimit)
    // 1. If cursor is in the left half of screen
    if (x <= w.x / 2) {
        // 2. Get the difference between middle of screen and cursor position
        xdiff = w.x / 2 - x
        // 3. Find the percentage of that difference (percentage toward edge of screen)
        xPercentage = (xdiff / (w.x / 2)) * 100
        // 4. Convert that to a percentage of the maximum rotation we allow for the neck
        dx = ((degreeLimit * xPercentage) / 100) * -1
    }

    // Right (Rotates neck right between 0 and degreeLimit)
    if (x >= w.x / 2) {
        xdiff = x - w.x / 2
        xPercentage = (xdiff / (w.x / 2)) * 100
        dx = (degreeLimit * xPercentage) / 100
    }
    // Up (Rotates neck up between 0 and -degreeLimit)
    if (y <= w.y / 2) {
        ydiff = w.y / 2 - y
        yPercentage = (ydiff / (w.y / 2)) * 100
        // Note that I cut degreeLimit in half when she looks up
        dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1
    }
    // Down (Rotates neck down between 0 and degreeLimit)
    if (y >= w.y / 2) {
        ydiff = y - w.y / 2
        yPercentage = (ydiff / (w.y / 2)) * 100
        dy = (degreeLimit * yPercentage) / 100
    }
    return {x: dx, y: dy}
}

export function moveJoint(mouse: any, joint: any, degreeLimit = 40) {
    let degrees = getMouseDegrees(mouse.current.x, mouse.current.y, degreeLimit)
    joint.rotation.xD = THREE.MathUtils.lerp(joint.rotation.xD || 0, degrees.y, 0.1)
    joint.rotation.yD = THREE.MathUtils.lerp(joint.rotation.yD || 0, degrees.x, 0.1)
    joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
    joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
}

/**
 * @description 获取星球对应的可爱名称
 */
export const getStarFunctionName = (name: KukuGalaxyPlanetEnum) => {
    switch (name) {
        case KukuGalaxyPlanetEnum.earth:
            return '知识星球'
        case KukuGalaxyPlanetEnum.main:
            return '生命星球'
        case KukuGalaxyPlanetEnum.mars:
            return '奇怪星球'
        case KukuGalaxyPlanetEnum.neptune:
            return '仓库星球'
        case KukuGalaxyPlanetEnum.uranus:
            return '起源星球'
        default:
            return '未开放的领地'
    }
}
