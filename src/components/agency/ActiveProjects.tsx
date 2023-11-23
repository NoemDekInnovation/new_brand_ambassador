import React from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
const talents = [1, 2, 3, 4, 5, 6, 7, 8].map((_, idx) => {
  return (
    <Card className="p-4 hover:bg-black/10 cursor-pointer " key={idx}>
      <CardContent className="p-0 space-y-1">
        <h3 className="font-medium text-[15px] ">
          Project Name {"  "}(in-store){" "}
        </h3>
        <p className="font-normal text-[15px]">
          This is the project description.. this is the project description
        </p>
        <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
          <div className="text-[10px] font-medium">Project Code: NIV23 </div>
          <div className="text-[15px] p-0 px-2">|</div>
          <div className="text-[10px] font-medium">300 Brands Ambassador</div>
          <div className="text-[16px] p-0 px-2">|</div>
          {/* <br className="block md:hidden" /> */}

          <div className="text-[10px] font-medium">50 Supervisor</div>
        </div>
      </CardContent>
      <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
        <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
          <div className=" font-normal text-[8px]">Mon, Wed, Fri {"  "}</div>
          <div className="text-[10px] pb-1 font-black">.</div>

          <div className="font-normal text-[8px]">Nov 30 - December 30</div>
          <div className="text-[10px] pb-1 font-black">.</div>
          <div className="font-normal text-[8px]">
            Lagos, Abuja, Ogun, Plateau
          </div>
        </div>
        <button className="ox__btn max-w-fit text-[12px] mt-2 bg-[#93979D]">
          View Report
        </button>
      </CardFooter>
    </Card>
  );
});
const ActiveProjects = () => {
  return <div className="flex flex-col w-full gap-2">{talents}</div>;
};

export default ActiveProjects;
