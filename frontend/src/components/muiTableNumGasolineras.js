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
    <Box width={"70%"} sx={{margin: "0 auto", marginTop:"3%", marginBottom:"3%"}}>
      <Typography sx={{textAlign:"center", fontWeight:"bold", fontSize:"20px", mt:"1%"}}>{title}</Typography>
      <TableContainer component={Paper} sx={{mt:"2%"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="right" sx={{paddingRight:"5%", fontWeight:"bold"}}>Número de gasolineras</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row" sx={{fontWeight:"bold",paddingLeft:"5%"}}>
                  {row.name}
                </TableCell>
                <TableCell align="right" sx={{paddingRight:"5%"}}>{row.precio}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                </Box>
  );
}
