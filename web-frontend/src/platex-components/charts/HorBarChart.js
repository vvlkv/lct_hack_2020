import React from 'react'
import { HorizontalBar } from '@reactchartjs/react-chart.js'

const data = {
    labels: ['Падения', 'Удары', 'Низкий пульс', 'Движение по одной траектории', 'COVID', 'SOS'],
    datasets: [
        {
            label: 'Количество событий',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
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

const HorizontalBarChart = () => (
    <>
        <div className='header'>
        <br/>
            <h5 className='title'>События</h5>
        </div>
        <HorizontalBar data={data} options={options} />
    </>
)

export default HorizontalBarChart
