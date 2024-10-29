import React from 'react'
import "../styles/Navhead.css"
// import { useNavigate } from 'react-router-dom'

function Navhead() {

  const user = JSON.parse(localStorage.getItem('currentuser')
)
// const navi = useNavigate()
const logout = function()
{
  localStorage.removeItem('currentuser')
  window.location.href = '/login'
}
  return (
    <>
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/" >KEC GUEST HOUSE</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav" id='logs'>
      
      
      <li className="nav-item">
        <a className="nav-link" href = "/home">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href = "/features">Features</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href = "/feedback">FeedBack</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href = "/contact">Contact Us</a>
      </li>

     {user ? (<><div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    {user.name}
  </button>
  <ul class="dropdown-menu mr-5" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" href="/profile">Profile</a></li>
    <li><a class="dropdown-item" href="https://arcanemirage.com/project/2301?token=5bLNP2Q4GZTz" target = '_blank'>VR</a></li>
    <li><a class="dropdown-item" onClick={logout}>Logout</a></li>
    
  </ul>
</div></>) :
     
     (<>
     
     <li className="nav-item logs">
        <a className="nav-link" href="/register">Register</a>
      </li>
      <li className="nav-item logs">
        <a className="nav-link" href="/login">Login</a>
      </li>
     </>)}
    </ul>
  </div>
</nav>


    </>
  )
}

export default Navhead
