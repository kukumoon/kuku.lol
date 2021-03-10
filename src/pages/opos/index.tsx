import React from "react";
import {useHistory} from 'react-router-dom';
import './index.scss';

const Opos: React.FC = () => {

    const history = useHistory();

    return (
        <div className="opos-container">
            这个星球还没有开放哦
            <br/>
            过几天再来看看吧～
            <br/>
            <br/>
            <br/>
            <span
                style={{color: '#88ccdd', fontWeight: 'bolder', fontSize: '3vw', cursor: 'pointer'}}
                onClick={() => history.goBack()}
            >点这里回到首页</span>
        </div>
    )
}

export default Opos;
