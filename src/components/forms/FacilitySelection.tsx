import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { data as facilities } from "../../constants/data.json";
import { convertToPersian } from "../../utils";
import { Buttons, FacilityItem, Modal } from "../UI";

interface Facility {
  name: string;
  amount: number;
  penaltyRate: number;
  repaymentType: number;
  percentageRate: number;
  interestRate: string | number;
  penaltyPrice: number;
  interestPrice: number;
  monthlyInstallment: number;
}

interface SelectedFacility {
  facilityId: string;
  repaymentType: number;
}

interface FacilitySelectionProps {
  nextStep: () => void;
  backStep?: () => void;
}

const FacilitySelection: React.FC<FacilitySelectionProps> = ({ nextStep, backStep }) => {
  const { setValue } = useFormContext();
  const [toggleModal, setToggleModal] = useState(false);

  const [selectedFacility, setSelectedFacility] = useState<SelectedFacility>({
    facilityId: facilities[0].id,
    repaymentType: facilities[0].repaymentType[0].value,
  });

  const [facility, setFacility] = useState({
    name: facilities[0].name,
    amount: facilities[0].amount,
    penaltyRate: facilities[0].penaltyRate,
    repaymentType: facilities[0].repaymentType[0].value,
    percentageRate: facilities[0].percentageRate || "",
    interestRate: facilities[0].interestRate || "",
    penaltyPrice: (facilities[0].amount * facilities[0].penaltyRate) / 100,
    interestPrice: ((facilities[0].interestRate ?? facilities[0].percentageRate) * facilities[0].amount) / 100,
    monthlyInstallment: Math.round(
      (((facilities[0].interestRate ?? facilities[0].percentageRate) / 100) * facilities[0].amount +
        facilities[0].amount) /
        facilities[0].repaymentType[0].value
    ),
  });

  useEffect(() => {
    setValue("facilityName", facility.name);
    setValue("amount", facility.amount);
    setValue("facilityId", selectedFacility.facilityId);
    setValue("repaymentType", facility.repaymentType);
    setValue("penaltyRate", facility.penaltyRate);
    setValue("percentageRate", facility.percentageRate || "");
    setValue("interestRate", facility.interestRate || "");
    setValue("penaltyPrice", facility.penaltyPrice);
    setValue("interestPrice", facility.interestPrice);
    setValue("monthlyInstallment", facility.monthlyInstallment);
  }, []);

  const setRepaymentTypeData = (data: (typeof facilities)[0], type: { value: number }) => {
    setSelectedFacility({
      facilityId: data.id,
      repaymentType: type.value,
    });

    const updatedFacility: Facility = {
      name: data.name,
      amount: data.amount,
      penaltyRate: data.penaltyRate,
      repaymentType: type.value,
      percentageRate: data.percentageRate ?? 0,
      interestRate: data.interestRate ?? 0,
      penaltyPrice: (data.amount * data.penaltyRate) / 100,
      interestPrice: ((data.interestRate ?? data.percentageRate ?? 0) * data.amount) / 100,
      monthlyInstallment: Math.round(
        (((data.interestRate ?? data.percentageRate ?? 0) / 100) * data.amount + data.amount) / type.value
      ),
    };

    setFacility(updatedFacility);

    console.log(facility);

    // update form values
    setValue("facilityName", data.name);
    setValue("amount", data.amount);
    setValue("facilityId", data.id);
    setValue("repaymentType", type.value);
    setValue("penaltyRate", data.penaltyRate);
    setValue("percentageRate", data.percentageRate || "");
    setValue("interestRate", data.interestRate || "");
    setValue("penaltyPrice", (data.amount * data.penaltyRate) / 100);
    setValue("interestPrice", updatedFacility.interestPrice);
    setValue("monthlyInstallment", updatedFacility.monthlyInstallment);

    setToggleModal(false);
  };

  const calculateMonthlyPayment = (
    amount: number,
    months: number,
    interestRate: number,
    percentageRate: number
  ): string => {
    const facilitiesInstallment = Math.round((((interestRate || percentageRate) / 100) * amount + amount) / months);
    return convertToPersian(facilitiesInstallment);
  };

  return (
    <>
      <div className="flex flex-wrap justify-start gap-4 mt-6">
        {/* facility selection */}
        <div className="flex flex-col gap-2 items-start w-full relative">
          <label htmlFor="facilitySelection" className="label">
            انتخاب نوع تسهیلات
          </label>
          <div className="relative w-full">
            {toggleModal ? (
              <FaChevronDown className="absolute top-1/2 right-4 -translate-y-1/2 h-3 w-3" />
            ) : (
              <FaChevronLeft className="absolute top-1/2 right-4 -translate-y-1/2 h-3 w-3" />
            )}
            <input
              type="text"
              name="facilitySelection"
              id="facilitySelection"
              className="outline-none border-2 border-solid border-secondary px-2 py-1 rounded-md w-full h-[48px] ps-8 cursor-pointer bg-white hover:bg-[#f8f9fa]"
              onClick={() => setToggleModal(!toggleModal)}
              value={facility.name}
              readOnly
            />
          </div>
          {toggleModal && (
            <Modal onClose={() => setToggleModal(false)}>
              <div className="w-full flex flex-col bg-[#f8f9fa] rounded-xl max-h-[80vh] overflow-y-scroll overflow-x-hidden">
                {facilities?.map((item, index) => (
                  <FacilityItem
                    key={index}
                    index={index}
                    facilities={facilities}
                    item={item}
                    selectedFacility={selectedFacility}
                    setRepaymentTypeData={setRepaymentTypeData}
                  />
                ))}
              </div>
            </Modal>
          )}
        </div>

        {/* amount */}
        <div className="input-group">
          <label htmlFor="price" className="label">
            مبلغ
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={`${convertToPersian(facility.amount)} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* repayment period */}
        <div className="input-group">
          <label htmlFor="repaymentPeriod" className="label">
            مدت زمان بازپرداخت
          </label>
          <input
            type="text"
            name="repaymentPeriod"
            id="repaymentPeriod"
            value={`${convertToPersian(facility.repaymentType)} ماهه`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* number of installments */}
        <div className="input-group mt-2">
          <label htmlFor="numberOfInstallments" className="label">
            تعداد اقساط
          </label>
          <input
            type="text"
            name="numberOfInstallments"
            id="numberOfInstallments"
            value={convertToPersian(facility.repaymentType)}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* monthly installment amount */}
        <div className="input-group mt-2">
          <label htmlFor="installmentAmount" className="label">
            مبلغ قسط ماهیانه
          </label>
          <input
            type="text"
            name="installmentAmount"
            id="installmentAmount"
            value={`${calculateMonthlyPayment(
              facility.amount,
              facility.repaymentType,
              facility.interestRate,
              facility.percentageRate
            )} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* annual interest percentage */}
        <div className="input-group mt-2">
          <div className="flex gap-2 flex-nowrap">
            <label htmlFor="annualInterestPercentage" className="label">
              مبلغ سود سالیانه
            </label>
            <span className="text-[#35AD8B] bg-[#E0F0ED] px-2 rounded-md">{`${
              facility.interestRate || facility.percentageRate
            }%`}</span>
          </div>
          <input
            type="text"
            name="annualInterestPercentage"
            id="annualInterestPercentage"
            value={`${convertToPersian(
              ((facility.interestRate || facility.percentageRate) * facility.amount) / 100
            )} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>

        {/* late fine amount */}
        <div className="input-group mt-2">
          <div className="flex gap-2 flex-nowrap">
            <label htmlFor="lateFineAmount" className="label">
              مبلغ جریمه دیرکرد
            </label>
            <span className="text-[#BC102B] bg-[#F1DCE1] px-2 rounded-md">{`${facility.penaltyRate}%`}</span>
          </div>
          <input
            type="text"
            name="lateFineAmount"
            id="lateFineAmount"
            value={`${convertToPersian((facility.amount * facility.penaltyRate) / 100)} ریال`}
            className="readonly-input"
            readOnly
          />
        </div>
      </div>

      {/* buttons */}
      <Buttons nextStep={nextStep} backStep={backStep} submit />
    </>
  );
};

export default FacilitySelection;
