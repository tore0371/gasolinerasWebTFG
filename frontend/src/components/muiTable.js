import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@mui/material';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function CustomTable({ rows, title }) {
  return (
    <Box>
      <Typography sx={{textAlign:"center", fontWeight:"bold", fontSize:"20px", mt:"1%"}}>{title}</Typography>
      <TableContainer component={Paper} sx={{mt:"2%"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Calories</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Fat&nbsp;(g)</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Carbs&nbsp;(g)</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold", paddingRight:"2.5%"}}>Protein&nbsp;(g)</TableCell>
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
