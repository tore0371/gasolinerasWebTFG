import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import Box from '@mui/material/Box';

  const data = {
    labels: ['Estados Unidos', 'Mexico', 'Italia', 'Colombia', 'España'],
    datasets: [
      {
        label: 'Precios',
        backgroundColor: ['#1976d2'],
        borderColor: '#ffffff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(24,118,210,0.2)',
        hoverBorderColor: 'white',
        data: [327.16, 126.19, 60.43, 49.64, 46.72]
      },
    ]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  }

export default function barGraph(){
    return(
      <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
        <Bar data={data} options={opciones} />
      </Box>
    );
}