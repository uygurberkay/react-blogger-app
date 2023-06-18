import React, { useState } from 'react'

export const RegisterPage = () => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const register = async (e) => {
    e.preventDefault();
    /* We didn't used axios for fetch from backend */
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
    });
    if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
}

  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="Username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="password"
             placeholder="Password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
  )
}
