import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  Button, Alert, TextField,
} from '@mui/material';
// import styles from './styles.module.css';
import { api } from '../api/api';

function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  // eslint-disable-next-line max-len
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit() {
    if (!emailRegex.test(email)) {
      setMsg('Email is not valid');
      return;
    }
    api.recoverPassword({ email }).then((response) => {
      console.log(response);
      if (response.ok) {
        setSuccessMsg('If this email exists, you will receive an email with instructions to recover your password');
      } else {
        setMsg('Something went wrong');
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
        onChange={handleSetEmail}
        id="email"
        label="Email"
        variant="outlined"
      />

      <Button
        style={{ margin: '5px 0' }}
        onClick={handleSubmit}
        variant="contained"
      >
        Recover
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

export default ForgotPassword;
