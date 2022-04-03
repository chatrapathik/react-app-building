import React, { useState, useEffect} from "react"
import axios from "axios";

import { Card, Stepper, Tabs } from "./../../components"

// To be fetched from API response
const ITEMS = [
    {
        title:"Avinash",
        desc: "Description is too long to render"
    },
    {
        title: "Avinash 2",
        desc: "Description is too long to render"
    },
    {
        title: "Avinash 3",
        desc: "Description is too long to render"
    },
    {
        title: "Avinash 4",
        desc: "Description is too long to render"
    }
]

export function Filter(){

    const [step, setStep] = useState(0);
    const [items, setItems] = useState(ITEMS);
    const [openCardIdx, setOpenCardIdx] = useState(0);

    const changeStep = (step: any) => {
        setStep(step+1);
    }

    const getAllFilters = () => {
        const selectedCard = items && items[openCardIdx] && items[openCardIdx].title || "tad"
        axios.get(`http://10.70.251.216:5050/api/tables/${selectedCard}`)
             .then((response: any) => {
                console.log("response", response);
                setItems(response);
             })
             .catch(error => { console.log("Error", error)})
    }

    //Life cycle hook used to make API call
    useEffect(() => {
        //TO uncomments when API call is made
        //getAllFilters();
    }, [])

    return (
        <>
            <Tabs />
            <Stepper changeStep={changeStep} />
            {items && items.length && (
                <div style={{ width: '90%'}}>
                    {items.map((item: any, idx: number) => (
                        <Card
                            title={item.title}
                            desc={item.desc}
                            openCard={idx === openCardIdx}
                            onChange={(id: any) => setOpenCardIdx(id)}
                            id={idx}
                        />
                    ))}
                </div>
            )}
        </>
    )
}