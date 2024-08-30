import { ReactNode } from "react";

interface Step {
  icon: ReactNode;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full flex justify-between items-start">
      {steps?.map((item, index) => (
        <div
          key={index}
          className={`step-item ${currentStep === index + 1 ? "active-step" : ""} ${
            index + 1 < currentStep ? "complete-step" : ""
          }`}
        >
          <div className="step">{item.icon}</div>
          <p className="font-medium text-[10px] sm:text-base text-grey mt-2 text-nowrap text-center">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
