import React from 'react'

const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ message, isError }) => {

    const notificationClass = isError ? errorStyle : successStyle

    if(message === null) {
        return null
    }

    return (
        <div style={notificationClass}>
            {message}
        </div>
    )
}

export default Notification
