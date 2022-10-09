import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import {
  Button, Alert, TextField,
} from '@mui/material';
// import styles from './styles.module.css';
import { api } from '../api/api';

function CreateAccount() {
  const [email, setEmail] = useState(null);
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [password, setPassword] = useState(null);
  const [verifyPassword, setVerifyPassword] = useState(null);
  const [name, setName] = useState(null);
  // eslint-disable-next-line max-len
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  useEffect(() => {
    if (password !== verifyPassword && verifyPassword !== null) {
      setMsg('Passwords do not match');
    } else {
      setMsg(false);
    }
  }, [verifyPassword, password]);

  function handleSetName(e) {
    setName(e.target.value);
  }
  function handleSetEmail(e) {
    setEmail(e.target.value);
  }
  function handleSetPassword(e) {
    setPassword(e.target.value);
  }
  function handleSetVerifyPassword(e) {
    setVerifyPassword(e.target.value);
  }

  function handleSubmit() {
    if (!emailRegex.test(email)) {
      setMsg('Email is not valid');
      return;
    }
    if (!name) {
      setMsg('Missing name');
      return;
    }
    api.createAccount({ email, password, name }).then((response) => {
      console.log(response);
      if (response.status === 409) {
        setMsg('Email already in use');
      }
      if (response.ok) {
        setSuccessMsg('Account created');
      }
    });
  }
  function handleGoBack() {
    window.history.back();
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        style={{ margin: '5px 0' }}
        onChange={handleSetName}
        id="name"
        label="Name"
        variant="outlined"
      />
      <TextField
        style={{ margin: '5px 0' }}
        onChange={handleSetEmail}
        id="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        style={{ margin: '5px 0' }}
        onChange={handleSetPassword}
        id="password"
        type="password"
        label="Password"
        variant="outlined"
      />
      <TextField
        style={{ margin: '5px 0' }}
        onChange={handleSetVerifyPassword}
        id="verifyPassword"
        type="password"
        label="Repeat password"
        variant="outlined"
      />
      <Button
        style={{ margin: '5px 0' }}
        onClick={handleSubmit}
        variant="contained"
      >
        Create
      </Button>
      <Button
        style={{ margin: '5px 0' }}
        onClick={handleGoBack}
        variant="contained"
      >
        Back
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
      {successMsg && (
      <Alert
        style={{
          position: 'fixed', bottom: '80px', right: '30px', maxWidth: 'calc(100% - 90px)',
        }}
        onClose={() => setSuccessMsg(null)}
        severity="success"
      >
        {successMsg}
      </Alert>
      )}
    </div>
  );
}

export default CreateAccount;
