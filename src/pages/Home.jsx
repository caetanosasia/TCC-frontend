import React from 'react';
// import { Button } from '@mui/material';
// import { format } from 'date-fns';
// import HomeCard from '../components/HomeCard/HomeCard';
import styles from './styles.module.css';

function Home() {
  return (
    <div className={window.innerWidth < 820 ? styles.page_mobile : styles.page}>
      <div className={styles.export_button_container}>
        {/* <Button onClick={exportData} variant="text">
          <span className={styles.export_button_icon}>
            <i className="fas fa-file-download" />
          </span>
        </Button> */}
      </div>
      <div className={window.innerWidth < 820 ? styles.dual_card_holder_mobile : styles.dual_card_holder}>
        {/* <HomeCard data={data} selectedDimension={selectedDimension} /> */}
      </div>
    </div>
  );
}

export default Home;
