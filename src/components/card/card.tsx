import React, { useState, useEffect} from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { Grid } from '@mui/material';

import { MultipleSelectCheckmarks} from "./../../components"

import axios from "axios";

export function SimpleAccordion(props: any) {
  const {table, desc, openCard, onChange, id, dataBase} = props
  const [columns, setColumns] = useState([]);

  const getColumns = () => {
    let url = `http://rdb11.micron.com:5050/api/column/${dataBase}/${table}`
    // return []
    axios.get(url)
      .then((response: any) => {
        setColumns(response.data.columns)
    }).catch(error => { console.log("Error", error)})
  }

  //Life cycle hook used to make API call
  useEffect(() => {
    //TO uncomments when API call is made
    getColumns();
  }, [])

  return (

    <div>
      <Accordion 
        expanded={openCard}
        style={{ 'border': "1px solid #ccc", margin: "8px 0" }}
        onChange={() => onChange(id)}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{table}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {columns.map((item: any, idx: number) => (
                <MultipleSelectCheckmarks dataBase={dataBase} table={table} column={item.column} columnDisabled={item.filterDisable}></MultipleSelectCheckmarks>
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
