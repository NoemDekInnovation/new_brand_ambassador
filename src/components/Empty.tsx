import React, { ReactNode } from "react";
import Icon from "../assets/Group 5.jpg";

export const Empty = ({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col  gap-[25px] p-2 w-full h-full  ">
      <span className={`text-red-500 ${className}`}>
        <div className="flex flex-col items-center">
          <img src={Icon} alt="" />
          <p className="text-black py-3">No Contract Offer</p>
          <p className="text-black py-3">
            Kindly create contract offers for this porject
          </p>
          <p className="underline text-blue-400 cursor-pointer py-3">
            Create Contract Offer
          </p>
        </div>
      </span>
      {children}
    </div>
  );
};
