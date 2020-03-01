import React from 'react'

const PersonForm = ({newName, onChange, newNumber, onChangeNumber, onClick}) => {
  return (
    <div>
      <form>
        <div>name: <input value={newName} onChange={onChange}/></div>
        <div>number: <input value={newNumber} onChange={onChangeNumber}/></div>
        <div><button type="submit" onClick={onClick}>add</button></div>
      </form>
    </div>
  )
}

export default PersonForm