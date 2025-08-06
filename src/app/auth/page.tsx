'use client';
import { FunctionComponent,  useState } from "react";
import styles from './auth.module.scss';
import Mobile from "./mobile";
import Image from "next/image";
import { ApiStateType } from "@/hooks/global/type";
import { LoginResponse } from "@/constants/api/authentication";
import useApi from "@/hooks/global/useApi";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from 'notistack'
import useUserProfileStore from "@/store/user";


export default function Authentication () {

   const router = useRouter();
  const { setUserProfile } = useUserProfileStore();

const handleLogin= (mobile:string)=>{
  console.log(mobile)
  GetUserData();

}


  const { fetch: GetUserData, loading: loginLoading } = useApi<
    ApiStateType<LoginResponse>
  >({
    lazy: true,
    url: "https://randomuser.me/api/?results=1&nat=us",
    method: "get",
    onSuccess(data) {
      const result = data.data?.results;
      result && result?.length > 0
        ? setUserProfile(result[0])
        : enqueueSnackbar("User not found with this creds", {
            variant: "error",
          });
      router.push("/dashboard");
    },
    onError(error) {
      enqueueSnackbar(error.data.messages, { variant: "error" });
    },
  });
 
 

  return (
    <section className={styles.authentication}>
      <div className={styles.auth}>
        <div className={styles["top-logo"]}>
          <Image alt="logo" src={require("@images/dekamond.webp").default} />
        </div>
        <div className="image col-span-12 ">
          <Image alt="login" src={require("@svg/login.svg").default} />
        </div>
        <div className={`${styles["auth-card"]} col-12 col-md-6`}>
          <div className={styles["k-card"]}>
            <Mobile
              loading={loginLoading}
              handlelogin={(mobile: string) => {
                handleLogin(mobile);
              }}
            />
          </div>
        </div>
      </div>
      <Image
        className={styles["login-cat"]}
        src={require("@svg/login-cat.svg").default}
        alt="login_cat"
      />
    </section>
  );
};

