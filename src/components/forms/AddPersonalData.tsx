import { useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useFormContext } from "react-hook-form";
import DatePicker, { Value } from "react-multi-date-picker";
import { Buttons } from "../UI";

interface AddPersonalDataProps {
  nextStep: () => void;
}

const AddPersonalData: React.FC<AddPersonalDataProps> = ({ nextStep }) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const [selectedDate, setSelectedDate] = useState<Value | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [nationalCode, setNationalCode] = useState<string>("");

  const handleDateChange = (date: Value) => {
    setSelectedDate(date);
    setValue("birthDate", date?.format());
  };

  const numChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setFunc(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap justify-start gap-4 mt-6">
        {/* first name */}
        <div className="input-group">
          <label htmlFor="firstName" className="label">
            نام
          </label>
          <input
            type="text"
            id="firstName"
            className={`input ${errors.firstName && "input-error"}`}
            {...register("firstName", { required: true })}
          />
          {errors.firstName && <p className="error">{errors.firstName.message}</p>}
        </div>

        {/* last name */}
        <div className="input-group">
          <label htmlFor="lastName" className="label">
            نام خانوادگی
          </label>
          <input
            type="text"
            id="lastName"
            className={`input ${errors.lastName && "input-error"}`}
            {...register("lastName", { required: true })}
          />
          {errors.lastName && <p className="error">{errors.lastName.message}</p>}
        </div>

        {/* birth date */}
        <div className="input-group mt-2">
          <label htmlFor="birthDate" className="label">
            تاریخ تولد
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            value={selectedDate}
            placeholder="تاریخ تولد خود را انتخاب کنید"
            onChange={handleDateChange}
            name="birthDate"
            id="birthDate"
            style={{
              outline: "none",
              border: "2px solid #2073df",
              padding: "0.25rem",
              paddingInline: "0.5rem",
              borderRadius: "6px",
              width: "100%",
              height: "40px",
            }}
          />
          {errors.birthDate && <p className="error">{errors.birthDate.message}</p>}
        </div>

        {/* phone number */}
        <div className="input-group mt-2">
          <label htmlFor="phoneNumber" className="label">
            شماره تماس
          </label>
          <input
            type="tel"
            id="phoneNumber"
            className={`input ${errors.phoneNumber && "input-error"}`}
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={11}
            value={phone}
            onInput={(e) => numChangeHandler(e, setPhone)}
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber.message}</p>}
        </div>

        {/* national code */}
        <div className="flex flex-col gap-2 items-start w-full mt-2">
          <label htmlFor="nationalCode" className="label">
            کد ملی
          </label>
          <input
            type="text"
            id="nationalCode"
            className={`input ${errors.nationalCode && "input-error"}`}
            inputMode="numeric"
            maxLength={10}
            onInput={(e) => numChangeHandler(e, setNationalCode)}
            value={nationalCode}
            {...register("nationalCode", { required: true })}
          />
          {errors.nationalCode && <p className="error">{errors.nationalCode.message}</p>}
        </div>
      </div>
      {/* buttons */}
      <Buttons nextStep={nextStep} />
    </>
  );
};

export default AddPersonalData;
