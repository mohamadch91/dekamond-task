import { FunctionComponent, useRef } from 'react';
import styles from './auth.module.scss'
import KButton from '@components/KButton';
import KInput from '@components/KInput';
import { LoginModelSchema, MobileProps } from './type';
import Image from 'next/image';
import { useFormik } from "formik";
import * as Yup from "yup";

const Mobile: FunctionComponent<MobileProps> = ({loading,handlelogin}) =>  {
 const inputRef = useRef<HTMLInputElement>(null);
const formik = useFormik({
  initialValues: {
    mobile: "",
  },
  validationSchema:LoginModelSchema ,
  onSubmit: (data) => {
    handlelogin(data.mobile)
  },
});
  const handleMobileChange = (text: string) => {
    console.log(text)
    formik.setFieldValue("mobile", text);
  };


  return (
    <>
      <div className={styles["card-top"]}>
        <div className={` row ${styles["card-logo"]}`} onClick={() => {}}>
          <Image
            alt="logo"
            src={require("@images/dekamond.webp")}
            width={120}
          />
        </div>
        <div className={`${styles["card-header"]} row`}>خوش‌آمدید</div>
        <div className={`${styles["card-alt"]} row`}>
          امنیت و آرامش در دستان شما
        </div>
        <div className={` row !mt-4 `}>
          <KInput
            placeholder="شماره موبایل"
            onChange={() => {
              handleMobileChange(inputRef?.current?.value || "");
            }}
            ref={inputRef}
            desc="برای ورود  شماره تلفن همراه خود را وارد کنید."
            value={formik.values.mobile}
            error={formik.errors.mobile}
            disable={false}
            required={true}
            type={"mobileNumber"}
            afterIconClick={() => {}}
            hasAfterIcon={false}
          />
        </div>
      </div>
      <div className={`${styles["card-bottom"]} ${styles.btns}`}>
        <div className={`${styles["k-btn"]} row`}>
          <KButton
            disable={
              formik.values.mobile == "" ||
              !formik.values.mobile ||
              !!formik.errors.mobile
            }
            onClick={() => {
              handlelogin(formik.values.mobile);
            }}
            color="primary"
            loading={loading}
            icon={"next"}
            text={"ورود"}
            size="l"
          />
        </div>
      </div>
    </>
  );
};

export default Mobile