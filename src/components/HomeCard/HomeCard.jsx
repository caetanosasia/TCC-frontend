import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles.module.css';
import { api } from '../../api/api';

function HomeCard({ experiment, setModalDeleteExperiment, handleResendExperimentToken }) {
  const [exportLoader, setExportLoader] = useState(false);

  function exportData(dataFromApi) {
    const { data } = dataFromApi;
    if (data === 'loading' && data.length === 0) return;
    const csvContent = `data:text/csv;charset=utf-8,${
      data.map((row, i) => {
        const formattedRow = row;
        let newRow = Object.values(row);
        newRow = newRow.join(';');
        if (i === 0) {
          newRow = `${Object.keys(formattedRow).join(';')}
                ${newRow}`;
        }
        return newRow;
      }).join('\r\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${experiment.name}.csv`);
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
  }
  function handleExportExperimentData() {
    setExportLoader(true);
    api.getDataToExport(experiment.id).then((data) => {
      setExportLoader(false);
      exportData(data);
    });
  }
  return (
    <div
      className={styles.experiment_box}
      key={experiment.id}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h5">{experiment.name}</Typography>
          <Typography variant="body1">{experiment.description || ''}</Typography>
        </div>
        <div className={styles.homecard_buttons_box}>
          <Button onClick={() => setModalDeleteExperiment({ ...experiment, open: true })}><DeleteIcon /></Button>
          {!exportLoader ? <Button onClick={handleExportExperimentData}><DownloadIcon /></Button>
            : <CircularProgress />}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/experiment/${experiment.id}`}>Details</Link>
        <Button onClick={() => handleResendExperimentToken(experiment.id)}>Resend experiment Token</Button>
      </div>
    </div>
  );
}

export default HomeCard;
