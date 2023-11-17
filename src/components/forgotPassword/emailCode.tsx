"use client";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../../ui/dialog";
import { TbProgressCheck } from "react-icons/tb";
import { Button } from "../../ui/button";
import axiosInstance from "../../api/axios";
import { Link } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import backgroundImage from "../../assets/auth__background.jpeg";
import Logo from "../../assets/Logo.png";

export default function EmailCode() {
  // const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [individual, setIndividual] = useState(true);
  const [successModal, setSuccessModal] = useState(false);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("individual");
    if (user === "true") {
      setIndividual(true);
      return;
    }
    setIndividual(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let errMsg = {
    email: "",
  };

  if (errors?.email?.type === "required") {
    errMsg.email = "Please enter your email address";
  }

  if (
    errors?.email?.type === "required" ||
    (watch("email") && !validator.isEmail(watch("email")))
  ) {
    errMsg.email = "Please enter a valid email address.";
  }

  const onSubmit = async (data: any) => {
    const isError = Object.values(errMsg).every(
      (error) => error === null || error === ""
    );
    // console.log("help", isError, data.email);

    if (isError) {
      try {
        setLoading(true);

        const url = "/get-sign-in-code";
        const response = await axiosInstance.post(url, {
          email: data.email,
        });

        const emailMessage = response.data.message.replace(
          /Verification code has been sent to /g,
          ""
        );
        // console.log("response", response, emailMessage);
        setMessage(response.data.message);
        setSuccessModal(true);
        setError("");
        localStorage.setItem("userEmail", emailMessage);

        setTimeout(() => {
          sessionStorage.setItem("userInfo", JSON.stringify(data));
          navigate(`/auth/login/verification?email=${data.email}`);
        }, 3000);
      } catch (error: any) {
        setLoading(false);
        if (error) {
          const errResponse = error?.response;
          setError(error.response.data.message);
          return;
        }

        setError(
          "Something went wrong. Please check your internet connection."
        );

        setMessage("");
      }
    }
  };
  return (
    <div className="auth__layout">
      <div className=" bg-white/30 z-10 h-screen w-screen flex items-center justify-center">
        <div className="z-10 flex justify-around w-full p-4 min-w-[350px] rounded-lg">
          <div className="lg:flex flex-col items-center justify-center hidden">
            <div className=" w-full p-4 min-w-[380px] rounded-lg">
              <div className="text-left  text-white">
                <img src={Logo} style={{}} alt="logo" width={300} height={50} />
              </div>
            </div>
          </div>{" "}
          <div className="">
            {message && (
              <div
                className="p-4 mb-4 my-2 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                role="alert"
              >
                <span className="font-medium">Success alert!</span> {message}
              </div>
            )}
            {error && (
              <div className=" bg-red-100 w-full max-w-[480px] text-red-700 text-center p-2 rounded-lg mb-2 transition-all duration-1000">
                {error}
              </div>
            )}
            <div className="bg-[#f3f3f3] text-black w-full max-w-[480px] md:w-[480px]  p-8 pt-10  pb-20 md:p-[60px] md:pb-[20vh] rounded">
              <div className=" flex flex-col space-y-4 sm:space-y-10">
                <div className=" p-1 text-center ">
                  <Link to={"/auth/login/forgot-password"}>
                    <HiArrowLongLeft className="text-black text-[30px] hover:bg-black/10" />{" "}
                  </Link>
                  <h3 className="font-medium text-[18px] sm:text-[24px] sm:mb-5">
                    Log in with code
                  </h3>
                  <small className="font-normal text-[12px]">
                    A 6-character code will be sent to your email.
                  </small>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="w-full">
                        <input
                          {...field}
                          type="email"
                          placeholder="Company email address"
                          name="email"
                          className="w-full  sm:h-12 rounded-lg p-2 text-[12px] sm:p-4 sm:text-[14px]"
                        />
                        {errMsg.email && (
                          <small className="text-red-500">{errMsg.email}</small>
                        )}
                      </div>
                    )}
                  />
                  <Button className="bg-[#6F797A] w-full mt-6 text-white hover:bg-bm__btn__grey/70">
                    {loading && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    Get Code
                  </Button>
                  {/* <Dialog open={successModal}>
                    <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center max-w-[360px] py-16">
                      <TbProgressCheck className="font-normal text-[155px] text-green-700" />

                      <div className="">Email sent successfully</div>
                    </DialogContent>
                  </Dialog> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src={backgroundImage}
        alt="background"
        width={3440}
        height={2000}
        className="auth__layout__image object-cover"
      />
    </div>
  );
}
