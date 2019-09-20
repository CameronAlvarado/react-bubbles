import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {

  const [creds, setCreds] = useState({
    credentials: {
      username: '',
      password: ''
    }
  });
  // make a post request to retrieve a token from the api
  const handleLogin = e => {
    e.preventDefault();
    // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
    axiosWithAuth()
      .post('/login', creds.credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        // redirect to the apps main page?
        props.history.push('/protected');
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setCreds({
      credentials: {
        ...creds.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            value={creds.credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={creds.credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
