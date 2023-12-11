import { Separator } from "../../ui/seperator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { BiChevronRight, BiSortAlt2, BiChevronLeft } from "react-icons/bi";
import TalentCard from "./TalentCard";
import { useEffect, useRef, useState } from "react";
import Carousel from "react-multi-carousel";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchactiveproject } from "../../redux/ActiveProject";
import { fetchTalents } from "../../redux/talent.slice";
import { ProjectProps, TalentProps } from "../../redux/types";
import { TalentGrid } from "./talents/talentView";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { campaignAuthAxiosInstance } from "../../api/axios";
import { TbProgressCheck } from "react-icons/tb";
import ProjectPreview from "../projectPreview/projectPreview";
import { ProjectViewCard } from "../projectPreview";
import { IoShareSocial, IoStarHalf } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";

import girl1 from "../../assets/Rectangle 11 (1).png";
import girl2 from "../../assets/Gallery=Gallery6.png";
import girl3 from "../../assets/Profile 1 1.png";
import girl4 from "../../assets/Profile 2 1.png";
import girl5 from "../../assets/Rectangle 11 (1).png";

const options: Intl.DateTimeFormatOptions = {
  // year: "numeric",
  month: "short",
  day: "numeric",
};

export function CurrentProjects({
  card_title,
  card_content,
}: {
  card_title: string;
  card_content: { isCurrent: boolean; content: number[] };
}) {
  const { activeProject } = useSelector(
    (state: RootState) => state.activeProject
  );
  const dispatch = useDispatch<AppDispatch>();

  const [selectedProject, setSelectedProject] = useState();

  const [popUp, setPopUp] = useState(false);
  const handleProfilePopUp = (project: any) => {
    setSelectedProject(project);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  useEffect(() => {
    dispatch(fetchactiveproject());
  }, [dispatch]);

  const projects = activeProject.map((project, idx) => {
    if (!Array.isArray(activeProject)) {
      return <div>Loading...</div>;
    }

    return (
      <>
        <Card
          className=" bg-white p-2 mx-3 rounded-md md:w-[234px] shadow-md cursor-pointer"
          key={idx}
          onClick={() => handleProfilePopUp(project)}
        >
          <p className="text-[15px] font-medium capitalize">
            {/* Project Name */}
            {project.projectTitle}
          </p>
          <p className="text-[10px] leading-4 font-normal capitalize">
            {/* This is the project description.. this is the project description */}
            {project.projectDescription}
          </p>
          <Separator className="my-1" />
          <div className="">
            <div className="flex items-center py-2">
              <p className="font-medium text-[10px] text-bm__niv ">
                PC: {project.projectCode}
              </p>
              <div className="ml-2 border-r-2 border-[#252525] h-[15px] font-medium" />
              <p className="font-medium text-[10px] text-bm__niv ml-2">0 BA</p>
              <div className="ml-2 border-r-2 border-[#252525] h-[15px] font-medium" />
              <p className="font-medium text-[10px] text-bm__niv ml-2">
                0 Supervisors
              </p>
            </div>
            {/* <div className="flex items-center py-2">
            <p className="font-medium text-[10px] text-bm__niv">Ambassadors</p>
            <div className="ml-2 border-r-2 border-[#252525] h-[15px] font-medium" />
            <p className="font-medium text-[10px] text-bm__niv ml-2">
              0 Supervisors
            </p>
          </div> */}
          </div>
          <Separator className="my-1" />
          <div className="py-2">
            <div className="font-medium text-[8px]">
              {new Date(project.projectDuration.startDate).toLocaleDateString(
                "en-US",
                options
              )}{" "}
              {" - "}
              {new Date(project.projectDuration.endDate).toLocaleDateString(
                "en-US",
                options
              )}{" "}
              . {project.projectLocation}
              {/* Nov 30 - December 30 . Lagos, Abuja, Ogun, Plateau */}
              {/* {project.projectPost.startDate} - {project.projectPost.endDate} .{" "}
            {project.projectLocation} */}
            </div>
          </div>
        </Card>
      </>
    );
  });

  return (
    <>
      <Card className="p-2 md:p-4 bg-white h-[255px]">
        <CardHeader className="flex-row p-1 justify-between items-center">
          <CardTitle>
            <p className="text-[15px] font-medium leading-[15px] whitespace-nowrap">
              {card_title}
            </p>
          </CardTitle>
        </CardHeader>
        <Separator className="my-2" />
        <div className="max-w-[1200px] h-[168px]">
          <Carousel
            additionalTransfrom={0}
            partialVisible={true}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="gap-2"
            containerClass="sm:mx-9 md:mx-4 lg:mx-12 w-[1200px]"
            dotListClass=""
            draggable
            focusOnSelect={false}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
              desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1024,
                },
                items: 4,
                partialVisibilityGutter: 40,
              },
              tablet: {
                breakpoint: {
                  max: 1024,
                  min: 464,
                },
                items: 3,
                partialVisibilityGutter: 20,
              },
              mobile: {
                breakpoint: {
                  max: 464,
                  min: 0,
                },
                items: 1,
              },
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            // showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {projects}
          </Carousel>
        </div>
      </Card>
      <ProjectViewCard
        popUp={popUp}
        setPopUp={() => setPopUp(!popUp)}
        selectedProject={selectedProject}
      />
    </>
  );
}

const dialogSlide = [girl1, girl2, girl5];
const modalImage = [girl4, girl3, girl4];
const ProjectCard = ({
  card_title,
  card_content,
}: {
  card_title: string;
  card_content: { isCurrent: boolean; content: TalentProps[] };
}) => {
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedTalent, setSelectedTalent] = useState("");
  const [selectedTalentID, setSelectedTalentID] = useState("drip");
  const [projects, setProjects] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [projectModal, setProjectModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [toggleDialog, setToggleDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % dialogSlide.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + dialogSlide.length) % dialogSlide.length
    );
  };

  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    setIsLoading(true);

    const fetchProjects = async () => {
      if (user !== null) {
        const response = await campaignAuthAxiosInstance(`/projects`, {
          headers: {
            Authorization: `Bearer ${user.authKey || ""}`,
          },
        });
        const projects = response?.data?.data.projects.map((project: any) => {
          console.log(project._id, project);
          return { value: project._id, label: project.projectDescription };
        });

        setProjects(projects);
      }
    };
    fetchProjects();
    setIsLoading(false);
  }, [user?.accountId]);

  console.log(
    "projects,projects",
    selectedProject,
    selectedTalent,
    selectedTalentID
  );

  const handleInvite = async () => {
    setIsLoading(true);
    if (user !== null) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/invite-to-project`,
          {
            opportunities: selectedTalent,
            projectId: selectedProject,
            talentId: selectedTalentID,
          },
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
      } catch (error) {
        setIsLoading(false);

        console.log(error);
      }
    }
  };

  return (
    <>
      <Card className="p-2 md:p-4 bg-white h-[352px]">
        <CardHeader className="flex-row p-1 justify-between items-center">
          <CardTitle className="font-medium text-[15px] leading-[15px] whitespace-nowrap">
            {card_title}
          </CardTitle>
          <div className="flex justify-between items-center">
            <div className="flex gap-8 text-bm_black/75 text-[10px] whitespace-nowrap">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-[15px] leading-[18px] font-normal text-[#252525B2]">
                  Sort: {"  "}Relevance
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white p-3">
                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Relevance
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-bm__beige" />

                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Salary
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                <div className="text-[15px] leading-[18px] font-normal text-[#252525B2]">
                  View all{" "}
                </div>

                <div className="text-[14px] text-[#252525B2]">
                  <FaArrowRight className="w-[w8px]" />
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <Separator className="my-3" />
        <div className="flex justify-between items-center flex-wrap space-x-1 ">
          {card_content.content?.slice(0, 5).map((talent, idx) => {
            return (
              <TalentGrid
                _={talent}
                idx={idx}
                setModal={setProjectModal}
                modal={projectModal}
                // handleInvite={handleInvite}
                // setSelectedProject={setSelectedProject}
                // projects={projects}
                // setSelectedTalent={setSelectedTalent}
                // handleProfilePopUp={handleProfilePopUp}
                // selectedTalent={selectedTalent}
                setSelectedTalentID={setSelectedTalentID}
                // selectedProject={selectedProject}
                // setSuccessModal={setSuccessModal}
                // successModal={successModal}
              />
            );
          })}
        </div>
      </Card>

      <Dialog open={projectModal} onOpenChange={setProjectModal}>
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
            <DialogDescription>Invite talent to your project</DialogDescription>
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
                  projects.map(
                    (
                      // { projectTitle, _id }: { projectTitle: any; _id: string },
                      project: any,
                      index: number
                    ) => {
                      return (
                        <SelectItem value={project.value} key={index}>
                          {project.label}
                        </SelectItem>
                      );
                    }
                  )}
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
              {isLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Send Invite
            </Button>
          </DialogFooter>
        </DialogContent>
               
      </Dialog>

      <Dialog open={successModal}>
        <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center max-w-[360px] md:max-w-[500px] max-h-[300px] py-8">
          <TbProgressCheck className="font-normal text-[155px] text-green-700" />

          <div className="text-[18px] font-semibold">Invite Sent</div>
          <Separator />
          <div className="">
            Talent has been invited to apply to your project
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={false} onOpenChange={setToggleDialog}>
        <DialogContent className="bg-white p-0 flex flex-col items-center">
          <div className="bg-green-300 p-4 w-[1000px] h-full max-h-[80vh]">
            <div className="flex items-center space-x-3 mt-2 mb-4">
              <div className="flex items-center space-x-3">
                <p className="text-[18px] font-medium">Gloria Michael</p>
                <span className="bg-[#00AB26] h-2 w-2 rounded-full"></span>
                <div className="border-l border-[#D7D8DA] h-8"></div>
                <p className="text-[12px] font-medium text-[#252525]">
                  Ikeja, Lagos
                </p>
                <div className="flex items-center space-x-1">
                  <IoStarHalf />
                  <div className="border-l border-[#D7D8DA] h-8"></div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <IoIosHeartEmpty />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="hover:bg-black/10 flex items-center">
                    <IoShareSocial />
                    <span className="ml-2">Share</span>
                  </div>
                  <div className="hover:bg-black/10">Invite</div>
                </div>
              </div>
            </div>
            <div className="relative w-full max-w-[900px] ">
              <img
                src={modalImage[currentImageIndex]}
                alt={`girl-${currentImageIndex + 1}`}
                width={600}
                height={533}
                className=" h-full w-full"
                onClick={() => handleImageClick(currentImageIndex)}
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-row items-center justify-between px-4 mt-2">
                <button onClick={handlePrevImage} style={{ color: "white" }}>
                  &lt;
                </button>
                <button onClick={handleNextImage} style={{ color: "white" }}>
                  &gt;
                </button>
              </div>
            </div>

            <div className="flex flex-row items-center flex-wrap p-0 m-0">
              {dialogSlide.slice(0, 7).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`girl-${index + 1}`}
                  className="h-[80px]"
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
