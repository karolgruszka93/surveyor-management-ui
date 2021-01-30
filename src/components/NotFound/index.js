import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import { Button, HorizontalLine, Paragraph } from '../../helpers/theme.js'

const NotFound = () => {
    return (
        <div>
            <Logo />
            <HorizontalLine />
            <Paragraph>Strona o podanym adresie nie istnieje </Paragraph>
            <HorizontalLine />
            <Link to='/'>
                <Button color='#4A5F6D'>Powrót na stronę główną</Button>
            </Link> 
            <HorizontalLine />
        </div>
    )
}

export default NotFound
