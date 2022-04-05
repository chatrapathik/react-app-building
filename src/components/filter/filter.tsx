import React, { useState, useEffect} from "react"
import { Button } from '@mui/material';
import axios from "axios";

import { Card, Stepper, Tabs } from "./../../components"
import SelectInput from "@mui/material/Select/SelectInput";



export function Filter(){

    const [step, setStep] = useState(0);
    const [items, setItems] = useState([]);
    const [openCardIdx, setOpenCardIdx] = useState(0);

    const changeStep = (step: any) => {
        setStep(step+1);
    }

    const getAllFilters = () => {
        const selectedCard = items && items[openCardIdx] || "tad"
        axios.get(`http://rdb11.micron.com:5050/api/tables/${selectedCard}`)
             .then((response: any) => {
                setItems(response.data.tables);
             })
             .catch(error => { console.log("Error", error)})
    }

    const getColumns = (idx: any) => {
        var table = items[idx.idx]
        var url = `http://rdb11.micron.com:5050/api/column/tad/${table}`
        console.log("Url is", url)
        // return []
        axios.get(url)
          .then((response: any) => {
            return response.data.columns
        }).catch(error => { console.log("Error", error)})
    }


    //Life cycle hook used to make API call
    useEffect(() => {
        //TO uncomments when API call is made
        getAllFilters();
    }, [])

    return (
        <>
            <Tabs />
            <Stepper changeStep={changeStep} />
            {items && items.length && (
                <div style={{ width: '90%'}}>
                    {items.map((item: any, idx: number) => (
                        <Card
                            title={item}
                            openCard={idx === openCardIdx}
                            onChange={(id: any) => setOpenCardIdx(id)}
                            id={idx}
                            columns={getColumns({idx})}
                        >
                        </Card>
                    ))}
                </div>
            )}
        </>
    )
}
