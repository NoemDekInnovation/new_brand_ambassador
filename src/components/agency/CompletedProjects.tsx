import React from 'react'
import { Card, CardContent, CardFooter } from '../../ui/card';


const talents = [1, 2, 3].map((_, idx) => {
  return (
    <Card className="p-4 relative" key={idx}>
      <span className="absolute top-0 right-0 text-sm  pr-2 pt-2">
        Closed on 25th Nov 2023
      </span>
      <CardContent className="p-0 space-y-1">
        <h3 className="font-medium text-[15px] ">
          Project Name {"  "}(in-store){" "}
        </h3>
        <p className="font-normal text-[15px]">
          This is the project description.. this is the project description
        </p>
        <div className="flex md:space-x-2 text-[10px] font-medium items-center flex-wrap">
          <div className="text-[10px] font-medium">Project Code: NIV23 </div>
          <div className="text-[15px] p-0 px-2">|</div>
          <div className="text-[10px] font-medium">
            300 Brands Ambassador Applications
          </div>
          <div className="text-[16px] p-0 px-2">|</div>
          {/* <br className="block md:hidden" /> */}

          <div className="text-[10px] font-medium">
            50 Supervisor Applications
          </div>
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

      </CardFooter>
    </Card>
  );
});
const CompletedProjects = () => {
  return (
    <>{talents}</>
  )
}

export default CompletedProjects