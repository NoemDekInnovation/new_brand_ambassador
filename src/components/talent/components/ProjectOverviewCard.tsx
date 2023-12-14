import { CardContent } from "../../../ui/card";

import { Separator } from "../../../ui/seperator";
import ItemCard from "./ItemCard";
import { Button } from "../../../ui/button";
import {
  DayObject,
  daysOfWeekx,
} from "../../agency/createproject/projectBudget";
import { GiPaperClip } from "react-icons/gi";

const ProjectOverviewCard = ({
  selectedProject,

  formattedStartDate,
  formattedEndDate,
}: {
  selectedProject: any;
  formattedStartDate: any;
  formattedEndDate: any;
}) => {
  return (
    <div className="flex flex-col overflow-y-scroll h-full pb-10">
      <ItemCard title={"Description"}>
        <h2>In-Store</h2>
        <Separator className="bg-bm__beige my-4" />

        <p>{selectedProject?.project?.projectDescription || "-"}</p>
      </ItemCard>
      <ItemCard title={"Talent Type and Budget"}>
        <CardContent>
          {selectedProject?.project?.talent.map((talent: any, idx: number) => {
            return (
              <div className="capitalize" key={idx}>
                <h2>{talent?.opportunities}</h2>

                <div className="pt-4">
                  <p className=" capitalize text-[16px] font-normal">
                    {/* <p>BSc.</p> */}
                    {talent?.qualifications || "-"}
                  </p>
                  <Separator className="bg-bm__beige my-3" />
                </div>
                <div className="pt-2">
                  <p>Skills</p>
                  <div className="py-3 flex gap-6 max-w-3xl flex-wrap">
                    {talent?.skills.map((skill: string, idx: number) => {
                      return (
                        <div className="" key={idx}>
                          <Button className="light__btn max-w-fit capitalize">
                            {skill}
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="bg-bm__beige my-2" />
                </div>
                <div className="pt-2">
                  <p>Budget</p>
                  <div className="flex justify-between items-center">
                    {(talent?.salary && (
                      <div className="pt-2 flex gap-6 max-w-3xl capitalize">
                        {talent?.salary} {talent?.paymentOptions}
                      </div>
                    )) ||
                      "-"}{" "}
                  </div>
                </div>
                <Separator className="bg-bm__beige my-4 py-[2px]" />
              </div>
            );
          })}
          {/* <Separator className="bg-bm__beige my-4 py-[2px]" /> */}
        </CardContent>
      </ItemCard>
      <ItemCard title={"Duration and Location"}>
        <CardContent>
          <div className="flex justify-between items-center">
            <h2 className="text-[18px] font-medium capitalize">
              {formattedStartDate} to {formattedEndDate}
            </h2>
          </div>

          <Separator className="bg-bm__beige my-4" />
          <div className="py-3">
            <p>Working Days</p>
            <div className="pt-2 flex gap-4 max-w-3xl mt-2 mb-4 cursor-pointer flex-wrap">
              {daysOfWeekx.map(({ label, value }: DayObject, index) => (
                <div
                  key={index}
                  className={` rounded-md p-2 px-3 mb-4 capitalize font-semibold 
                        ${
                          selectedProject?.project?.workingDays.includes(value)
                            ? "bg-[#252525] text-white"
                            : "bg-bm_card_grey"
                        }`}
                >
                  {label}
                </div>
              ))}
            </div>
            <Separator className="bg-bm__beige my-2" />
          </div>
          <div className="pt-2">
            <p className="mb-2">Location</p>
            <div className="py-2 flex gap-6 max-w-3xl flex-wrap">
              {selectedProject?.project?.projectLocation.lenght === 0 && "-"}
              {selectedProject?.project?.projectLocation.map(
                (_: any, idx: number) => {
                  return (
                    <Button
                      className="light__btn  max-w-fit capitalize"
                      key={idx}
                    >
                      {_}
                    </Button>
                  );
                }
              )}{" "}
            </div>
            {/* <Separator className="bg-bm__beige my-2" /> */}
          </div>
        </CardContent>
      </ItemCard>
      <ItemCard title={"Requirements"}>
        <p>{selectedProject?.project?.projectRequirements || "-"}</p>

        <Separator className="bg-bm__beige my-4" />

        {selectedProject?.project?.document.map((_: any, idx: number) => {
          return (
            <a
              key={idx}
              className="capitalize border p-2 rounded-lg w-fit border-bm_black flex items-center text-[12px]"
              href={_}
            >
              <span>
                <GiPaperClip className="mr-2 text-[18px]" />
              </span>
              {_}
            </a>
          );
        })}
      </ItemCard>
    </div>
  );
};

export default ProjectOverviewCard;
