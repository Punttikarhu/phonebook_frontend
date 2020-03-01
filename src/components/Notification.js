import React from 'react'

const Notification = ({ message }) => {
  const messageStyle = {
    color: 'green',
    fontSize: 16,
    border: '5px solid green',
    textAlign: 'center'
  }

  if (message === null) {
    return null
  }
  return (
    <div> <p style={messageStyle}>{message}</p></div>
  )
}

export default Notification