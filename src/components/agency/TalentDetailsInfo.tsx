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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Button } from "../../ui/button";
import { authAxiosInstance } from "../../api/axios";
// import Image from "next/image";
import Logo from "../../assets/beauty.jpg";

type TalentDetailsProps = {
  activeType:
    | "All Talents"
    | "Current Contacts"
    | "Favorites"
    | "Engaged"
    | "My Talents";
  handleProfilePopUp: (talent: TalentProps) => void;
};

const TalentDetailsInfo: React.FC<TalentDetailsProps> = ({
  activeType,
  handleProfilePopUp,
}) => {
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

  useEffect(() => {
    const fetchTalents = async () => {
      if (user?.accountId) {
        if (activeType === "My Talents") {
          dispatch(fetchTalents);
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

  const handleInvite = async () => {
    setIsLoading(true);
    if (user !== null) {
      try {
        const response = await authAxiosInstance.post(
          `${user.accountId}/invite-to-project`,
          {
            opportunities: selectedTalent,
            projectId: selectedProject,
            talentId: selectedTalentID,
          }
        );

        setIsLoading(false);
        setSuccessModal(false);
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    }

    console.log("Hello", selectedProject, selectedTalent, selectedTalentID);
  };

  // const handleProfilePopUp = (talent: any) => {
  //     // console.log(talent);

  //     setPopUp(!popUp);
  //     setSelectedRole(talent);
  // };

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

  const talents = filteredTalents?.map((_, idx) => {
    return (
      <Card className="w-[196px] relative" key={idx}>
        <div className="relative">
          <div className="bg-bm__card absolute z-30 right-0 top-2 p-2 rounded-l-md flex gap-2">
            <AiOutlineHeart />
            <Dialog
              open={successModal}
              onOpenChange={() => setSuccessModal(false)}
            >
              <DialogContent className="sm:max-w-[425px] bg-[#fff]">
                <DialogHeader>
                  <DialogTitle className="text-[18px] flex items-center gap-2">
                    <div className="">
                      <svg
                        className="h-[18px]"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 256 256"
                        enable-background="new 0 0 256 256"
                      >
                        <metadata>
                          {" "}
                          Svg Vector Icons : http://www.onlinewebfonts.com/icon{" "}
                        </metadata>
                        <g>
                          <g>
                            <path fill="#000000" d="M10,29.7" />
                            <path
                              fill="#000000"
                              d="M49.8,217.8H20.9c-3.9,0-7.2-3.2-7.2-7.2v-79.6c0-3.9,3.2-7.2,7.2-7.2h28.9c3.9,0,7.2,3.2,7.2,7.2v79.6C57,214.6,53.8,217.8,49.8,217.8L49.8,217.8z M26.3,205.2h18v-68.6h-18V205.2z"
                            />
                            <path
                              fill="#000000"
                              d="M125,226.3c-49.6,0-71.9-21.7-72.9-22.7l8.9-9c0.2,0.2,22.7,21.5,72.9,18.8c34.9-1.9,76.7-20.5,98.5-31.4c0.3-0.1,1.1-0.6,0.9-1.7c-0.1-0.8-0.7-1.3-1.5-1.3c-18.3-1.6-45.3-1.9-69.7,6.2c-28.1,9.3-41.2,0-45.6-4.4c-5.3-5.4-7.3-12.7-5.1-19.1c1.9-5.5,6.6-9.2,12.6-10c2.1-0.3,6.8-1.7,15.2-8.1c2-1.6,1.5-3.6,1.1-4.4c-0.3-0.8-1.5-2.6-4-2.2c-62.8,9.9-68.4,9.2-70.6,9c-5.5-0.7-6.8-0.7-6.9-0.7c1.9,0-10.1,2.2-9.4-1l4.2,4.2l1.8-3.7l-3.3-7.5c1.7-5.5,6.2-4.9,15.1-3.8c1.5,0.1,10.8,0,67-8.9c7.5-1.2,14.6,2.7,17.6,9.8c3,7,1,14.8-5.1,19.4c-8.3,6.4-15.3,9.8-21.2,10.6c-1.6,0.2-2,0.9-2.2,1.6c-0.5,1.4,0,3.9,2.2,6.1c2.1,2.1,10.7,8.5,32.6,1.3c26.4-8.7,55.2-8.5,74.8-6.7c6.4,0.6,11.6,5.2,12.8,11.6c1.2,6.3-1.9,12.5-7.6,15.4c-27.7,13.9-68.2,30.8-103.5,32.7C131.3,226.2,128.1,226.3,125,226.3L125,226.3z"
                            />
                            <path fill="#000000" d="M199.8,62.6L199.8,62.6z" />
                            <path
                              fill="#000000"
                              d="M192,149.3c-3.5,0-6.3-2.8-6.3-6.3V78.3c0-3.5,2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3V143C198.3,146.5,195.5,149.3,192,149.3L192,149.3z"
                            />
                            <path fill="#000000" d="M232.2,95L232.2,95z" />
                            <path
                              fill="#000000"
                              d="M224.3,117h-64.7c-3.5,0-6.3-2.8-6.3-6.3c0-3.5,2.8-6.3,6.3-6.3h64.7c3.5,0,6.3,2.8,6.3,6.3C230.6,114.2,227.8,117,224.3,117z"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    Invite Talent
                  </DialogTitle>
                  <Separator className="bg-[#D7D8DA]" />
                  <DialogDescription>
                    Invite talent to your project
                  </DialogDescription>
                </DialogHeader>
                <Separator className="bg-[#D7D8DA]" />
                <div className="w-full ">
                  <Select
                    onValueChange={(e) => setSelectedProject(e)}
                    defaultValue={selectedProject}
                  >
                    <SelectTrigger className="w-full bg-white  h-[46px]">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {projects !== undefined &&
                        projects.map(({ projectTitle, _id }, index) => {
                          return (
                            <SelectItem value={_id} key={index}>
                              {projectTitle}
                            </SelectItem>
                          );
                        })}
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-full pb-2">
                  <Select
                    onValueChange={(e) => setSelectedTalent(e)}
                    defaultValue={selectedTalent}
                  >
                    <SelectTrigger className="w-full bg-white  h-[46px]">
                      <SelectValue placeholder="Select Talent Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="usher">Usher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-[#D7D8DA]" />

                <DialogFooter className="">
                  <Button
                    type="submit"
                    className="dark__btn h-[46px]"
                    onClick={handleInvite}
                  >
                    Send Invite
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <AiOutlineMore />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3">
                <DropdownMenuItem
                  className="hover:bg-black/10"
                  onClick={() => {
                    setSelectedTalentID(_?._id);

                    setSuccessModal(true);
                  }}
                >
                  Add to Project
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10">
                  Share{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div onClick={() => handleProfilePopUp(_)}>
            {_.profilePic === "" && (
              <img
                src={Logo}
                alt=""
                height={196}
                width={196}
                style={{ borderRadius: 5 }}
                className=" hover:grayscale-0 grayscale"
              />
            )}
            {_.profilePic && (
              <img
                src={_.profilePic}
                alt=""
                width={196}
                height={196}
                style={{ borderRadius: 5 }}
                className=" hover:grayscale-0 grayscale"
              />
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 whitespace-nowrap p-2 flex-wrap">
          <p className="text-[8px] font-medium">{_.fullName}</p>
          <span className="text-[8px] font-normal">
            {_.age} yrs{"  "}. {_.height}
            {"  "}.{_.address[0]?.city} {_.address[0]?.state}
          </span>
        </div>{" "}
        <div className="flex items-center gap-2 whitespace-nowrap p-1">
          {_.experience.length >= 2 && (
            <p className="text-[8px] font-normal border-r-2 pr-2">
              {_.experience[0].agencyName}, ...
              {_.experience[0].agencyName}, {_.experience[1]?.agencyName}, ...
            </p>
          )}
          {_.experience.length === 1 && (
            <p className="text-[8px] font-normal border-r-2 pr-2">
              {_.experience[0].agencyName}
            </p>
          )}
          {_.experience.length <= 0 && (
            <p className="text-[8px] font-normal border-r-2 pr-2">_</p>
          )}
          <span className="text-[8px] font-normal">In-store, Open Market</span>
        </div>
        <Separator className="mt-auto" />
        <div className="flex items-center gap-2 whitespace-nowrap p-2">
          <div className="text-[8px] font-medium border-r-2 pr-2 ">
            <span className="text-bm__ox__red text-[12px]">97% {"  "}</span>
            Work Success
          </div>
          <div className="text-[8px] font-medium">
            <span className="text-bm__ox__red text-[12px]">4.5 {"  "}</span>
            Ratings
          </div>
        </div>
      </Card>
    );
  });

  const listView = filteredTalents?.map((talent, index) => (
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
            className=" hover:grayscale-0 grayscale"
          />
        )}
        {talent.profilePic && (
          <img
            src={talent.profilePic}
            alt=""
            width={260}
            height={260}
            style={{ borderRadius: 5 }}
            className=" hover:grayscale-0 grayscale"
          />
        )}
      </div>
      <div className="p-2 w-full">
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-3">
            {" "}
            <p className="text-[15px] font-medium">{talent?.fullName}</p>
            <AiOutlineHeart />
          </div>
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
        </div>
        <div className="mb-3">
          {" "}
          <p className="text-[10px] font-normal"> {talent?.summary || "-"}</p>
          <div className="flex flex-row text-[8px] font-normal">
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.age}
            </p>
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.height}
            </p>
            <p>{talent?.address[0]?.city}</p>,
            <p className="border-r border-r-bm__faint__text pr-1 mr-1">
              {talent?.address[0]?.state}
            </p>
            {talent?.experience[0] && (
              <p>{talent?.experience[0]?.agencyName},</p>
            )}
            {talent?.experience[1] && (
              <p>{talent?.experience[1]?.agencyName},</p>
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
          <div className="flex gap-4">
            <button className="light__btn text-[10px]">Share</button>
            <button className="dark__btn text-[10px]">Invite</button>
          </div>
        </div>
      </div>
    </div>
  ));

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

          {gridView && (
            <div className="flex w-full justify-center ">
              {/* <div className=' m-auto grid grid-cols-1 lg:grid-cols-2  lg:w-[700px] gap-3 '> */}
              <div className="flex justify-center md:justify-start space-y-4 md:space-y-0 gap-3  flex-wrap ">
                {talents}
              </div>
            </div>
          )}
          {!gridView && (
            <div className="flex flex-col w-full gap-3">{listView}</div>
          )}
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
