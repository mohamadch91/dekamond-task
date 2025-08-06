'use client';
import { FunctionComponent,  useState } from "react";
import styles from './auth.module.scss';
import Mobile from "./mobile";
import Image from "next/image";
import { ApiStateType } from "@/hooks/global/type";
import { LoginResponse } from "@/constants/api/authentication";
import useApi from "@/hooks/global/useApi";
import { enqueueSnackbar } from 'notistack'
import useUserProfileStore from "@/store/user";
import { useRouter } from "next/navigation";


export default function Authentication () {

   const router = useRouter();
  const { setUserProfile } = useUserProfileStore();

const handleLogin= (mobile:string)=>{
  console.log(mobile)
  // debugger;
  getUserData({
    url: "https://randomuser.me/api/?results=1&nat=us",
  });

}


  const { fetch: getUserData, loading: loginLoading } = useApi<
    ApiStateType<LoginResponse>
  >({
    lazy: true,
    method: "get",
    onSuccess(data) {
      console.log(data,"data")
      const result = data.data?.results
      result && result?.length > 0
        ? setUserProfile(result[0])
        : enqueueSnackbar("User not found with this creds", {
            variant: "error",
          });
      console.log("here");
      console.log(router)
      router.replace("/dashboard");
    },
    onError(error) {
      console.log(error)
      // enqueueSnackbar(error?.data?.messages, { variant: "error" });
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

