import React, { useState, useEffect} from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { MultipleSelectCheckmarks} from "./../../components";
import Grid from '@mui/material/Grid';

import axios from "axios";

export function SimpleAccordion(props: any) {
  const {table, openCard, onChange, id, dataBase, filters} = props
  const [columns, setColumns] = useState([]);
  const [filtersData, setFiltersData] = useState(filters);

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

  const onCardSwitch = () => {
    onChange(id);
  }

  const updateFilters = () => {
    let new_obj  = Object.assign(filters, filtersData);
    if ( props.setFiltersData ){
      props.setFiltersData(new_obj)
    }
  }

  return (

    <div>
      <Accordion 
        expanded={openCard}
        style={{ 'border': "1px solid #ccc", margin: "8px 0" }}
        onChange={onCardSwitch}
        >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{table}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Grid container spacing={2}>
            {columns.map((item: any, idx: number) => (
              <Grid item xs={6} md={4}>
                <MultipleSelectCheckmarks updateFilters={updateFilters} onCheck={setFiltersData} filtersData={filtersData} dataBase={dataBase} table={table} column={item.column} columnDisabled={item.filterDisable}></MultipleSelectCheckmarks>
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
