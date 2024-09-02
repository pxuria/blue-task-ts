import { ChangeEvent, useEffect, useState } from "react";
import { BASE_URL } from "../../config.json";

interface FacilityType {
  _id: string;
  name: string;
  repaymentType: number[];
  amount: number;
  interestRate: number;
  penaltyRate: number;
  interestPrice: number;
  penaltyPrice: number;
  repaymentPricePerMonth: number;
}

interface Facility {
  _id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  nationalCode: string;
  bankAccountNumber: string;
  averageBalance: string;
  shabaNumber: string;
  facilityType: FacilityType;
  repaymentType: number;
  repaymentPricePerMonth: number;
}

const Facilities: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/facilities`);
        const data = await res.json();
        setFacilities(data);
        setFilteredFacilities(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFacilities();
  }, []);

  const handleSearch = () => {
    const filterData = facilities.filter((facility) => {
      const facilityName = facility.facilityType.name || "";
      return facilityName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredFacilities(filterData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <div className="flex flex-col">
      {/* search input */}
      <div className="flex items-center w-1/3 mt-4">
        <input
          type="search"
          name="search"
          className="outline-none border-2 border-solid border-secondary px-2 py-1 rounded-md rounded-l-none w-full h-[40px] focus:bg-slate-100 placeholder:text-sm"
          value={search}
          placeholder="نوع تسهیلات خود را جستجو گنید"
          onInput={handleInputChange}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="outline-none text-white bg-secondary hover:text-primary hover:bg-white rounded transition-all ease-in duration-200 font-medium text-sm border-2 border-r-0 rounded-r-none border-secondary h-[40px] px-4"
        >
          جستجو
        </button>
      </div>

      <div className="overflow-x-auto mt-10 rounded-lg facility-table">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-[#efefef]">
              <th className="facility-head-item">نوع تسهیلات</th>
              <th className="facility-head-item">نام گیرنده</th>
              <th className="facility-head-item">شماره تماس</th>
              <th className="facility-head-item">کد ملی</th>
              <th className="facility-head-item">مبلغ</th>
              <th className="facility-head-item">مدت زمان بازپرداخت</th>
              <th className="facility-head-item">تعداد اقساط</th>
              <th className="facility-head-item">مبلغ قسط ماهیانه</th>
              <th className="facility-head-item">مبلغ نرخ بهره</th>
              <th className="facility-head-item">مبلغ جریمه دیرکرد</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredFacilities.length > 0 ? (
              filteredFacilities.map((facility, index) => (
                <tr key={index} className="bg-white hover:bg-[#f8f9fa] transition-all ease-in duration-300">
                  <td className="facility-list-item font-bold text-secondary text-base">
                    {facility.facilityType.name}
                  </td>
                  <td className="facility-list-item font-medium text-muted text-sm">{`${facility.firstName} ${facility.lastName}`}</td>
                  <td className="facility-list-item text-muted text-sm">{facility.phoneNumber}</td>
                  <td className="facility-list-item text-muted text-sm">{facility.nationalCode}</td>
                  <td className="facility-list-item text-muted text-sm">
                    <span className="text-white bg-primary px-4 py-2 rounded-lg">
                      {facility.facilityType.amount} ریال
                    </span>
                  </td>
                  <td className="facility-list-item">
                    <span className="text-primary px-4 py-1 rounded-md font-medium select-none bg-[#E3ECF8]">
                      {facility.repaymentType} ماهه
                    </span>
                  </td>
                  <td className="facility-list-item text-muted text-sm">{facility.repaymentType}</td>
                  <td className="facility-list-item text-muted text-sm">
                    <span className="text-white bg-primary px-4 py-2 rounded-lg">
                      {facility.repaymentPricePerMonth} ریال
                    </span>
                  </td>
                  <td className="facility-list-item text-muted text-sm">
                    <div className="flex gap-2 flex-nowrap">
                      <span className="text-nowrap">{facility.facilityType.interestPrice} ریال</span>
                      <span className="text-[#35AD8B] bg-[#E0F0ED] px-2 rounded-md select-none">
                        {facility.facilityType.interestRate}%
                      </span>
                    </div>
                  </td>
                  <td className="facility-list-item text-muted text-sm">
                    <div className="flex gap-2 flex-nowrap">
                      <span className="text-nowrap">{facility.facilityType.penaltyPrice} ریال</span>
                      <span className="text-[#BC102B] bg-[#F1DCE1] px-2 rounded-md select-none">
                        {facility.facilityType.penaltyRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="text-center text-muted py-4">
                  تسهیلاتی یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Facilities;
