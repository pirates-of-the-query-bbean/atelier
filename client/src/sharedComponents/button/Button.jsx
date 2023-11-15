import React from 'react'
import './Button.css'

//To control the width of the button, create a div around the Button JSX and set the specific width of that button to
//the desired width of the button. Accepts 'text', 'Icon', 'onClickFunction', 'buttonWidth' and 'args' properties. 
function Button({text, Icon, buttonWidth, onClickFunction, args }) {

  const handleOnClick = () => {
    if (onClickFunction) {
      onClickFunction(args)
    }
  }

  return (
      <div onClick={() => handleOnClick()} className='sharedButton' style={{width: buttonWidth}}>
        <div className='sharedButton__container' style={{justifyContent: Icon ? 'space-between': 'center' }}>
          <div className='sharedButton__text'>
              <span>{text}</span>
          </div>
          {Icon && <div className='sharedButton__image'>
            <Icon/>
          </div>}
        </div>
      </div>
  )
}

export default Button