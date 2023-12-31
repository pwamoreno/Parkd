import React, { useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
import Entry from './pages/Entry';
import Exit from './pages/Exit';
// import Map from './pages/Map';
import SignIn from './pages/SignIn';
import Register from './components/Register';
// import Card from './components/Card';


function App() {

  const [route, setRoute] = useState('signin')
  const [user, setUser] = useState({id: '', name: '', username: ''})

  //Our callback function
  const loadUser = (data) => {
    setUser({
        id: data.id,
        name: data.name,
        username: data.username
      });
  }

  return (
    <div className="App">
    
      {route === 'home' 
        ?  <div className='route'>
            <Navbar setRoute={setRoute}/>
            <Routes>
              {/* <Route path='/' element={<Dashboard user={user}/>} /> */}
              <Route path='/' element={<Entry user={user}/>} />
              <Route path='exit' element={<Exit user={user}/>} />
              {/* <Route path='map' element={<Map/>} /> */}
              {/* <Route path='store' element={<Card />}/> */}
            </Routes>
          </div>
        : (
          route === 'signin'
          ? <SignIn setRoute={setRoute} loadUser={loadUser}/>
          : <Register setRoute={setRoute} loadUser={loadUser}/>
        )
      }
        
    </div>
  );
}

export default App;
