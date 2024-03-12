import React, { useEffect, useState } from "react";
import drago from "../../../assets/drago.jpg";

import { CardContent, CardFooter } from "../../../ui/card";

import Moment from "react-moment";

import { CiHeart } from "react-icons/ci";
import { GoChecklist } from "react-icons/go";
import ProjectPreview from "./projectPreview";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchTalentInvitations } from "../../../redux/talentInvitations.slice";
import { Separator } from "../../../ui/seperator";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import ContractPreview from "./contractPreview";
import { fetchTalentOffers } from "../../../redux/contract-offer";
import { fetchTalentApplications } from "../../../redux/talentApplications.slice";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import OfferModal from "../../../libs/OfferModal";

const ContractOffers = () => {
  const [selectedProject, setSelectedProject] = useState();
  const [popUp, setPopUp] = useState(false);

  const handleProfilePopUp = (project: any) => {
    setSelectedProject(project);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  const {
    talentOffers: { offers },
  } = useSelector((state: RootState) => state.contractOffer);
  const user = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState();
  const [apply, setApply] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchTalentApplications(null));
    dispatch(fetchTalentInvitations());
    dispatch(fetchTalentOffers(null));
  }, []);

  const declineOffer = async (project: any) => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/accept-or-reject-offer/${project.project._id}?status=rejected`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
        setStatusMessage(response.data.message || "Success");
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
      }
    }
  };

  useEffect(() => {
    // Open the modal after the status message is set
    if (statusMessage) {
      setModalOpen(true);
    }
  }, [statusMessage]);

  // console.log(offers);

  return (
    <>
      <div>
        <div className="overflow-y-scroll h-[57vh]">
          {offers?.map((project: any, idx: number) => {
            return (
              <div
                key={idx}
                className="border rounded mb-4 p-3 hover:bg-black/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex w-full flex-col md:flex-row gap-2">
                  <CardContent className="p-0 space-y-1 flex-1">
                    <div className="flex space-x-2">
                      {!project?.project?.metaData?.createdBy?.companyLogo && (
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
                <CardFooter className="mt-3 p-0 md:gap-6 flex-col items-start sm:flex-row  sm:items-end">
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
                  <div className="flex gap-3">
                    <button
                      className="border-red-500 text-red-500 rounded-md max-w-fit text-[12px] mt-2 p-1 px-4 border"
                      onClick={() => {
                        declineOffer(project);
                        setApply(true);
                      }}
                    >
                      Decline Offer
                    </button>
                    <button
                      className="dark__btn max-w-fit text-[12px] mt-2 "
                      onClick={() => {
                        handleProfilePopUp(project);
                        // setApply(true);
                      }}
                    >
                      Accept Offer
                    </button>
                  </div>
                </CardFooter>
              </div>
            );
          })}
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
      <OfferModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        statusMessage={statusMessage}
      />
    </>
  );
};

export default ContractOffers;
