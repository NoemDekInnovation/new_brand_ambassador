import React, { useEffect } from "react";
import { Separator } from "../../../ui/seperator";
import { Card } from "../../../ui/card";
import Logo from "../../../assets/beauty.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { DialogFooter, DialogHeader } from "../../../ui/dialog";
import { Button } from "../../../ui/button";
import {
  authAxiosInstance,
  campaignAuthAxiosInstance,
} from "../../../api/axios";
import { TalentProps } from "../../../redux/types";
// import TalentCard from "../TalentCard";

import beauty from "../../../assets/beauty.jpg";
import profile from "../../../assets/Profile 2 1.png";
import blue from "../../../assets/WhatsApp Image 2023-10-10 at 01.02 2.png";
import nivea from "../../../assets/IMG_2641 1.png";
import blue2 from "../../../assets/Profile 1 1.png";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
import { IoLocationSharp, IoShareSocial, IoStarHalf } from "react-icons/io5";
import { RiStackshareLine } from "react-icons/ri";
import girl1 from "../../../assets/Rectangle 11 (1).png";
import girl2 from "../../../assets/Gallery=Gallery6.png";
import girl3 from "../../../assets/Profile 1 1.png";
import girl4 from "../../../assets/Profile 2 1.png";
import girl5 from "../../../assets/Rectangle 11 (1).png";
import Age from "../../../assets/Age.png";
import height from "../../../assets/Height.png";
import post from "../../../assets/Project Post.png";
import category from "../../../assets/Category.png";
import group from "../../../assets/Group.png";

import { IoIosHeartEmpty } from "react-icons/io";
import { TalentsProps } from "../../../redux/talent.slice";
import { ProjectViewCard } from "../../projectPreview";
import ViewApplication from "./viewApplications";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export const TalentList = ({
  talent,
  index,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
}: // setProjects,
{
  talent: any;
  index: number;
  handleInvite: any;
  setSelectedProject: any;
  projects: any;
  setSelectedTalent: any;
  handleProfilePopUp: (talent: TalentProps) => void;
  selectedTalent: any;
  selectedProject: any;
  setSelectedTalentID: any;
  setSuccessModal: any;
  successModal: boolean;
  // setProjects: any;
}) => {
  // console.log(talent, "tap");

  function truncateText(text: any, maxLength: any) {
    if (!text || text.length <= maxLength) {
      return text;
    }

    const truncatedText =
      text
        .split(" ")
        .slice(0, maxLength - 1)
        .join(" ") + "...";

    return truncatedText;
  }

  // const [selectedTalent, setSelectedTalent] = useState();

  const [popUp, setPopUp] = useState(false);
  const handleApplyPopUp = (talent: any) => {
    // setSelectedTalent(talent);
    console.log("popUp", popUp);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  const [isShortlisted, setShortlisted] = useState(false);
  // const [projectId, setProjectId] = useState("");

  const handleShortlistClick = () => {
    // Perform shortlisting logic here, if needed
    // For demonstration purposes, just toggle the state
    setShortlisted(true);
  };

  // const [projectId, setProjectId] = useState();

  // const { user } = useSelector((state: RootState) => state.user);
  // useEffect(() => {
  //   // setIsLoading(true);

  //   const fetchProjects = async () => {
  //     if (user !== null) {
  //       const response = await campaignAuthAxiosInstance(`/projects`, {
  //         headers: {
  //           Authorization: `Bearer ${user.authKey || ""}`,
  //         },
  //       });
  //       const projects = response?.data?.data.projects.map((project: any) => {
  //         console.log("i said", project._id, project);
  //         return { value: project._id, label: project.projectDescription };
  //       });

  //       setProjects(projects);
  //       setProjectId(projects[0]._id);
  //     }
  //   };
  //   fetchProjects();
  //   // setIsLoading(false);
  // }, [user?.accountId]);

  // const id = projects._id;
  // console.log("id", id);

  // const projectId = "615f2b3b1a5b9e0016c9b0a5";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     //  setLoading(true);
  //     try {
  //       const user = localStorage.getItem("userData");
  //       if (user !== null) {
  //         const parsedUser = JSON.parse(user);
  //         const response = await authAxiosInstance.get(
  //           `/project-applications/${projectId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${parsedUser.authKey}`,
  //             },
  //           }
  //         );
  //         console.log("my", response.data);
  //         //  setProjectApplications(response.data.data.projectApplications);
  //       }
  //     } catch (error) {
  //       //  setError(error.message || "An error occurred");
  //     } finally {
  //       //  setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [projectId]);

  // console.log("helloooooo");

  return (
    <div key={index} className="bg-white border rounded flex">
      <div onClick={() => handleProfilePopUp(talent)}>
        {talent.profilePic === "" && (
          <img
            src={Logo}
            alt=""
            width={260}
            height={260}
            style={{
              borderRadius: 5,
              height: 108,
              width: 86,
            }}
            className=" hover:grayscale-0 grayscale "
          />
        )}
        {talent.profilePic && (
          <img
            src={talent.profilePic}
            alt=""
            width={260}
            height={260}
            style={{ borderRadius: 5 }}
            className=" hover:grayscale-0 grayscale  w-[196px] h-[162px] object-cover"
          />
        )}
      </div>
      <div className="p-2 w-full">
        <div className="flex w-full justify-between mb-3">
          <div className="flex items-center gap-3">
            {" "}
            <p
              className="text-[15px] font-medium cursor-pointer capitalize"
              onClick={() => handleApplyPopUp(talent)}
            >
              {talent?.fullName}
            </p>
            <AiOutlineHeart />
          </div>
          <div className="flex items-center">
            {talent?.metaData?.isActive && (
              <div className="text-[#00AB26] text-[10px] font-normal">
                Available
              </div>
            )}
            {!talent?.metaData?.isActive && (
              <div className="text-[#FF0000] text-[10px] font-normal">
                Unavailable
              </div>
            )}
            <div className="flex items-center">
              <div className="text-[15px] p-0 px-2">|</div>
              <p className="text-[10px] font-normal">Brand Ambassador</p>
            </div>
          </div>
        </div>
        <div className="mb-3">
          {" "}
          <p className="text-[12px] font-normal mb-3 ">
            {" "}
            {truncateText(talent?.summary || "-", 20)}
          </p>
          <div className="flex flex-row text-[10px] font-normal">
            <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
              {talent?.age || "-"}
            </p>
            <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
              {talent?.height || "-"}
            </p>
            <p className="capitalize`">{talent?.address[0]?.city}</p>
            <p className="border-r border-r-bm__faint__text pr-1 mr-1 capitalize">
              {talent?.address[0]?.state || "-"}
            </p>
            {talent?.experience[0] && (
              <p>{talent?.experience[0]?.agencyName || "-"}</p>
            )}
            {talent?.experience[1] && (
              <p>{talent?.experience[1]?.agencyName || "-"}</p>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 whitespace-nowrap ">
            <div className=" border-r-2 pr-2 text-[10px] font-bold">
              <span className="text-bm__ox__red text-[12px] font-semibold">
                97% {"  "}
              </span>
              Work Success
            </div>
            <div className="text-[10px] font-bold">
              <span className="text-bm__ox__red text-[12px] font-semibold">
                4.5 {"  "}
              </span>
              Ratings
            </div>
          </div>{" "}
        </div>
        <div className="flex gap-4 justify-end">
          <button
            className="light__btn text-[14px] py-0"
            style={{ width: "100px" }}
          >
            <div className="flex items-center gap-2">
              <RiStackshareLine
                style={{
                  fontSize: "1em",
                  flex: "none",
                }}
              />
              <span>Share</span>
            </div>
          </button>
          <button className="light__btn text-[14px] py-0 max-w-fit whiteSpace-nowrap">
            <div className="flex items-center gap-2">
              <span>Send Offer</span>
            </div>
          </button>
          <button
            className="light__btn text-[14px] py-0"
            style={{ whiteSpace: "nowrap", width: "150px" }}
            // onClick={() => handleApplyPopUp(talent)}
          >
            Approve Hire
          </button>
          <button
            className={`dark__btn text-[14px] py-0 ${
              isShortlisted ? "bg-green-500 text-black" : ""
            }`}
            style={{ whiteSpace: "nowrap", width: "150px" }}
            // onClick={() => handleApplyPopUp(talent)}
            // style={buttonStyle}
            onClick={handleShortlistClick}
            disabled={isShortlisted}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
        </div>
      </div>
      <ViewApplication
        popUp={popUp}
        setPopUp={() => setPopUp(!popUp)}
        select={talent}

        // selectedProject={selectedProject}
      />
    </div>
  );
};

export const AppliedTalentGrid = ({
  _,
  idx,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  successModal,
  setModal,
  modal,
}: {
  _: any;
  idx?: number;
  handleInvite?: any;
  setSelectedProject?: any;
  projects?: any;
  setSelectedTalent?: any;
  handleProfilePopUp?: (talent?: TalentProps) => void;
  selectedTalent?: any;
  selectedProject?: any;
  setSelectedTalentID?: any;
  setSuccessModal?: any;
  successModal?: boolean;
  setModal: any;
  modal?: boolean;
}) => {
  // const slides = [beauty, profile, blue, nivea, blue2];
  const slides =
    _.profilePic !== ""
      ? [_.profilePic]
      : [beauty, profile, blue, nivea, blue2];
  const dialogSlide = [girl1, girl2, girl5];
  const modalImage = [girl4, girl3, girl4];

  const [curr, setCurr] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dialogSlide.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + dialogSlide.length) % dialogSlide.length
    );
  };

  const openDialog = (index: any) => {
    setSelectedImageIndex(index);
    setToggleDialog(true);
  };

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  const prev = () => {
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };
  const next = () => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };
  const handleModalPop = () => {
    setSelectedTalentID(_._id);
    setModal(!modal);
  };

  return (
    <>
      <Card className="bg-white h-[262px] w-[196px]">
        <div className="h-[196px] overflow-hidden relative">
          <div className="absolute max-h-[40px] my-auto z-40  inset-0 flex items-center justify-between p-4">
            <button onClick={prev}>
              <FaAngleLeft color="white" />
            </button>
            <button onClick={next}>
              <FaAngleRight color="white" />
            </button>
          </div>
          <div className="absolute top-1 rounded-l-md right-0  z-50 bg-white flex  justify-between items-center    w-[54px] h-[30px] px-2">
            <AiOutlineHeart />
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineMore />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3 space-y-2 shadow-sm rounded-sm border cursor-pointer">
                <DropdownMenuItem
                  className="hover:bg-black/10 flex items-center"
                  onClick={() => handleModalPop()}
                >
                  <RiStackshareLine />
                  <span className="ml-2">Invite</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10 flex items-center">
                  <IoShareSocial />
                  <span className="ml-2">Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className="flex relative transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            <div className="relative flex">
              {slides.map((s, index) => (
                <div
                  className="w-[196px] h-[262px] relative"
                  key={index}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => openDialog(index)}
                >
                  <img
                    src={s}
                    alt=""
                    className="z-50 hover:grayscale-0 grayscale  w-[196px] h-[262px]object-cover"
                    style={{ borderRadius: 5 }}
                  />
                  {hoveredIndex === index && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 h-[50%] z-10">
                      <div className="flex flex-col m-2">
                        <div className="flex items-center space-x-4 mb-1">
                          <div className="flex items-center space-x-1">
                            <img src={Age} alt="" />
                            <div className="text-[8px] font-medium">
                              {_.DOB} years
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img src={height} alt="" />
                            <div className="text-[8px] font-medium">51</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <img
                            src={post}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            Nivea, Coca Cola, Pepsi, Noemdek
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={category}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            In-Store, Open Market, Traffic
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={group}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">97%</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <Dialog open={toggleDialog} onOpenChange={setToggleDialog}>
              <DialogContent className="bg-white p-0 flex flex-col items-center">
                <div className="flex items-center space-x-3 mt-2 mb-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-[18px] font-medium">Gloria Michael</p>
                    <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                    <div className="border-l border-[#D7D8DA] h-8"></div>
                    <p className="text-[12px] font-medium text-[#252525]">
                      Ikeja, Lagos
                    </p>
                    <div className="flex items-center space-x-1">
                      <IoStarHalf />
                      <div className="border-l border-[#D7D8DA] h-8"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <IoIosHeartEmpty />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="hover:bg-black/10 flex items-center">
                        <IoShareSocial />
                        <span className="ml-2">Share</span>
                      </div>
                      <div className="hover:bg-black/10">Invite</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={modalImage[currentImageIndex]}
                    alt={`girl-${currentImageIndex + 1}`}
                    width={400}
                    height={533}
                    className=" h-full w-full"
                    onClick={() => handleImageClick(currentImageIndex)}
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                    <button
                      onClick={handlePrevImage}
                      style={{ color: "white" }}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={handleNextImage}
                      style={{ color: "white" }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="flex flex-row items-center flex-wrap p-0 m-0">
                  {dialogSlide.slice(0, 7).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`girl-${index + 1}`}
                      className="h-[80px]"
                    />
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="px-1">
          <div className="flex items-center gap-3 whitespace-nowrap px-2 py-1">
            <p className="text-[12px] font-medium capitalize">{_.fullName}</p>
            <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
            <div className="flex items-center gap-2">
              <IoLocationSharp />
              <p className="text-[8px] font-medium leading-3 capitalize text-[#252525]">
                {_.address[0]?.city} {_.address[0]?.state}
              </p>
            </div>
            <div className="w-[1px] h-3 bg-[#D7D8DA]"></div>
            <div className="flex items-center gap-2">
              {/* <IoStarHalf />
            <p>4.5</p> */}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
