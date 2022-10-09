import React from 'react';
import styles from './styles_mobile.module.css';

function MobileDimensionsBar({ data, selectedDimension, setSelectedDimension }) {
  return (
    <div className={styles.background_image}>
      <div className={styles.sidebar_main}>
        <div className={styles.sidebar_campos}>
          {Object.values(data).map(({ key }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedDimension(key)}
              className={selectedDimension === key ? styles.sidebar_button_active : styles.sidebar_button}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileDimensionsBar;
