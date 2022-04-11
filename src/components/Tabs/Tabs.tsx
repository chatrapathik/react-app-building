import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import axios from "axios";


export function DBTabs(props: any){
  // const [tables, setItems] = React.useState([]);

  // const getAllTables = (db: any) => {
  //   console.log("Im here", db)
  //   axios.get(`http://rdb11.micron.com:5050/api/tables/${db}`)
  //        .then((response: any) => {
  //           setItems(response.data.tables);
  //        })
  //        .catch(error => { console.log("Error", error)})

  // }


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.changeTab(newValue)
  };

  return (
    <Box sx={{ width: '100%', marginBottom: "24px" }}>
      <Tabs
        value={props.tab}
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
