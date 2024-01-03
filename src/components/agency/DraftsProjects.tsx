import React, { useEffect } from "react";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { fetchdraftproject } from "../../redux/draftProject.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";

const DraftsProjects = ({ searchQuery }: { searchQuery: string }) => {
  const { draftProject } = useSelector(
    (state: RootState) => state.draftProject
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchdraftproject());
  }, [dispatch]);

  if (!Array.isArray(draftProject)) {
    return <div>Loading...</div>;
  }
  const formatWorkingDays = (workingDays?: string[]) => {
    return workingDays?.join(", ") || "";
  };

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const filteredProjects = draftProject?.filter((project: any) => {
    // Check if project and project.name are defined before calling toLowerCase()
    return (
      project?.projectTitle &&
      project?.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const projects = filteredProjects.map((project, idx) => {
    const isEvenIndex = idx % 2 === 0;
    const editedTimestamp = isEvenIndex
      ? "June 2nd, 2023 | 2:00 PM"
      : "2 hrs ago";
    const formattedLocation = Array.isArray(project.projectLocation)
      ? project.projectLocation.join(", ")
      : "";

    return (
      <Card
        className="p-4 mb-4 relative hover:bg-black/10 cursor-pointer"
        key={idx}
      >
        <span className="absolute top-0 right-0 text-sm  pr-2 pt-2">
          {`Edited ${editedTimestamp}`}
        </span>
        <CardContent className="p-0 space-y-1">
          <h3 className="font-medium text-[15px] capitalize">
            {/* Project Name {"  "}(in-store){" "} */}
            {project.projectTitle}
          </h3>
          <p className="font-normal text-[15px]">
            {/* This is the project description.. this is the project description */}
            {project.projectDescription}
          </p>
          <div className="flex md:space-x-2 text-[10px] font-medium items-center flex-wrap">
            <div className="text-[10px] font-medium">
              {/* Project Code: NIV23  */}
              Project Code: {project.projectCode}
            </div>
            <div className="text-[15px] p-0 px-2">|</div>
            <div className="text-[10px] font-medium">
              300 Brands Ambassador Applications
            </div>
            <div className="text-[16px] p-0 px-2">|</div>
            {/* <br className="block md:hidden" /> */}

            <div className="text-[10px] font-medium">
              50 Supervisor Applications
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-3 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end">
          <div className="flex md:space-x-2 text-bm__grey__text text-[10px] h-full flex-wrap  ">
            <div className=" font-normal text-[8px] capitalize">
              {/* Mon, Wed, Fri {"  "} */}
              {formatWorkingDays(project.workingDays)} {"  "}
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

  return <div>{projects}</div>;
};

export default DraftsProjects;
