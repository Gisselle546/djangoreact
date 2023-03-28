import React, { useState } from 'react'

function SelectOption() {
    const [quantity, setQuanity] = useState(1)
  return (
    <div>
         <select
        style={{width: '100%', padding: '0.5rem'}}
        value={quantity}
        onChange={(e) => setQuanity(+e.target.value)}
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