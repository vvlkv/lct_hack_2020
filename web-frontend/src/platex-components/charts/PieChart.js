import React from 'react';
import { Pie } from '@reactchartjs/react-chart.js';

const data = {
    labels: ['Каменщик', 'Монтажник', 'Прораб', 'Электрик', 'Бригадир', 'Диспетчер'],
    datasets: [
        {
            label: '# of Votes',
            data: [0, 1, 2, 1, 0, 0],
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

export default function PieChart(){
    return (
        <React.Fragment>
            <div  style={{margin: "1em"}}className='header'>
                <h5 className='title'>Специализации рабочих</h5>
             </div>
             <Pie data={data} />
        </React.Fragment>
    );
}


