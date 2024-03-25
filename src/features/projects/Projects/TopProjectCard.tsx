import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { PiCheckSquareOffset } from "react-icons/pi";

const TopProjectCard = ({ card_width }: { card_width?: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card className={`bg-white w-[240px] ${card_width}`}>
      <CardHeader className="p-2 md:p-4  flex-row p-1 justify-between items-center">
        <div className="flex space-x-3">
          <CardTitle className="">
            <p className="font-medium text-[15px]">Top Projects</p>
          </CardTitle>
        </div>
      </CardHeader>
      <Separator className="my-1" />
      {isLoading && (
        <div className=" max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="p-2 md:p-4 mb-3">
          {[1, 2, 3, 4].map(() => {
            return (
              <>
                <div className="my-2  text-[12px] flex flex-col gap-2 font-normal">
                  <div className="flex items-center font-medium text-[#252525]">
                    <div className="h-3 w-3 rounded-full bg-gray-400 mr-1"></div>{" "}
                    cool Ltd |
                    <span className="flex gap-1 items-center font-normal ml-2">
                      <PiCheckSquareOffset />
                      verified
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <p className="text-[15px] font-medium">Project Name</p>
                    <p>This is the description</p>
                  </div>
                  <div className="flex gap-2">Lagos, Abuja, Ogun, Plateau</div>
                </div>
                {<Separator className="bg-[#D7D8DA]" />}
              </>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default TopProjectCard;
