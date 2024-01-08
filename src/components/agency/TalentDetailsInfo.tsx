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
import { authAxiosInstance, campaignAuthAxiosInstance } from "../../api/axios";
// import Image from "next/image";
import Logo from "../../assets/beauty.jpg";
import AllTalents from "./talents/AllTalents";
import CurrentContacts from "./talents/CurrentContacts";
import Engaged from "./talents/Engaged";
import MyTalents from "./talents/MyTalents";
import FavoriteTalents from "./talents/FavoriteTalents";

type TalentDetailsProps = {
  activeType:
    | "All Talent"
    | "Current Contracts"
    | "Favorites"
    | "Engaged"
    | "My Talent";
  handleProfilePopUp: (talent: TalentProps) => void;
};

const TalentDetailsInfo: React.FC<TalentDetailsProps> = ({
  activeType,
  handleProfilePopUp,
}) => {
  let pageTalents;

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
        setSuccessModal(false);
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
    case "All Talent":
      pageTalents = (
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
        />
      );
      break;
    case "Current Contracts":
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
    case "My Talent":
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

  return (
    <>
      <CardContent className="flex-1 flex flex-col m-0 p-0 mt-8 md:mt-0">
        <div className="flex-1">
          <div className="flex justify-between flex-col gap-2 lg:flex-row">
            <p className="font-semibold text-[18px] ">{activeType}</p>
            <div className="flex flex-col items-start lg:items-center gap-2 lg:gap-6 lg:flex-row">
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
          <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />
          <div className="flex w-full justify-end items-center text-[10px] font-normal">
            1-{resTalents?.length} of {resTalents?.length}
            <BsChevronDoubleLeft className="mx-4" />
            <BsChevronLeft />
            <BsChevronRight className="mx-4" />
            <BsChevronDoubleRight />
          </div>
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
