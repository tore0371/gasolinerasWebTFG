import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import Box from '@mui/material/Box';



const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };


const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }




export default function PieGraph() {
    return (
        <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
            <Pie data={data} options={opciones} />
        </Box>


    );
}