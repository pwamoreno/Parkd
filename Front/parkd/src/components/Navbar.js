import React from 'react';
import logo from '../logo.svg';
// import dashboard from '../dashboard.svg';
import entry from '../car entry.svg';
import exit from '../car exit.svg';
// import parking from '../parking map.svg';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import SignOut from './SignOut';


const Navbar = ({ setRoute }) => {

  return (
    <div className='nav'>
      <img src={logo} className='logo' alt='logo'/>
      <div className='navlinks'>
        <>
          <ul>

            {/* <li>
              <NavLink to='/' className='nav-item' >
                <span>
                  <img src={dashboard} className='dash-icon' alt='dash-img'/>
                  Dashboard
                </span>
              </NavLink>
            </li> */}

            <li>
              <NavLink to='/' className='nav-item' >
                <span>
                  <img src={entry} className='entry-icon icons' alt='car-img'/>
                  Vehicle Entry
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/exit' className='nav-item'>
                <span>
                  <img src={exit} className='exit-icon icons' alt='car-img'/>
                  Vehicle Exit
                </span>
              </NavLink>
            </li>

            {/* <li>
              <NavLink to='/map' className='nav-item'  >
                <span>
                  <img src={parking} className='parking-icon icons' alt='car-img'/>
                  Parking Map
                </span>
              </NavLink>
            </li> */}

            {/* <li>
              <NavLink to='/store' className='nav-item'>
                <span>
                  <img src={exit} className='exit-icon icons' alt='car-img'/>
                  Store
                </span>
              </NavLink>
            </li> */}

            <SignOut setRoute={setRoute}/>

          </ul>

        </>
        
      </div>
    </div>
  )
}

export default Navbar