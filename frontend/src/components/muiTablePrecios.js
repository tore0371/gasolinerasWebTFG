import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';



export default function CustomTable({ rows, title }) {
  return (
    <Box>
      <Typography sx={{textAlign:"center", fontWeight:"bold", fontSize:"20px", mt:"1%"}}>{title}</Typography>
      <TableContainer component={Paper} sx={{mt:"2%"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Provincia</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Municipio</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Localidad</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold", paddingRight:"2.5%"}}>Dirección</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>CP</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Rotulo</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Gasoleo A</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Gasoleo B</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Gasoleo Premium</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Gasolina 95 E5</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Gasolina 98 E5</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{fontWeight:"bold"}}>
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right" sx={{paddingRight:"2.5%"}}>{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                </Box>
  );
}
