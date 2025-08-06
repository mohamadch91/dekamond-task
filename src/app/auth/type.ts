
import * as yup from "yup";

export interface MobileProps {
 
  loading: boolean;
  handlelogin:Function;
}

export interface LoginInputModel{
  mobile: string
}

const mobileRegExp = /(^09[0-9]{9}$)|(^\u06F0\u06F9[\u06F0-\u06F9]{9})$/;

export const LoginModelSchema: yup.Schema<LoginInputModel> = yup.object({
  mobile: yup
    .string()
    .required("شماره همراه اجباریست")
    .matches(mobileRegExp, "شماره همراه وارد شده نامعتبر می باشد"),
});
