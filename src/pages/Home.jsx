import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography, Button, Alert, Modal, Box, TextField,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import styles from './styles.module.css';
import { api } from '../api/api';

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: window.innerWidth < 768 ? 250 : 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home({ logged }) {
  const [isMobile] = useState(window.innerWidth < 768);
  const [experiments, setExperiments] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [msg, setMsg] = useState(null);
  const [modal, setModal] = useState(false);
  const [experimentName, setExperimentName] = useState('');
  const [experimentDescription, setExperimentDescription] = useState('');
  function getData() {
    api.getHomeData().then(({ response, data }) => {
      if (response.ok) {
        setExperiments(data.experiments);
      }
    });
  }
  useEffect(() => {
    if (logged) {
      getData();
    }
  }, [logged]);
  function handleCreateExperiment() {
    if (!logged.verified) {
      setMsg('Please, verify your email before creating an experiment');
      return;
    }
    setModal(true);
  }

  function handleClose() {
    setModal(false);
  }
  function handleSetExperimentName(e) {
    setExperimentName(e.target.value);
  }
  function handleExperimentDescription(e) {
    setExperimentDescription(e.target.value);
  }
  function handleSubmit() {
    api.createExperiment(experimentName, experimentDescription).then(({ response }) => {
      if (response.ok) {
        setSuccessMsg('Experiment created');
        getData();
        handleClose();
      }
    });
  }
  function handleResendExperimentToken(experimentId) {
    api.resendExperimentToken(experimentId).then((response) => {
      if (response.ok) {
        setSuccessMsg('Token sent');
      } else {
        setMsg('Error sending token');
      }
    });
  }
  return (
    <div className={isMobile ? styles.page_mobile : styles.page}>
      <div style={{ margin: '5px', width: '230px', maxHeight: '300px' }}>
        <Button onClick={handleCreateExperiment} className={styles.create_experiment}>
          <Add sx={{ color: '#b1b1b1' }} fontSize="large" />
        </Button>
      </div>
      {experiments.length > 0 && experiments.map((experiment) => (
        <div
          className={styles.experiment_box}
          key={experiment.id}
        >
          <div>
            <Typography variant="h5">{experiment.name}</Typography>
            <Typography variant="body1">{experiment.description || ''}</Typography>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={`/experiment/${experiment.id}`}>Details</Link>
            <Button onClick={() => handleResendExperimentToken(experiment.id)}>Resend experiment Token</Button>
          </div>
        </div>
      ))}
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
          position: 'fixed', bottom: '30px', right: '30px', maxWidth: 'calc(100% - 90px)',
        }}
        onClose={() => setSuccessMsg(null)}
        severity="success"
      >
        {successMsg}
      </Alert>
      )}
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            style={{ margin: '5px 0' }}
            onChange={handleSetExperimentName}
            id="experiment-name"
            label="Experiment name"
            variant="outlined"
          />
          <TextField
            style={{ margin: '5px 0' }}
            onChange={handleExperimentDescription}
            id="description"
            label="Description"
            variant="outlined"
          />
          <Button
            style={{ margin: '5px 0' }}
            onClick={handleSubmit}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
