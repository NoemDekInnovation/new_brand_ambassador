import React, { useState } from "react";
import { Card } from "../../../../../ui/card";
import ProjectSlide from "../../ProjectSlide";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { setSelectedProject } from "../../../../../redux/revmap/projects";

const PublishedProject = ({ project }: { project: any }) => {
  const [popUp, setPopUp] = useState(false);
  // const [selectedProject, setSelectedProject] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { selectedProject } = useSelector(
    (state: RootState) => state.newProjects
  );

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedLocation = Array.isArray(project?.projectLocation)
    ? project.projectLocation.join(", ")
    : "";

  const handleSlideUp = (project: any) => {
    setPopUp(!popUp);
    setSelectedProject(project);
    dispatch(setSelectedProject(project));
  };

  // console.log({ project }, project?._id, selectedProject);
  return (
    <>
      <Card className="p-2 mb-3">
        <div className="flex flex-col justify-between  gap-1 cursor-pointer">
          <div
            className="flex justify-between flex-col-reverse md:flex-row gap-1"
            onClick={() => handleSlideUp(project)}
          >
            <p className="text-[18px] font-medium capitalize">
              {project?.projectTitle}{" "}
            </p>
            <p className="text-[12px] font-normal">
              {" "}
              Closes on{" "}
              {new Date(project.projectDuration?.endDate).toLocaleDateString(
                "en-US",
                options
              )}
            </p>
          </div>

          <p
            className="text-[12px] font-medium  capitalize"
            onClick={() => handleSlideUp(project)}
          >
            {project?.projectCode}
          </p>
          <p
            className="text-[12px] font-normal text-[#515457]  capitalize pb-3"
            onClick={() => handleSlideUp(project)}
          >
            {project?.projectDescription}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between">
          <div
            className="flex text-[12px] font-normal text-[#515457] flex-1 items-end"
            onClick={() => handleSlideUp(project)}
          >
            <div
              className="font-normal capitalize flex gap-1 mr-1
            "
            >
              <Moment format="MM DD">
                {project.projectDuration?.startDate}
              </Moment>

              {" - "}
              <Moment format="MM DD">{project.projectDuration?.endDate}</Moment>
            </div>{" "}
            <span className="m-1 bg-slate-500 rounded-full h-1 w-1 "></span>{" "}
            <span className="ml-1">{formattedLocation}</span>
          </div>
          <div className="flex justify-end">
            <button className="dark___btn">
              Applications({project?.totalApplications})
            </button>
          </div>
        </div>
      </Card>
      {project?._id === selectedProject?._id && (
        <ProjectSlide popUp={popUp} setPopUp={setPopUp} />
      )}{" "}
    </>
  );
};

export default PublishedProject;
