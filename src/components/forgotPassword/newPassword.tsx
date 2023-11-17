"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../ui/dialog";
import { TbProgressCheck } from "react-icons/tb";
import { Controller, useForm } from "react-hook-form";
import axiosInstance from "../../api/axios";
import { useNavigate } from "react-router-dom";
import PasswordValidator from "password-validator";
import { Button } from "../../ui/button";
import {Link} from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { TbEyeOff, TbEye } from "react-icons/tb";
import backgroundImage from "../../assets/auth__background.jpeg";
import Logo from "../../assets/Logo.png";

export default function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [successModal, setSuccessModal] = useState(false);
  const [resLink, setResLink] = useState("");
  const [showPass, setShowPass] = useState(false);

  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    //  Retrieve userInfo from sessionStorage
    let sessionInfo = sessionStorage.getItem("userInfo");

    if (sessionInfo !== null) {
      // Parse sessionInfo as JSON
      const userInfo = JSON.parse(sessionInfo);
      if (!userInfo) {
        navigate("/auth/signup");
      }
    }

    const userEmail = localStorage.getItem("userEmail");
    if (userEmail !== undefined && userEmail !== null) {
      setEmail(userEmail);
      return;
    }
    setEmail("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let errMsg = {
    password: "",
    confirmPassword: "",
  };

  if (errors?.password?.type === "required") {
    errMsg.password = "Please enter a password";
  }

  if (errors?.confirmPassword?.type === "required") {
    errMsg.confirmPassword = "Please confirm your password";
  }

  if (errors?.password?.type === "minLength") {
    errMsg.password = "Password cannot be less than 8 characters";
  }

  if (errors?.confirmPassword?.type === "minLength") {
    errMsg.confirmPassword = "Password cannot be less than 8 characters";
  }

  if (watch("password") !== watch("confirmPassword")) {
    errMsg.password = "Both passwords must match";
    errMsg.confirmPassword = "Both passwords must match.";
  }

  let schema = new PasswordValidator();

  schema
    .has()
    .lowercase()
    .uppercase()
    .has()
    .digits(1)
    .has()
    .symbols(1)
    .is()
    .min(8)
    .has()
    .not()
    .spaces();

  if (watch("password") && !schema.validate(watch("password"))) {
    errMsg.password = "Password is too weak";
    errMsg.confirmPassword = "Password is too weak";
  }

  const onSubmit = async (data: any) => {
    const isError = Object.values(errMsg).every(
      (error) => error === null || error === ""
    );

    if (isError) {
      try {
        setLoading(true);
        // console.log(isError, "second");

        const url = "/post-reset-password";

        const requestData = { password: data.password };

        const newAccountResponse = await axiosInstance.patch(
          `${url}?email=${email}`,
          requestData
        );

        if (
          newAccountResponse !== undefined &&
          newAccountResponse.status === 200
        ) {
          setSuccessModal(true);
          setError("");
          setMessage(newAccountResponse.data.message);
          setResLink(newAccountResponse.data.link);

          setTimeout(() => {
            navigate("/auth/login");
          }, 3000);
          return;
        }

        setLoading(false);

        setMessage("");
      } catch (error: any) {
        setLoading(false);

        if (error.response) {
          const keys = Object.keys(error.response.data);
          const errorMsg = error.response.data[keys[0]][0];
          setError(errorMsg);
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
                <img
                  src={Logo}
                  style={{}}
                  alt="logo"
                  width={300}
                  height={50}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full max-w-[480px] justify-center items-center">
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
            <div className="bg-[#f3f3f3] text-black w-full max-w-[480px] p-[20px] m-2 md:p-[40px]  rounded">
              <div className=" flex flex-col md:space-y-7">
                <div className=" p-1 text-center ">
                  <Link to={"/auth/login/reset-password"}>
                    <HiArrowLongLeft className="text-black text-[30px] hover:bg-black/10" />{" "}
                  </Link>
                  <h3 className="font-medium text-[24px] md:mb-3 p-0 m-0">
                    Reset password
                  </h3>
                </div>
                <form>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="w-full pb-4">
                        <div className="flex items-center bg-white rounded-lg px-2 sm:px-4 ">
                          <input
                            {...field}
                            type={showPass ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            className="w-full h-10 rounded-lg text-base outline-none border-none focus:outline-none focus:ring-0 px-4"
                          />
                          <div
                            className="cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? <TbEye /> : <TbEyeOff />}
                          </div>
                        </div>
                        {errMsg.password && (
                          <small className="text-red-500">
                            {errMsg.password}
                          </small>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <div className="w-full pb-4">
                        <div className="flex items-center bg-white rounded-lg px-2 sm:px-4 ">
                          <input
                            {...field}
                            type={showPass ? "text" : "password"}
                            placeholder="Confirm Password"
                            name="password"
                            className="w-full sm:h-12 rounded-lg text-[12px]  sm:text-[14px]  outline-none border-none focus:outline-none focus:ring-0"
                          />

                          <div
                            className="cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                          >
                            {showPass ? <TbEye /> : <TbEyeOff />}
                          </div>
                        </div>
                        {errMsg.confirmPassword && (
                          <small className="text-red-500">
                            {errMsg.confirmPassword}
                          </small>
                        )}
                      </div>
                    )}
                  />
                  <Button
                    // type='submit'
                    className="bg-[#6F797A] w-full mt-2 md:mt-6 text-white hover:bg-bm__btn__grey/70"
                    onClick={handleSubmit(onSubmit)}
                  >
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
                    Reset Password
                  </Button>
                </form>
                <Dialog open={successModal}>
                  <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center rounded max-w-[350px] md:max-w-[460px] p-16">
                    <TbProgressCheck className="font-normal text-[155px] text-green-700" />
                    <div className="text-[20px] font-bold whitespace-nowrap">
                      Password Reset Successful
                    </div>
                  </DialogContent>
                </Dialog>
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
