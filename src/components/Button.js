import React from 'react'

const Button = (props) => {
  return (
    <button title={props.title} className='btn' onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button;
