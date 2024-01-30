import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { BiSortAlt2 } from "react-icons/bi";
import { TbLayoutGrid } from "react-icons/tb";
import { useToast } from "../../ui/use-toast";

import {
  AiOutlineHeart,
  AiOutlineMore,
  AiOutlineSearch,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { Separator } from "@radix-ui/react-separator";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import Pagination from "../../ui/Pagination";
import { ProjectProps, TalentProps } from "../../redux/types";

import { Button } from "../../ui/button";
import { authAxiosInstance, campaignAuthAxiosInstance } from "../../api/axios";
import Logo from "../../assets/beauty.jpg";
import { Input } from "../../ui/input";
import { SelectGroup, SelectLabel } from "../../ui/select";
import { TalentType } from "../agency/TalentsView";
import SelectOption from "../../libs/select";
import AllApplications from "../agency/appliedTalents/AllApplications";
import CurrentContacts from "../agency/appliedTalents/CurrentContacts";
import FavoriteTalents from "../agency/appliedTalents/FavoriteTalents";
import Engaged from "../agency/appliedTalents/Engaged";
import MyTalents from "../agency/appliedTalents/MyTalents";

import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import {
  fetchApplications,
  filterApplications,
  // filterApplications,
  setApproval,
} from "../../redux/applicantions.slice";
import { any } from "zod";
import {
  TalentQueryProp,
  setPageQuery,
  setTalentQuery,
} from "../../redux/talent.slice";
import OfferModal from "../../libs/OfferModal";

const categoryOptions: any = [
  { value: "All Talent", label: "All Talent" },
  { value: "Current Contracts", label: "Current Contracts" },
  { value: "Favorites", label: "Favorites" },
  { value: "Engaged", label: "Engaged" },
  { value: "My Talent", label: "My Talent" },
  { value: "Invited", label: "Invited" },
];

const appOptions: any = [
  { value: "All Applications", label: "All Applications" },
  { value: "My Talent", label: "My Talent" },
  { value: "Favorites", label: "Favorites" },
  { value: "Current Contracts", label: "Current Contracts" },
  { value: "Engaged", label: "Engaged" },
  { value: "Invited", label: "Invited" },
];

const actionOptions: any = [
  { value: "Shortlist", label: "Shortlist" },
  { value: "Send Offer", label: "Send Offer" },
  { value: "Reject", label: "Reject" },
];

const talentOptions: any = [
  { value: "ba", label: "Brand Ambassador" },
  { value: "supervisor", label: "Supervisor" },
];

const ApplyDetailsInfo = ({
  // activeType,
  handleProfilePopUp,
  ProjectId,
}: {
  handleProfilePopUp: (talent: TalentProps) => void;
  ProjectId: string;
}) => {
  let pageTalents;

  type AppProps =
    | "shortlisted"
    | "rejected"
    | "approvedHire"
    | "All"
    | "training";
  // console.log("activeType", activeType);

  const [gridView, setGridView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedOppor, setSelectedOppor] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [ageRange, setAgeRange] = useState({ start: "", end: "" });
  const [selectedRole, setSelectedRole] = useState<TalentProps>();
  const [projects, setProjects] = useState<ProjectProps[]>();
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTalent, setSelectedTalent] = useState("");
  const [selectedTalentID, setSelectedTalentID] = useState("");
  const [projectModal, setProjectModal] = useState(false);
  const [activeType, setActiveType] = useState<TalentType>("All Talent");
  const [talentType, setTalentType] = useState("");
  const [gender, setGender] = useState("");
  const [sortQuery, setSortQuery] = useState<TalentQueryProp | null>(null);
  const [appStatus, setAppStatus] = useState<AppProps>("All");
  const [checkedTalentIds, setCheckedTalentIds] = useState<string[]>([]);
  const [offerSelectorList, setOfferSelectorList] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [bulkModal, setBulkModal] = useState(false);

  const { toast } = useToast();

  const onTalentTypeChnage = (type: TalentType) => {
    // setActiveType(type);
  };

  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);
  const { talentQuery } = useSelector((state: RootState) => state.talent);

  const { applications, page, pageSize, totalApplications, totalPages } =
    useSelector((state: RootState) => state?.applications);

  const { projectApplications: applied } = useSelector(
    (state: RootState) => state.projectApplication
  );

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };

  const handleClear = () => {
    setSelectedLocation("all");
    setSelectedOppor("all");
    setAgeRange({ ...ageRange, start: "" });
    setAgeRange({ ...ageRange, end: "" });
    setSortQuery(null);
    setSelectedGender("all");
  };

  const handleCheckedChange = (talentId: string) => {
    // Check if the talentId is already in the array
    if (checkedTalentIds.includes(talentId)) {
      // If checked, remove it from the array
      setCheckedTalentIds(checkedTalentIds.filter((id) => id !== talentId));
    } else {
      // If not checked, add it to the array
      setCheckedTalentIds([...checkedTalentIds, talentId]);
    }
  };
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const fetchContractOffers = async () => {
    if (user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/offers/${ProjectId}`,
          {
            headers: {
              Authorization: `Bearer ${user?.authKey || ""}`,
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

  const handleViewToggle = () => {
    setGridView(!gridView);
  };

  useEffect(() => {
    const fetchTalents = async () => {
      if (user?.accountId) {
        if (activeType === "My Talent") {
          // dispatch(fetchTalents());
        } else if (activeType === "Current Contracts") {
        } else if (activeType === "All Talent") {
        } else if (activeType === "Engaged") {
        } else if (activeType === "Favorites") {
        } else {
          // console.log("No data yet");
        }
      }
    };
    fetchTalents();
  }, [activeType]);

  useEffect(() => {
    fetchContractOffers();

    dispatch(fetchApplications({ id: ProjectId, queryParams: null }));
    // dispatch(filterApplications({ id: ProjectId, status: "shortlisted" }));
  }, []);

  useEffect(() => {
    dispatch(fetchApplications({ id: ProjectId, queryParams: talentQuery }));
    // dispatch(filterApplications({ id: ProjectId, status: "shortlisted" }));
  }, [talentQuery]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setTalentQuery(sortQuery));
    }, 1000);
  }, [sortQuery]);

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      if (user !== null) {
        const response = await campaignAuthAxiosInstance(`/projects`, {
          headers: {
            Authorization: `Bearer ${user.authKey || ""}`,
          },
        });
        const projects = response?.data?.data.projects.map((project: any) => {
          return { value: project._id, label: project?.projectTitle };
        });

        setProjects(projects);
      }
    };
    fetchProjects();
    setIsLoading(false);
  }, [user?.accountId]);

  const handleInvite = async () => {
    setIsLoading(true);
    if (user !== null) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/invite-to-project`,
          [
            {
              opportunities: selectedTalent,
              projectId: selectedProject,
              talentId: selectedTalentID,
            },
          ],
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        setIsLoading(false);
        // setSuccessModal(false);
        setProjectModal(!projectModal);
        setSuccessModal(true);

        return setTimeout(() => {
          setSuccessModal(false);
        }, 3000);
      } catch (error) {
        setIsLoading(false);

        // console.log(error);
      }
    }
  };

  const bulkHandler = (e: any) => {
    if (e.value === "Shortlist") {
      return handleGroupSubmit("shortlisted");
    }
    if (e.value === "Reject") {
      return handleGroupSubmit("rejected");
    }
    setBulkModal(!bulkModal);
  };

  const handleGroupSubmit = async (status: string) => {
    setIsLoading(true);

    const payload = checkedTalentIds.map((talentId: string) => {
      return {
        talentId: talentId,
      };
    });
    if (user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/add-shortlist/${ProjectId}?status=${status}`,
          payload,

          {
            headers: {
              Authorization: `Bearer ${user?.authKey || ""}`,
            },
          }
        );

        setIsLoading(false);
        setSuccessMessage(`Talent have been ${status} successfully`);
        // setBulkModal(!bulkModal);
        setSuccessModal(true);

        return setTimeout(() => {
          setSuccessModal(false);
        }, 3000);
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        setIsLoading(false);
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  const offerHandler = async () => {
    setIsLoading(true);

    // const payload = [
    //   {
    //     talentId: talent._id,
    //     offerName: selectedOffer[0]?.offerName,
    //     offerDescription: selectedOffer[0]?.offerDescription,
    //     documentUrl: selectedOffer[0]?.document,
    //   },
    // ];

    const payload = checkedTalentIds.map((talentId: string) => {
      return {
        talentId: talentId,
        offerName: selectedOffer[0]?.offerName,
        offerDescription: selectedOffer[0]?.offerDescription,
        documentUrl: selectedOffer[0]?.document,
      };
    });

    if (user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/contract-offer/${ProjectId}`,
          // `/contract-offer/${talent._id}/${ProjectId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${user?.authKey || ""}`,
            },
          }
        );
        setSuccessMessage(response.data.message || "Success");
        setTimeout(() => {
          setSuccessModal(true);
        }, 300);
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setSuccessMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setSuccessMessage(
            "An error occurred while saving. Please try again."
          );
        }
      }
    }
  };

  switch (activeType) {
    case "All Talent":
      pageTalents = (
        <>
          <AllApplications
            setAppStatus={setAppStatus}
            gridView={gridView}
            successModal={successModal}
            setSuccessModal={setSuccessModal}
            handleInvite={handleInvite}
            setSelectedProject={setSelectedProject}
            projects={projects}
            setSelectedTalent={setSelectedTalent}
            // handleProfilePopUp={handleProfilePopUp}
            selectedTalent={selectedTalent}
            bulkModal={bulkModal}
            setBulkModal={setBulkModal}
            setSelectedTalentID={setSelectedTalentID}
            selectedProject={selectedProject}
            projectModal={projectModal}
            ProjectId={ProjectId}
            offerSelectorList={offerSelectorList}
            appStatus={appStatus}
            setProjectModal={setProjectModal}
            gap={14}
            offerHandler={offerHandler}
            handleGroupSubmit={handleGroupSubmit}
            handleCheckedChange={handleCheckedChange}
            offers={offers}
            setSelectedOffer={setSelectedOffer}
          />

          <OfferModal
            isOpen={successModal}
            onClose={() => setSuccessModal(false)}
            statusMessage={successMessage}
          />
        </>
      );
      break;
    // case "Current Contracts":
    //   pageTalents = (
    //     <CurrentContacts
    //       gridView={gridView}
    //       successModal={successModal}
    //       setSuccessModal={setSuccessModal}
    //       handleInvite={handleInvite}
    //       setSelectedProject={setSelectedProject}
    //       projects={projects}
    //       setSelectedTalent={setSelectedTalent}
    //       handleProfilePopUp={handleProfilePopUp}
    //       selectedTalent={selectedTalent}
    //       setSelectedTalentID={setSelectedTalentID}
    //       selectedProject={selectedProject}
    //     />
    //   );
    //   break;
    // case "Favorites":
    //   pageTalents = (
    //     <FavoriteTalents
    //       gridView={gridView}
    //       successModal={successModal}
    //       setSuccessModal={setSuccessModal}
    //       handleInvite={handleInvite}
    //       setSelectedProject={setSelectedProject}
    //       projects={projects}
    //       setSelectedTalent={setSelectedTalent}
    //       handleProfilePopUp={handleProfilePopUp}
    //       selectedTalent={selectedTalent}
    //       setSelectedTalentID={setSelectedTalentID}
    //       selectedProject={selectedProject}
    //     />
    //   );
    //   break;
    // case "Engaged":
    //   pageTalents = (
    //     <Engaged
    //       gridView={gridView}
    //       successModal={successModal}
    //       setSuccessModal={setSuccessModal}
    //       handleInvite={handleInvite}
    //       setSelectedProject={setSelectedProject}
    //       projects={projects}
    //       setSelectedTalent={setSelectedTalent}
    //       handleProfilePopUp={handleProfilePopUp}
    //       selectedTalent={selectedTalent}
    //       setSelectedTalentID={setSelectedTalentID}
    //       selectedProject={selectedProject}
    //     />
    //   );
    //   break;
    // case "My Talent":
    //   pageTalents = (
    //     <MyTalents
    //       gridView={gridView}
    //       successModal={successModal}
    //       setSuccessModal={setSuccessModal}
    //       handleInvite={handleInvite}
    //       setSelectedProject={setSelectedProject}
    //       projects={projects}
    //       setSelectedTalent={setSelectedTalent}
    //       handleProfilePopUp={handleProfilePopUp}
    //       selectedTalent={selectedTalent}
    //       setSelectedTalentID={setSelectedTalentID}
    //       selectedProject={selectedProject}
    //     />
    //   );
    //   break;
    default:
      pageTalents = null;
  }

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handleGenderChange = (gender: any) => {
    updateQuery({ gender });
    setGender(gender);
  };

  const handleRoleChange = (role: any) => {
    updateQuery({ opportunities: role });
    setTalentType(role);
  };

  const handlePageSizeChange = (size: any) => {
    updateQuery({ pageSize: size });
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(setTalentQuery(sortQuery));
    }, 1000);
  }, [sortQuery]);

  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  return (
    <>
      {/* <CardContent className="flex-1 flex flex-col m-0 p-0 mt-2 md:mt-0"> */}
      {/* <div className="flex-1"> */}
      <div className="flex relative items-center justify-between gap-2">
        <div className="flex gap-3 md:gap-8">
          {/* <p
            className="font-semibold text-[18px] "
            onClick={() => {
              dispatch(fetchApplications({ id: ProjectId }));
              setAppStatus("All");
            }}
          >
            All Applications
          </p> */}
          {/* <div className="relative h-full">
            <SelectOption
              className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
              placeholder="Select Category "
              id="projectCategory"
              name="projectCategory"
              required
              onChange={(e: any) => onTalentTypeChnage(e.value)}
              options={appOptions}
              defaultValue={activeType}
              isDisabled={false}
            />
          </div>
          <div className="h-9 w-0.5 bg-[#D7D8DA]"></div> */}
          <div className="flex item-center m-0 border rounded-md">
            <button
              className={`${
                appStatus === "shortlisted" ? "bg-[#DCDDDF]" : ""
              } px-4 gap-2 transistion-all duration-1000`}
              onClick={() => {
                dispatch(
                  filterApplications({ id: ProjectId, status: "shortlisted" })
                );
                setAppStatus("shortlisted");
              }}
            >
              Shortlisted
              <span className="text-[16px] font-semibold text-black">
                {" "}
                ({applications?.data?.totalShortlists})
              </span>
            </button>
            <div className="h-9 w-0.5 bg-[#D7D8DA]"></div>
            <button
              className={`${
                appStatus === "training" ? "bg-[#DCDDDF]" : ""
              } px-4 gap-2 transistion-all duration-1000`}
              onClick={() => {
                dispatch(
                  filterApplications({ id: ProjectId, status: "trained" })
                );
                setAppStatus("training");
              }}
            >
              Training
              <span className="text-[16px] font-semibold text-black">
                {" "}
                ({applications?.data?.totalTrained})
              </span>
            </button>

            <div className="h-9 w-0.5 bg-[#D7D8DA]"></div>
            <button
              className={`${
                appStatus === "rejected" ? "bg-[#DCDDDF]" : ""
              } px-4 gap-2 transistion-all duration-1000`}
              onClick={() => {
                dispatch(
                  filterApplications({ id: ProjectId, status: "rejected" })
                );
                setAppStatus("rejected");
              }}
            >
              Rejected
              <span className="text-[16px] font-semibold text-black">
                ({applications?.data?.totalRejected})
              </span>
            </button>
          </div>
          {/* <div className="bg-gray-400 h-[30px] w-[4px] "></div> */}
          <button
            className="border rounded-md bg-bm__beige  p-1 px-3"
            onClick={handleClear}
          >
            Clear Filter
          </button>
        </div>
      </div>
      {/* <CardContent className="flex-1 flex flex-col m-0 p-0 mt-2 md:mt-0"> */}
      <div className="flex-1">
        <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />
        <div className="flex justify-between flex-col gap-2 lg:flex-row items-center">
          <Checkbox />
          <div className="relative h-full">
            <SelectOption
              className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
              placeholder="Actions"
              id="projectCategory"
              name="projectCategory"
              onChange={bulkHandler}
              required
              options={actionOptions}
              defaultValue={activeType}
              isDisabled={false}
            />
          </div>{" "}
          <div className="relative h-full">
            <SelectOption
              className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
              placeholder="Talent type"
              id="projectTalent"
              name="projectTalent"
              onChange={(e: any) => handleRoleChange(e.value)}
              required
              options={talentOptions}
              defaultValue={activeType}
              isDisabled={false}
            />
          </div>
          <RadioGroup
            onValueChange={handleGenderChange}
            className="flex"
            value={gender}
            defaultValue=""
          >
            <div className="flex items-center space-x-2">
              <Label htmlFor="r1">Gender:</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="r2" />
              <Label htmlFor="r2">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="r3" />
              <Label htmlFor="r3">Female</Label>
            </div>
          </RadioGroup>
          <div className="hidden lg:flex items-center border  max-h-[60px]   rounded-md w-full max-w-[300px] px-3 py-1 ">
            <AiOutlineSearch className="text-[15px] " />
            <Input
              className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
              placeholder="Search"
            />
          </div>
          <div className="flex items-center">
            <div className="flex flex-col items-start lg:items-center gap-2 whitespace-nowrap lg:gap-6 lg:flex-row mr-2 md:mr-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex gap-1 items-center">
                  <BiSortAlt2 />
                  Sort: {"  "} Average Rating
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white p-3">
                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Relevance
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-bm__beige" />
                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Average Rating
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex gap-2 md:gap-4 items-center">
                <span className="flex items-center gap-1">
                  View:{"  "}{" "}
                  {gridView && <TbLayoutGrid onClick={handleViewToggle} />}
                  {!gridView && (
                    <AiOutlineUnorderedList onClick={handleViewToggle} />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />
        <div className="flex w-full justify-end items-center text-[10px] font-normal">
          {page * pageSize - negativePage}-
          {page * pageSize >= totalApplications ? totalPages : page * pageSize}{" "}
          of {totalPages}
          {page * pageSize - negativePage <= pageSize && (
            <BsChevronDoubleLeft className="ml-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize - negativePage >= positivePage && (
            <BsChevronDoubleLeft
              className="ml-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: 1 }));
              }}
            />
          )}
          {page * pageSize - negativePage <= pageSize && (
            <BsChevronLeft className="mx-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize - negativePage >= positivePage && (
            <BsChevronLeft
              className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: page - 1 }));
              }}
            />
          )}
          {page * pageSize < totalApplications && (
            <BsChevronRight
              className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: page + 1 }));
              }}
            />
          )}
          {page * pageSize >= totalApplications && (
            <BsChevronRight className="mx-4 text-slate-400 p-1 text-[16px]" />
          )}
          {page * pageSize < totalApplications && (
            <BsChevronDoubleRight
              className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: totalPages }));
              }}
            />
          )}
          {page * pageSize >= totalApplications && (
            <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
          )}
        </div>{" "}
        <Separator className="my-2" />
        {pageTalents}
      </div>
      <Separator className="my-2 md:my-4" />
      <div className="flex w-full">
        <div className="flex items-center gap-2 text-[12px]">
          <span className="whitespace-nowrap mr-2">Rows per page:</span>
          {"  "}{" "}
          <div className="flex items-center gap-3">
            {[10, 20, 30, 40, 50].map((n, idx) => {
              return (
                <div
                  className={`hover:bg-gray-300 ${
                    pageSize === n ? "bg-gray-300" : ""
                  } rounded p-2 transition-all duration-400 cursor-pointer`}
                  key={idx}
                  onClick={() => handlePageSizeChange(n)}
                >
                  {n}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex w-full justify-end items-center text-[10px] font-normal">
          {page * pageSize - negativePage <= pageSize && (
            <div className="ml-4 text-slate-400 p-1 ">First</div>
          )}
          {page * pageSize - negativePage >= positivePage && (
            <div
              className="ml-4 hover:bg-slate-300 cursor-pointer p-1  rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: 1 }));
              }}
            >
              First
            </div>
          )}
          {page * pageSize - negativePage <= pageSize && (
            <div className="flex gap-2 mx-4 items-center">
              <BsChevronLeft className=" tex t-slate-400 p-1 text-[16px]" />
              Back
            </div>
          )}
          {page * pageSize - negativePage >= positivePage && (
            <div className="flex gap-2 mx-4 items-center">
              Back
              <BsChevronLeft
                className=" hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => {
                  dispatch(setPageQuery({ page: page - 1 }));
                }}
              />
            </div>
          )}
          {page * pageSize - negativePage}-
          {page * pageSize >= totalApplications ? totalPages : page * pageSize}{" "}
          of {totalPages}
          {page * pageSize < totalApplications && (
            <div className="flex gap-2 mx-4 items-center">
              Next{" "}
              <BsChevronRight
                className=" hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => {
                  dispatch(setPageQuery({ page: page + 1 }));
                }}
              />
            </div>
          )}
          {page * pageSize >= totalApplications && (
            <div className="flex gap-2 mx-4 items-center">
              Next
              <BsChevronRight className=" text-slate-400 p-1 text-[16px]" />
            </div>
          )}
          {page * pageSize < totalApplications && (
            <BsChevronDoubleRight
              className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
              onClick={() => {
                dispatch(setPageQuery({ page: totalPages }));
              }}
            />
          )}
          {page * pageSize >= totalApplications && (
            <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
          )}
        </div>{" "}
      </div>
      {/* <Pagination
        first={""}
        last={""}
        prev={""}
        next={""}
        currentPage={1}
        count={resTalents?.length || 0}
      /> */}
      {/* </CardContent> */}
    </>
  );
};

export default ApplyDetailsInfo;
