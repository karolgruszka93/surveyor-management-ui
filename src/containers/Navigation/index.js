import React from 'react'
import { Link } from 'react-router-dom'
import { IconBriefcase, IconInfoCircled, IconPlusCircled, IconUserCircle } from '../../helpers/fonts.js'
import { NavButton } from '../../helpers/theme.js'

const Navigation = () => {
    return (
        <div>
            <Link to='/manager'>
                <NavButton color='#374550'><IconBriefcase />MENADŻER</NavButton>
            </Link>
            <Link to='/employee'>
                <NavButton color='#4A5F6D'><IconUserCircle />PRACOWNIK</NavButton>
            </Link>
            <Link to='/register'>
                <NavButton color='#5D798B'><IconPlusCircled />REJESTRACJA</NavButton>
            </Link>
            <Link to='/about'>
                <NavButton color='#7093a8'><IconInfoCircled />O APLIKACJI</NavButton>
            </Link>
        </div>
    )
}

export default Navigation

