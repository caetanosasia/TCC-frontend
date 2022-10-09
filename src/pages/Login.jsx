import React, { useState, useEffect } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import {
  useHistory,
} from 'react-router-dom';
import styles from './styles.module.css';
import { api } from '../api/api';

function Login({ setLogged, logged, setRedirectState }) {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(false);

  const handleUser = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    api.login(username, password).then((response) => {
      console.log(response);
      if (response.status === 403) {
        setMsg('User or password incorrect');
      }
      if (response.ok) {
        setLogged(response.data?.user);
      }
    });
  };

  function handleCreateAccount() {
    history.push('/create-account');
  }

  useEffect(() => {
    if (logged) {
      history.push('/');
      setRedirectState(false);
    }
  }, [logged]);

  function submitWithEnter(e) {
    if (msg) {
      setMsg(false);
    }
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  return (
    <div className={window.innerWidth < 820 ? styles.page_mobile_login : styles.page_login}>
      <TextField
        style={{ margin: '5px 0' }}
        onKeyDown={submitWithEnter}
        onChange={handleUser}
        id="user"
        label="email"
        variant="outlined"
      />
      <TextField
        style={{ margin: '5px 0' }}
        onKeyDown={submitWithEnter}
        onChange={handlePassword}
        type="password"
        id="password"
        label="password"
        variant="outlined"
      />
      <Button
        style={{ margin: '5px 0' }}
        onClick={handleSubmit}
        variant="contained"
      >
        Login

      </Button>
      <Button
        style={{ margin: '5px 0' }}
        onClick={handleCreateAccount}
        variant="contained"
      >
        Create Accoun
      </Button>
      {msg && (
      <Alert
        style={{
          position: 'fixed', bottom: '30px', right: '30px', maxWidth: 'calc(100% - 90px)',
        }}
        onClose={() => setMsg(null)}
        severity="error"
      >
        {msg}
      </Alert>
      )}
    </div>
  );
}

export default Login;
