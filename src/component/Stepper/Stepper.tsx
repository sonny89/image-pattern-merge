import React from 'react';

import styles from './Stepper.module.css';

const FIRST_STEP = 0;

export interface StepperProps {};

const Stepper: React.FC<React.PropsWithChildren<StepperProps>> = ({ children }) => {
    const [currentStep, setCurrentStep] = React.useState(FIRST_STEP);

    const isFirstStep = currentStep === FIRST_STEP;
    const isLastStep = React.Children.count(children) === currentStep + 1;

    const onPrevClick = React.useCallback(() => {
        setCurrentStep((step) => step - 1);
    }, [setCurrentStep]);

    const onNextClick = React.useCallback(() => {
        setCurrentStep((step) => step + 1);
    }, [setCurrentStep]);

    return (
        <div>
            <div>Current step: {currentStep}</div>
            {!isFirstStep && <button onClick={onPrevClick}>Back</button>}
            {!isLastStep && <button onClick={onNextClick}>Next</button>}
            {React.Children.toArray(children)[currentStep]}
        </div>
    )

}

export default Stepper;