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
import {
  TalentQueryProp,
  setPageQuery,
  setTalentQuery,
} from "../../redux/talent.slice";

type TalentDetailsProps = {
  activeType:
    | "All Talent"
    | "Current Contracts"
    | "Favorites"
    | "Engaged"
    | "My Talent";
  handleProfilePopUp: (talent: TalentProps) => void;
  updateQuery: any;
};

const TalentDetailsInfo: React.FC<TalentDetailsProps> = ({
  activeType,
  handleProfilePopUp,
  updateQuery,
}) => {
  let pageTalents;
  let talentData: any;

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

  const agencyTalentData = useSelector((state: RootState) => state.agency);
  const allTalentData = useSelector((state: RootState) => state.talent);
  const favouriteTalentData = useSelector(
    (state: RootState) => state.favouriteProject
  );
  const currentTalentData = useSelector(
    (state: RootState) => state.engagedtalent
  );

  const engageTalentData = useSelector(
    (state: RootState) => state.currentengage
  );

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

  switch (activeType) {
    case "All Talent":
      talentData = allTalentData;
      break;
    case "Current Contracts":
      talentData = currentTalentData;
      break;
    case "Favorites":
      talentData = favouriteTalentData;
      break;
    case "Engaged":
      talentData = engageTalentData;
      break;
    case "My Talent":
      talentData = agencyTalentData;
      break;
    default:
      talentData = null;
  }

  const {
    totalPages,
    totalTalent,
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalTalent: number;
  } = talentData;

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
  const negativePage = pageSize - 1;
  const positivePage = pageSize + 1;

  // console.log(pageQuery);
  // console.log(page * pageSize - negativePage);
  // console.log(page, pageSize, negativePage);
  const handlePageSizeChange = (size: any) => {
    updateQuery({ pageSize: size });
  };

  const handlePageChange = (size: any) => {
    updateQuery({ page: size });
  };

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
            {page * pageSize - negativePage}-
            {page * pageSize >= totalTalent ? totalTalent : page * pageSize} of{" "}
            {totalTalent}
            {page * pageSize - negativePage <= pageSize && (
              <BsChevronDoubleLeft className="ml-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize - negativePage >= positivePage && (
              <BsChevronDoubleLeft
                className="ml-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(1)}
              />
            )}
            {page * pageSize - negativePage <= pageSize && (
              <BsChevronLeft className="mx-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize - negativePage >= positivePage && (
              <BsChevronLeft
                className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(page - 1)}
              />
            )}
            {page * pageSize < totalTalent && (
              <BsChevronRight
                className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                // onClick={() => {
                //   dispatch(setPageQuery({ page: page + 1 }));
                // }}
                onClick={() => handlePageChange(page + 1)}
              />
            )}
            {page * pageSize >= totalTalent && (
              <BsChevronRight className="mx-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize < totalTalent && (
              <BsChevronDoubleRight
                className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(totalPages)}
              />
            )}
            {page * pageSize >= totalTalent && (
              <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
            )}
          </div>
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
            {page * pageSize - negativePage}-
            {page * pageSize >= totalTalent ? totalTalent : page * pageSize} of{" "}
            {totalTalent}
            {page * pageSize - negativePage <= pageSize && (
              <BsChevronDoubleLeft className="ml-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize - negativePage >= positivePage && (
              <BsChevronDoubleLeft
                className="ml-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(1)}
              />
            )}
            {page * pageSize - negativePage <= pageSize && (
              <BsChevronLeft className="mx-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize - negativePage >= positivePage && (
              <BsChevronLeft
                className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(page - 1)}
              />
            )}
            {page * pageSize < totalTalent && (
              <BsChevronRight
                className="mx-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                // onClick={() => {
                //   dispatch(setPageQuery({ page: page + 1 }));
                // }}
                onClick={() => handlePageChange(page + 1)}
              />
            )}
            {page * pageSize >= totalTalent && (
              <BsChevronRight className="mx-4 text-slate-400 p-1 text-[16px]" />
            )}
            {page * pageSize < totalTalent && (
              <BsChevronDoubleRight
                className="mr-4 hover:bg-slate-300 cursor-pointer p-1 text-[16px] rounded-sm"
                onClick={() => handlePageChange(totalPages)}
              />
            )}
            {page * pageSize >= totalTalent && (
              <BsChevronDoubleRight className="text-slate-400 p-1 text-[16px] mr-4" />
            )}
          </div>
        </div>
      </CardContent>
    </>
  );
};

export default TalentDetailsInfo;
