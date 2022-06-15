import React, {useEffect, useState} from 'react';
import HomeCard from "../components/HomeCard/HomeCard";
import styles from './styles.module.css';
import { api } from "../api/api";
import { Button } from '@mui/material';
import {format} from "date-fns";

const Home = () => {
    const [homeValues, setHomeValues] = useState({ data: 'loading', temperatura: 'loading' })

    useEffect(() => {
        getData();
        recursiveFunction();
    }, []);

    async function recursiveFunction() {
        setTimeout(() => {
            getData();
            secondaryRecursiveFunction();
        }, 50000);
    }

    async function secondaryRecursiveFunction() {
        setTimeout(() => {
            getData();
            recursiveFunction();
        }, 50000);
    }

    async function getData() {
        const answer = await api.getHomeData();
        if(!answer || answer.length === 0) return;
        setHomeValues({
            temperatura: `${answer[answer.length-1].temperatura}ºC`,
            data: answer,
        });
    }

    const temperatura = {
        name: 'Temperatura',
        value: homeValues.temperatura,
        varName: 'temperatura',
        formatter: 'ºC'
    }


    function exportData() {
        const { data } = homeValues;
        if(data === 'loading' && data.length === 0) return;
        const csvContent = `data:text/csv;charset=utf-8,${
            data.map((row, i) => {
                console.log(row);
                let formattedRow = row;
                delete formattedRow.id;
                formattedRow.hora = format(row.hora, 'dd/MM/yy hh:mm')
                let newRow = Object.values(row);   
                newRow = newRow.join(';');
                if(i === 0) {
                    newRow = `${Object.keys(formattedRow).join(';')}
                    ${newRow}`
                }
                return newRow;
            }).join('\r\n')}`;
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `data.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);

    }


    return (
        <>
            <div className={window.innerWidth < 820 ? styles.page_mobile :styles.page}>
                <div className={styles.export_button_container}>
                    <Button onClick={exportData} variant="text">
                        <span className={styles.export_button_icon}>
                            <i className="fas fa-file-download"></i>
                        </span>
                    </Button>
                </div>
                <div className={window.innerWidth < 820 ? styles.dual_card_holder_mobile :styles.dual_card_holder}>
                    <HomeCard config={temperatura} data={homeValues.data} />
                </div>
            </div>
        </>
    );
};

export default Home;