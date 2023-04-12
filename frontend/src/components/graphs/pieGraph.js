import React, { useState, useEffect } from 'react';

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import { Pie } from 'react-chartjs-2'
import Box from '@mui/material/Box';

export default function PieGraph({rows}) {
// console.log("*************")
// console.log(rows[0].name)
// console.log("*************")


const data = {
  labels: rows.map((row) => (row.name)),
  datasets: [{
    label: 'Numero de gasolineras',
    data: rows.map((row) => (row.numero)),
    backgroundColor: [
      'rgb(0, 0, 139)',
      'rgb(25, 25, 172)',
      'rgb(65, 105, 225)',
      'rgb(70, 130, 180)',
      'rgb(135, 206, 235)'

    ],
    hoverOffset: 4
  }]
};

const opciones = {
  maintainAspectRatio: false,
  responsive: true
}
    return (
        <Box sx={{ height: "500px", width: "90%", marginBottom: "20px", marginTop: "2%", marginLeft: "5%", marginRight: "5%" }}>
            <Pie data={data} options={opciones} />
        </Box>


    );
}