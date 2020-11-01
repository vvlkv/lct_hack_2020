import React from 'react'
import { Line } from '@reactchartjs/react-chart.js'

const data = {
    labels: ['26.10', '27.10', '28.10', '29.10', '30.10', '31.10', '1.11'],
    datasets: [
        {
            label: 'Количество рабочих',
            data: [11, 12, 19, 3, 5, 2, 3],
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
    ],
}

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
}

const LineChart = () => (
    <>
        <div className='header'>
            <br/>
            <h5 className='title'>Среднее кол-во рабочих на площадке</h5>
        </div>
        <Line data={data} options={options} />
    </>
)

export default LineChart
