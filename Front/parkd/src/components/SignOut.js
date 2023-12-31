import React from 'react'
import './SignOut.css';

const SignOut = ({setRoute}) => {
  return (
    <div>
        <p onClick={() => setRoute('signin')} className='signout'>Sign Out</p>
    </div>
  )
}

export default SignOut