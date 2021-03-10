import React, {useEffect, useState} from "react";

import KukuGalaxy, {KukuGalaxyPlanetEnum} from "../../components/home/kuku-galaxy";
import LoadingText from "../../components/common/loading-text";
import PlanetMouseTracker from "../../components/home/planet-mouse-tracker";

import './index.scss';
import {useHistory} from "react-router-dom";

/**
 * @description 设置模型渲染的缓冲时间, 在此之前使用css的loading动画
 */
const glLoadingBuffer = 1000;

function Home() {

    // react history
    let history = useHistory();

    const stateWithSetter = {
        [KukuGalaxyPlanetEnum.main]: useState(false),
        [KukuGalaxyPlanetEnum.earth]: useState(false),
        [KukuGalaxyPlanetEnum.mars]: useState(false),
        [KukuGalaxyPlanetEnum.uranus]: useState(false),
        [KukuGalaxyPlanetEnum.neptune]: useState(false),
    }

    const setLoaded = (name: KukuGalaxyPlanetEnum) => stateWithSetter[name][1](true)

    const state = Object.values(stateWithSetter).map(_ => _[0]);

    useEffect(() => {
        const foundUnreadyState = state.find(ready => !ready);
        // 如果不能找到，则认为模型加载成功
        if (foundUnreadyState === undefined) {
            setTimeout(() => {
                setInitialized(true)
            }, glLoadingBuffer)
        }
    }, state)

    const [initialized, setInitialized] = useState(false);

    const [pause, toggle] = useState(false);

    return (
        <div className="home-container">
            <PlanetMouseTracker name={pause}/>
            <div className={`kuku-galaxy ${initialized ? 'kuku-galaxy-show' : 'kuku-galaxy-hidden'}`}>
                <KukuGalaxy
                    setLoaded={setLoaded}
                    pause={pause}
                    toggle={toggle}
                />
            </div>
            {!initialized && <LoadingText/>}
        </div>
    )
}

export default Home;
