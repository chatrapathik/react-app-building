import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";


export function DBTabs(){
  const [value, setValue] = React.useState('tad');
  const [tables, setItems] = React.useState([]);


  const getAllTables = (db: any) => {
    console.log("Im here", db)
    axios.get(`http://rdb11.micron.com:5050/api/tables/${db}`)
         .then((response: any) => {
            console.log("response is", response)
            setItems(response.data.tables);
            console.log(response.data.tables)

         })
         .catch(error => { console.log("Error", error)})

  }


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(getAllTables(newValue))
  };

  return (
    <Box sx={{ width: '100%', marginBottom: "24px" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        style={{ float: "right" }}
      >
        <Tab value="tad" label="TAD" />
        <Tab value="tad_short" label="TAD SHORT" />
      </Tabs>
    </Box>
  );
}
