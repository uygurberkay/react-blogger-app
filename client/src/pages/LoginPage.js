import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

export const LoginPage = () => {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [redirect,setRedirect] = useState(false);
    const login = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });
        if (response.ok) {
              setRedirect(true);
          } else {
            alert('wrong credentials');
          }
    } 
    if(redirect){
        return <Navigate to={'/'} />
    }

  return (
    <form className='login' onSubmit={login}>    
        <h1>Login Page</h1>
        <input 
            type="text" 
            placeholder='Username' 
            value={username} 
            onChange={e => setUsername(e.target.value)}
        />
        <input 
            type="password" 
            placeholder='Password' 
            value={password} 
            onChange={e => setPassword(e.target.value)}
        />
        <button>Login</button>
    </form>
  )
}
