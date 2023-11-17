import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { GiPerson } from "react-icons/gi";
import { RiBuilding2Fill } from "react-icons/ri";
import { HiArrowLongLeft } from "react-icons/hi2";
import { Separator } from "../../../ui/seperator";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/auth__background.jpeg";
import Logo from "../../../assets/Frame.svg";

export default function TalentSignUp() {
  return (
    <div className="auth__layout ">
      <div className=" bg-white/30 z-10 h-screen w-screen flex items-center justify-center">
        <div className="z-10 flex justify-around w-full p-4 min-w-[350px] rounded-lg">
          <div className="lg:flex flex-col items-center justify-center hidden">
            <div className=" w-full p-4 min-w-[380px] rounded-lg">
              <div className="text-left  text-white cursor-pointer">
                {/* <h1 className="max-w-[300px] font-black text-[60px]">CAMPAIGN</h1>

            <h1 className="font-normal text-[18px]">
              Login or create an account
            </h1> */}
                <Link to="/">
                  <img
                    src={Logo}
                    style={{}}
                    alt="logo"
                    width={300}
                    height={50}
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-bm__card text-black w-full max-w-[480px] p-8 pt-10  pb-20 md:p-[60px] md:pb-[20vh] rounded">
            <div className=" flex flex-col space-y-4 sm:space-y-10">
              <div className=" p-1 text-center ">
                <Link to={"/"}>
                  <HiArrowLongLeft className="text-black text-[30px] hover:bg-black/10" />{" "}
                </Link>
                <h3 className="font-medium text-[18px] sm:text-[24px] mb-5">
                  Select an account
                </h3>
                <small className="font-normal text-[12px]">
                  Already have an Account?{" "}
                  <Link to={"/auth/login"}>
                    <span
                      className="
                  font-medium text-[12px]
                  text-[#6F797A]
                  "
                    >
                      Login
                    </span>
                  </Link>
                </small>
              </div>
              <div className="">
                <Separator />

                <Link
                  to="/auth/signup/details"
                  onClick={() => {
                    localStorage.setItem("individual", "true");
                  }}
                >
                  <div className="py-2 sm:py-5 cursor-pointer hover:bg-black/10 transition-all duration-500">
                    <div className=" w-full flex items-center justify-between space-x-3 p-2">
                      <div className="flex items-center">
                        <span className="mr-4 hidden md:block">
                          <GiPerson className="h-[60px] w-[60px]   text-black" />
                        </span>
                        Talent
                      </div>
                      <span>
                        <FiChevronRight />
                      </span>
                    </div>
                  </div>
                </Link>
                <Separator />
                <Link
                  to="/auth/signup/details"
                  onClick={() => {
                    localStorage.setItem("individual", "false");
                  }}
                >
                  <div className="py-2 sm:py-5 cursor-pointer hover:bg-black/10 transition-all duration-500">
                    <div className=" w-full flex items-center justify-between space-x-3 p-2">
                      <div className="flex items-center">
                        <span className="mr-4 hidden md:block">
                          <HiOutlineBuildingOffice2 className="h-[60px] w-[60px]   text-black" />
                        </span>
                        Agency
                      </div>
                      <span>
                        <FiChevronRight />
                      </span>
                    </div>
                  </div>
                </Link>
                <Separator />
                <Link
                  to="/auth/signup/details"
                  onClick={() => {
                    localStorage.setItem("individual", "false");
                  }}
                >
                  <div className="py-2 sm:py-5 cursor-pointer hover:bg-black/10 transition-all duration-500">
                    <div className=" w-full flex items-center justify-between space-x-3 p-2">
                      <div className="flex items-center">
                        <span className="mr-4 hidden md:block">
                          <RiBuilding2Fill className="h-[60px] w-[60px]   text-black" />
                        </span>
                        Company (Client)
                      </div>
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
