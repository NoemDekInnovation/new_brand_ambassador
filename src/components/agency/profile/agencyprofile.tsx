import React from "react";
import { MainLayout } from "../../Layout";
import { Card } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { BiSolidUserDetail } from "react-icons/bi";
import { Progress } from "../../..//ui/progress";
import { Link } from "react-router-dom";
import Pic from "../../../assets/model.jpg";
import { RiEdit2Fill } from "react-icons/ri";
import { TiContacts } from "react-icons/ti";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdPayments, MdSettings } from "react-icons/md";

const AgencyProfile = () => {
  return (
    <MainLayout>
      <div className=" flex py-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start">
        <div className="bg-white flex w-full max-w-[1600px] mx-auto min-h-[70vh] p-[24px]  gap-[24px]">
          <Card className=" p-6 flex flex-col justify-center gap-2  border-bm__beige w-[240px] max-h-[189px] border rounded-[6px]">
            <p className="text-[15px] font-medium">My Account</p>
            <Separator className="bg-bm__gler" />
            <div className="flex items-center gap-4 hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
              <BiSolidUserDetail />
              <p className="text-[12px] font-normal">Profile</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4  hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
              <MdPayments />
              <p className="text-[12px] font-normal">Billings & Payments</p>
            </div>
            <Separator className="bg-bm__gler/50" />
            <div className="flex items-center gap-4  hover:bg-gray-400 transition-colors transform hover:scale-105 cursor-pointer">
              <MdSettings />
              <p className="text-[12px] font-normal">Settings</p>
            </div>
          </Card>
          <div className="w-full">
            <div className="flex items-center gap-4">
              <div className="bg-black w-fit rounded-[5px] px-1 text-[18px]">
                <BiSolidUserDetail className="text-white w-fit" />
              </div>
              <p className="">Profile</p>
              <p className="ml-20 bg-bm__ox__red px-2 text-white rounded-md">
                60%
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700  my-2">
              <div
                className="bg-bm__ox__red h-1.5 rounded-full"
                style={{ width: "33%" }}
              ></div>
            </div>
            <div className=" flex w-full gap-4 h-fit">
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex w-full  justify-between items-center ">
                  <p>Noah Samuel Omolola</p>
                  <div className="flex items-center gap-2 bg-[#93979D] text-white p-2 rounded-md">
                    <RiEdit2Fill />
                    <Link to={"edit-agency-profile"}>Edit Profile</Link>
                  </div>
                </div>
                <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px] ">
                  <div className="flex  justify-between items-center text-black">
                    <div className="flex items-center">
                      <div className="flex items-center gap-4">
                        <TiContacts />
                        <p className="text-[15px] font-medium flex-start">
                          Key Contact Details
                        </p>
                      </div>
                    </div>
                    <RiEdit2Fill className="cursor-pointer" />
                  </div>
                  <Separator className="bg-bm__gler/50" />
                  <div className="h-[150px] w-[120px] bg-green-200 rounded-md">
                    <img src={Pic} alt="img" />
                  </div>
                  <div className="text-[12px] font-normal gap-2 flex flex-col">
                    <div className="pt-20 flex items-center">
                      <p className="w-[120px]">First Name:</p>
                      <p className="">Noah</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-[120px]">Last Name:</p>
                      <p className="">Samuel</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-[120px]">Middle Name:</p>
                      <p className="">Omolola</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-[120px]">Email Address:</p>
                      <p className="">-</p>
                    </div>
                    <div className="flex items-center">
                      <p className="w-[120px]">Phone Number:</p>
                      <p className="">-</p>
                    </div>
                  </div>
                </Card>
                <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                  <div className="flex  justify-between items-center text-black">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <HiOutlineOfficeBuilding className="cursor-pointer" />
                      </div>
                      <p className="text-[15px] font-medium flex-start">
                        Company Details
                      </p>
                    </div>

                    <RiEdit2Fill />
                  </div>
                  <Separator className="bg-bm__gler/50" />
                  <div className="h-[150px] w-[120px] bg-green-200 rounded-md">
                    {" "}
                  </div>
                  <div className="text-[12px] font-normal gap-2 flex flex-col">
                    <div className="text-[12px] font-normal gap-2 flex flex-col">
                      <div className="pt-10 flex items-center">
                        <p className="w-[120px]">Agency Name:</p>
                        <p className="">Noah</p>
                      </div>
                      <div className="flex items-center">
                        <p className="w-[120px]">Agency Type:</p>
                        <p className="">Samuel</p>
                      </div>
                      <div className="flex items-center">
                        <p className="w-[120px]">Email Address:</p>
                        <p className="">-</p>
                      </div>
                      <div className="flex items-center">
                        <p className="w-[120px]">Phone Number:</p>
                        <p className="">-</p>
                      </div>
                    </div>
                    <div className="flex">
                      <p className="w-[120px]">Office Address 1:</p>
                      <p className="">
                        1b, Rosewood Close, Off Royal-Palm Drive, <br />
                        Osborne Forseshore Estate Phase 2, <br />
                        Ikoyi L.G.A
                        <br />
                        Lagos State
                        <br />
                        233312
                        <br />
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgencyProfile;
