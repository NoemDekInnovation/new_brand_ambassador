import React, { useState } from "react";

const ProjectTip = ({
  tipsBox,
  setTipsBox,
}: {
  tipsBox: boolean;
  setTipsBox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {tipsBox && (
        <div className="bg-[#F8F0EB] p-3 m-4 flex items-start justify-between">
          <div className="p-2 flex-1 text-[#515457] text-[12px] font-normal">
            <div className="flex gap-1 items-center">
              <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
              <p> Users performs the same functions as the Agency Admin</p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
              <p>However, Users cannot create other users</p>
            </div>
          </div>
          <button onClick={() => setTipsBox(false)} className="cursor-pointer">
            x
          </button>
        </div>
      )}
    </>
  );
};

export default ProjectTip;
