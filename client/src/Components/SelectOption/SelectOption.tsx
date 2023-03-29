import React, { useState } from 'react'

type Props ={
  quantity: any;
  onIncrement: any;
}

function SelectOption({quantity, onIncrement}: Props) {
    
  return (
    <div>
         <select
        style={{width: '100%', padding: '0.5rem'}}
        value={quantity}
        onChange={onIncrement}
      >
        
        <option value={1}>Quantity: 1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

    </div>
  )
}

export default SelectOption