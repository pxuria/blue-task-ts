import * as Yup from "yup";

export const personalDataSchema = Yup.object().shape({
  firstName: Yup.string().required("نام الزامی است."),
  lastName: Yup.string().required("نام خانوادگی الزامی است."),
  birthDate: Yup.string().required("تاریخ تولد الزامی است."),
  phoneNumber: Yup.string().required("شماره تماس الزامی است.").min(11, "شماره تماس باید 11 رقمی باشد."),
  nationalCode: Yup.string()
    .required("کد ملی الزامی است.")
    .min(10, "کد ملی باید 10 رقمی باشد.")
    .matches(/^[0-9]{10}$/, "کد ملی معتبر نیست."),
});

export const bankAccountDataSchema = Yup.object().shape({
  bankAccountNumber: Yup.string().required("شماره حساب الزامی است.").min(16, "شماره حساب باید 16 رقمی باشد."),
  averageBalance: Yup.string().required("میانگین موجودی الزامی است."),
  shabaNumber: Yup.string().required("شماره شبا الزامی است").min(24, "شماره حساب باید 24 رقمی باشد."),
});
