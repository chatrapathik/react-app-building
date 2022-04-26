import React, { useState, useEffect} from "react"
import axios from "axios";

import { Card, Stepper, Tabs, JoinCard, QueryCard, DataPreview } from "./../../components"
import CircularProgress from '@mui/material/CircularProgress';
import '../../App.css';


export function Filter(){
  const [step, setStep] = useState(0);
  const [items, setItems] = useState([]);
  const [openCardIdx, setOpenCardIdx] = useState(0);
  const [tab, setTab] = useState("tad")
  const [loader, setLoader] = useState(false)
  const defaultId = new Date().getTime()
  const [joinsData, setJoinData] = useState({[defaultId]: {}})
  const [filterValues, setFilterData] = useState({})
  const [sqlQuery, setSQLQuery] =  useState("")

  const changeStep = (step: any) => {
      let newStep = step+1;
      setStep(newStep);
      if (newStep === 5){
        setJoinData({[defaultId]: {}})
      }
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
  }, [joinsData])

  const changeTab = (tab: any) => {
      setTab(tab);
      setLoader(true);
      setItems([]);
      getAllFilters(tab);
  }

  const filterJoinData = () =>{
    var newJoinData: any = []
    Object.values(joinsData).map((item: any) => {
      if (Object.keys(item).length > 0){
        newJoinData.push(item)
      }
    });
    return newJoinData;
  }

  return (
    <>
      <Stepper changeStep={changeStep} />
      {loader && <CircularProgress disableShrink /> }
      {step === 1 && <JoinCard  joinsData={joinsData} onAdd={setJoinData} />}
      {step===2 && (<Tabs changeTab={changeTab} tab={tab}/>)}
      {step===2 && items && items.length && (
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
      {step===3 && <QueryCard sqlQuery={sqlQuery} setSQLQuery={setSQLQuery} queryData={{"filters": filterValues, "joins": filterJoinData() }}/>}
      {step===4 && <DataPreview query={sqlQuery} />}
    </>
  )
}
