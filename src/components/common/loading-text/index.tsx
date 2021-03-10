import React from 'react';
import { useSpring, animated} from "react-spring";
import './index.scss';

const LoadingText: React.FC = () => {

    // @ts-ignore
    const prop1 = useSpring({
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    // @ts-ignore
    const prop2 = useSpring({
        delay: 2000,
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    // @ts-ignore
    const prop3 = useSpring({
        delay: 5000,
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    // @ts-ignore
    const prop4 = useSpring({
        delay: 8000,
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    // @ts-ignore
    const prop5 = useSpring({
        delay: 11000,
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    // @ts-ignore
    const prop6 = useSpring({
        delay: 15000,
        from: {opacity: 0, y: -10},
        to: [{opacity: 1, y: 0}, {opacity: 0, y: 10}]
    });

    return (
        <div className={"loading-text-container"}>
            <animated.span style={prop1} className="loading-text">正在打开KUKU GALAXY</animated.span>
            <animated.span style={prop2} className="loading-text">再等等，就快好了</animated.span>
            <animated.span style={prop3} className="loading-text">听我念几句诗吧</animated.span>
            <animated.span style={prop4} className="loading-text">海内存知己，天涯若比邻</animated.span>
            <animated.span style={prop5} className="loading-text">白日依山尽，黄河入海流</animated.span>
            <animated.span style={prop6} className="loading-text">你的网有点慢呀兄弟，再等等吧！</animated.span>
        </div>
    )
}

export default LoadingText;
