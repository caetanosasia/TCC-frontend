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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home({ logged }) {
  const [experiments, setExperiments] = useState([]);
  const [msg, setMsg] = useState(null);
  const [modal, setModal] = useState(false);
  const [experimentName, setExperimentName] = useState('');
  const [experimentDescription, setExperimentDescription] = useState('');
  function getData() {
    api.getHomeData().then(({ response, data }) => {
      if (response.ok) {
        console.log(response);
        console.log(data);
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
      setMsg('Sua conta deve ser verificada para poder criar um experimento');
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
        getData();
        handleClose();
      }
    });
  }
  return (
    <div className={window.innerWidth < 820 ? styles.page_mobile : styles.page}>
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
          <div>
            <Link to={`/experiment/${experiment.id}`}>Ver detalhes</Link>
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
            label="Nome do experimento"
            variant="outlined"
          />
          <TextField
            style={{ margin: '5px 0' }}
            onChange={handleExperimentDescription}
            id="description"
            label="Descrição"
            variant="outlined"
          />
          <Button
            style={{ margin: '5px 0' }}
            onClick={handleSubmit}
            variant="contained"
          >
            Criar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Home;
