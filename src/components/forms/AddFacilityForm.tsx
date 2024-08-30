import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { steps } from "../../constants/steps";
import { bankAccountDataSchema, personalDataSchema } from "../../validations";
import { CardSlider, Stepper } from "../UI";
import { AddBankAccountData, AddPersonalData, FacilitySelection } from "./";

type PersonalData = {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  nationalCode: string;
};

type BankAccountData = {
  bankAccountNumber: string;
  averageBalance: string;
  shabaNumber: string;
};

type FormData = PersonalData | BankAccountData;

const AddFacilityForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const notify = () =>
    toast.success("با موفقیت ثبت شد", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  //   const schema = currentStep === 1 ? personalDataSchema : currentStep === 2 ? bankAccountDataSchema : undefined;
  const resolver: Resolver<FormData> | undefined =
    currentStep === 1
      ? (yupResolver(personalDataSchema) as Resolver<PersonalData>)
      : currentStep === 2
      ? (yupResolver(bankAccountDataSchema) as Resolver<BankAccountData>)
      : undefined;

  //   const methods = useForm<FormData>({
  //     mode: "onBlur",
  //     resolver: schema ? yupResolver(schema) : undefined,
  //   });
  const methods = useForm<FormData>({
    mode: "onBlur",
    resolver,
  });

  const { handleSubmit, trigger } = methods;

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid && currentStep !== steps.length) setCurrentStep((prev) => prev + 1);
  };

  const backStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const submitHandler = (data: FormData) => {
    notify();
    const facilitiesList = JSON.parse(localStorage.getItem("facilities") || "[]") as FormData[];
    facilitiesList.push(data);

    localStorage.setItem("facilities", JSON.stringify(facilitiesList));
    console.log("Form submitted:", data);
    console.log("Facilities list saved to localStorage:", facilitiesList);
  };

  return (
    <>
      <ToastContainer />

      <div className="flex items-center mb-4 gap-4 w-full">
        <div className="rounded-lg border-2 border-muted border-solid py-8 px-6 w-full lg:w-3/5 relative backdrop-blur-xl overflow-hidden">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <h2 className="text-center font-semibold text-2xl mb-10 leading-normal">
                افزودن تسهیلات در
                <span className="text-nowrap text-primary font-bold"> بلو بانک</span>
              </h2>
              {/* stepper */}
              <Stepper steps={steps} currentStep={currentStep} />

              {/* forms */}
              {currentStep === 1 && <AddPersonalData nextStep={nextStep} />}
              {currentStep === 2 && <AddBankAccountData nextStep={nextStep} backStep={backStep} />}
              {currentStep === 3 && <FacilitySelection nextStep={nextStep} backStep={backStep} />}
            </form>
          </FormProvider>
        </div>
        <div className="hidden lg:block w-2/5">
          <CardSlider />
        </div>
      </div>
    </>
  );
};

export default AddFacilityForm;
