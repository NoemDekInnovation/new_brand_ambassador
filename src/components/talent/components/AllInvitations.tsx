import React from "react";
import drago from "../../../assets/drago.jpg";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

import { CiHeart } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";

const card_content = {
  isCurrent: false,
  content: [1, 2, 3, 4, 5],
};

const AllInvitations = () => {
  return (
    <div>
      {card_content.content.map((_, idx) => {
        return (
          <div
            key={idx}
            className="border rounded mb-4 p-3 hover:bg-black/10 transition-all duration-300 cursor-pointer"
          >
            <div className="flex w-full">
              <CardContent className="p-0 space-y-1 flex-1">
                <div className="flex space-x-2">
                  <img src={drago} alt="" width={18} height={18} />
                  <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                  {/* <p className="text-bm__ox__red text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Unverified
                  </p> */}
                  <p className="text-green-900 text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Verified
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <h3 className="font-medium text-[15px] ">
                    Project Name{" "}
                    <span className="text-[10px] mx-1">(In-store)</span>
                  </h3>
                  <CiHeart />
                </div>
                <p className="font-normal text-[10px] text-[#252525]">
                  This is the project description.. this is the project
                  description
                </p>
                {card_content.isCurrent && (
                  <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
                    <div className="">ID: NIV020 </div>
                    <div className="text-[16px] p-0  pb-2 px-2">.</div>
                    <div className=""> Outlet: Shoprite Ikeja</div>
                    <div className="text-[16px] p-0  pb-2 px-2">.</div>
                    {/* <br className="block md:hidden" /> */}

                    <div className="">Supervisor: Adenekan Shoneye </div>
                  </div>
                )}
              </CardContent>
              <div className="flex text-[10px]">
                <p className="border-r h-fit border-bm__beige pr-3 mr-3">
                  Posted: Oct 25,2023
                </p>
                <p className=" h-fit text-bm__ox__red">Closes: Oct 25,2023</p>
              </div>
            </div>
            <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
              <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
                <div className="">Mon, Wed, Fri {"  "}</div>
                <div className="text-[11px] p-0  pb-1 px-1">.</div>

                <div className="">Nov 30 - December 30</div>
                <div className="text-[11px] p-0  pb-1 px-1">.</div>
                <div className="">Lagos, Abuja, Ogun, Plateau</div>
              </div>
              {!card_content.isCurrent && (
                <button className="dark__btn max-w-fit text-[12px] mt-2 ">
                  Apply
                </button>
              )}
              {card_content.isCurrent && (
                <button className="ox__btn max-w-fit text-[12px] mt-2">
                  Add Report
                </button>
              )}
            </CardFooter>
          </div>
        );
      })}
    </div>
  );
};

export default AllInvitations;
