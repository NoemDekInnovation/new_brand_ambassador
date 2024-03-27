import React, { useState } from "react";
import InviteTalent from "./InviteTalent";
import Training from "./Training";
import ApplicationsTab from "./Applications";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../ui/tabs";

const Applications = () => {
  const [select, setSelect] = useState(1);

  const pageSize = 20;
  return (
    <Tabs defaultValue="invite" className="w-full">
      <TabsList className=" flex w-full p-0 flex-row justify-between items-start font-medium text-[12px] mb-8 cursor-pointer">
        <TabsTrigger value="invite" className="w-full p-0">
          <div
            onClick={() => setSelect(1)}
            className={`relative flex items-center justify-center w-full h-[55px] ${
              select === 1 ? "text-white" : "text-black"
            }`}
          >
            <p className="absolute top-[25%]  z-20 text-[16px]">
              Invite Talent
            </p>

            <div
              className={`border  border-[#d7d8da]  border-r-[#f3f3f3] w-full h-[58px]  rounded-l-md ${
                select === 1 ? "bg-black " : "bg-[#f3f3f3]"
              }`}
            ></div>
            <div
              className={`
            absolute right-[-21px] z-[1000] -rotate-45  w-[40px] h-[40px] 
            ${
              select === 1
                ? "bg-black"
                : "border-r border-b border-[#d7d8da] bg-[#f3f3f3]"
            }`}
            ></div>

            <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
          </div>
        </TabsTrigger>
        <TabsTrigger value="applications" className="w-full p-0">
          <div
            onClick={() => setSelect(2)}
            className={`relative flex items-center justify-center w-full ${
              select === 2 ? "text-white" : "text-black"
            }`}
          >
            <p className="absolute top-[25%] text-[16px] z-20">
              {" "}
              Applications
              <span className="text-[14px] font-bold">
                {/* ({applications?.data?.projectApplications?.length || 0}) */}
              </span>
            </p>
            <div className=" bg-white w-[8px] h-[55px]"></div>
            <div
              className={`border border-[#d7d8da] w-full h-[58px] ${
                select === 2 ? " bg-black " : "bg-[#f3f3f3]"
              }`}
            ></div>
            <div
              className={`absolute right-[-20px] z-[1000] -rotate-45  w-[40px] h-[40px] ${
                select === 2
                  ? "bg-black"
                  : "border-r border-b border-[#d7d8da] bg-[#f3f3f3]"
              }`}
            ></div>
            <div className="absolute right-[-28px] z-[500] -rotate-45 bg-white w-[40px] h-[40px] border-r border-b border-[#d7d8da]"></div>
          </div>
        </TabsTrigger>
        <TabsTrigger value="training" className="w-full p-0">
          <div
            onClick={() => setSelect(3)}
            className={`relative flex items-center justify-center w-full ${
              select === 3 ? "text-white" : "text-black"
            }`}
          >
            <p className="absolute top-[25%] z-20 text-[16px]">
              {" "}
              Training{" "}
              <span className="text-[14px] font-bold">
                {/* ({hiredTalent.length}) */}
              </span>
            </p>
            <div className=" bg-white w-[8px] h-[55px]"></div>
            <div
              className={`w-full h-[58px] border rounded-r-md ${
                select === 3 ? " bg-black  border-[#d7d8da]  " : " bg-[#f3f3f3]"
              }`}
            ></div>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="invite">
        <InviteTalent />
      </TabsContent>
      <TabsContent value="applications">
        <ApplicationsTab />
      </TabsContent>
      <TabsContent value="training">
        <Training />
      </TabsContent>
    </Tabs>
  );
};

export default Applications;
