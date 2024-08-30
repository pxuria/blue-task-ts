import { useState } from "react";

interface RepaymentType {
  value: string;
  name: number;
}

interface Facility {
  name?: string;
  interestRate?: number;
  percentageRate?: number;
  penaltyRate: number;
  repaymentType?: RepaymentType[];
  amount: number;
  id?: string;
}

interface FacilityItemProps {
  index: number;
  facilities: Facility[];
  item: {
    name?: string;
    interestRate?: number;
    percentageRate?: number;
    penaltyRate?: number;
    repaymentType?: RepaymentType[];
    amount?: number;
    id?: string;
  };
  selectedFacility: {
    repaymentType: string;
    facilityId: string;
  };
  setRepaymentTypeData: (type: RepaymentType) => void;
}

const FacilityItem: React.FC<FacilityItemProps> = ({
  index,
  facilities,
  item,
  selectedFacility,
  setRepaymentTypeData,
}) => {
  const [error, setError] = useState<boolean>(false);

  const setItem = (type: RepaymentType) => {
    setError(false);
    setRepaymentTypeData(type);
  };

  const checkItemAndSelect = () => {
    const foundType = item?.repaymentType?.find((type) => type.value === selectedFacility.repaymentType);

    if (foundType) setItem(foundType);
    else setError(true);
  };

  return (
    <div
      onClick={checkItemAndSelect}
      className={`cursor-pointer py-3 px-4 transition-all ease-in duration-200 border-b borde-solid hover:bg-[#efefef] flex items-center justify-between ${
        facilities?.length !== index + 1 && "border-[#c9c9c9]"
      }`}
    >
      <div className="flex lg:flex-row flex-col lg:items-center items-start gap-4 flex-wrap lg:flex-nowrap">
        <span className="font-bold text-lg text-secondary text-nowrap">{item?.name}</span>

        {/* RATES */}
        <div className="py-1 px-1 rounded-md flex flex-col justify-between items-start gap-2">
          {item?.interestRate && (
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-nowrap">نرخ بهره :</span>
              <span className="text-sm bg-[#E3ECF8] text-primary font-medium rounded-[4px] py-[2px] px-1">
                {`${item?.interestRate}%`}
              </span>
            </div>
          )}
          {item?.percentageRate && (
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-nowrap">نرخ درصد :</span>
              <span className="text-[#35AD8B] bg-[#E0F0ED] text-sm font-medium rounded-[4px] py-[2px] px-1">
                {`${item?.percentageRate}%`}
              </span>
            </div>
          )}
          {item?.penaltyRate && (
            <div className="flex items-center gap-1">
              <span className="font-medium text-sm text-nowrap">نرخ جریمه :</span>
              <span className="text-[#BC102B] bg-[#F1DCE1] text-sm font-medium rounded-[4px] py-[2px] px-1">
                {`${item?.penaltyRate}%`}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col items-center gap-2 rounded-lg p-1 max-w-[300px]">
            <span className="font-medium text-base text-nowrap text-primary w-fit relative">نوع بازپرداخت ها</span>
            <div className="flex flex-wrap justify-start gap-1 ms-4 w-[140px]">
              {item?.repaymentType?.map((type, i) => (
                <span
                  key={i}
                  onClick={() => setItem(type)}
                  className={`font-semibold text-[13px] border-2 border-solid border-secondary transition-all ease-in-out duration-300 hover:bg-primary hover:text-white rounded-full py-1 px-2 text-nowrap ${
                    type.value === selectedFacility.repaymentType && item.id === selectedFacility.facilityId
                      ? "text-white bg-primary"
                      : "text-primary bg-white"
                  }`}
                >
                  {type.name}
                </span>
              ))}
            </div>
          </div>
          {error && <p className="text-xs text-red-600 font-normal w-1/3">لطفا نوع بازپرداخت خود را انتخاب نمایید.</p>}
        </div>

        <div className="lg:hidden bg-primary p-2 rounded-lg flex items-center gap-2 h-fit">
          <span className="text-white font-medium text-nowrap">مبلغ :</span>
          <span className="text-primary font-medium bg-white rounded-[4px] py-[2px] px-2 text-nowrap">{`${item?.amount} ریال`}</span>
        </div>
      </div>

      <div className="bg-primary p-2 rounded-lg hidden lg:flex items-center gap-2 h-fit">
        <span className="text-white font-medium text-nowrap">مبلغ :</span>
        <span className="text-primary font-medium bg-white rounded-[4px] py-[2px] px-2 text-nowrap">{`${item?.amount} ریال`}</span>
      </div>
    </div>
  );
};

export default FacilityItem;
