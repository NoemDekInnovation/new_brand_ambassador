import React, { useEffect, useState } from "react";
import { CurrentProject } from "./components/CurrentProject";
import AvailableProjects from "./components/AvailableProjects";
import { MyApplication } from "./components/MyApplication";
import { AgencyCard } from "./components/AgencyCard";
import ProjectList from "./ProjectList";
import { Card, CardContent } from "../../ui/card";
import { Separator } from "../../ui/seperator";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import Invitations from "./components/Invitations";
import { fetchTalentInvitations } from "../../redux/talentInvitations.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchAllProjects,
  setProjectQuery,
} from "../../redux/talent/allProjects.slice";
import ApplicationsScreen from "./components/ApplicationsScreen";
import { fetchTalentApplications } from "../../redux/talentApplications.slice";
import { fetchTalentOffers } from "../../redux/contract-offer";
import SelectOption from "../../libs/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { MdMoreVert } from "react-icons/md";
import { GrClose } from "react-icons/gr";

const categoryOptions: any = [
  { value: "advertising", label: "Advertising" },
  { value: "branding", label: "Branding" },
  { value: "content-creation", label: "Content Creation" },
  { value: "digital-marketing", label: "Digital Marketing" },
  { value: "event", label: "Event" },
  { value: "experiential-marketing", label: "Experiential Marketing" },
  { value: "influencer-marketing", label: "Influencer Marketing" },
  { value: "marketing", label: "Marketing" },
  { value: "public-relations", label: "Public Relations" },
  { value: "social-media", label: "Social Media" },
  { value: "strategy", label: "Strategy" },
  { value: "other", label: "Other" },
  { value: "open-market", label: "Open market" },
  { value: "in-store", label: "In-store" },
  { value: "fashion", label: "Fashion" },
];

type ProjectType =
  | "Available Projects"
  | "Current Project"
  | "Invitations"
  | "My Applications"
  | "Saved Projects"
  | "Completed Projects";

const ProjectTab = () => {
  // const [activeType, setActiveType] =
  //   useState<ProjectType>("Available Projects");
  const [isLoading, setIsLoading] = useState(false);
  const [activeType, setActiveType] = useState<ProjectType | null>(null);
  const [activeProjectClick, setActiveProjectClick] = useState<boolean | null>(
    false
  );

  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedOppor, setSelectedOppor] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ageRange, setAgeRange] = useState({ start: "", end: "" });
  const [sortQuery, setSortQuery] = useState<any>(null);
  const [more, setMore] = useState(false);

  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );
  const { pageQuery } = useSelector((state: RootState) => state.talent);
  const { projectQueryx } = useSelector(
    (state: RootState) => state.contractOffer
  );
  const { projectQuery } = useSelector(
    (state: RootState) => state.allTalentProject
  );
  const { totalApplications } = useSelector(
    (state: RootState) => state.talentApplication
  );

  const projectCount = {
    "Available Projects": 0,
    "Current Project": 0,
    Invitations: talentInvitations?.invitations?.length || 0,
    "My Applications": totalApplications || 0,
    "Saved Projects": 0,
    "Completed Projects": 0,
  };

  let projects;
  switch (activeType) {
    case "Available Projects":
      projects = <AvailableProjects />;
      break;
    case "Current Project":
      projects = "Current Project";
      break;
    case "Invitations":
      projects = <Invitations />;
      break;
    case "My Applications":
      projects = <ApplicationsScreen />;
      break;
    case "Saved Projects":
      projects = "Saved Projects";
      break;
    case "Completed Projects":
      projects = "Completed Projects";
      break;
    default:
      projects = null;
  }

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handleProjectTypeChange = (type: ProjectType) => {
    setActiveType(type);
  };

  const handleCategoryChange = (category: any) => {
    updateQuery({ category });
  };

  const handleRoleChange = (role: any) => {
    updateQuery({ opportunities: role });

    setSelectedOppor(role);
  };

  const handlePaymentStartChange = (e: any) => {
    updateQuery({ minSalary: e.target.value });
    setAgeRange({ ...ageRange, start: e.target.value });
  };

  const handlePaymentEndChange = (e: any) => {
    updateQuery({ maxSalary: e.target.value });
    setAgeRange({ ...ageRange, end: e.target.value });
  };

  const handleLocationChange = (e: any) => {
    setSelectedLocation(e.target.value);
    updateQuery({ location: e.target.value });
  };

  const handleDurationChange = (e: any) => {
    updateQuery({ duration: e.target.value });
  };

  const handlePaymentTypeChange = (paymentOptions: any) => {
    updateQuery({ paymentOptions });
    setSelectedOppor(paymentOptions);
  };

  const handleClear = () => {
    setSelectedLocation("");
    setSelectedOppor("");
    setAgeRange({ end: "", start: "" });
    setSelectedGender("all");
    setSortQuery(null);
  };

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    setIsLoading(true);

    // dispatch(fetchAllProjects(null));
    dispatch(fetchTalentInvitations());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch(setProjectQuery(sortQuery));
    }, 1000);
  }, [sortQuery]);

  useEffect(() => {
    dispatch(fetchAllProjects(projectQuery));
    dispatch(fetchTalentApplications(projectQuery));
  }, [dispatch, projectQuery]);

  useEffect(() => {
    dispatch(fetchTalentOffers(projectQueryx));
  }, [dispatch, projectQueryx]);

  useEffect(() => {
    dispatch(fetchTalentApplications(pageQuery));
    dispatch(fetchAllProjects(pageQuery));
  }, [dispatch, pageQuery]);

  useEffect(() => {
    setTimeout(() => {
      const storedDefaultProject = localStorage.getItem("defaultProject");

      if (!activeProjectClick && storedDefaultProject) {
        const parsedDefaultProject = JSON.parse(storedDefaultProject);

        setActiveType(parsedDefaultProject);
      } else if (!activeProjectClick) {
        setActiveType("Available Projects");
      }
    }, 1000);
  }, [activeProjectClick]);

  return (
    <div className="bg-bm_card_grey">
      <div className="pr-4 md:pr-12 xl:pr-40 ">
        <div className="flex pt-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start bg-white md:p-6">
          {/* <div className={`space-y-8 sm:block`}> */}
          <div className={`space-y-8 sm:block relative hidden`}>
            <div className="absolute right-0">
              <GrClose onClick={() => setMore(false)} />
            </div>
            <ProjectList
              projectCount={projectCount}
              onProjectTypeChange={handleProjectTypeChange}
              setActiveProjectClick={setActiveProjectClick}
              activeProjectClick={activeProjectClick}
              // projectCount={projectCount}
              // onProjectTypeChange={handleProjectTypeChange}
            />

            <div className="">
              <Card>
                <CardContent className="py-3 md:py-6 space-y-3 overflow-y-scroll h-[35vh]">
                  <div className="flex flex-col">
                    <p className="text-[14px] font-semibold mb-2">Category</p>
                    <Separator className="bg-bm__beige" />
                    <SelectOption
                      id="state"
                      name="state"
                      defaultValue={{
                        value: selectedCategory,
                        label: selectedCategory,
                      }}
                      options={categoryOptions}
                      onChange={(e: any) => {
                        updateQuery({ category: e?.value });
                        setSelectedCategory(e?.value);
                      }}
                      placeholder="State of origin"
                      required
                      isDisabled={false}
                      className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                    />
                  </div>
                  <Separator className="bg-bm__beige h-[2px]" />
                  <div className=" ">
                    <p className="text-[14px] font-semibold mb-2">
                      {" "}
                      Talent Type
                    </p>
                    <Separator className="bg-bm__beige" />
                    <RadioGroup
                      defaultValue=""
                      className="mt-2"
                      onValueChange={handleRoleChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="usher" id="usher" />
                        <Label
                          htmlFor="usher"
                          className="text-[14px] font-normal"
                        >
                          Usher
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ba" id="ba" />
                        <Label htmlFor="ba" className="text-[14px] font-normal">
                          Brand Ambassador
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="supervisor" id="supervisor" />
                        <Label
                          htmlFor="supervisor"
                          className="text-[14px] font-normal"
                        >
                          Supervisor
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator className="bg-bm__beige h-[2px]" />

                  <div className="pb-4">
                    <p className="py-2 font-semibold">Location</p>
                    <Separator className="bg-[#D7D8DA] mb-2" />
                    <div className="flex gap-1 items-center justify-center pt-2">
                      <Input
                        className="max-w-[210px]"
                        placeholder="Search location"
                        onChange={handleLocationChange}
                        value={selectedLocation}
                      />
                    </div>
                  </div>
                  <Separator className="bg-bm__beige h-[2px]" />

                  <div className="pb-4">
                    <p className="py-2 font-semibold">Duration</p>
                    <Separator className="bg-[#D7D8DA] mb-2" />
                    <div className="flex gap-1 items-center justify-center pt-2">
                      <Input
                        className="max-w-[210px]"
                        placeholder="Search Duration"
                        onChange={handleDurationChange}
                      />
                    </div>
                  </div>

                  <Separator className="bg-bm__beige h-[2px]" />
                  <div className=" ">
                    <p className="text-[14px] font-semibold mb-2">
                      {" "}
                      Payment Type
                    </p>
                    <Separator className="bg-bm__beige" />
                    <RadioGroup
                      defaultValue=""
                      className="mt-2"
                      onValueChange={handlePaymentTypeChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label
                          htmlFor="daily"
                          className="text-[14px] font-normal"
                        >
                          Daily
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label
                          htmlFor="weekly"
                          className="text-[14px] font-normal"
                        >
                          Weekly{" "}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label
                          htmlFor="monthly"
                          className="text-[14px] font-normal"
                        >
                          Monthly{" "}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Separator className="bg-bm__beige h-[2px]" />

                  <div className="">
                    <p className="text-[14px] font-semibold mb-2">Payment</p>
                    <Separator className="bg-bm__beige mb-2" />
                    <div className="flex gap-1 items-center justify-around">
                      <Input
                        className="max-w-[80px]"
                        value={ageRange.start}
                        onChange={handlePaymentStartChange}
                      />
                      to
                      <Input
                        className="max-w-[80px]"
                        value={ageRange.end}
                        onChange={handlePaymentEndChange}
                      />
                    </div>
                  </div>
                  <button className="light__btn p-2 " onClick={handleClear}>
                    Clear Filter
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className=" space-y-8 flex-1 flex flex-col items-center sm:block relative">
            <div
              className={`md:hidden w-full absolute justify-end items-end top-[-20px] right-[10px] ${
                !more ? "block" : "hidden"
              }`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-[15px] leading-[18px] font-normal text-[#252525B2] ml-auto">
                  <MdMoreVert />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white p-3">
                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Sort
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-bm__beige" />

                  <DropdownMenuItem
                    className="hover:bg-black/10  text-[16px]"
                    onClick={() => setMore(true)}
                  >
                    view more
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div
              className={`space-y-8 relative top-[-75px] ${
                more ? "block" : "hidden"
              }`}
            >
              <div className="absolute right-0">
                <GrClose onClick={() => setMore(false)} />
              </div>
              <ProjectList
                projectCount={projectCount}
                onProjectTypeChange={handleProjectTypeChange}
                setActiveProjectClick={setActiveProjectClick}
                activeProjectClick={activeProjectClick}
                // projectCount={projectCount}
                // onProjectTypeChange={handleProjectTypeChange}
              />

              <div className="">
                <Card>
                  <CardContent className="py-3 md:py-6 space-y-3 overflow-y-scroll h-[35vh]">
                    <div className="flex flex-col">
                      <p className="text-[14px] font-semibold mb-2">Category</p>
                      <Separator className="bg-bm__beige" />
                      <SelectOption
                        id="state"
                        name="state"
                        defaultValue={{
                          value: selectedCategory,
                          label: selectedCategory,
                        }}
                        options={categoryOptions}
                        onChange={(e: any) => {
                          updateQuery({ category: e?.value });
                          setSelectedCategory(e?.value);
                        }}
                        placeholder="State of origin"
                        required
                        isDisabled={false}
                        className="appearance-none bg-transparent w-full py-2.5 px-0 focus:outline-none focus:border-blue-500 text-sm text-gray-900  border-gray-300 capitalize"
                      />
                    </div>
                    <Separator className="bg-bm__beige h-[2px]" />
                    <div className=" ">
                      <p className="text-[14px] font-semibold mb-2">
                        {" "}
                        Talent Type
                      </p>
                      <Separator className="bg-bm__beige" />
                      <RadioGroup
                        defaultValue=""
                        className="mt-2"
                        onValueChange={handleRoleChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="usher" id="usher" />
                          <Label
                            htmlFor="usher"
                            className="text-[14px] font-normal"
                          >
                            Usher
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="ba" id="ba" />
                          <Label
                            htmlFor="ba"
                            className="text-[14px] font-normal"
                          >
                            Brand Ambassador
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="supervisor" id="supervisor" />
                          <Label
                            htmlFor="supervisor"
                            className="text-[14px] font-normal"
                          >
                            Supervisor
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator className="bg-bm__beige h-[2px]" />

                    <div className="pb-4">
                      <p className="py-2 font-semibold">Location</p>
                      <Separator className="bg-[#D7D8DA] mb-2" />
                      <div className="flex gap-1 items-center justify-center pt-2">
                        <Input
                          className="max-w-[210px]"
                          placeholder="Search location"
                          onChange={handleLocationChange}
                          value={selectedLocation}
                        />
                      </div>
                    </div>
                    <Separator className="bg-bm__beige h-[2px]" />

                    <div className="pb-4">
                      <p className="py-2 font-semibold">Duration</p>
                      <Separator className="bg-[#D7D8DA] mb-2" />
                      <div className="flex gap-1 items-center justify-center pt-2">
                        <Input
                          className="max-w-[210px]"
                          placeholder="Search Duration"
                          onChange={handleDurationChange}
                        />
                      </div>
                    </div>

                    <Separator className="bg-bm__beige h-[2px]" />
                    <div className=" ">
                      <p className="text-[14px] font-semibold mb-2">
                        {" "}
                        Payment Type
                      </p>
                      <Separator className="bg-bm__beige" />
                      <RadioGroup
                        defaultValue=""
                        className="mt-2"
                        onValueChange={handlePaymentTypeChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label
                            htmlFor="daily"
                            className="text-[14px] font-normal"
                          >
                            Daily
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="weekly" id="weekly" />
                          <Label
                            htmlFor="weekly"
                            className="text-[14px] font-normal"
                          >
                            Weekly{" "}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label
                            htmlFor="monthly"
                            className="text-[14px] font-normal"
                          >
                            Monthly{" "}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <Separator className="bg-bm__beige h-[2px]" />

                    <div className="">
                      <p className="text-[14px] font-semibold mb-2">Payment</p>
                      <Separator className="bg-bm__beige mb-2" />
                      <div className="flex gap-1 items-center justify-around">
                        <Input
                          className="max-w-[80px]"
                          value={ageRange.start}
                          onChange={handlePaymentStartChange}
                        />
                        to
                        <Input
                          className="max-w-[80px]"
                          value={ageRange.end}
                          onChange={handlePaymentEndChange}
                        />
                      </div>
                    </div>
                    <button className="light__btn p-2 " onClick={handleClear}>
                      Clear Filter
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div
              className={` md:block  ${
                !more ? "block  relative top-[-40px]" : "hidden"
              }`}
            >
              {/* <div className={` md:block ${!more ? "block" : "hidden"}`}> */}
              {projects}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
