import React from "react";
import { Separator } from "../../ui/seperator";

export default function NewAgencyFooter() {
  return (
    <div className="p-2 flex justify-end   w-screen bg-[#252525] text-white">
      <div className="text-[12px] font-medium p-2 w-full flex flex-col md:flex-row justify-start items-center gap-2 md:gap-8 text-center md:pl-20">
        <div className="">
          {" "}
          <span className="text-[12px]">©</span> 2024 Campaign. All rights
          reserved.
        </div>
        <Separator className="my-2 bg-[#d7d8da] md:hidden" />
        <div className="text-[12px] mb-2 md:mb-0">Terms of Service</div>
        <div className="text-[12px] font-medium  flex items-center justify-center">
          <p className="border-r pr-2 border-r-3 mr-3 md:border-none">
            Privacy
          </p>
          <p>help</p>
        </div>
      </div>
    </div>
  );
}
