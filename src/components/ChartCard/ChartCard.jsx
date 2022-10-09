import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import DownloadIcon from '@mui/icons-material/Download';
import { Button } from '@mui/material';
import { format, parseISO } from 'date-fns';
import styles from './styles.module.css';

function ChartCard({ data, selectedDimension }) {
  const [isMobile] = useState(window.innerWidth < 768);
  function downloadCSV() {
    const cloneData = JSON.parse(JSON.stringify(data));
    console.log(data[selectedDimension]);
    const csv = `data:text/csv;charset=utf-8,${
      cloneData[selectedDimension].data.map((row, i) => {
        console.log(row);
        const formattedRow = row;
        delete formattedRow.id;
        formattedRow[selectedDimension] = formattedRow.value;
        delete formattedRow.value;
        let newRow = Object.values(row);
        newRow = newRow.join(';');
        if (i === 0) {
          newRow = `${Object.keys(formattedRow).join(';')}
${newRow}`;
        }
        return newRow;
      }).join('\r\n')}`;
    const encodedUri = encodeURI(csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedDimension}.csv`);
    document.body.appendChild(link);
    link.click();
  }
  function getOption() {
    return {
      color: ['#526a7e'],
      xAxis: {
        type: 'category',
        data: data[selectedDimension].data.map((item) => format(parseISO(item.updatedAt), 'dd/MM/yy HH:mm')),
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'axis',
      },
      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100,
          fillerColor: '#526a7e',
        },
        {
          start: 0,
          end: 20,
        },
      ],
      series: [
        {
          data: data[selectedDimension].data.map((item) => item.value),
          type: 'line',
        },
      ],
    };
  }
  return (
    <div className={isMobile ? styles.card_main_mobile : styles.card_main}>
      <div className={styles.card_header}>
        <p style={{ fontSize: '30px', margin: '0 0 0 0' }}>{selectedDimension}</p>
        <Button onClick={downloadCSV}><DownloadIcon /></Button>
      </div>
      <div className={styles.link_container}>
        <ReactECharts
          option={getOption()}
          notMerge
          style={{
            height: 'calc( 100% - 40px)',
            maxWidth: `calc(100% - ${isMobile ? '20px' : '40px'})`,
            padding: isMobile && '0 0 10px 0',
          }}
          lazyUpdate
          theme="theme_name"
        />
      </div>
    </div>
  );
}

export default ChartCard;
