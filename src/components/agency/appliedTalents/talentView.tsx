import React, { useEffect } from "react";
import { Separator } from "../../../ui/seperator";
import { Card, CardContent } from "../../../ui/card";
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
import {
  IoDocumentAttachOutline,
  IoLocationSharp,
  IoShareSocial,
  IoStarHalf,
} from "react-icons/io5";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { Input } from "../../../ui/input";
import SelectOption from "../../../libs/select";
import SendOfferModal from "../../../libs/sendOffer";
import OfferModal from "../../../libs/OfferModal";
import { Checkbox } from "../../../ui/checkbox";
import HeartIcon from "../../../libs/HeartIcon";
import SendOfferPopUp from "../contract/sendOfferPopUp";
import SendContractPopUp from "../contract/sendContractPopUp";
import { useToast } from "../../../ui/use-toast";
import Loading from "../../Loading";
import { setStatus } from "../../../redux/applicantions.slice";
import Moment from "react-moment";

type AppProps =
  | "shortlisted"
  | "rejected"
  | "approvedHire"
  | "All"
  | "training";

export const TalentList = ({
  talent,
  index,
  appStatus,
  handleInvite,
  setSelectedProject,
  projects,
  setSelectedTalent,
  handleProfilePopUp,
  selectedTalent,
  setSelectedTalentID,
  selectedProject,
  setSuccessModal,
  ProjectId,
  handleCheckedChange,
  successModal,
  setAppStatus,
}: {
  setAppStatus: (value: React.SetStateAction<AppProps>) => void;
  talent: any;
  index: number;
  ProjectId: string;
  handleInvite: any;
  setSelectedProject: any;
  projects: any;
  appStatus: string;
  setSelectedTalent: any;
  handleProfilePopUp: (talent: TalentProps) => void;
  selectedTalent: any;
  selectedProject: any;
  setSelectedTalentID: any;
  setSuccessModal: any;
  handleCheckedChange?: any;
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

  const appOptions: any = [
    { value: "All Applications", label: "All Applications" },
    { value: "My Talent", label: "My Talent" },
    { value: "Favorites", label: "Favorites" },
    { value: "Current Contracts", label: "Current Contracts" },
    { value: "Engaged", label: "Engaged" },
    { value: "Invited", label: "Invited" },
  ];

  // const [selectedTalent, setSelectedTalent] = useState();

  const [popUp, setPopUp] = useState(false);
  const handleApplyPopUp = (talent: any) => {
    // setSelectedTalent(talent);
    // console.log("popUp", popUp);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [isShortlisted, setShortlisted] = useState(false);
  const [offers, setOffers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [offerSelectorList, setOfferSelectorList] = useState([]);
  const [contractSelectorList, setContractSelectorList] = useState([]);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openContractDialog, setOpenContractDialog] = useState(false);

  const { toast } = useToast();

  const dispatch = useDispatch();
  const handleShortlistClick = () => {
    // Perform shortlisting logic here, if needed
    // For demonstration purposes, just toggle the state
    setShortlisted(true);
  };

  var formdata = new FormData();

  var requestOptions = {
    method: "GET",
    body: formdata,
    redirect: "follow",
  };

  const handleListing = () => {
    try {
    } catch (error) {}
  };
  const user = useSelector((state: RootState) => state.user);

  const handleShortlistStatus = async (status: AppProps) => {
    if (user?.user?.accountId !== undefined) {
      try {
        setLoading(true);
        const response = await campaignAuthAxiosInstance.post(
          `/add-shortlist/${ProjectId}?status=${status}`,
          [
            {
              talentId: talent._id,
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );

        dispatch(
          setStatus({
            totalRejected: response?.data?.totalRejected,
            totalShortlists: response?.data?.totalShortlists,
            totalTrained: response?.data?.totalTrained,
          })
        );
        setAppStatus(status);

        toast({
          description: response?.data?.responses[0]?.message,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const fetchContractOffers = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/offers/${ProjectId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        const offers = response.data.data.projectOffers;
        setOffers(offers);

        setOfferSelectorList(
          offers.map((offer: any) => {
            return {
              label: capitalizeFirstLetter(offer?.offerName),
              value: capitalizeFirstLetter(offer?.offerName),
            };
          })
        );
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  const fetchContracts = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/contracts/${ProjectId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        const contracts = response.data.data.projectContracts;
        setContracts(contracts);

        setContractSelectorList(
          contracts.map((contract: any) => {
            return {
              label: capitalizeFirstLetter(contract?.contractName),
              value: capitalizeFirstLetter(contract?.contractName),
            };
          })
        );
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };
  useEffect(() => {
    fetchContractOffers();
    fetchContracts();
  }, []);

  const handleSelection = (value: any) => {
    const offerInfo = offers.filter(
      (offer: any) => offer?.offerName.toLowerCase() === value.toLowerCase()
    );
    setSelectedOffer(offerInfo);
  };

  const handleContractSelection = (value: any) => {
    const contractInfo = contracts.filter(
      (contract: any) =>
        contract?.contractName.toLowerCase() === value.toLowerCase()
    );
    setSelectedContract(contractInfo);
  };

  const offerHandler = async () => {
    const payload = [
      {
        talentId: talent._id,
        offerName: selectedOffer[0]?.offerName,
        offerDescription: selectedOffer[0]?.offerDescription,
        documentUrl: selectedOffer[0]?.document,
        terms: selectedOffer[0]?.terms,
        policies: selectedOffer[0]?.policies,
      },
    ];
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/contract-offer/${ProjectId}`,
          // `/contract-offer/${talent._id}/${ProjectId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setStatusMessage(response.data.message || "Success");
        setModalOpen(true);

        setTimeout(() => {
          setModalOpen(false);
          setOpenAddressDialog(false);
        }, 2000);
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
      }
    }
  };

  const contractHandler = async () => {
    const payload = [
      {
        talentId: talent._id,
        contractId: selectedContract[0]?._id,
      },
    ];
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/send-contract/${ProjectId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setStatusMessage(response.data.message || "Success");
        setModalOpen(true);

        setTimeout(() => {
          setModalOpen(false);
          setOpenContractDialog(false);
        }, 2000);
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleOffer = async () => {
    await offerHandler();
  };

  const handleContract = async () => {
    await contractHandler();
  };

  useEffect(() => {
    const currentTime = new Date();

    let lastOnline: Date | string = talent.metaData.lastOnline;
    console.log("typeof", talent); // Check the type of lastOnline before parsing

    // Parse the string into a Date object
    if (typeof lastOnline === "string") {
      lastOnline = new Date(lastOnline);
    }

    const timeDifference = currentTime.getTime() - lastOnline.getTime();
    if (timeDifference < 5 * 60 * 1000) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div key={index} className="bg-white border rounded flex">
        <div onClick={() => handleProfilePopUp(talent)}>
          {talent?.profilePic === "" && (
            <div className="bg-black/70 w-[86px] h-[130px] rounded-md">
              <img
                src={Logo}
                alt=""
                style={{
                  borderRadius: 5,
                }}
                className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[130px] object-cover"
              />
            </div>
          )}
          {talent.profilePic && (
            <div className="bg-black/70 w-[86px] h-[130px] rounded-md">
              <img
                src={talent.profilePic}
                alt=""
                style={{ borderRadius: 5 }}
                className=" hover:grayscale-0 grayscale w-full max-w-[86px] h-full max-h-[130px] object-cover"
              />
            </div>
          )}
        </div>
        <div className="p-2 w-full">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                onCheckedChange={() => handleCheckedChange(talent._id)}
              />

              <p
                className="text-[15px] font-medium cursor-pointer capitalize"
                onClick={() => handleApplyPopUp(talent)}
              >
                {talent?.fullName}
              </p>
              <HeartIcon
                selectedTalentID={talent?._id}
                favorites={talent?.favorites}
              />
            </div>
            <div className="flex items-center">
              {isOnline && (
                <div className="text-[#00AB26] text-[10px] font-normal border-r-2 pr-2">
                  Available
                </div>
              )}
              {!isOnline && (
                <div className="text-[#FF0000] text-[10px] font-normal border-r-2 pr-2">
                  Unavailable
                </div>
              )}
              <div className="capitalize pl-2   text-[10px]">
                {talent?.opportunities[0]}
              </div>
            </div>
          </div>
          <div className="mb-3">
            {" "}
            <p className="text-[12px] font-normal  ">
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
            {appStatus === "All" ? (
              // {appStatus === "shortlisted" || appStatus === "All" ? (
              <button
                className="border rounded-md border-red-500 text-red-500 text-[14px] py-0"
                style={{ whiteSpace: "nowrap", width: "150px" }}
                // onClick={() => handleApplyPopUp(talent)}
                onClick={() => handleShortlistStatus("rejected")}
              >
                Reject{" "}
              </button>
            ) : (
              ""
            )}
            {appStatus === "shortlisted" ? (
              <button className="dark__btn text-[14px] py-0 max-w-fit whiteSpace-nowrap">
                <div className="flex items-center gap-2">
                  <SendOfferPopUp
                    openAddressDialog={openAddressDialog}
                    setOpenAddressDialog={setOpenAddressDialog}
                    offerSelectorList={offerSelectorList}
                    handleSelection={handleSelection}
                    selectedOffer={selectedOffer}
                    handleOffer={handleOffer}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    statusMessage={statusMessage}
                  />

                  <span onClick={() => setOpenAddressDialog(true)}>
                    Send Offer
                  </span>
                  {/* <span onClick={() => handleShortlistStatus("rejected")}>
                    handleShortlistStatus
                  </span> */}
                </div>
              </button>
            ) : (
              ""
            )}
            {appStatus === "training" ? (
              <button className="dark__btn text-[14px] py-0 max-w-fit whiteSpace-nowrap">
                <div className="flex items-center gap-2">
                  <span onClick={() => setOpenContractDialog(true)}>
                    Send Contract
                  </span>
                  <SendContractPopUp
                    openContractDialog={openContractDialog}
                    setOpenContractDialog={setOpenContractDialog}
                    offerSelectorList={contractSelectorList}
                    handleSelection={handleContractSelection}
                    selectedOffer={selectedContract}
                    handleOffer={handleContract}
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    statusMessage={statusMessage}
                  />
                </div>
              </button>
            ) : (
              ""
            )}
            {appStatus === "rejected" || appStatus === "All" ? (
              <button
                className={`dark__btn text-[14px] py-0 ${
                  isShortlisted ? "bg-green-500 text-black" : ""
                }`}
                style={{ whiteSpace: "nowrap", width: "150px" }}
                // onClick={() => handleApplyPopUp(talent)}
                // style={buttonStyle}
                onClick={() => handleShortlistStatus("shortlisted")}
                disabled={isShortlisted}
              >
                {isShortlisted ? "Shortlisted" : "Shortlist"}
              </button>
            ) : (
              ""
            )}{" "}
          </div>
        </div>
        <ViewApplication
          popUp={popUp}
          setPopUp={() => setPopUp(!popUp)}
          select={talent}

          // selectedProject={selectedProject}
        />
      </div>
    </>
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
    _?.profilePic !== null
      ? [_?.profilePic]
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
    setSelectedTalentID(_?._id);
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
                    className="z-50 hover:grayscale-0 grayscale  w-[196px] h-[262px] object-cover"
                    style={{ borderRadius: 5 }}
                  />
                  {hoveredIndex === index && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 h-[50%] z-10">
                      <div className="flex flex-col m-2">
                        <div className="flex items-center space-x-4 mb-1">
                          <div className="flex items-center space-x-1">
                            <img src={Age} alt="" />
                            <div className="text-[8px] font-medium">
                              <Moment format="D ">{_?.DOB}</Moment>
                              years
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <img src={height} alt="" />
                            <div className="text-[8px] font-medium">
                              {_?.height}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mb-1">
                          <img
                            src={post}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            {_?.experience || "-"}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <img
                            src={category}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">
                            {/* In-Store, Open Market, Traffic */}
                            {_?.experience || "-"}
                          </div>
                        </div>
                        {/* <div className="flex items-center space-x-1">
                          <img
                            src={group}
                            alt=""
                            className="h-[12px] w-[12px]"
                          />
                          <div className="text-[8px] font-medium">97%</div>
                        </div> */}
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
            <p className="text-[12px] font-medium capitalize">{_?.fullName}</p>
            <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
          </div>
          <Separator />
          <div className="flex items-center gap-2 whitespace-nowrap px-2 py-1">
            <div className="flex items-center gap-2">
              <IoLocationSharp />
              <p className="text-[8px] font-medium leading-3 capitalize text-[#252525]">
                {_?.address[0]?.city} {_?.address[0]?.state}
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
