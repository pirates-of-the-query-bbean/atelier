import React from 'react'
import './Button.css'

//To control the width of the button, create a div around the Button JSX and set the specific width of that button to
//the desired width of the button. Accepts 'text', 'Icon', 'onClickFunction', 'buttonWidth' and 'args' properties. 
//Example: Minimum needede to render <Button text='open' Icon={StarBorderIcon}buttonWidth="460px" />
function Button({text, Icon, buttonWidth, onClickFunction, args }) {

  const handleOnClick = () => {
    if (onClickFunction) {
      onClickFunction(args)
    }
  }

  return (
      <button type='button' onClick={() => handleOnClick()} className='sharedButton' style={{width: buttonWidth}}>
        <div className='sharedButton__container' style={{justifyContent: Icon ? 'space-between': 'center' }}>
          <div className='sharedButton__text'>
              <span>{text}</span>
          </div>
          {Icon && <div className='sharedButton__image'>
            <Icon/>
          </div>}
        </div>
      </button>
  )
}

export default Button