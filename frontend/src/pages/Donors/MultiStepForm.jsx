import React, { useState } from 'react';
import SelectFoodBank from './SelectDonateBank';
import PersonalDetails from './Personal';
import BusinessDetails from './Business';
import SelectItems from './SelectItems';

const MultiStepForm = () => {

    const FormList = [SelectFoodBank, PersonalDetails, BusinessDetails, SelectItems];

    const [step, setStep] = useState(0);

    const formLength = FormList.length;

    const handleBack = () => {
        setStep(step === 0 ? formLength - 1 : step - 1);
    }

    const handleNext = () => {
        setStep(step === formLength - 1 ? 0 : step + 1);
    }
  
    console.log(step);

    const handleForm = () => {
        switch (step) {
            case 0: {
                return <SelectFoodBank />;
            }
            case 1: {
                return <PersonalDetails />;
            }
            case 2: {
                return <BusinessDetails />;
            }
            case 3: {
                return <SelectItems />;
            }
        }
    };
    return (
        
        <div className="multi-step-form ">
            <div>

            </div>
            <div>
            {handleForm()}
            <button  className="btn btn-outline-dark w-28 mr-4" onClick={handleBack}>Prev</button>
            <button  className="btn btn-outline-dark w-28 mr-4" onClick={handleNext}>Next</button>
            </div>
            
        </div>
    );
    
}

export default MultiStepForm;