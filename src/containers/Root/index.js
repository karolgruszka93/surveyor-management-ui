import React from 'react'
import Logo from '../../components/Logo'
import Navigation from '../../containers/Navigation'
import Slider from '../../containers/Slider'
import { HorizontalLine } from '../../helpers/theme.js'


const Root = () => {
    return (
        <div>
            <Logo />
            <Slider />
            <HorizontalLine />
            <Navigation />
            <HorizontalLine />
        </div>
    );
}

export default Root;