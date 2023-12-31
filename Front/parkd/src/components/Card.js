import React from 'react';
import './Card.css';

const Card = () => {
  return (
    <div>
        <div className='flip-card'>
            <div className='flip-card-inner'>
                <div className='flip-card-front'>
                    <img alt='img' src=''/>
                </div>
                <div className='flip-card-back'>
                    <img alt='img' src=''/>
                    <h3>Some item</h3>
                    <h1>Some other</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card