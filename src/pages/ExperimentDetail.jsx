import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
} from '@mui/material';
import { api } from '../api/api';
// import { Add } from '@mui/icons-material';
import styles from './styles.module.css';
import ChartCard from '../components/ChartCard/ChartCard';
import SideBar from '../components/sidebar/SideBar';

function ExperimentDetail() {
  const [chartData, setChartData] = useState(null);
  const [selectedDimension, setSelectedDimension] = useState(null);
  const [msg, setMsg] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      api.getExperimentById(id).then(({ data }) => {
        if (Object.values(data).length !== 0) {
          setSelectedDimension(Object.values(data)[0]?.key);
          setChartData(data);
        } else {
          setMsg('Não existem dados para esse experimento');
        }
      });
    }
  }, [id]);
  return (
    <div className={window.innerWidth < 820 ? styles.page_mobile : styles.page}>
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
      {chartData && (
      <SideBar
        data={chartData}
        selectedDimension={selectedDimension}
        setSelectedDimension={setSelectedDimension}
      />
      )}
      {chartData && <ChartCard data={chartData} selectedDimension={selectedDimension} />}
    </div>
  );
}

export default ExperimentDetail;
