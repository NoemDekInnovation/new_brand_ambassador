import React, { useState } from "react";

const ProjectTip = ({
  tipsBox,
  setTipsBox,
}: {
  tipsBox: boolean;
  setTipsBox: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  //   const [tipsBox, setTipsBox] = useState(true);

  return (
    <>
      {tipsBox && (
        <div className="bg-[#F8F0EB] p-3 m-4 flex items-start justify-between">
          <div className="p-2 flex-1 text-[#515457] text-[12px] font-normal">
            <h2>This page contains all project that you published. </h2>
            <div className="flex gap-1 items-center">
              <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
              <p>You can invite suitable Talent to your projects.</p>
            </div>
            <div className="flex gap-1 items-center">
              <span className="bg-[#515457] ml-1 h-[3px] w-[3px] rounded-full"></span>
              <p>You can view all applications.</p>
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
