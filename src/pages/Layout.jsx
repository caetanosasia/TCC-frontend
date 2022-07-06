import React, { useEffect, useState } from 'react';
import {
  Route, BrowserRouter as Router, Switch,
} from 'react-router-dom';
import styles from './styles.module.css';
import Home from './Home';
import SideBar from '../components/sidebar/SideBar';
import { api } from '../api/api';

function Layout() {
  const [data, setData] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);

  async function getData() {
    const answer = await api.getHomeData();
    if (!answer || answer.length === 0) return;
    setData({
      data: answer,
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!data) return;
    const arr = Object.values(data.data);
    setSelectedDimension(arr[0].key);
  }, [data]);

  return (
    <div className={styles.app_wrapper}>
      {data && selectedDimension
      && <SideBar selectedDimension={selectedDimension} setSelectedDimension={setSelectedDimension} data={data.data} />}
      <div style={{ flex: '1' }}>
        <Router>
          <div className={styles.all_content}>
            <div className={styles.header_main}>
              <div className={styles.title_nav}>
                <div>
                  <h1
                    className={window.innerWidth < 820 ? styles.cheap_scientist_mobile : styles.cheap_scientist}
                  >
                    Dashboard
                  </h1>
                </div>
                <div>
                  Logout
                </div>
              </div>
            </div>
            <div className={styles.main_content}>
              <Switch>
                <Route path="/">
                  {data && selectedDimension && <Home data={data.data} selectedDimension={selectedDimension} />}
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </div>

    </div>
  );
}

export default Layout;
