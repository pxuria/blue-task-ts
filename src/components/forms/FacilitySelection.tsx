import { useCallback, useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronDown, FaChevronLeft } from "react-icons/fa6";
import { BASE_URL } from "../../../config.json";
import { data as facilities } from "../../constants/data.json";
import { convertToPersian } from "../../utils";
import { Buttons, FacilityItem, Modal } from "../UI";

interface Facility {
  id: string;
  name: string;
  amount: number;
  penaltyRate: number;
  repaymentType: RepaymentType[];
  percentageRate?: number;
  interestRate?: number | string;
  months: number;
}

interface RepaymentType {
  name: string;
  value: number;
}

interface FacilityState {
  name: string;
  amount: number;
  penaltyRate: number;
  repaymentType: number | string;
  percentageRate?: number;
  interestRate?: number;
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
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const [facilityOptionList, setFacilityOptionList] = useState([]);

  const initialFacility = facilities[0] || {};
  const initialRepaymentType = initialFacility.repaymentType ? initialFacility.repaymentType[0]?.value : 0;

  const [selectedFacility, setSelectedFacility] = useState<SelectedFacility>({
    facilityId: initialFacility.id,
    repaymentType: initialRepaymentType,
  });

  useEffect(() => {
    const fetchFacilities = async () => {
      const res = await fetch(`${BASE_URL}/api/facility-types`);
      const fetchedData = await res.json();
      const data = await fetchedData.data;
      setFacilityOptionList(data);
    };
    console.log(facilityOptionList);
    fetchFacilities();
  }, []);

  const calculateFacilityDetails = useCallback(
    (facility: Facility, repaymentTypeValue: number | string): FacilityState => {
      const amount = facility.amount;
      const penaltyRate = facility.penaltyRate;
      const interestRate =
        typeof facility.interestRate === "string" ? parseFloat(facility.interestRate) : facility.interestRate || 0;
      const percentageRate = facility.percentageRate || 0;

      const rate = interestRate || percentageRate;

      const penaltyPrice = (amount * penaltyRate) / 100;
      const interestPrice = (rate * amount) / 100;
      const monthlyInstallment = Math.round(((rate / 100) * amount + amount) / (repaymentTypeValue as number));

      return {
        name: facility.name,
        amount: amount,
        penaltyRate: penaltyRate,
        repaymentType: repaymentTypeValue,
        percentageRate: percentageRate,
        interestRate: interestRate,
        penaltyPrice: penaltyPrice,
        interestPrice: interestPrice,
        monthlyInstallment: monthlyInstallment,
      };
    },
    []
  );

  // Initialize facility state
  const [facility, setFacility] = useState<FacilityState>(
    calculateFacilityDetails(initialFacility, initialRepaymentType)
  );

  // Function to update form values
  const updateFormValues = useCallback(
    (facilityDetails: FacilityState) => {
      setValue("facilityName", facilityDetails.name);
      setValue("amount", facilityDetails.amount);
      setValue("facilityId", selectedFacility.facilityId);
      setValue("repaymentType", facilityDetails.repaymentType);
      setValue("penaltyRate", facilityDetails.penaltyRate);
      setValue("percentageRate", facilityDetails.percentageRate || "");
      setValue("interestRate", facilityDetails.interestRate || "");
      setValue("penaltyPrice", facilityDetails.penaltyPrice);
      setValue("interestPrice", facilityDetails.interestPrice);
      setValue("monthlyInstallment", facilityDetails.monthlyInstallment);
    },
    [setValue, selectedFacility.facilityId]
  );

  // Update form values when facility state changes
  useEffect(() => {
    updateFormValues(facility);
  }, [facility, updateFormValues]);

  // Function to handle repayment type data update
  const setRepaymentTypeData = useCallback(
    (data: Facility, type: RepaymentType) => {
      const updatedFacility = calculateFacilityDetails(data, type.value);

      setSelectedFacility({
        facilityId: data.id,
        repaymentType: type.value,
      });

      setFacility(updatedFacility);

      // Optionally, log the updated facility
      console.log("Updated Facility:", updatedFacility);

      setToggleModal(false);
    },
    [calculateFacilityDetails]
  );

  // Function to calculate monthly payment for display
  const calculateMonthlyPayment = useCallback(
    (amount: number, months: number, interestRate?: number, percentageRate?: number): string => {
      const rate = interestRate || percentageRate || 0;
      const facilitiesInstallment = Math.round(((rate / 100) * amount + amount) / months);
      return convertToPersian(facilitiesInstallment);
    },
    []
  );

  const facilityOptions = useMemo(
    () =>
      facilityOptionList.map((item, index) => (
        <FacilityItem
          key={index}
          index={index}
          facilities={facilityOptionList}
          item={item}
          selectedFacility={selectedFacility}
          setRepaymentTypeData={setRepaymentTypeData}
        />
      )),
    [selectedFacility, setRepaymentTypeData]
  );
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
              onClick={() => setToggleModal((prev) => !prev)}
              value={facility.name}
              readOnly
            />
          </div>
          {toggleModal && (
            <Modal onClose={() => setToggleModal(false)}>
              <div className="w-full flex flex-col bg-[#f8f9fa] rounded-xl max-h-[80vh] overflow-y-scroll overflow-x-hidden">
                {facilityOptions}
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
            value={`${convertToPersian(selectedFacility.repaymentType)} ماهه`}
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
            value={convertToPersian(selectedFacility.repaymentType)}
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
              facility.interestRate as number,
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
              ((selectedFacility?.interestRate || selectedFacility?.percentageRate) * selectedFacility.amount) / 100
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
