import { BsFillCreditCard2BackFill, BsFillPersonFill } from "react-icons/bs";
import { HiClipboardDocumentCheck } from "react-icons/hi2";

export const steps = [
  { title: "اطلاعات شخصی", icon: <BsFillPersonFill className="w-4 sm:w-6 h-4 sm:h-6" /> },
  { title: "اطلاعات بانکی", icon: <BsFillCreditCard2BackFill className="w-4 sm:w-6 h-4 sm:h-6" /> },
  { title: "انتخاب تسهیلات", icon: <HiClipboardDocumentCheck className="w-4 sm:w-6 h-4 sm:h-6" /> },
];
