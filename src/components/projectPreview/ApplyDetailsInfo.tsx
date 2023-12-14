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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import {
  // Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
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
  // filterApplications,
  setApproval,
} from "../../redux/applicantions.slice";

const categoryOptions: any = [
  { value: "All Talents", label: "All Talent" },
  { value: "Current Contacts", label: "Current Contacts" },
  { value: "Favorites", label: "Favorites" },
  { value: "Engaged", label: "Engaged" },
  { value: "My Talent", label: "My Talent" },
  { value: "Invited", label: "Invited" },
];

const appOptions: any = [
  { value: "All Applications", label: "All Applications" },
  { value: "My Talent", label: "My Talent" },
  { value: "Favorites", label: "Favorites" },
  { value: "Current Contacts", label: "Current Contacts" },
  { value: "Engaged", label: "Engaged" },
  { value: "Invited", label: "Invited" },
];

const actionOptions: any = [
  { value: "Shortlist", label: "Shortlist" },
  { value: "Approve Hire", label: "Approve Hire" },
  { value: "Send Message", label: "Send Message" },
];

const talentOptions: any = [
  { value: "Ba", label: "Ba" },
  { value: " Supervisor", label: "Supervisor" },
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

  type AppProps = "shortlisted" | "rejected" | "hired" | "All";
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
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTalent, setSelectedTalent] = useState("");
  const [selectedTalentID, setSelectedTalentID] = useState("");
  const [projectModal, setProjectModal] = useState(false);
  const [activeType, setActiveType] = useState<TalentType>("All Talents");
  const [appStatus, setAppStatus] = useState<AppProps>("All");

  const onTalentTypeChnage = (type: TalentType) => {
    // setActiveType(type);
  };

  const { user } = useSelector((state: RootState) => state.user);

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };

  const handleClear = () => {
    setSelectedLocation("all");
    setSelectedOppor("all");
    setAgeRange({ ...ageRange, start: "" });
    setAgeRange({ ...ageRange, end: "" });
    setSelectedGender("all");
  };

  const handleViewToggle = () => {
    setGridView(!gridView);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { talents: resTalents } = useSelector(
    (state: RootState) => state.talent
  );
  console.log(resTalents);

  const { projectApplications: applied } = useSelector(
    (state: RootState) => state.projectApplication
  );

  useEffect(() => {
    const fetchTalents = async () => {
      if (user?.accountId) {
        if (activeType === "My Talents") {
          // dispatch(fetchTalents());
        } else if (activeType === "Current Contacts") {
        } else if (activeType === "All Talents") {
        } else if (activeType === "Engaged") {
        } else if (activeType === "Favorites") {
        } else {
          console.log("No data yet");
        }
      }
    };
    fetchTalents();
  }, [activeType]);

  useEffect(() => {
    dispatch(fetchApplications({ id: ProjectId }));
    // dispatch(filterApplications({ id: ProjectId, status: "shortlisted" }));
  }, []);

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
          {
            opportunities: selectedTalent,
            projectId: selectedProject,
            talentId: selectedTalentID,
          },
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

        console.log(error);
      }
    }
  };

  const filteredTalents = resTalents?.filter((talent, idx) => {
    const talentgender = talent?.gender;
    const talentRole = talent?.opportunities;
    const talentAge = talent?.age;
    const talentAddress = talent?.address[0];
    // const size = sellers..toLowerCase();
    // const search = searchTerm.toLowerCase();
    const searchLocation = selectedLocation.toLowerCase();

    if (
      selectedGender === "all" &&
      selectedOppor === "all" &&
      selectedLocation === "all" &&
      ageRange.start === "" &&
      ageRange.end === ""
    ) {
      return talent;
    }
    const isGenderMatch = selectedGender === talentgender;
    const isRoleMatch = selectedOppor === talentRole;
    const isOfAge =
      talentAge >= parseInt(ageRange.start) &&
      talentAge <= parseInt(ageRange.end);
    const isCity = talentAddress?.city.includes(searchLocation);
    const isState = talentAddress?.state.includes(searchLocation);

    if (isGenderMatch) {
      if (
        selectedOppor === "all" &&
        selectedLocation === "all" &&
        ageRange.start === "" &&
        ageRange.end === ""
      ) {
        return isGenderMatch;
      }
      if (
        selectedOppor !== "all" &&
        selectedLocation === "all" &&
        ageRange.start === "" &&
        ageRange.end === ""
      ) {
        return isGenderMatch && isRoleMatch;
      }
      if (
        selectedOppor !== "all" &&
        selectedLocation === "all" &&
        ageRange.start !== "" &&
        ageRange.end !== ""
      ) {
        return isGenderMatch && isRoleMatch && isOfAge;
      }

      if (
        selectedOppor !== "all" &&
        selectedLocation !== "all" &&
        ageRange.start !== "" &&
        ageRange.end !== ""
      ) {
        return isGenderMatch && isRoleMatch && (isCity || isState) && isOfAge;
      }
    }
    return talent;
  });

  switch (activeType) {
    case "All Talents":
      pageTalents = (
        <AllApplications
          gridView={gridView}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handleInvite={handleInvite}
          setSelectedProject={setSelectedProject}
          projects={projects}
          setSelectedTalent={setSelectedTalent}
          // handleProfilePopUp={handleProfilePopUp}
          selectedTalent={selectedTalent}
          setSelectedTalentID={setSelectedTalentID}
          selectedProject={selectedProject}
          projectModal={projectModal}
          ProjectId={ProjectId}
          setProjectModal={setProjectModal}
          gap={14}
        />
      );
      break;
    // case "Current Contacts":
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
    // case "My Talents":
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

  // const [talentType];

  return (
    <>
      {/* <CardContent className="flex-1 flex flex-col m-0 p-0 mt-2 md:mt-0"> */}
      {/* <div className="flex-1"> */}
      <div className="flex relative items-center justify-between gap-2">
        <div className="flex gap-3 md:gap-6">
          <p className="font-semibold text-[18px] ">All Applications</p>
          <div className="flex item-center m-0">
            <button
              className="light__btn m-0"
              onClick={() =>
                dispatch(
                  fetchApplications({ id: ProjectId, status: "shortlisted" })
                )
              }
            >
              Shortlisted
              <span className="text-[16px] font-semibold text-black">(20)</span>
            </button>
            <div className="h-8 w-2 bg-black"></div>
            <button
              className="light__btn m-0 whitespace-nowrap"
              onClick={() =>
                dispatch(
                  fetchApplications({ id: ProjectId, status: "approvedHire" })
                )
              }
            >
              Approve Hire
              <span className="text-[16px] font-semibold text-black">(20)</span>
            </button>
            <div className="h-8 w-2 bg-black"></div>
            <button
              className="light__btn m-0"
              onClick={() =>
                dispatch(
                  fetchApplications({ id: ProjectId, status: "rejected" })
                )
              }
            >
              Rejected
              <span className="text-[16px] font-semibold text-black">(20)</span>
            </button>
          </div>
        </div>
        <div className="relative h-full">
          <SelectOption
            className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
            placeholder="Select Category "
            id="projectCategory"
            name="projectCategory"
            onChange={(e: any) => onTalentTypeChnage(e.value)}
            required
            options={appOptions}
            defaultValue={activeType}
            isDisabled={false}
          />
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
              onChange={(e: any) => onTalentTypeChnage(e.value)}
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
              id="projectCategory"
              name="projectCategory"
              onChange={(e: any) => onTalentTypeChnage(e.value)}
              required
              options={talentOptions}
              defaultValue={activeType}
              isDisabled={false}
            />
          </div>
          <RadioGroup defaultValue="Male" className="flex">
            <div className="flex items-center space-x-2">
              <Label htmlFor="r1">Gender:</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Male" id="r2" />
              <Label htmlFor="r2">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Female" id="r3" />
              <Label htmlFor="r3">Female</Label>
            </div>
          </RadioGroup>
          {/* <p className="font-semibold text-[18px] ">{activeType}</p> */}
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
        <div className="flex w-full justify-end items-center text-[10px] font-normal">
          1-{resTalents?.length} of {resTalents?.length}
          <BsChevronDoubleLeft className="mx-4" />
          <BsChevronLeft />
          <BsChevronRight className="mx-4" />
          <BsChevronDoubleRight />
        </div>
        <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />
        <Separator className="my-2" />

        {pageTalents}
      </div>
      <Separator className="my-2 md:my-4" />
      <Pagination
        first={""}
        last={""}
        prev={""}
        next={""}
        currentPage={1}
        count={resTalents?.length || 0}
      />
      {/* </CardContent> */}
    </>
  );
};

export default ApplyDetailsInfo;
