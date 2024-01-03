import React, { useEffect } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchcompleteproject } from "../../redux/completeProject";

const CompletedProjects = ({ searchQuery }: { searchQuery: string }) => {
  const { completeProject } = useSelector(
    (state: RootState) => state.completeProject
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchcompleteproject());
  }, [dispatch]);

  if (!Array.isArray(completeProject)) {
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

  const filteredProjects = completeProject?.filter((project: any) => {
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
      <Card className="p-4 relative hover:bg-black/10 cursor-pointer" key={idx}>
        <span className="absolute top-0 right-0 text-sm  pr-2 pt-2">
          Completed on{" "}
          {new Date(project.projectDuration.endDate).toLocaleDateString(
            "en-US",
            options
          )}
        </span>
        <CardContent className="p-0 space-y-1">
          <h3 className="font-medium text-[15px] capitalize">
            {/* Project Name {"  "}(in-store){" "} */}
            {project.projectTitle}
          </h3>
          <p className="font-normal text-[15px] capitalize">
            {/* This is the project description.. this is the project
                description */}
            {project.projectDescription}
          </p>
          <div className="flex md:space-x-2 text-[10px] font-medium items-center flex-wrap">
            <div className="text-[10px] font-medium capitalize">
              Project Code: {project.projectCode}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>
            <div className="text-[10px] font-medium">
              0 Brands Ambassador Applications
            </div>
            <div className="text-[16px] p-0 px-2">|</div>
            {/* <br className="block md:hidden" /> */}

            <div className="text-[10px] font-medium">
              0 Supervisor Applications
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
          <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
            <div className=" font-normal text-[8px] capitalize">
              {/* Mon, Wed, Fri {"  "} */}
              {formatWorkingDaysS(project.workingDays)} {"  "}
            </div>
            <div className="text-[10px] pb-1 font-black">.</div>

            <div className="font-normal text-[8px] capitalize">
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
            <div className="font-normal text-[8px] capitalize">
              {/* Lagos, Abuja, Ogun, Plateau */}
              {formattedLocation}
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  });

  return <>{projects}</>;
};

export default CompletedProjects;
