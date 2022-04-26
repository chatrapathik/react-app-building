import React, { useState, useEffect} from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import axios from "axios";

export function DataPreview(props: any) {
  const {query} = props
  const [tableRows, setTableRows] = useState([])
  const [tableHeaders, setTableHeasers] = useState([])

  const getData = () => {
    axios.post(`http://10.70.251.17:5050/api/previewdata`, {"query": query})
    .then((resp: any) => {
        setTableRows(resp.data.data);
        console.log(resp.data.data)
        setTableHeasers(resp.data.headers)
    }).catch(error => { console.log("Error", error)})
  }
  
  //Life cycle hook used to make API call
  useEffect(() => {
    //TO uncomments when API call is made
    getData();
    
  }, [props.query])

  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((column) => (
                <TableCell>
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableRows.map((row, id) => {
                return (
                  <TableRow key={id}>
                    {tableHeaders.map((column: any) => {
                      return (
                        <TableCell>{row[column]}</TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}