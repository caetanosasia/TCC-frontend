import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Button, Alert, TextField,
} from '@mui/material';
import { api } from '../api/api';

function ChangePassword() {
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const history = useHistory();
  const [password, setPassword] = useState(null);
  const { token } = useParams();
  const [verifyPassword, setVerifyPassword] = useState(null);
  useEffect(() => {
    if (password !== verifyPassword && verifyPassword !== null) {
      setMsg('Passwords do not match');
    } else {
      setMsg(false);
    }
  }, [verifyPassword, password]);

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }
  function handleSetVerifyPassword(e) {
    setVerifyPassword(e.target.value);
  }

  function handleSubmit() {
    api.changePassword({ password, token }).then((response) => {
      console.log(response);
      if (response.status === 403) {
        setMsg('Invalid token');
      }
      if (response.ok) {
        setSuccessMsg('Password changed');
      }
    });
  }
  function handleGoBack() {
    history.push('/');
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        style={{ margin: '5px 0' }}
        onChange={handleSetPassword}
        id="password"
        type="password"
        label="New password"
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
        Change
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

export default ChangePassword;
