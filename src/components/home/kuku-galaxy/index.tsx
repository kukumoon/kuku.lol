import React, {useRef, FC, Suspense} from 'react'
import {Canvas} from 'react-three-fiber'
import {useHistory} from 'react-router-dom';

import MainPlanet from "../../common/main-planet";
import SolarPlanet from "../../common/solar-planet";

import {getMousePosition} from "../../../utils/planet";
import isMobile from "../../../utils/is-mobile";

type KukuGalaxyProperties = {
    pause: string | boolean,
    toggle: any,
    setLoaded: (name: KukuGalaxyPlanetEnum) => any
}

enum KukuGalaxyPlanetEnum {
    main = "main",
    earth = "earth",
    mars = "mars",
    uranus = "uranus",
    neptune = "neptune",
}

const KukuGalaxy: FC<KukuGalaxyProperties> = ({pause, toggle, setLoaded}: KukuGalaxyProperties) => {

    const mouse = useRef({x: 0, y: 0})

    const history = useHistory();

    return (
        <>
            <Canvas
                className={pause ? 'canvas-paused' : 'canvas-animated'}
                onMouseMove={(e) => (mouse.current = getMousePosition(e as unknown as MouseEvent))}
                camera={{
                    position: [0, 0, 100]
                }}>
                <ambientLight intensity={1.3}/>
                <pointLight intensity={0.4} position={[0, 0, 100]}/>
                <pointLight intensity={0.3} position={[0, 100, 0]}/>
                <pointLight intensity={0.5} position={[100, 0, 0]}/>
                <Suspense fallback={null}
                >
                    <MainPlanet
                        setLoaded={setLoaded}
                        pause={pause}
                        mouse={mouse}
                        properties={{
                            position: [0, 0, 0],
                            scale: isMobile().any ? [0.02, 0.02, 0.02] : [0.03, 0.03, 0.03]
                        }}
                    />
                    <SolarPlanet
                        handlePushPlanet={(name) => history.push('/opos')}
                        setLoaded={setLoaded}
                        setPause={toggle}
                        pause={pause}
                        name={KukuGalaxyPlanetEnum.earth}
                        mouse={mouse}
                        properties={{
                            position: [50, 0, 20],
                            scale: [60, 60, 60]
                        }}
                    />
                    <SolarPlanet
                        handlePushPlanet={(name) => history.push('/opos')}
                        setLoaded={setLoaded}
                        setPause={toggle}
                        pause={pause}
                        name={KukuGalaxyPlanetEnum.mars}
                        mouse={mouse}
                        properties={{
                            position: [-50, 5, 15],
                            scale: [40, 40, 40]
                        }}
                    />
                    <SolarPlanet
                        handlePushPlanet={(name) => history.push('/opos')}
                        setLoaded={setLoaded}
                        setPause={toggle}
                        pause={pause}
                        name={KukuGalaxyPlanetEnum.uranus}
                        mouse={mouse}
                        properties={{
                            position: [-20, -30, -25],
                            scale: [80, 80, 80]
                        }}
                    />
                    <SolarPlanet
                        handlePushPlanet={(name) => history.push('/opos')}
                        setLoaded={setLoaded}
                        setPause={toggle}
                        pause={pause}
                        name={KukuGalaxyPlanetEnum.neptune}
                        mouse={mouse}
                        properties={{
                            position: [10, 20, 45],
                            scale: [80, 80, 80]
                        }}
                    />
                </Suspense>
            </Canvas>
        </>
    )
}

export {
    KukuGalaxyPlanetEnum
}

export default KukuGalaxy;
