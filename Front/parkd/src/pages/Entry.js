import React, { useState } from 'react'
import './Entry.css';
import { slotData } from '../components/Slots';
import Timestamp from '../components/Timestamp';
import Datestamp from '../components/Datestamp';

const Entry = ({ user }) => {
  const [vehicleInput, setVehicleInput] = useState('');
  const [timeout, setTimeout] = useState();
  const [timein, setTimein] = useState();


  //Function that calculates time difference in hours.
  function differenceInHours(timeout, timein){
    let timeStart = new Date().toDateString('yyyy-mm-dd') + ' ' + (timein);
    let timeEnd = new Date().toDateString('yyyy-mm-dd') + ' ' + (timeout);

    let timeDiff = new Date(timeEnd) - new Date(timeStart);
    let hourDifference = timeDiff/ 60/ 60/ 1000;

    return hourDifference;
  };

  //A conditional that checks if the user has entered the required values before executing.
  let hourDiff = 0;
  if (timein && timeout){
    hourDiff = differenceInHours(timeout, timein);
  };

  //Calculates the total fee to be paid.
  let rate = 500;
  let price = Math.round(Math.abs(hourDiff * rate));

  //Function to randomly assign a parking spot.
  function pickParkingSpot(slots){
    let keys = Object.keys(slots);
    var randomElement = slots[keys[keys.length * Math.random() << 0]];

    if(Array.isArray(slots) === true){
        let newKeys = Object.keys(randomElement);
        var randomValue = randomElement[newKeys[newKeys.length * Math.random() << 0]];
    }else { 
        randomValue = randomElement;
    }

    return randomValue;
  };

  //Another conditional that will not execute until the user has entered all required fields.
  let assignedSpot;
  if(timein && timeout && vehicleInput){
    assignedSpot = pickParkingSpot(slotData)
  };

  function showSpot(){
    console.log(assignedSpot)
  };

  function showData(){
    alert('Cannot add more than one vehicle at a time')
  };


  //Sends the captured data to the database.
  const onSubmitVehicle = () => {
    fetch('http://localhost:4000/booking', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        vehiclePlate: vehicleInput,
        checkin: timein,
        checkout: timeout,
        price: price,
        spot: assignedSpot,
        username: user.username,
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if(data === 'Bad request'){
        showData(data)
      }
      
    })
  }

  return (
    <div className='entry-form'>
      <div className='form-case'>
        <h1 className='welcome'>Welcome {user.username}!</h1>
        <h2 className='rate'>Rate: &#8358;{rate} / hour</h2>
        <input 
          onChange={e => {setVehicleInput(e.target.value)}}
          className='entry' 
          type='text' 
          placeholder='Enter Vehicle Plate Number...'
        />
        <h3>Time In: </h3>
        <input 
          onChange={e => setTimein(e.target.value)}
          className='entry'
          type='time'
        />
        <h3>Estimated Time Out: </h3>
        <input
          onChange={e => setTimeout(e.target.value)}
          className='entry' 
          type='time'
        />

        <br />
        <button onClick={() => {onSubmitVehicle(); showSpot()}} className='entry-btn'>Enter</button>
        <h3 className='timestamp'>Time: {Timestamp()}</h3>
        <h3 className='datestamp'>{Datestamp()}</h3>
        <h3>Price to be paid: &#8358;{price}</h3>
      </div>
    </div>
    
  )
  
}



export default Entry;