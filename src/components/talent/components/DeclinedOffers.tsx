import React, { useState } from "react";
import drago from "../../../assets/drago.jpg";
import { CardContent, CardFooter } from "../../../ui/card";
import Moment from "react-moment";
import { CiHeart } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Separator } from "../../../ui/seperator";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ContractPreview from "./contractPreview";

const DeclinedOffers = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [popUp, setPopUp] = useState(false);

  const handleProfilePopUp = (project: any) => {
    setSelectedProject(project);
    setPopUp(!popUp);
  };

  const {
    talentOffers: { offers },
  } = useSelector((state: RootState) => state.contractOffer);

  const [apply, setApply] = useState(false);

  return (
    <>
      <div>
        <div className="overflow-y-scroll h-[57vh]">
          {offers?.map((project: any, idx: number) => {
            return (
              project.status === "rejected" && (
                <div
                  key={idx}
                  className="border rounded mb-4 p-3 hover:bg-black/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex w-full">
                    <CardContent className="p-0 space-y-1 flex-1">
                      <div className="flex space-x-2">
                        {!project?.project?.metaData?.createdBy
                          ?.companyLogo && (
                          <div className="flex rounded-full h-[18px] w-[18px] bg-bm__beige"></div>
                        )}
                        {project?.project?.metaData?.createdBy?.companyLogo && (
                          <img
                            src={
                              project?.project?.metaData?.createdBy?.companyLogo
                            }
                            alt="profile"
                            width={18}
                            height={18}
                            className="rounded-full  h-[18px] w-[18px] object-cover"
                          />
                        )}{" "}
                        <p className="border-r px-2 text-[12px] capitalize">
                          {project?.project?.metaData?.createdBy?.agencyName}
                        </p>
                        {/* <p className="text-bm__ox__red text-[10px] flex items-center gap-1">
                    {" "}
                    <GoChecklist className="text-[13px]" />
                    Unverified
                  </p> */}
                        <p className="text-green-900 text-[10px] flex items-center gap-1">
                          {" "}
                          <GoChecklist className="text-[13px]" />
                          Verified
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <h3
                          className="font-medium text-[15px] "
                          onClick={() => handleProfilePopUp(project)}
                        >
                          {project?.project?.projectTitle}

                          <span className="text-[10px] mx-1">
                            {" "}
                            ({project?.project?.projectCategory})
                          </span>
                        </h3>
                        <CiHeart />
                      </div>
                      <p className="font-normal text-[10px] text-[#252525]">
                        {project?.project?.projectDescription}
                      </p>
                    </CardContent>
                    <div className="flex text-[10px]">
                      <p className="border-r h-fit border-bm__beige pr-3 mr-3">
                        Published: {"  "}
                        <Moment format="MMM D, yyy ">
                          {project?.project?.projectPost?.startDate}
                        </Moment>
                      </p>
                      <p className=" h-fit text-bm__ox__red">
                        Closes:{" "}
                        <Moment format="MMM D, yyy ">
                          {project?.project?.projectPost?.endDate}
                        </Moment>
                      </p>
                    </div>
                  </div>
                  <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
                    <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
                      {project?.project?.workingDays.map(
                        (_: any, idx: number) => {
                          return (
                            <div key={idx} className="capitalize">
                              {_},
                            </div>
                          );
                        }
                      )}
                      <div className="text-[11px] p-0  pb-1 px-1">.</div>
                      <div className="">
                        <Moment format="D MMM ">
                          {project?.project?.projectDuration?.startDate}
                        </Moment>
                        {"  "}-{"   "}
                        <Moment format="D MMM ">
                          {project?.project?.projectDuration?.endDate}
                        </Moment>
                      </div>
                      <div className="text-[11px] p-0  pb-1 px-1">.</div>
                      {project?.project?.projectLocation.map(
                        (_: any, idx: number) => {
                          return (
                            <div key={idx} className="capitalize">
                              {_},
                            </div>
                          );
                        }
                      )}{" "}
                    </div>
                  </CardFooter>
                </div>
              )
            );
          })}
        </div>
        <Separator className="my-2 bg-[#d7d8da]" />
        <div className="flex justify-between mt-3 items-center">
          <div className="flex items-center">
            <p className=" text-[#d7d8da] mr-2 text-[10px]">Rows Per Page:</p>
            <div className="border border-gray-300 rounded px-2">
              <span className="hover:bg-gray-200 cursor-pointer mr-2">10</span>
              <span className="hover:bg-gray-200 cursor-pointer mr-2">20</span>
              <span className="hover:bg-gray-200 cursor-pointer mr-2">30</span>
              <span className="hover:bg-gray-200 cursor-pointer mr-2">40</span>
              <span className="hover:bg-gray-200 cursor-pointer">50</span>
            </div>
          </div>

          <div className="flex gap-8 text-bm_black/75 text-[10px] whitespace-nowrap">
            <div className="">First</div>

            <div className="flex gap-8 text-bm_black/75 text-[14px]">
              <BiChevronLeft />
              <p className="text-[10px]">Back</p>

              <p className="text-[10px]">1 - 4 of 4</p>

              <p className="text-[10px]">Next</p>
              <BiChevronRight />
              <p className="text-[10px]">Last</p>
            </div>
          </div>
        </div>
      </div>
      <ContractPreview
        apply={apply}
        close={() => setApply(false)}
        setApply={() => setApply(true)}
        popUp={popUp}
        setPopUp={() => setPopUp(!popUp)}
        selectedProject={selectedProject}
      />
    </>
  );
};

export default DeclinedOffers;
