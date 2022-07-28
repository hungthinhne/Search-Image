import React from 'react'
import './body.css'
import Search from '../search/Search'
import Image from '../image/Image'

const Body = ({children}) => {
  
  const handleReload = () => {
     window.location.reload()
  }

  return (
    <>
      <div className="body">
        <div className="header">
          <div className="center">
            <img onClick={handleReload} className='logo' src="https://cdn-icons-png.flaticon.com/512/5968/5968763.png" alt="" />
            <h1 className='name-app' onClick={handleReload}>Image Unsplash</h1>
          </div>
          <div className="center">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Body