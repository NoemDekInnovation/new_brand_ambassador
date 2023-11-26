import React from "react";
import { Separator } from "../../ui/seperator";

export default function AgencyFooter() {
  return (
    <div className="fixed bottom-3 p-2 flex flex-col justify-end h-[81vh]  w-40">
      <div className=" p-2 bg-white w-[128px] felx flex-col justify-center items-center gap-2 text-center">
        <div className="text-[10px] font-bold">
          {" "}
          <span className="text-[14px]">©</span> 2023 Campaign
        </div>
        <Separator className="my-2 bg-[#d7d8da]" />
        <div className="text-[10px] mb-2">Terms of Service</div>
        <div className="text-[10px] font-medium  flex items-center justify-center">
          <p className="border-r pr-2 border-r-3 mr-3">Privacy</p>
          <p>help</p>
        </div>
      </div>
    </div>
  );
}
