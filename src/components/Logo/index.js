import React from 'react'
import styled from 'styled-components'
import logo500_100 from './logo500_110.png';

const Image = styled.img`
    width: 100%;
    height: 110px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    object-fit: contain;
`

const Logo = () => {
    return (
        <div>
            <a href="/"><Image src={logo500_100} /></a>
        </div>
    ) 
}

export default Logo