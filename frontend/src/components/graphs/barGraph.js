import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import Box from '@mui/material/Box';



export default function BarGraph({rows}){
  const data = {
    labels: rows.map((row) => (row[0])),
    datasets: [
      {
        label: 'Gasolina 95',
        backgroundColor: 'rgb(0, 0, 139)',
        data: rows.map((row) => (row[1])),
      },
      {
        label: 'Gasolina 98',
        backgroundColor: 'rgb(25, 25, 172)',
        data: rows.map((row) => (row[2])),
      },
      {
        label: 'Gasoleo A',
        backgroundColor: 'rgb(65, 105, 225)',
        data: rows.map((row) => (row[3])),
      },
      {
        label: 'Gasoleo B',
        backgroundColor: 'rgb(70, 130, 180)',
        data: rows.map((row) => (row[4])),
      },
      {
        label: 'Gasoleo Premium',
        backgroundColor: 'rgb(135, 206, 235)',
        data: rows.map((row) => (row[5]))
      }
    ]
  };
  
  
    const opciones = {
      maintainAspectRatio: false,
      responsive: true
    }

    return(
      <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
        <Bar data={data} options={opciones} />
      </Box>
    );
}