import React, { useState } from 'react';
import styles from './styles.module.css';
import {Link, Route, BrowserRouter as Router, Switch} from "react-router-dom";
import Home from "./Home";
import ScientistImage from "../assets/img/scientist.png";
import Footer from "../components/Footer/Footer";
import {Button} from "@material-ui/core";
import {api} from "../api/api";
import {CircularProgress} from "@mui/material";

function Layout() {
    const [modalState, setModalState] = useState({loading: false, active: false, error: false});

    function toggleModal() {
        setModalState({...modalState, active: !modalState.active});
    }

    async function deleteData() {
        setModalState({...modalState, loading: true })
        const a = await api.dropTable();
        if(a) {
            document.location.reload(true)
        } else {
            setModalState({...modalState, loading: false, error: "algum erro ocorreu" })
        }
    }

    return (
        <div className={styles.app_wrapper}>
            <Router>
                <div className={styles.all_content}>
                    <div className={styles.header_main}>
                        <div className={styles.title_nav}>
                            <div>
                                <h1 className={window.innerWidth < 820 ? styles.cheap_scientist_mobile :styles.cheap_scientist}>Science</h1>
                            </div>
                            <div className={styles.nav_main}>
                                <Link className={styles.nav_item} to="/inicio">INÍCIO</Link>
                                <Button onClick={toggleModal}>
                                    <i className="fas fa-trash" style={{ fontSize: '34px'}}></i>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.main_content}>
                        <Switch>
                            <Route path="/">
                                <Home />
                            </Route>
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
            {modalState.active && (
                <>
                    {!modalState.loading && !modalState.error && (<>
                        <div className={styles.modal}>
                            <div className={styles.modal_phrase}>Deseja deletar os dados do banco de dados?</div>
                            <div className={styles.modal_buttons}>
                                <Button onClick={deleteData} className={styles.confirm_button}>Sim</Button>
                                <Button onClick={toggleModal}>Não</Button>
                            </div>
                        </div>
                    </>)}
                    {modalState.error && (<>
                        <div className={styles.modal}>
                            <div className={styles.modal_phrase}>{modalState.error}</div>
                        </div>
                    </>)}
                    {modalState.loading && (<>
                        <div className={styles.modal}>
                            <CircularProgress />
                        </div>
                    </>)}
                    <div className={styles.to_close_modal} onClick={toggleModal} />
                </>
            )}
        </div>
    );
}

export default Layout;
