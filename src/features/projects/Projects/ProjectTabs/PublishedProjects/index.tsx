import React, { useCallback, useEffect, useState } from "react";
import { Card } from "../../../../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../ui/dropdown-menu";
import { BiSortAlt2 } from "react-icons/bi";
import Pagination from "../../../../../ui/Pagination";
import PublishedProject from "../PublishedProject";
import { AiOutlineSearch } from "react-icons/ai";
import NewProject from "../../NewProject";
import { useNavigate } from "react-router-dom";
import ProjectTip from "./ProjectTip";
import { AppDispatch, RootState } from "../../../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchpublishprojects,
  setProjectQuery,
} from "../../../../../redux/revmap/projects";
import _debounce from "lodash.debounce";

const PublishedProjects = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [showNewProject, setShowNewProject] = useState(false);
  // const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortQuery, setSortQuery] = useState<any>({
    // projectId: projectId,
    pageSize: 10,
  });

  const {
    publishProject,
    totalPages,
    totalProjects,
    page,
    pageSize,
    projectQuery,
  } = useSelector((state: RootState) => state.newProjects);

  const navigate = useNavigate();
  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  const updateQuery = (newValues: any) => {
    setSortQuery((prevQuery: any) => ({ ...prevQuery, ...newValues }));
  };

  const handlePageSizeChange = useCallback((size: number) => {
    updateQuery({ pageSize: size });
    // Update query or fetch data for the new page size
  }, []);

  const handlePageChange = useCallback((page: any) => {
    updateQuery({ page: page });
  }, []);

  const handleSearchChange = useCallback((e: any) => {
    updateQuery({ search: e.target.value });
    setSearchQuery(e.target.value);
  }, []);

  const debouncedFetchProjects = useCallback(
    _debounce((projectQuery: any | null) => {
      dispatch(fetchpublishprojects(projectQuery));
    }, 300), // Adjust debounce delay as needed
    [dispatch]
  );

  useEffect(() => {
    debouncedFetchProjects(projectQuery);
    return debouncedFetchProjects.cancel; // Cleanup debounce on component unmount
  }, [debouncedFetchProjects, projectQuery]);

  const filteredProjects = publishProject?.filter((project: any) => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();

    // Check if project and project.projectTitle are defined before calling toLowerCase()
    const matchesTitle =
      project?.projectTitle &&
      project?.projectTitle.toLowerCase().includes(lowerCaseSearchQuery);

    // Check if project.type is defined and matches the desired type
    // const matchesType =
    //   project?.type && project?.type.toLowerCase() === type.toLowerCase();

    // Check if project.location is defined and intersects with the desired locations
    const matchesLocation =
      project?.location &&
      project?.projectLocation?.some((loc: string) =>
        loc.toLowerCase().includes(lowerCaseSearchQuery)
      );

    return matchesTitle;
    // return matchesTitle && matchesType && matchesLocation;
  });

  const filtereProjects = publishProject?.filter((project: any) => {
    // Check if project and project.name are defined before calling toLowerCase()
    return (
      project?.projectTitle &&
      project?.projectTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  useEffect(() => {
    dispatch(setProjectQuery(sortQuery));
  }, [sortQuery]);

  return (
    <>
      <Card className="bg-white h-[70vh] p-0 flex flex-col">
        <ProjectTip />
        <div className="border-y ">
          <div className="flex flex-col md:flex-row gap-3 bg-bm_card_grey p-4 w-full justify-between">
            <div className=" md:flex-1 ">
              <div className="px-3 bg-white mr-2 flex items-center w-full  max-w-[600px]  rounded-md">
                <AiOutlineSearch />
                <input
                  className="w-full bg-transparent outline-none text-[12px] p-2 my-auto"
                  type="search"
                  placeholder="Search filter (Project name, project type and location)"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <button
              className="dark___btn"
              onClick={() => navigate("/projects/create-project")}
            >
              Create Project
            </button>
          </div>
          <div className="flex flex-col md:flex-row w-full items-center md:justify-end md:gap-6 md:px-4 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 items-center">
                <BiSortAlt2 />
                <div className="flex text-[12px] font-normal text-{#252525]">
                  Sort by: {"  "}{" "}
                  <span className="text-black ml-1"> Title</span> (A-Z){" "}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white p-3 z-[2500] text-[#252525]">
                <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                  Title (A-Z)
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                  Title (Z-A)
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                  Date Created{" "}
                </DropdownMenuItem>{" "}
                <DropdownMenuSeparator className="bg-bm__beige" />
                <DropdownMenuItem className="hover:bg-black/10  text-[12px]">
                  Date Closed{" "}
                </DropdownMenuItem>{" "}
              </DropdownMenuContent>{" "}
            </DropdownMenu>
            <div className="max-w-[400px]">
              <Pagination
                count={totalProjects}
                currentPage={page}
                handlePageChange={handlePageChange}
                pageSize={pageSize}
                totalPages={totalPages}
              />{" "}
            </div>
          </div>
        </div>
        <div className="p-4 py-6  overflow-y-auto h-full">
          {filteredProjects.map((project, idx) => {
            return <PublishedProject key={idx} project={project} />;
          })}
        </div>
        <div className="flex w-full bg-bm_card_grey items-center justify-between md:gap-6 md:px-4 py-3 flex-col md:flex-row gap-2">
          <div className="flex items-center">
            <p className=" whitespace-nowrap  mr-2 text-[12px]">
              Rows Per Page:
            </p>
            <div className="flex items-center gap-3">
              {[10, 20, 30, 40, 50].map((n, idx) => {
                return (
                  <div
                    className={`hover:bg-gray-300 text-[12px]  ${
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

          <div className="max-w-[400px]">
            <Pagination
              count={totalProjects}
              currentPage={page}
              handlePageChange={handlePageChange}
              pageSize={pageSize}
              totalPages={totalPages}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default React.memo(PublishedProjects);
