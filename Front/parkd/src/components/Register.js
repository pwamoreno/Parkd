import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = ({ setRoute, loadUser }) => {

  const [createName, setCreateName] = useState('')
  const [createUsername, setCreateUsername] = useState('')
  const [createPassword, setCreatePassword] = useState('')

  const onSubmitRegister = () => {
    fetch('http://localhost:4000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: createName,
        username: createUsername,
        password: createPassword
      })
    })
    .then(response => response.json())
    .then(user => {
      if(user){
        loadUser(user)
        setRoute('home')
      }
    })
  }


  return (
    <div className='form'>
      <div className='login'>
            <legend>Register</legend>
            <input 
              onChange={e => setCreateName(e.target.value)} 
              className='log' 
              type='text' 
              placeholder='Name'
            />

            <br/>

            <input 
              onChange={e => setCreateUsername(e.target.value)} 
              className='log' 
              type='text' 
              placeholder='Username'
            />

            <br/>

            <input 
              onChange={e => setCreatePassword(e.target.value)} 
              className='log' 
              type='password' 
              placeholder='Password'
            />

            <br/>

            <Link 
              to='/' 
              className='log-btn' 
              onClick={onSubmitRegister}
            >Enter</Link>
        </div>
    </div>
  )
}

export default Register