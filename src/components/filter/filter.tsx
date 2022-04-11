import React, { useState, useEffect} from "react"
import { Button } from '@mui/material';
import axios from "axios";

import { Card, Stepper, Tabs } from "./../../components"
import CircularProgress from '@mui/material/CircularProgress';


export function Filter(){

    const [step, setStep] = useState(0);
    const [items, setItems] = useState([]);
    const [openCardIdx, setOpenCardIdx] = useState(0);
    const [tab, setTab] = useState("tad")
    const [loader, setLoader] = useState(false)

    const changeStep = (step: any) => {
        setStep(step+1);
    }

    const getAllFilters = (newTab: any) => {
        console.log("tab name is:   ", newTab)
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
        console.log("new tab name is:   ", tab)
        setTab(tab);
        setLoader(true);
        setItems([]);
        getAllFilters(tab);
    }

    return (
        <>
            <Tabs changeTab={changeTab} tab={tab}/>
            <Stepper changeStep={changeStep} />
            {loader && <CircularProgress disableShrink /> }
            {items && items.length && (
                <div style={{ width: '90%'}}>
                    {items.map((item: any, idx: number) => (
                        <Card
                            table={item}
                            openCard={idx === openCardIdx}
                            onChange={(id: any) => setOpenCardIdx(id)}
                            id={idx}
                            dataBase={tab}
                        >
                        </Card>
                    ))}
                </div>
            )}
        </>
    )
}
