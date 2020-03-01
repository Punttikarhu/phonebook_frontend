import React from 'react'

const ErrorMessage = ({ error }) => {
  const messageStyle = {
    color: 'red',
    fontSize: 16,
    border: '5px solid red',
    textAlign: 'center'
  }
  if (error === null) {
    return null
  }
  return (
    <div> <p style={messageStyle}>{error}</p></div>
  )
}


export default ErrorMessage