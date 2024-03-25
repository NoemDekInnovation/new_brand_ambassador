import React from "react";
import { Card } from "../../../../../ui/card";
import { Separator } from "../../../../../ui/seperator";

const ProjectOverview = () => {
  return (
    <div className="flex-1 flex gap-3 md:gap-6 flex-col">
      <Card className="w-full flex justify-end rounded-none bg-[#F7F7F7] p-2 py-3">
        <div className="flex gap-3 w-full md:w-fit">
          <button className="dark___btn hidden md:block">Edit Project</button>
          <button className="dark___btn block md:hidden mr-auto">Edit</button>
          <button className="ox__btn">Delete Project</button>
        </div>
      </Card>
      <div className=" overflow-y-scroll h-[70vh] pr-2 flex flex-col gap-4">
        <Card className="p-3 text-[12px] flex flex-col gap-4 font-normal text-bm__grey__text__100">
          <h2 className="text-[18px] font-medium text-black">
            Nivea Bold & Beauty Launch
          </h2>
          <p>in-store</p>
          <p>nivm</p>
          <Separator />
          <p>
            Project Description: Lorem ipsum dolor sit amet consectetur. Sit
            amet gravida tempus proin accumsan. Consequat aliquam quis nulla leo
            duis consequat porta vulputate penatibus. Blandit lorem amet
            volutpat diam ut dignissim viverra orci.
          </p>
        </Card>
        <Card className="p-3 text-[12px] flex flex-col gap-4 font-normal text-bm__grey__text__100">
          {[1, 2].map(() => {
            return (
              <>
                {" "}
                <h3 className="text-[15px] font-medium">Brand Ambassador</h3>
                <p>BSc.</p>
                <Separator />
                <h4>Skills</h4>
                <div className="flex gap-3 flex-wrap">
                  {[1, 2, 3, 4].map(() => {
                    return (
                      <div className="border border-bm__beige rounded-md bg-bm_card_grey px-2 py-1">
                        Dancing
                      </div>
                    );
                  })}
                </div>
                <Separator />
                <p>Budget's</p>
                <p className="text-[15px]"> N10,000 per week</p>
              </>
            );
          })}
        </Card>
      </div>
    </div>
  );
};

export default ProjectOverview;
