import React, { useEffect, useState } from 'react';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import { Button } from '@mui/material';
import styles from './styles.module.css';
import Home from './Home';
import LoginScreen from './Login';
import SideBar from '../components/sidebar/SideBar';
import { api } from '../api/api';

function Layout() {
  const [data] = useState(null);
  const [redirectState, setRedirectState] = useState(false);
  const [logged, setLogged] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);

  // async function getData() {
  //   const answer = await api.getHomeData();
  //   if (!answer || answer.length === 0) return;
  //   setData({
  //     data: answer,
  //   });
  // }

  useEffect(() => {
    const token = sessionStorage.getItem('session-token');
    if (token && !logged) {
      api.verifySession().then((response) => {
        console.log(response);
        if (response.ok) {
          setRedirectState(false);
          setLogged(response.data?.user);
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

  function handleLogout() {
    sessionStorage.removeItem('session-token');
    setLogged(null);
    setRedirectState(true);
  }

  const redirect = redirectState ? <Redirect path="/" to="/login" /> : '';
  return (
    <div className={styles.app_wrapper}>
      {data && selectedDimension && logged
      && <SideBar selectedDimension={selectedDimension} setSelectedDimension={setSelectedDimension} data={data.data} />}
      <div style={{ flex: '1' }}>
        {logged && <Button onClick={handleLogout} variant="contained">Logout</Button>}
        <Router>
          <Switch>
            <Route path="/login">
              <LoginScreen setRedirectState={setRedirectState} logged={logged} setLogged={setLogged} />
            </Route>
            {redirect}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>

    </div>
  );
}

export default Layout;
