import React, { useState } from "react"

import { Card, Stepper } from "./../../components"

export function Filter(){

    const [step, setStep] = useState(0);

    const changeStep = (step: any) => {
        setStep(step+1);
    }

    return (
        <>
            <Stepper changeStep={changeStep} />
            <div>
                {`Step ${step}`}
                <Card />
            </div>
        </>
    )
}