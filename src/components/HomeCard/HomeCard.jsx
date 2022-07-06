import React from 'react';
import ReactECharts from 'echarts-for-react';
import { format, parseISO } from 'date-fns';
import styles from './styles.module.css';

function HomeCard({ data, selectedDimension }) {
  function getOption() {
    return {
      color: ['#526a7e'],
      xAxis: {
        type: 'category',
        data: data[selectedDimension].data.map((item) => format(parseISO(item.updatedAt), 'dd/MM/yy HH:mm')),
      },
      yAxis: {
        type: 'value',
        // axisLabel: {
        //   formatter: (item) => `${item}${config.formatter ? config.formatter : ''}`,
        // },
      },
      tooltip: {
        trigger: 'axis',
        // formatter: `${config.name}:  {c}${config.formatter ? config.formatter : ''} <br/> {b}`,
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
    <div className={styles.card_main}>
      <div className={styles.card_header}>
        <h1>{selectedDimension}</h1>
      </div>
      <div className={styles.link_container}>
        <ReactECharts
          option={getOption()}
          notMerge
          style={{ height: 'calc( 100% - 40px)' }}
          lazyUpdate
          theme="theme_name"
        />
      </div>
    </div>
  );
}

export default HomeCard;
