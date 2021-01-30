import React, { Component } from 'react'
import styled from 'styled-components'
import { IconFacebookSquared, IconLinkedinSquared, IconTwitterSquared, IconMailAlt } from '../../helpers/fonts.js'

const Text = styled.div`
    padding: 0.5em;
    font-size: 14px;
    color: #FFFFFF;
    cursor: default;
    `

class Footer extends Component {

    constructor(props) {
        super(props)
        this.state = { mail: "", isVisible: false }
    }

    redirectToFacebook = () => {
        window.location.assign('https://www.facebook.com/')
    }

    redirectToLinkedin = () => {
        window.location.assign('https://pl.linkedin.com/')
    }

    redirectToTwitter = () => {
        window.location.assign('https://twitter.com/')
    }

    renderMail = () => {
        this.state.isVisible === false ? this.setState({ mail: "example@example.com", isVisible: true }) : this.setState({ mail: "", isVisible: false })
    }

    render() {
        return (
            <div>
                <Text>KONTAKT :</Text>
                <IconFacebookSquared className='icon-facebook-squared' onClick={this.redirectToFacebook} />
                <IconLinkedinSquared className='icon-linkedin-squared' onClick={this.redirectToLinkedin} />
                <IconTwitterSquared className='icon-twitter-squared' onClick={this.redirectToTwitter} />
                <IconMailAlt className='icon-mail-alt' onClick={this.renderMail} />
                <Text>{this.state.mail}</Text>
            </div>
        )
    }
}

export default Footer