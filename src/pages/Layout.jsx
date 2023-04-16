import React, { useEffect, useState } from 'react';
import { Button, Alert } from '@mui/material';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import styles from './styles.module.css';
import ExperimentDetail from './ExperimentDetail';
import Home from './Home';
import CreateAccount from './CreateAccount';
import ForgotPassword from './ForgotPassword';
import LoginScreen from './Login';
import SideBar from '../components/sidebar/SideBar';
import { api } from '../api/api';
import ChangePassword from './ChangePassword';

function Layout() {
  const [data] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [redirectState, setRedirectState] = useState(false);
  const [logged, setLogged] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('session-token');
    if (token && !logged) {
      api.verifySession().then((response) => {
        if (response.ok) {
          setRedirectState(false);
          setLogged(response.data?.user);
        } else {
          setRedirectState(true);
        }
      });
    } else {
      setRedirectState(true);
    }
  }, []);

  useEffect(() => {
    if (!data) return;
    const arr = Object.values(data.data);
    setSelectedDimension(arr[0].key);
  }, [data]);

  useEffect(() => {
    console.log(logged);
  }, [logged]);

  function handleLogout() {
    sessionStorage.removeItem('session-token');
    setLogged(null);
    setRedirectState(true);
  }

  function handleResendVerificationEmail() {
    api.resendVerificationEmail(logged.email).then((response) => {
      console.log(response);
      if (response.ok) {
        setSuccessMsg('Email enviado com sucesso');
      }
    });
  }
  const redirect = redirectState ? <Redirect path="/" to="/login" /> : '';
  return (
    <div className={styles.app_wrapper}>
      {data && selectedDimension && logged
      && <SideBar selectedDimension={selectedDimension} setSelectedDimension={setSelectedDimension} data={data.data} />}
      <div className={styles.page_content}>
        {logged && (
        <div className={styles.header_main}>
          {!logged.verified && <Button onClick={handleResendVerificationEmail}>Resend verification email</Button>}
          <span style={{ marginRight: '5px' }}>{logged.name}</span>
          <Button onClick={handleLogout} variant="contained">Logout</Button>
        </div>
        )}
        <Router>
          <Switch>
            <Route path="/create-account">
              <CreateAccount />
            </Route>
            <Route path="/forgot-password">
              <ForgotPassword />
            </Route>
            <Route path="/change-password/:token">
              <ChangePassword />
            </Route>
            <Route path="/login">
              <LoginScreen
                setRedirectState={setRedirectState}
                logged={logged}
                setLogged={setLogged}
              />
            </Route>
            {redirect}
            <Route path="/experiment/:id">
              <ExperimentDetail logged={logged} handleLogout={handleLogout} />
            </Route>
            <Route path="/">
              <Home logged={logged} handleLogout={handleLogout} />
            </Route>
          </Switch>
        </Router>
      </div>
      {successMsg && (
      <Alert
        style={{
          position: 'fixed', bottom: '30px', right: '30px', maxWidth: 'calc(100% - 90px)',
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

export default Layout;
