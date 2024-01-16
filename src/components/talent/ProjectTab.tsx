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
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ageRange, setAgeRange] = useState({ start: "", end: "" });
  const [sortQuery, setSortQuery] = useState<any>(null);

  const { talentInvitations } = useSelector(
    (state: RootState) => state.talentInvite
  );
  const { pageQuery } = useSelector((state: RootState) => state.talent);
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

  console.log(ageRange);

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
    dispatch(fetchTalentOffers(projectQuery));
    dispatch(fetchTalentApplications(projectQuery));
  }, [dispatch, projectQuery]);

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
        <div className="flex pt-10 md:space-x-8 flex-col items-center space-y-8 md:flex-row md:space-y-0 md:items-start bg-white p-6">
          <div className="space-y-8 hidden sm:block">
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
                    {/* <RadioGroup value={selectedGender} onChange={handleGenderChange}></RadioGroup> */}
                    <RadioGroup
                      defaultValue=""
                      className="mt-2"
                      onValueChange={handleCategoryChange}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="in-store" id="in-store" />
                        <Label
                          htmlFor="in-store"
                          className="text-[14px] font-normal"
                        >
                          In-store
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="open market" id="open market" />
                        <Label
                          htmlFor="open market"
                          className="text-[14px] font-normal"
                        >
                          Open Market{" "}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="road survey" id="road survey" />
                        <Label
                          htmlFor="road survey"
                          className="text-[14px] font-normal"
                        >
                          Road Survey{" "}
                        </Label>
                      </div>
                    </RadioGroup>
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
          <div className=" space-y-8 flex-1 flex flex-col items-center sm:block">
            {projects}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
