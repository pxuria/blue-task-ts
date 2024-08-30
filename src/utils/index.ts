export const calculateMonthlyPayment = (amount: number, months: number, interestRate: number): string => {
  const facilitiesInstallment = (interestRate * amount + amount) / months;
  return facilitiesInstallment.toLocaleString("fa-IR");
};

export const convertToPersian = (number: number) => Number(number).toLocaleString("fa-IR");
