import { Separator } from "../../ui/seperator";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiArrowLongLeft } from "react-icons/hi2";
import {Link} from "react-router-dom";
import backgroundImage from "../../assets/auth__background.jpeg";
import Logo from "../../assets/Logo.png";

export default function ForgotPassword() {
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
          <div className="bg-bm__card text-black w-full max-w-[480px] p-8 pt-10  pb-20 md:p-[60px] md:pb-[20vh] rounded">
            <div className=" flex flex-col space-y-4 sm:space-y-10">
              <div className=" p-1 text-center ">
                <Link to={"/auth/login"}>
                  <HiArrowLongLeft className="text-black text-[30px] hover:bg-black/10" />{" "}
                </Link>
                <h3 className="font-medium text-[18px] sm:text-[24px] mb-5">
                  Forgot Password
                </h3>
                <small className="font-normal text-[12px]">
                  Don’t have an Account?{"   "}
                  <Link to={"/auth/signup"}>
                    {/* <Link href={'/auth/sign-up'} > */}
                    <span
                      className="
                font-medium text-[12px]
                text-[#6F797A]
                "
                    >
                      Create an account here
                    </span>
                  </Link>
                </small>
              </div>
              <div className="">
                <Separator />
                <Link
                  to="/auth/login/email"
                  onClick={() => {
                    localStorage.setItem("individual", "false");
                  }}
                >
                  <div className="py-2 sm:py-5 cursor-pointer  hover:bg-black/10">
                    <div className=" w-full flex items-center justify-between space-x-3 p-2">
                      <div className="flex items-center">Log in with code</div>
                      <span>
                        <FiChevronRight />
                      </span>
                    </div>
                  </div>
                </Link>
                <Separator />
                <Link
                  to="/auth/login/reset-password"
                  onClick={() => {
                    localStorage.setItem("individual", "false");
                  }}
                >
                  <div className="py-2 sm:py-5 cursor-pointer  hover:bg-black/10">
                    <div className=" w-full flex items-center justify-between space-x-3 p-2">
                      <div className="flex items-center">Reset Password</div>
                      <span>
                        <FiChevronRight />
                      </span>
                    </div>
                  </div>
                </Link>
                <Separator />
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
