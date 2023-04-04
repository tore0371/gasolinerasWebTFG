import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Line } from 'react-chartjs-2'
import Box from '@mui/material/Box';


const data = {
    labels: ['Estados Unidos', 'Mexico', 'Italia', 'Colombia', 'España'],
    datasets: [
        {
            label: 'Precio(L/€) ',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#1976d2',
            tension: 0.1
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
        <Line data={data} options={opciones} />
      </Box>
    );
}