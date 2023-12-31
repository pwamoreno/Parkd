import React, { useEffect, useState } from 'react'
import './Exit.css';
// import {Link} from 'react-router-dom'
// import  { userData } from '../components/Data';
import Pagination from '../components/Pagination';

const Exit = ({user}) => {

  //Manage state
  const [search, setSearch] = useState('')
  const [currentPage, setcurrentPage] = useState(1);
  const [ entriesPerTable ] = useState(10);
  const [backendData, setBackendData] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
 
  //Display and filter data fetched from the backend
  const displayData = backendData
    .filter((vehicle) => {
      return(
        vehicle.vin.toLowerCase()
        .includes(search.toLowerCase()))
    })
    .map((vehicle, id) => {
      return (
        <tr key={id}>
          <td>{vehicle.vin}</td>
          <td>{vehicle.checkin}</td>
          <td>{vehicle.spot}</td>
          <td>
            {user.username === vehicle.username && (
              <button 
                className='exit-link' 
                onClick={() => setIsOpen(true)}
              >Exit</button>
            )}
          </td>
        </tr>
      )
    }
  );

  //Manage pagination
  const lastTableIndex = currentPage * entriesPerTable;
  const firstTableIndex = lastTableIndex - entriesPerTable;
  const currentTable = displayData.slice(firstTableIndex, lastTableIndex)

  //Trying to figure out how to prevent the same spot from being chosen twice.
  // console.log(backendData[0].spot);
  // console.log(displayData[0].props.children[2].props.children);


  let userKeys = Object.keys(backendData)
  let currentUser;

  for(let i = 0; i < backendData.length; i++){
    if(backendData[userKeys[i]].username === user.username){
      currentUser = backendData[userKeys[i]];
    }
  }

  //Fetch the list of parked vehicles
  useEffect(() => {
    fetch('http://localhost:4000/exit')
    .then(response => response.json())
    .then(data => {
      setBackendData(data) 
    })
  }, [])

  const onExit = () => {
    fetch('http://localhost:4000/delete', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: user.username
      })
    })
  }

  //Manage view or what to render based on user input
  if(!isOpen){
    return (
      <div className='exit-vehicle'>
        <div className='vehicle-exit-info'>
          <input 
            onChange={e => setSearch(e.target.value)} 
            className='search' 
            type='search' 
            placeholder='Search Vehicle...'
          />
          <div>
            <table>
              <thead>
                <tr>
                  <th>Vechicle Number</th>
                  <th>Time In</th>
                  <th>Parking Spot</th>
                  <th>Exit Vehicle</th>
                </tr>
              </thead>
              <tbody>
                {currentTable}
              </tbody>
            </table>
            <Pagination 
              totalTables={backendData.length} 
              entriesPerTable={entriesPerTable}
              setCurrentPage={setcurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    )
  }
  return(
    <>
    <div className='overlay'></div>
      <div className='modal-styles'>
        <h1>Exit Vehicle</h1>
        <div className='details-container'>
          <h2 className='h2'>Details</h2>
          <div className='detail-item'>
            <p>Username: <strong>{currentUser.username}</strong></p>
            <p>Vechicle Number: <strong>{currentUser.vin}</strong></p>
            <p>Parking Spot: <strong>{currentUser.spot}</strong></p>
            <p>Time In: <strong>{currentUser.checkin}</strong></p>
            <p>Time Out: <strong>{currentUser.checkout}</strong></p>
            <p>Price: <strong>&#8358;{currentUser.price}</strong></p>
          </div>
        </div>
        <div className='modal-btn'>
          <button 
            className='exit-link' 
            onClick={() => setIsOpen(false)}
          >Back</button>
          <button
            to='/exit' 
            className='exit-link' 
            onClick={onExit}
          >Exit Vehicle</button>
        </div>
      </div>
    </>
  )
  
}

export default Exit;