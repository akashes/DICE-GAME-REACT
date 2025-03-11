import React from 'react'

const Dice = ({isWon,selectDice,item}) => {
  return (
    <button disabled={isWon} 
    aria-pressed={item.selected}
    aria-label={`Die with value ${item.value} , ${item.selected ? "selected" : "not selected"}`}
    // onClick={()=>selectDice(item.id)} 
    onClick={selectDice}
    className={`px-3 py-2 m-2 shadow-xl bg-gray-100 font-bold ${item.selected && "bg-green-600 text-white"}  rounded-lg `}>{item.value}</button>

  )
}

export default Dice
