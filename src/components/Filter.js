import React from 'react'

const Filter = ({filtName, onChangeFilt}) => {
  return (
    <div>
    filter shown with 
    <input value={filtName} onChange={onChangeFilt}/>
    </div>
  )
}

export default Filter