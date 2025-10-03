import React, { Fragment } from 'react';
import { CheckIcon } from 'lucide-react';
interface Step {
  id: string;
  label: string;
}
interface StepperProps {
  steps: Step[];
  currentStep: number;
}
export const Stepper = ({
  steps,
  currentStep
}: StepperProps) => {
  return <div className="flex items-center w-full">
      {steps.map((step, index) => {
      const isCompleted = index < currentStep;
      const isCurrent = index === currentStep;
      return <Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${isCompleted ? 'bg-indigo-600 border-indigo-600 dark:bg-indigo-500 dark:border-indigo-500' : isCurrent ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' : 'border-gray-300 text-gray-400 dark:border-gray-600'}`}>
                {isCompleted ? <CheckIcon className="h-4 w-4 text-white" /> : <span className="text-sm">{index + 1}</span>}
              </div>
              <span className={`mt-1 text-xs ${isCurrent ? 'font-medium text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${index < currentStep ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`} />}
          </Fragment>;
    })}
    </div>;
};