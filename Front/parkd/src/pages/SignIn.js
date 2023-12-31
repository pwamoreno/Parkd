import React, { useState } from 'react'
import './SignIn.css';
import { Link } from 'react-router-dom';


const SignIn = ({ setRoute, loadUser }) => {

  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  

  const onSubmitSignin = () => {
    fetch('http://localhost:4000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user.id){
        loadUser(user)
        setRoute('home')
      }
    })
  }


  return (
    <div className='form'>
        <div className='login'>
            <legend>Sign In</legend>
            <input 
              onChange={e => setSignInUsername(e.target.value)} 
              className='log' 
              type='text' 
              placeholder='Username'
            />

            <br/>

            <input 
              onChange={e => setSignInPassword(e.target.value)} 
              className='log pass' 
              type='password' 
              placeholder='Password'
            />

            <button 
              className='log-btn' 
              onClick={onSubmitSignin}
            >Enter</button>

            <br />
            
            <Link 
              to='/register' 
              className='register' 
              onClick={() => setRoute('register')}
            >Register</Link>
        </div>
    </div>
  )
}

export default SignIn