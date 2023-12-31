import React from 'react';
import './Dashboard.css';

const Dashboard = ({ user }) => {

  

  return (
    <div className='dash'>

      <div className='park-info'>
        <div className='available'>
          <h2>{user.username}</h2>
          <h2>Available</h2>
        </div>

        <div className='filled'>
          <h2>24</h2>
          <h2>Filled</h2>
        </div>

        <div className='total'>
          <h2>144</h2>
          <h2>Total</h2>
        </div>

      </div>

      <div className='business-info'>

        <div className='income'>
          <h4>Income</h4>
        </div>

        <div className='hours'>
          <h4>Working Hours </h4>
        </div>

      </div>
      
    </div>
  )
}

export default Dashboard