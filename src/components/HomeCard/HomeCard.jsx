import React from 'react';
import styles from './styles.module.css';
import ReactECharts from 'echarts-for-react';
import { format } from 'date-fns';

const HomeCard = ({ data, config }) => {

    function getOption () {
        return {
            color: ['#526a7e'],
            xAxis: {
              type: 'category',
              data: data.map(item => format(item.hora, 'dd/MM/yy HH:mm'))
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: (item) => `${item}${config.formatter ? config.formatter : ''}`
              }
            },
            tooltip: {
                trigger: 'axis',
                formatter: `${config.name}:  {c}${config.formatter ? config.formatter : ''} <br/> {b}`
            },
            dataZoom: [
                {
                  type: 'slider',
                  start: 0,
                  end: 100,
                  fillerColor: '#526a7e'
                },
                {
                  start: 0,
                  end: 20
                }
              ],
            series: [
              {
                data: data.map(item => item[config.varName]),
                type: 'line'
              }
            ]
          }
    }
    return (
        <>
           <div className={styles.card_main}>
               <div className={styles.card_header}>
                   <h1>{config.name}</h1>
                   <div className={styles.value_container}>
                        <div>Tempo real</div>
                        <div className={styles.value_box}>{config.value}</div>
                    </div>
               </div>
               <div className={styles.link_container}>
                    {data !== 'loading' && data.length > 0 &&<ReactECharts
                        option={getOption()}
                        notMerge={true}
                        lazyUpdate={true}
                        theme={"theme_name"}
                    />}
               </div>
           </div>
        </>
    );
};

export default HomeCard;