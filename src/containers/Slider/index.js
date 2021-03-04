import React, { useEffect, useState } from 'react';
import { animated, config, useTransition } from 'react-spring';
import styled from 'styled-components';
import img1 from './img1.jpg';
import img2 from './img2.jpg';
import img3 from './img3.jpg';

const Animated = styled(animated.div)`
    position: absolute;
    width: 100%;
    height: 14.5em;
    background-size: cover;
    background-position: center;
    will-change: opacity;
    border-radius: 0.8em;
    `

const Container = styled.div`
    position:relative;
    height: 14.5em;
    @media (max-width: 800px) {
        display: none;
    }
    `

const slides = [
    { id: 0, url: img1 },
    { id: 1, url: img2 },
    { id: 2, url: img3 },
]

const Slide = () => {
    const [index, setIndex] = useState(0)

    const transitions = useTransition(slides[index], item => item.id, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: config.molasses,
    })

    useEffect(() => void setInterval(() => setIndex(index => (index + 1) % 3), 10000), [])

    return transitions.map(({ item, props, key }) => (
        <Animated
            key={key}
            style={{ ...props, backgroundImage: `url(${item.url})` }}
        />
    ))
}

const Slider = () => {
    return (
        <Container>
            <Slide />
        </Container>
    )
}

export default Slider