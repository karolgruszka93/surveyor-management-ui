import React from 'react'

export const DateContext = React.createContext()

export const DateProvider = props => {
    const [date, setDate] = React.useState(new Date())
    const value = [date, setDate]

    return <DateContext.Provider value={value} {...props} />
}