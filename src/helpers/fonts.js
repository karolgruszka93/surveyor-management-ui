import React from 'react'
import styled from 'styled-components'
import './fonts/css/font-ico.css'

const IconBriefcaseStyle = styled.div`
    font-size: 35px;
    `
const IconUserCircleStyle = styled.div`
    font-size: 35px;
    `
const IconPlusCircledStyle = styled.div`
    font-size: 35px;
    `
const IconCancelStyle = styled.div`
    font-size: 35px;
    `
const IconInfoCircledStyle = styled.div`
    font-size: 35px;
    `
const IconEmployeeStyle = styled.div`
    font-size: 16px;
    `
const IconDesktopStyle = styled.div`
    font-size: 16px;
    `
const IconOrderStyle = styled.div`
    font-size: 16px;
    `
const IconTruckStyle = styled.div`
    font-size: 16px;
    `
const IconPinStyle = styled.div`
    font-size: 15px;
    `
const IconAttachStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `
const IconUploadStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `
const IconCommentStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `
const IconLogoutStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `
const IconPlusSquaredStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `
const IconLoginStyle = styled.div`
    font-size: 15px;
    display: inline-block;
    padding: 0.2em;
    `

export const IconFacebookSquared = styled.div`
    font-size: 29px;
    display: inline-block;
    &:hover {
        color: #28DD5E;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
    }
    `
export const IconLinkedinSquared = styled.div`
    font-size: 29px;
    display: inline-block;
    &:hover {
        color: #28DD5E;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
    }
    `
export const IconTwitterSquared = styled.div`
    font-size: 30px;
    display: inline-block;
    &:hover {
        color: #28DD5E;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
    }
    `
export const IconMailAlt = styled.div`
    font-size: 31px;
    display: inline-block;
    &:hover {
        color: #28DD5E;
        border-color: #28DD5E;
        transition: all 0.3s ease 0s;
    }
    `

export const IconBriefcase = () => {
    return (
        <IconBriefcaseStyle className='icon-briefcase' />
    )
}

export const IconUserCircle = () => {
    return (
        <IconUserCircleStyle className='icon-user-circle-o' />
    )
}

export const IconPlusCircled = () => {
    return (
        <IconPlusCircledStyle className='icon-plus-circled' />
    )
}

export const IconCancel = () => {
    return (
        <IconCancelStyle className='icon-cancel' />
    )
}

export const IconInfoCircled = () => {
    return (
        <IconInfoCircledStyle className='icon-info-circled' />
    )
}

export const IconPlusSquared = () => {
    return (
        <IconPlusSquaredStyle className=' icon-plus-squared' />
    )
}

export const IconUserPlus = () => {
    return (
        <IconPlusSquaredStyle className=' icon-user-plus' />
    )
}

export const IconLogin = () => {
    return (
        <IconLoginStyle className=' icon-login' />
    )
}

export const IconEmployee = () => {
    return (
        <IconEmployeeStyle className='icon-id-badge' />
    )
}

export const IconOrder = () => {
    return (
        <IconOrderStyle className='icon-map' />
    )
}

export const IconLogout = () => {
    return (
        <IconLogoutStyle className='icon-logout' />
    )
}

export const IconTruck = () => {
    return (
        <IconTruckStyle className='icon-truck' />
    )
}

export const IconPin = () => {
    return (
        <IconPinStyle className='icon-pin' />
    )
}

export const IconAttach = () => {
    return (
        <IconAttachStyle className='icon-attach' />
    )
}

export const IconDesktop = () => {
    return (
        <IconDesktopStyle className='icon-desktop' />
    )
}

export const IconComment = () => {
    return (
        <IconCommentStyle className='icon-commenting' />
    )
}

export const IconUpload = () => {
    return (
        <IconUploadStyle className='icon-upload' />
    )
}