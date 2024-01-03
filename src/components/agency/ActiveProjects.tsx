import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ActiveProject, { fetchactiveproject } from "../../redux/ActiveProject";
import { Card, CardContent, CardFooter } from "../../ui/card";

const ActiveProjects = ({ searchQuery }: { searchQuery: string }) => {
  const { activeProject } = useSelector(
    (state: RootState) => state.activeProject
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchactiveproject());
  }, [dispatch]);

  if (!Array.isArray(activeProject)) {
    return <div>Loading...</div>;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formatWorkingDaysS = (workingDays?: string[]) => {
    return workingDays?.join(", ") || "";
  };

  const filteredProjects = activeProject?.filter((project: any) => {
    // Check if project and project.name are defined before calling toLowerCase()
    return (
      project?.projectTitle &&
      project?.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const projects = filteredProjects.map((project, idx) => {
    const formattedLocation = Array.isArray(project.projectLocation)
      ? project.projectLocation.join(", ")
      : "";

    return (
      <Card className="p-4 hover:bg-black/10 cursor-pointer " key={idx}>
        <CardContent className="p-0 space-y-1">
          <h3 className="font-medium text-[15px] capitalize">
            {/* Project Name {"  "}(in-store){" "} */}
            {project.projectTitle}
          </h3>
          <p className="font-normal text-[15px] capitalize">
            {/* This is the project description.. this is the project description */}
            {project.projectDescription}
          </p>
          <div className="flex md:space-x-2 text-bm__niv text-[10px] font-medium items-center flex-wrap">
            <div className="text-[10px] font-medium capitalize">
              Project Code: {project.projectCode}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>
            <div className="text-[10px] font-medium">0 Brand Ambassador</div>
            <div className="text-[16px] p-0 px-2">|</div>
            {/* <br className="block md:hidden" /> */}

            <div className="text-[10px] font-medium">0 Supervisor</div>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
          <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
            <div className=" font-normal text-[8px] capitalize">
              {/* Mon, Wed, Fri {"  "} */}
              {formatWorkingDaysS(project.workingDays)}
            </div>
            <div className="text-[10px] pb-1 font-black">.</div>

            <div className="font-normal text-[8px]">
              {/* Nov 30 - December 30 */}
              {new Date(project.projectDuration.startDate).toLocaleDateString(
                "en-US",
                options
              )}{" "}
              {" - "}
              {new Date(project.projectDuration.endDate).toLocaleDateString(
                "en-US",
                options
              )}
            </div>
            <div className="text-[10px] pb-1 font-black">.</div>
            <div className="font-normal text-[8px]">
              {/* Lagos, Abuja, Ogun, Plateau */}
              {formattedLocation}
            </div>
          </div>
          <button className="ox__btn max-w-fit text-[12px] mt-2 bg-[#93979D]">
            View Report
          </button>
        </CardFooter>
      </Card>
    );
  });
  return <div className="flex flex-col w-full gap-2">{projects}</div>;
};

export default ActiveProjects;
