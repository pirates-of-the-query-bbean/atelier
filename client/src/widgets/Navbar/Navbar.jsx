import React from 'react'
import './Navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

function Navbar() {
  return (
    <nav className='actualNavbar'>
        <div className='actualNavbar__logo'>
            <span>
                Walmort 
            </span>
            <div className='actualNavbar__icon'>
                <WbSunnyIcon/>
            </div>
        </div>

        <div className='actualNavbar__options'>
            <span>New Arrivals</span>
            <span>Clothing</span>
            <span>Bags</span>
            <span>Accessories</span>
            <span>Sale</span>
        </div>
        <div>
          <SearchIcon />
        </div>
    </nav>
  )
}

export default Navbar
