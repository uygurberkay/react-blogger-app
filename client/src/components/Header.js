import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';
import Image from '../img/TravelPad_Logo.png';
import { UserContext } from '../UserContext';

export const Header = () => {
  const {setUserInfo, userInfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo"><img src={Image} height={80} width={160} alt="TravelPad" /></Link>
        <nav>
        {/* Logged in version */}
          {username && (
            <>
              <Link to="/create">Create new post</Link>
              <a href=' ' onClick={logout}>Logout ({username})</a>
            </>
          )}
          {/* Quest version */}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
         )}
        </nav>
    </header> 
  )
}
