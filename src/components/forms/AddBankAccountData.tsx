import { FormEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Buttons } from "../UI";

interface AddBankAccountDataProps {
  nextStep: () => void;
  backStep?: () => void;
}

interface FormValues {
  bankAccountNumber: string;
  averageBalance: string;
  shabaNumber: string;
}

const AddBankAccountData: React.FC<AddBankAccountDataProps> = ({ nextStep, backStep }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  const [shaba, setShaba] = useState<string>("");
  const [bankAccount, setBankAccount] = useState<string>("");

  const numChangeHandler = (e: FormEvent<HTMLInputElement>, setFunc: React.Dispatch<React.SetStateAction<string>>) => {
    const target = e.target as HTMLInputElement;
    target.value = target.value.replace(/[^0-9]/g, "");
    setFunc(target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap justify-start gap-4 mt-6">
        {/* bank account number */}
        <div className="input-group">
          <label htmlFor="bankAccountNumber" className="label">
            شماره حساب
          </label>
          <input
            type="text"
            id="bankAccountNumber"
            className={`input ${errors.bankAccountNumber && "input-error"}`}
            maxLength={16}
            value={bankAccount}
            onInput={(e) => numChangeHandler(e, setBankAccount)}
            {...register("bankAccountNumber", { required: true })}
          />
          {errors.bankAccountNumber && <p className="error">{errors.bankAccountNumber.message}</p>}
        </div>

        {/* average annual account balance */}
        <div className="input-group">
          <label htmlFor="averageBalance" className="label">
            میانگین ریالی موجودی سالیانه
          </label>
          <input
            type="text"
            id="averageBalance"
            className={`input ${errors.averageBalance && "input-error"}`}
            {...register("averageBalance", { required: true })}
          />
          {errors.averageBalance && <p className="error">{errors.averageBalance.message}</p>}
        </div>

        {/* shaba number */}
        <div className="input-group flex-1 mt-2">
          <label htmlFor="shabaNumber" className="label">
            شماره شبا
          </label>
          <input
            type="text"
            id="shabaNumber"
            maxLength={24}
            value={shaba}
            onInput={(e) => numChangeHandler(e, setShaba)}
            className={`input ${errors.shabaNumber && "input-error"}`}
            {...register("shabaNumber", { required: true })}
          />
          {errors.shabaNumber && <p className="error">{errors.shabaNumber.message}</p>}
        </div>
      </div>

      {/* buttons */}
      <Buttons nextStep={nextStep} backStep={backStep} />
    </>
  );
};

export default AddBankAccountData;
