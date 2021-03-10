import React, {FC} from 'react';
import {getStarFunctionName} from "../../../utils/planet";
import {KukuGalaxyPlanetEnum} from "../kuku-galaxy";
import "./index.scss";
import isMobile from "../../../utils/is-mobile";

const PlanetMouseTracker: FC<any> = ({name}: { name: KukuGalaxyPlanetEnum }) => {

    const display = getStarFunctionName(name);

    if (isMobile().any) {
        return null;
    }

    return (
        <div
            className={`planet-mouse-tracker ${name && 'planet-mouse-tracker-animated'}`}
            style={{
                visibility: name ? 'visible' : 'hidden'
            }}
        >
            {display}
        </div>
    )
}

export default PlanetMouseTracker;
