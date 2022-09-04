import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import {
  useHistory,
} from 'react-router-dom';
import styles from './styles.module.css';
import { api } from '../api/api';

function Login({ setLogged, logged, setRedirectState }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUser = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    api.login(username, password).then((response) => {
      if (response.ok) {
        setLogged(response.data?.user);
      }
    });
  };

  useEffect(() => {
    if (logged) {
      history.push('/');
      setRedirectState(false);
    }
  }, [logged]);

  return (
    <div className={window.innerWidth < 820 ? styles.page_mobile : styles.page}>
      <TextField onChange={handleUser} id="user" label="email" variant="outlined" />
      <TextField onChange={handlePassword} type="password" id="password" label="password" variant="outlined" />
      <Button onClick={handleSubmit} variant="contained">Login</Button>
    </div>
  );
}

export default Login;
