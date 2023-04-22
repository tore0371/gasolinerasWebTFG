import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import Box from '@mui/material/Box';




export default function barGraph({rows}) {

  const data = {
    labels: rows.map((row) => (row[0])),
    datasets: [
      {
        label: 'Gasolina 95',
        data: rows.map((row) => (row[1])),
        fill: false,
        borderColor: 'rgb(0, 0, 139)',
        tension: 0.1
      },
      {
        label: 'Gasolina 98',
        data: rows.map((row) => (row[2])),
        fill: false,
        borderColor: 'rgb(25, 25, 172)',
        tension: 0.1
      }, {
        label: 'Gasoleo A',
        data: rows.map((row) => (row[3])),
        fill: false,
        borderColor: 'rgb(65, 105, 225)',
        tension: 0.1
      }, {
        label: 'Gasoleo B',
        data: rows.map((row) => (row[4])),
        fill: false,
        borderColor: 'rgb(70, 130, 180)',
        tension: 0.1
      }, {
        label: 'Gasoleo Premium',
        data: rows.map((row) => (row[5])),
        fill: false,
        borderColor: 'rgb(135, 206, 235)',
        tension: 0.1
      },
    ]
  };
  
  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }
  console.log(rows.map((row) => (row[4])))

  return (
    <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
      <Line data={data} options={opciones} />
    </Box>
  );
}