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
import { useToast } from "../../ui/use-toast";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

import { Label } from "../../ui/label";
import { Checkbox } from "../../ui/checkbox";
import {
  TalentQueryProp,
  setPageQuery,
  setTalentQuery,
} from "../../redux/talent.slice";

const categoryOptions: any = [
  { value: "All Talent", label: "All Talent" },
  { value: "Current Contracts", label: "Current Contracts" },
  { value: "Favorites", label: "Favorites" },
  { value: "Engaged", label: "Engaged" },
  { value: "My Talent", label: "My Talent" },
  { value: "Invited", label: "Invited" },
];
const actionOptions: any = [
  { value: "Invite All", label: "Invite All" },
  { value: "Send Message", label: "Send Message" },
];

const talentOptions: any = [
  { value: "supervisor", label: "Supervisor" },
  { value: "ba", label: "Brand Ambassador" },
  { value: "usher", label: "Usher" },
];

const TalentDetailsInfo = ({
  // activeType,
  handleProfilePopUp,
  projectId,
}: {
  projectId: string;
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
  const [bulkModal, setBulkModal] = useState(false);
  const [activeType, setActiveType] = useState<TalentType>("All Talent");
  const [success, setSuccess] = useState(false); // State for the success modal
  const [talentType, setTalentType] = useState("");
  const [gender, setGender] = useState("");
  const [sortQuery, setSortQuery] = useState<TalentQueryProp | null>({
    projectId: projectId,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [checkedTalentIds, setCheckedTalentIds] = useState<string[]>([]);

  const { user } = useSelector((state: RootState) => state.user);

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
  };

  const handleClear = () => {
    setSelectedLocation("all");
    setSelectedOppor("all");
    setAgeRange({ end: "", start: "" });
    setSelectedGender("all");
    setSortQuery({
      projectId: projectId,
    });
    setGender("");
    setTalentType("");
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

  const handleViewToggle = () => {
    setGridView(!gridView);
  };

  const dispatch = useDispatch<AppDispatch>();
  const {
    talents: resTalents,
    totalPages,
    totalTalent,
    page,
    pageSize,
  } = useSelector((state: RootState) => state.talent);
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

  const { toast } = useToast();

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
      } catch (error: any) {
        setIsLoading(false);
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  const handleGroupInvite = async () => {
    setIsLoading(true);

    const resultArray = checkedTalentIds.map((talentId: string) => {
      return {
        opportunities: selectedTalent, // You need to define selectedTalent elsewhere in your code
        projectId: projectId, // You need to define selectedProject elsewhere in your code
        talentId: talentId,
      };
    });

    if (user !== null) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/invite-to-project`,
          resultArray,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );

        setIsLoading(false);
        // setSuccessModal(false);
        setBulkModal(!bulkModal);
        setSuccessModal(true);

        return setTimeout(() => {
          setSuccessModal(false);
        }, 3000);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    }
  };

  switch (activeType) {
    case "All Talent":
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
            bulkModal={bulkModal}
            projectModal={projectModal}
            setBulkModal={setBulkModal}
            setProjectModal={setProjectModal}
            gap={14}
            handleGroupInvite={handleGroupInvite}
            handleCheckedChange={handleCheckedChange}
          />
          <OfferModal
            isOpen={successModal}
            onClose={() => setSuccessModal(false)}
            statusMessage="Talent Invited"
          />
        </>
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

  const handleSearchChange = (e: any) => {
    updateQuery({ search: e.target.value });
    setSearchQuery(e.target.value);
  };

  const onTalentTypeChange = (type: TalentType) => {
    setActiveType(type);
  };

  const bulkHandler = () => {
    setBulkModal(!bulkModal);
  };
  const handlePageSizeChange = (size: any) => {
    updateQuery({ pageSize: size });
  };

  const handlePageChange = (size: any) => {
    updateQuery({ page: size });
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
      <CardContent className="flex-1 flex flex-col m-0 p-0 mt-2 md:mt-0">
        <div className="flex-1">
          <div className="flex relative items-center justify-between gap-2">
            {/* <p className="font-semibold text-[18px] ">{activeType}</p> */}

            <div className="relative h-full flex gap-10 items-center">
              <SelectOption
                className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                placeholder="Select Category "
                id="projectCategory"
                name="projectCategory"
                onChange={(e: any) => onTalentTypeChange(e.value)}
                required
                options={categoryOptions}
                defaultValue={activeType}
                isDisabled={false}
              />
              <div className="flex items-center gap-2">
                Invited:{" "}
                <SelectOption
                  className="block min-w-[180px] px-0 w-full text-sm text-gray-900 bg-transparent border-0 appearance-none dark:text-white peer"
                  placeholder="Select Talent "
                  id="projectTalent"
                  name="projectTalent"
                  onChange={(e: any) => handleRoleChange(e.value)}
                  required
                  options={talentOptions}
                  defaultValue={talentType}
                  isDisabled={false}
                />
              </div>
              <div className="bg-gray-400 h-[30px] w-[4px] "></div>

              <button className="dark__btn p-2 " onClick={handleClear}>
                Clear Filter
              </button>
            </div>
          </div>
          <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />

          {/* <div className="flex justify-between flex-col gap-2 lg:flex-row">

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
          </div> */}

          <div className="flex-1">
            <Separator className="my-2 bg-bm__beige shrink-0 h-[1px] w-full" />
            <div className="flex justify-between flex-col gap-2 lg:flex-row items-center">
              <div className="relative h-full flex items-center gap-4">
                <Checkbox />
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
                <div className="bg-gray-300 ml-3 h-[30px] w-[3px] "></div>
              </div>{" "}
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
              {/* <p className="font-semibold text-[18px] ">{activeType}</p> */}
              <div className="hidden lg:flex items-center border  max-h-[60px]   rounded-md w-full max-w-[300px] px-3 py-1 ">
                <AiOutlineSearch className="text-[15px] " />
                <Input
                  className="border-0 focus:border-0 focus:ring-0 focus:outline-none "
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
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
            <div className="flex w-full">
              <div className="flex w-full justify-end items-center text-[10px] font-normal">
                {page * pageSize - negativePage}-
                {page * pageSize >= totalTalent ? totalTalent : page * pageSize}{" "}
                of {totalTalent}
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

            <Separator className="my-2" />
            {pageTalents}
          </div>
        </div>
        {/* <Separator className="my-2 md:my-4" /> */}
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
