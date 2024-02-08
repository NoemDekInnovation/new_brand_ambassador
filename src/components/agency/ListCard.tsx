import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Separator } from "../../ui/seperator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { AiOutlineMore } from "react-icons/ai";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import drago from "../../assets/drago.jpg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchactiveproject } from "../../redux/ActiveProject";

export function TopProjectCard({
  card_title,
  card_width,
}: {
  card_width?: string;
  card_title: string;
}) {
  const { completeProject, totalProjects: completeCount } = useSelector(
    (state: RootState) => state.completeProject
  );

  const { publishProject, totalProjects } = useSelector(
    (state: RootState) => state.publishProject
  );

  const { activeProject, totalProjects: activeCount } = useSelector(
    (state: RootState) => state.activeProject
  );

  const [projectType, setProjectType] = useState<string>("Active");

  const handleTabClick = (active_Content: string = "") => {
    const content = active_Content;
    setProjectType(active_Content);
    // Stringify the object before storing it in localStorage
    const stringifiedContent = JSON.stringify(content);

    // Store the stringified content in localStorage
    localStorage.setItem("defaultProject", stringifiedContent);
  };

  return (
    <Card className={`p-2 md:p-4 bg-white w-[240px] ${card_width}`}>
      <CardHeader className="flex-row p-1 justify-between items-center">
        <div className="flex space-x-3">
          <CardTitle className="">
            <p className="font-medium text-[15px]">{card_title}</p>
          </CardTitle>
        </div>
        <div className="flex gap-4 text-bm_black/75 text-[14px]">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AiOutlineMore />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-3">
              <DropdownMenuItem className="hover:bg-black/10">
                Relevance
              </DropdownMenuItem>
              <DropdownMenuSeparator className=" bg-bm__beige" />
              <DropdownMenuItem className="hover:bg-black/10">
                Favorites{" "}
              </DropdownMenuItem>
              <DropdownMenuSeparator className=" bg-bm__beige" />
              <DropdownMenuItem className="hover:bg-black/10">
                Top rated
              </DropdownMenuItem>
              <DropdownMenuSeparator className=" bg-bm__beige" />
              <DropdownMenuItem className="hover:bg-black/10">
                Top paying
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Separator className="my-2 bg-bm__beige" />
      <Tabs defaultValue="current" className="mb-0">
        <TabsList className="p-0 justify-start gap-4 flex">
          <TabsTrigger
            className="px-0"
            value="current"
            onClick={() => handleTabClick("Active")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Current</p>
              <span className="bg-bm__niv text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {activeCount}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="px-0"
            value="published"
            onClick={() => handleTabClick("Published")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Published</p>
              <span className="bg-bm_card__orange text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {totalProjects}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="px-0"
            value="completed"
            onClick={() => handleTabClick("Completed")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Completed</p>
              <span className="bg-bm_black text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {completeCount}
              </span>
            </div>
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="current">
          {activeCount === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 active Project
            </div>
          )}
          {activeCount > 0 &&
            activeProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";
              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex ">
                      <div className="flex">
                        <img src={drago} alt="" width={18} height={18} />
                        <p className="border-r px-1 text-[11px] whitespace-nowrap text-[#252525]">
                          Cool Ltd.
                        </p>
                      </div>
                      <p className="border-r px-1 text-[11px] whitespace-nowrap">
                        5k per week
                      </p>
                      <p className="text-bm__niv text-[10px] font-medium pl-1">
                        Current
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[15px] ">
                        {" "}
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                    </div>
                    <p className="font-normal text-[13px]">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-[#800000]">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[12px]">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
        <TabsContent value="published">
          {totalProjects === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 Published Project
            </div>
          )}

          {totalProjects > 0 &&
            publishProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";
              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex ">
                      <div className="flex">
                        <img src={drago} alt="" width={18} height={18} />
                        <p className="border-r px-1 text-[11px] whitespace-nowrap text-[#252525]">
                          Cool Ltd.
                        </p>
                      </div>
                      <p className="border-r px-1 text-[11px] whitespace-nowrap">
                        5k per week
                      </p>
                      <p className="text-bm_card__orange text-[10px] font-medium pl-1">
                        Published
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[15px] ">
                        {" "}
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                    </div>
                    <p className="font-normal text-[13px]">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-[#800000]">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[12px]">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
        <TabsContent value="completed">
          {completeCount === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 Completed Project
            </div>
          )}
          {completeCount > 0 &&
            completeProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";
              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex ">
                      <div className="flex">
                        {!project?.profilePic && (
                          <div className="flex rounded-full h-[18px] w-[18px] bg-bm__beige"></div>
                        )}
                        {project?.profilePic && (
                          <img
                            src={project?.profilePic}
                            alt="profile"
                            width={18}
                            height={18}
                            className="rounded-full  h-[18px] w-[18px] object-cover"
                          />
                        )}
                        {/* <img src={drago} alt="" width={18} height={18} /> */}
                        <p className="border-r px-1 text-[11px] whitespace-nowrap text-[#252525]">
                          Cool Ltd.
                        </p>
                      </div>
                      <p className="border-r px-1 text-[11px] whitespace-nowrap">
                        5k per week
                      </p>
                      <p className="text-black text-[10px] font-medium pl-1">
                        Completed{" "}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[15px] ">
                        {" "}
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                    </div>
                    <p className="font-normal text-[13px]">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-[#800000]">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[12px]">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
      </Tabs>
      {/* <div>
        {[1, 2, 3].map((_, idx) => {
          return (
            <div className="" key={idx}>
              <CardContent className="p-0 space-y-1">
                <div className="flex ">
                  <div className="flex">
                    <img src={drago} alt="" width={18} height={18} />
                    <p className="border-r px-1 text-[11px] whitespace-nowrap text-[#252525]">
                      Cool Ltd.
                    </p>
                  </div>
                  <p className="border-r px-1 text-[11px] whitespace-nowrap">
                    5k per week
                  </p>
                  <p className="text-bm__niv text-[10px] font-medium pl-1">
                    Current
                  </p>
                </div>
                <div className="flex space-x-2">
                  <h3 className="font-medium text-[15px] ">Project Name</h3>
                </div>
                <p className="font-normal text-[13px]">
                  This is the project description.{" "}
                </p>
                <p className="font-medium text-[13px] text-[#800000]">
                  300 Applications{" "}
                </p>
                <div className="flex space-x-2 text-[12px]">
                  <p>Lagos, Abuja</p>{" "}
                </div>
              </CardContent>
              {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
            </div>
          );
        })}
      </div> */}

      <Separator className="my-2" />
      {/* <CardFooter
        className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full"
        onClick={() => {
          // Stringify the object before storing it in localStorage
          const stringifiedContent = JSON.stringify(projectType);

          // Store the stringified content in localStorage
          localStorage.setItem("defaultProject", stringifiedContent);

          localStorage.setItem("defaultTab", "projects"); // Store in local storage
          // localStorage.setItem("defaultTalent", projectType); // Store in local storage
          window.location.reload();
        }}
      >
        <Link to={""} className="flex items-center space-x-2">
          <p> See all projects</p> <HiOutlineArrowSmallRight />
        </Link>
           
      </CardFooter> */}
      <CardFooter
        className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full"
        onClick={() => {
          // Stringify the object before storing it in localStorage
          const stringifiedContent = JSON.stringify(projectType);

          // Store the stringified content in localStorage
          localStorage.setItem("defaultProject", stringifiedContent);

          localStorage.setItem("defaultTab", "projects"); // Store in local storage
          // localStorage.setItem("defaultTalent", projectType); // Store in local storage
          window.location.reload();
        }}
      >
        <div className="flex items-center space-x-2">
          <p className="font-medium text-[10px] text-[#252525]/70">
            See all projects
          </p>{" "}
          <HiOutlineArrowSmallRight />
        </div>
      </CardFooter>
    </Card>
  );
}

const ListCard = ({
  card_width,
}: {
  card_title: string;
  card_width?: string;
}) => {
  const { completeProject, totalProjects: completeCount } = useSelector(
    (state: RootState) => state.completeProject
  );

  const { publishProject, totalProjects } = useSelector(
    (state: RootState) => state.publishProject
  );

  const { activeProject, totalProjects: activeCount } = useSelector(
    (state: RootState) => state.activeProject
  );

  const [projectType, setProjectType] = useState<string>("Active");

  const handleTabClick = (active_Content: string = "") => {
    const content = active_Content;
    setProjectType(active_Content);
    // Stringify the object before storing it in localStorage
    const stringifiedContent = JSON.stringify(content);

    // Store the stringified content in localStorage
    localStorage.setItem("defaultProject", stringifiedContent);
  };

  return (
    <Card className={`p-2 md:p-4 bg-white  w-[240px] ${card_width}`}>
      <CardHeader className="flex-row p-1 justify-between items-center">
        <div className="flex space-x-3">
          <CardTitle className="">
            <p className="font-medium text-[15px] ">My Projects</p>
          </CardTitle>
        </div>
      </CardHeader>
      <Separator className="my-2 bg-bm__beige" />
      <Tabs defaultValue="current" className="mb-0">
        <TabsList className="p-0 justify-start gap-4 flex">
          <TabsTrigger
            className="px-0"
            value="current"
            onClick={() => handleTabClick("Active")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Current</p>
              <span className="bg-bm__niv text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {activeCount}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="px-0"
            value="published"
            onClick={() => handleTabClick("Published")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Published</p>
              <span className="bg-bm_card__orange text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {totalProjects}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            className="px-0"
            value="completed"
            onClick={() => handleTabClick("Completed")}
          >
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Completed</p>
              <span className="bg-bm_black text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {completeCount}
              </span>
            </div>
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="current">
          {activeCount === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 active Project
            </div>
          )}
          {activeCount > 0 &&
            activeProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";

              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[12px] border-r pr-2">
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                      <p className="text-green-500 text-[12px] font-medium">
                        Current{" "}
                      </p>
                    </div>
                    <p className="font-normal text-[8px] leading-3">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-bm__ox__red">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[8px] font-light leading-3">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
        <TabsContent value="published">
          {totalProjects === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 Published Project
            </div>
          )}

          {totalProjects > 0 &&
            publishProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";

              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[12px] border-r pr-2">
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                      <p className="text-bm_card__orange text-[12px] font-medium">
                        Published
                      </p>
                    </div>
                    <p className="font-normal text-[8px] leading-3">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-bm__ox__red">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[8px] font-light leading-3">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
        <TabsContent value="completed">
          {completeCount === 0 && (
            <div className="w-full h-full flex items-center justify-center py-5 text-[14px] text-[#444]">
              0 Completed Project
            </div>
          )}
          {completeCount > 0 &&
            completeProject.slice(0, 3).map((project, idx) => {
              const formattedLocation = Array.isArray(project.projectLocation)
                ? project.projectLocation.join(", ")
                : "";

              return (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex space-x-2">
                      <h3 className="font-medium text-[12px] border-r pr-2">
                        {project.projectTitle.length > 15
                          ? `${project.projectTitle.substring(0, 15)}...`
                          : project.projectTitle}
                      </h3>
                      <p className="text-black text-[12px] font-medium">
                        Completed
                      </p>
                    </div>
                    <p className="font-normal text-[8px] leading-3">
                      {project.projectDescription.length > 85
                        ? `${project.projectDescription.substring(0, 85)}...`
                        : project.projectDescription}
                    </p>
                    <p className="font-medium text-[13px] text-bm__ox__red">
                      {project?.totalApplications} Applications{" "}
                    </p>
                    <div className="flex space-x-2 text-[8px] font-light leading-3">
                      {formattedLocation}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              );
            })}
        </TabsContent>
      </Tabs>
      <Separator className="my-2" />
      <CardFooter
        className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full"
        onClick={() => {
          // Stringify the object before storing it in localStorage
          const stringifiedContent = JSON.stringify(projectType);

          // Store the stringified content in localStorage
          localStorage.setItem("defaultProject", stringifiedContent);

          localStorage.setItem("defaultTab", "projects"); // Store in local storage
          // localStorage.setItem("defaultTalent", projectType); // Store in local storage
          window.location.reload();
        }}
      >
        <Link to={""} className="flex items-center space-x-2">
          <p className="font-medium text-[10px] text-[#252525]/70">
            See all projects
          </p>{" "}
          <HiOutlineArrowSmallRight />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ListCard;
