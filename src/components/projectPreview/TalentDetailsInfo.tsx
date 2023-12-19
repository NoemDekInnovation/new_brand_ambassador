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
// import Image from "next/image";
import Logo from "../../assets/beauty.jpg";
import AllTalents from "../agency/talents/AllTalents";
import CurrentContacts from "../agency/talents/CurrentContacts";
import FavoriteTalents from "../agency/talents/FavoriteTalents";
import MyTalents from "../agency/talents/MyTalents";
import Engaged from "../agency/talents/Engaged";
import { Input } from "../../ui/input";
import { SelectGroup, SelectLabel } from "../../ui/select";
import { TalentType } from "../agency/TalentsView";
import SelectOption from "../../libs/select";
import OfferModal from "../../libs/OfferModal";

const categoryOptions: any = [
  { value: "All Talents", label: "All Talent" },
  { value: "Current Contacts", label: "Current Contacts" },
  { value: "Favorites", label: "Favorites" },
  { value: "Engaged", label: "Engaged" },
  { value: "My Talent", label: "My Talent" },
  { value: "Invited", label: "Invited" },
];

const TalentDetailsInfo = ({
  // activeType,
  handleProfilePopUp,
}: {
  handleProfilePopUp: (talent: TalentProps) => void;
}) => {
  let pageTalents;

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
  const [success, setSuccess] = useState(false); // State for the success modal

  const onTalentTypeChnage = (type: TalentType) => {
    setActiveType(type);
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
  // console.log(resTalents);

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
          // console.log("No data yet");
        }
      }
    };
    fetchTalents();
  }, [activeType]);

  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      if (user !== null) {
        const response = await campaignAuthAxiosInstance(
          `/published-projects`,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        const projects = response?.data?.data.publishedProjects.map(
          (project: any) => {
            return { value: project._id, label: project.projectTitle };
          }
        );
        // console.log(response.data.data, projects);

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

        // console.log(error);
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
        <>
          <AllTalents
            gridView={gridView}
            successModal={successModal}
            setSuccessModal={setSuccessModal}
            handleInvite={handleInvite}
            setSelectedProject={setSelectedProject}
            projects={projects}
            setSelectedTalent={setSelectedTalent}
            handleProfilePopUp={handleProfilePopUp}
            selectedTalent={selectedTalent}
            setSelectedTalentID={setSelectedTalentID}
            selectedProject={selectedProject}
            projectModal={projectModal}
            setProjectModal={setProjectModal}
            gap={14}
          />
          <OfferModal
            isOpen={successModal}
            onClose={() => setSuccessModal(false)}
            statusMessage="Talent Invited"
          />
        </>
      );
      break;
    case "Current Contacts":
      pageTalents = (
        <CurrentContacts
          gridView={gridView}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handleInvite={handleInvite}
          setSelectedProject={setSelectedProject}
          projects={projects}
          setSelectedTalent={setSelectedTalent}
          handleProfilePopUp={handleProfilePopUp}
          selectedTalent={selectedTalent}
          setSelectedTalentID={setSelectedTalentID}
          selectedProject={selectedProject}
        />
        
      );
      break;
    case "Favorites":
      pageTalents = (
        <FavoriteTalents
          gridView={gridView}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handleInvite={handleInvite}
          setSelectedProject={setSelectedProject}
          projects={projects}
          setSelectedTalent={setSelectedTalent}
          handleProfilePopUp={handleProfilePopUp}
          selectedTalent={selectedTalent}
          setSelectedTalentID={setSelectedTalentID}
          selectedProject={selectedProject}
        />
      );
      break;
    case "Engaged":
      pageTalents = (
        <Engaged
          gridView={gridView}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handleInvite={handleInvite}
          setSelectedProject={setSelectedProject}
          projects={projects}
          setSelectedTalent={setSelectedTalent}
          handleProfilePopUp={handleProfilePopUp}
          selectedTalent={selectedTalent}
          setSelectedTalentID={setSelectedTalentID}
          selectedProject={selectedProject}
        />
      );
      break;
    case "My Talents":
      pageTalents = (
        <MyTalents
          gridView={gridView}
          successModal={successModal}
          setSuccessModal={setSuccessModal}
          handleInvite={handleInvite}
          setSelectedProject={setSelectedProject}
          projects={projects}
          setSelectedTalent={setSelectedTalent}
          handleProfilePopUp={handleProfilePopUp}
          selectedTalent={selectedTalent}
          setSelectedTalentID={setSelectedTalentID}
          selectedProject={selectedProject}
        />
      );
      break;
    default:
      pageTalents = null;
  }

  // const [talentType];

  return (
    <>
      <CardContent className="flex-1 flex flex-col m-0 p-0 mt-2 md:mt-0">
        <div className="flex-1">
          <div className="flex relative items-center justify-between gap-2">
            {/* <p className="font-semibold text-[18px] ">{activeType}</p> */}

            <div className="relative h-full">
              <SelectOption
                className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                placeholder="Select Category "
                id="projectCategory"
                name="projectCategory"
                onChange={(e: any) => onTalentTypeChnage(e.value)}
                required
                options={categoryOptions}
                defaultValue={activeType}
                isDisabled={false}
              />
            </div>
          </div>
          <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />

          <div className="flex justify-between flex-col gap-2 lg:flex-row">
            {/* <p className="font-semibold text-[18px] ">{activeType}</p> */}

            <div className="hidden lg:flex items-center border  max-h-[60px]   rounded-md w-full max-w-[500px] px-3 py-1 ">
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
                  <span className="flex items-center gap-1 cursor-pointer">
                    View:{"  "}{" "}
                    {gridView && <TbLayoutGrid onClick={handleViewToggle} />}
                    {!gridView && (
                      <AiOutlineUnorderedList onClick={handleViewToggle} />
                    )}
                  </span>
                </div>
              </div>
              <div className="flex w-full justify-end items-center text-[10px] font-normal">
                1-{resTalents?.length} of {resTalents?.length}
                <BsChevronDoubleLeft className="mx-4" />
                <BsChevronLeft />
                <BsChevronRight className="mx-4" />
                <BsChevronDoubleRight />
              </div>
            </div>
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
      </CardContent>
    </>
  );
};

export default TalentDetailsInfo;
