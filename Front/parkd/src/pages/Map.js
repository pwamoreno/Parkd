import React, { useState } from 'react';
import { slotData } from '../components/Slots';
import './Map.css';

const Map = () => {
  const [activePage, setActivePage] = useState(1)
  const [slotsPerLevel] = useState(8)

  const displaySlots = slotData.map((slot, index) => {

    return(
      <tr key={index}>
        <td>{slot.spot1}</td>
        <td>{slot.spot2}</td>
        <td>{slot.spot3}</td>
        <td>{slot.spot4}</td>
        <td>{slot.spot5}</td>
        <td>{slot.spot6}</td>
      </tr>
    )
  })

  const lastTableSlot = activePage * slotsPerLevel
  const firstTableSlot = lastTableSlot - slotsPerLevel
  const currentSlots = displaySlots.slice(firstTableSlot, lastTableSlot)

  let totalSlots = slotData.length

  let slotPages = [];
  for(let i = 1; i <= Math.ceil(totalSlots/slotsPerLevel); i++){
    slotPages.push(i)
  }

  return (
    <div className='map'>
      <table className='slot'>
        <tbody>
          {currentSlots}
        </tbody>
      </table>
      <div className='pages'>
        {
          slotPages.map((page, index) => {
            return(
              <button 
                className={` paging ${page === activePage ? 'active' : ''}`} 
                key={index} 
                onClick={() => setActivePage(page)}>
                Level {page}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default Map