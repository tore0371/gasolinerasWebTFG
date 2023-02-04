import * as React from 'react';
import Paper from '@mui/material/Paper';
import Header from "../layouts/Header"
import Footer from "../layouts/Footer";
import {Pie} from 'react-chartjs-2'
import {Bar} from 'react-chartjs-2'

import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import  Box  from '@mui/material/Box';

export default function Diario(){
  const data={
    labels:['Estados Unidos', 'Mexico', 'Italia', 'Colombia', 'España'],
    datasets:[{
      label:'Habitantes',
      backgroundColor: 'rgb(24,118,210)',
      borderColor: '#ffffff',
      borderWidth: 1,
      hoverBackgroundColor:'rgba(24,118,210,0.2)',
      hoverBorderColor: 'rgb(24,118,210)',
      data: [327.16, 126.19, 60.43, 49.64, 46.72]

    }]
  };

  const opciones={
    maintainAspectRatio: false,
    responsive: true
  }

  return (
    <Box>
      <Header />
      <Box sx={{height:"500px", width:"90%", paddingBottom:"500px" , marginTop:"2%", marginLeft:"5%", marginRight:"5%"}}>
        <Pie data={data} options={opciones}/>
        <Bar data={data} options={opciones}/>

      </Box>
      <Footer/>
    </Box>
  );
};

