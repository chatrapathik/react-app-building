import React, { useState, useEffect} from "react"
import { Button } from '@mui/material';
import axios from "axios";
import Grid from '@mui/material/Grid';

import { Card, Stepper, Tabs, SingleSelectDD, JoinCard, QueryCard } from "./../../components"
import CircularProgress from '@mui/material/CircularProgress';
import '../../App.css';


export function Filter(){
  const [step, setStep] = useState(0);
  const [items, setItems] = useState([]);
  const [openCardIdx, setOpenCardIdx] = useState(0);
  const [tab, setTab] = useState("tad")
  const [loader, setLoader] = useState(false)
  const [primaryDB, setPrimaryDB] = useState("tad")
  const [primaryTable, setPrimaryTable] = useState("")
  const [joinsData, setJoinData] = useState({})
  const [filterValues, setFilterData] = useState({})

  const changeStep = (step: any) => {
      setStep(step+1);
  }

  const getAllFilters = (newTab: any) => {
    axios.get(`http://rdb11.micron.com:5050/api/tables/${newTab}`)
      .then((response: any) => {
        setLoader(false);
        setItems(response.data.tables);
      })
      .catch(error => { console.log("Error", error)})
  }

  //Life cycle hook used to make API call
  useEffect(() => {
      //TO uncomments when API call is made
      getAllFilters(tab);
  }, [])

  const changeTab = (tab: any) => {
      setTab(tab);
      setLoader(true);
      setItems([]);
      getAllFilters(tab);
  }

  return (
    <>  
      <Stepper changeStep={changeStep} />
      {loader && <CircularProgress disableShrink /> }
      {step === 1 &&
        <Grid container spacing={3}>
          <Grid item xs={6} md={6}>
            <SingleSelectDD selectedValue={primaryDB} key="primaryDB" onChange={setPrimaryDB} label="Choose Primary DB" reqUrl="" apiType="db"/>
          </Grid>
          <Grid item xs={6} md={6}>
            <SingleSelectDD onChange={setPrimaryTable} selectedValue={primaryTable} key="primaryTable" label="Choose Primary Table" reqUrl={`http://rdb11.micron.com:5050/api/tables/${primaryDB}`} apiType="tables"/>
          </Grid>
        </Grid>
      }
      {step === 2 && <JoinCard  joinsData={joinsData} onAdd={setJoinData} />}
      {step===3 && (<Tabs changeTab={changeTab} tab={tab}/>)}
      {step===3 && items && items.length && (
        <div style={{ width: '90%'}}>
          <div>
            {items.map((item: any, idx: number) => (
              <Card
                table={item}
                openCard={idx === openCardIdx}
                onChange={(id: any) => setOpenCardIdx(id)}
                id={idx}
                dataBase={tab}
                filters={filterValues}
                setFilterData={setFilterData}
              >
              </Card>
            ))}
          </div>
        </div>
      )}
      {step===4 && <QueryCard queryData={{"filters": filterValues, "joins": Object.values(joinsData), "primary_db": primaryDB, "primary_table": primaryTable}}/>}
    </>
  )
}
