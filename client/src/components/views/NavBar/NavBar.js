import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";
import "./NavBar.css";

//https://react-icons.github.io/react-icons

function NavBar() {
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃 하는데 실패하였습니다.')
      }
    })
  }

  return (
    <nav className='navbar'>
      <Link to = '/' className="nav-logo" onClick={() => setOpen(false)}>
        Logo
      </Link>
      <ul className={open ? 'nav-links active' : 'nav-links'}>
        <li className='nav-item'>
          <Link to = '/' className='nav-link' onClick={() => setOpen(false)}>
          Main
          </Link>
        </li>
        <li className='nav-item'>
          <Link to = '/login' className='nav-link' onClick={() => setOpen(false)}>
            Sign In
          </Link>
        </li>
        <li className='nav-item'>
          <Link to = '/register' className='nav-link' onClick={() => setOpen(false)}>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <button className='logout' onClick={onClickHandler}>
            <FiLogOut style={{fontSize: '1rem'}} />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
