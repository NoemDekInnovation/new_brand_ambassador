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
import {
  FaArrowRight,
  FaCrown,
  FaFacebook,
  FaGraduationCap,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Logo from "../../assets/beauty.jpg";
import { fetchactiveproject } from "../../redux/ActiveProject";
import { fetchTalents } from "../../redux/talent.slice";
import { ProjectProps, TalentProps, favProp } from "../../redux/types";
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
// import { fetchpublishproject } from "../../redux/publishProject";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BsTwitterX } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { PiStackSimpleFill } from "react-icons/pi";
import { MdMoreVert } from "react-icons/md";

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
  // const [selectedProjectId, setSelectedProjectId] = useState();
  const [id, setId] = useState<string>();

  const [popUp, setPopUp] = useState(false);

  const handleProjectPopUp = (project: any) => {
    setSelectedProject(project);
    setPopUp(!popUp);
    // setSelectedRole(talent);
  };

  // useEffect(() => {
  // dispatch(fetchpublishproject(null));
  // }, [dispatch]);

  const projects = activeProject.map((project, idx) => {
    if (!Array.isArray(activeProject)) {
      return <div>Loading...</div>;
    }

    const truncateWords = (text: string, maxWords: number) => {
      const words = text.split(" ");
      const truncated = words.slice(0, maxWords).join(" ");

      return truncated + (words.length > maxWords ? "..." : "");
    };

    return (
      <>
        <Card
          className=" bg-white p-2 mx-3 rounded-md w-[260px] md:w-[234px] shadow-md cursor-pointer mb-4"
          key={idx}
          onClick={() => handleProjectPopUp(project)}
        >
          <p className="text-[15px] font-medium capitalize">
            {/* Project Name */}
            {project.projectTitle}
          </p>
          <p className="text-[10px] leading-4 font-normal capitalize">
            {/* This is the project description.. this is the project description */}
            {truncateWords(project.projectDescription, 5)}
          </p>
          <Separator className="my-1" />
          <div className="">
            <div className="flex items-center py-2">
              <p className="font-medium text-[10px] text-bm__niv ">
                PC: {project.projectCode}
              </p>
              <div className="ml-2 border-r-2 border-[#252525] h-[15px] font-medium" />
              <p className="font-medium text-[10px] text-bm__niv ml-2">
                {project?.totalBAs} BA(s)
              </p>
              <div className="ml-2 border-r-2 border-[#252525] h-[15px] font-medium" />
              <p className="font-medium text-[10px] text-bm__niv ml-2">
                {project?.totalSupervisors} Supervisors
              </p>
            </div>
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
            </div>
          </div>
        </Card>
      </>
    );
  });

  console.log(projects);
  return (
    <>
      <Card className="p-2 md:p-4 bg-white h-[224px] w-full max-w-[300px] md:max-w-full">
        <CardHeader className="flex-row p-1 justify-between items-center">
          <CardTitle>
            <p className="text-[15px] font-medium leading-[15px] whitespace-nowrap">
              {card_title}
            </p>
          </CardTitle>
        </CardHeader>
        <Separator className="my-2" />
        <div className="md:max-w-[1200px] h-[180px] 8xl:max-w-[1920px] mx-auto">
          {projects?.length === 0 && <div>No data</div>}
          <Carousel
            additionalTransfrom={0}
            partialVisible={true}
            arrows
            autoPlaySpeed={3000}
            centerMode={false}
            className="gap-2"
            containerClass=" md:w-[1200px] 8xl:w-full"
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
              large_desktop: {
                breakpoint: {
                  max: 3000,
                  min: 1920,
                },
                items: 6,
                partialVisibilityGutter: 40,
              },
              desktop: {
                breakpoint: {
                  max: 1919,
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
        id={id}
        setId={setId}
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
  card_content: { isCurrent: boolean; content: TalentProps[] | favProp[] };
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
  const [popUp, setPopUp] = useState(false);
  const [selectedRole, setSelectedRole] = useState<TalentProps>();
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
  const [projectId, setProjectId] = useState<string | null>(null);
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
          // console.log("i said", project._id, project);
          return { value: project._id, label: project.projectTitle };
        });

        setProjects(projects);
        setProjectId(projects[0]?._id);
      }
    };
    fetchProjects();
    setIsLoading(false);
  }, [user?.accountId]);

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

  const handleProfilePopUp = (talent: any) => {
    setPopUp(!popUp);
    setSelectedRole(talent);
  };
  return (
    <>
      <Card className="p-2 md:p-4 bg-white h-[352px] w-full max-w-[300px] md:max-w-full">
        <CardHeader className="flex-row p-1 justify-between items-center">
          <CardTitle className="font-medium text-[15px] leading-[15px] whitespace-nowrap">
            {card_title}
          </CardTitle>
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-[15px] leading-[18px] font-normal text-[#252525B2]">
                  <MdMoreVert />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="bg-white p-3">
                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    Sort
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-bm__beige" />

                  <DropdownMenuItem className="hover:bg-black/10  text-[16px]">
                    <div className="flex items-center gap-2">
                      <div
                        onClick={() => {
                          // setDefaultTab("projects");
                          localStorage.setItem("defaultTab", "talent"); // Store in local storage
                          localStorage.setItem("defaultTalent", card_title); // Store in local storage
                          window.location.reload();
                        }}
                        className="text-[15px] leading-[18px] font-normal text-[#252525B2]"
                      >
                        View all{" "}
                      </div>

                      <div className="text-[14px] text-[#252525B2]">
                        <FaArrowRight className="w-[w8px]" />
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="gap-8 text-bm_black/75 text-[10px] whitespace-nowrap hidden md:flex">
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
                <div
                  onClick={() => {
                    // setDefaultTab("projects");
                    localStorage.setItem("defaultTab", "talent"); // Store in local storage
                    localStorage.setItem("defaultTalent", card_title); // Store in local storage
                    window.location.reload();
                  }}
                  className="text-[15px] leading-[18px] font-normal text-[#252525B2]"
                >
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
        <div className="flex justify-start items-center flex space-x-1 space-x-6 overflow-x-scroll">
          {card_content.content?.slice(0, 6).map((talent, idx) => {
            return (
              <TalentGrid
                _={talent}
                // idx={idx}
                setModal={setProjectModal}
                modal={projectModal}
                setSelectedTalentID={setSelectedTalentID}
                handleProfilePopUp={handleProfilePopUp}
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
              <SelectContent className="bg-white overflow-y-scroll h-[40vh]">
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
                <SelectItem value="brand ambassador">
                  Brand Ambassador
                </SelectItem>
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
      <div
        className={`fixed bg-black/50  z-[1000] w-[100%] items-center justify-end flex flex-col transition-all duration-1000 ${
          popUp
            ? "translate-y-0 opacity-100 h-[100vh] inset-0 -bottom-5"
            : "translate-y-[1000px] opacity-100 h-0 right-0 bottom-0"
        }`}
      >
        <div className="bg-white w-[90vw] max-h-[80vh] overflow-y-scroll p-3 md:p-6 rounded-xl">
          <div className="flex w-full justify-between ">
            <div className="gap-3 flex items-center whitespace-nowrap w-full ">
              <div className=" w-full flex flex-1 items-center gap-4">
                <p>{selectedRole?.fullName}</p>

                <AiOutlineHeart />
              </div>
              <Button className="dark__btn max-w-[100px] mr-4">
                Invite Talent
              </Button>
              <Button className="light__btn max-w-[100px]">Share</Button>
            </div>
            <Button onClick={() => setPopUp(false)}>x</Button>
          </div>
          <Separator className={"my-3"} />
          <div className="flex">
            <div className="flex  mr-2 flex-col gap-2 md:gap-4">
              <div className="h-[400px]  rounded-md w-[400px] flex items-center bg-black">
                <img src={selectedRole?.profilePic} className="" alt="" />
              </div>

              <div className="flex justify-evenly  gap-1 w-full max-w-[400px]">
                {/* <div className="flex justify-evenly w-[60w] lg:w-[40w] gap-1"> */}
                {[1, 2, 3, 4, 5, 6, 7].map((photo) => (
                  <div className="" key={photo}>
                    <img
                      src={Logo}
                      alt={""}
                      style={{ width: "100%", height: "auto" }}
                      height={80}
                      width={40}
                    />
                  </div>
                ))}
              </div>
              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <div className="flex items-center gap-4">
                  <FaGraduationCap />
                  <p className="text-[15px] font-medium">
                    Qualification & Certificates
                  </p>
                </div>
                <Separator className="bg-bm__gler/50" />

                {/* {selectedRole?.education?.length > 0 &&
                      selectedRole.education.map(
                        (educationItem: Education, index: number) => (
                          <div key={index}>
                            <p className="text-[12px] font-normal capitalize">
                              {educationItem?.degree}
                            </p>
                          </div>
                        )
                      )} */}

                {/* {selectedRole?.education?.length > 0 && (
                          <>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].institution}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].degree}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].grade}
                            </p>
                            <p className="text-[12px] font-normal capitalize">
                              {selectedRole.education[0].gradYear}
                            </p>
                          </>
                        )} */}

                {selectedRole?.certifications?.map(
                  (certificationItem: any, index: number) => (
                    <div key={index}>
                      <p className="text-[12px] font-normal capitalize">
                        {certificationItem?.certificateName}
                      </p>
                    </div>
                  )
                )}
              </Card>

              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <p className="text-[15px] font-medium">Work you are open to </p>
                <Separator className="bg-bm__gler/50" />
                <p className="text-[12px] font-normal capitalize">
                  {/* Usher . In-Store Marketer . Open Market Marketer .
                          Brand Ambassador . Brand Ambassador Supervisor .
                          In-Store Supervisor */}
                  {selectedRole?.opportunities}
                </p>
              </Card>
              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <div className="flex items-center gap-4">
                  <FaCrown />
                  <p className="text-[15px] font-medium">Skills</p>
                </div>

                <Separator className="bg-bm__gler/50" />
                {/* <p className="text-[12px] font-normal">
                          Modelling . Singing . Dancing . Paintballing . Catwalk
                          . Leg walk . Pretty
                        </p> */}
                {/* {selectedRole?.skills?.length > 0 ? (
                      selectedRole?.skills.map((skill: [], index: number) => (
                        <p
                          key={index}
                          className="text-[12px] font-normal capitalize"
                        >
                          {skill}
                        </p>
                      ))
                    ) : (
                      <p className="text-[12px] font-normal">
                        No skills available
                      </p>
                    )} */}
              </Card>

              <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
                <p className="text-[15px] font-medium">Socials</p>

                <Separator className="bg-bm__gler/50" />
                <div className="flex items-center py-2">
                  <FaLinkedin color="#0077b5" size={20} />
                  <Link
                    to={`https://www.linkedin.com/in/${selectedRole?.socials?.linkedin}`}
                    target="_blank"
                    className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
                  >
                    {selectedRole?.socials?.linkedin}
                  </Link>
                </div>
                <div className="flex items-center py-2">
                  <FaInstagram color="#e4405f" size={20} />
                  <Link
                    to={`https://www.instagram.com/${selectedRole?.socials?.instagram}`}
                    target="_blank"
                    className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
                  >
                    {selectedRole?.socials?.instagram}
                  </Link>
                </div>
                <div className="flex items-center py-2">
                  <BsTwitterX size={20} />
                  <Link
                    to={`https://twitter.com/${selectedRole?.socials?.twitter}`}
                    target="_blank"
                    className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
                  >
                    {selectedRole?.socials?.twitter}
                  </Link>
                </div>
                <div className="flex items-center py-2">
                  <FaFacebook color="#1877f2" size={20} />
                  <Link
                    to={`https://www.facebook.com/${selectedRole?.socials?.facebook}`}
                    target="_blank"
                    className="text-[12px] font-normal ml-2 underline text-blue-600 hover:text-blue-800"
                  >
                    {selectedRole?.socials?.facebook}
                  </Link>
                </div>
              </Card>

              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <p className="text-[15px] font-medium">Languages</p>

                <Separator className="bg-bm__gler/50" />
                {/* <p className="text-[12px] font-normal">
                          Yoruba . English . Hausa{" "}
                        </p> */}
                {/* {selectedRole?.languages?.map(
                      (language: [], index: number) => (
                        <p
                          key={index}
                          className="text-[12px] font-normal capitalize"
                        >
                          {language}
                        </p>
                      )
                    )} */}
              </Card>
            </div>
            <div className="flex-1 space-y-4">
              <Card className="p-2 md:p-4">
                <h2>Overview</h2>
                <Separator className="bg-bm__beige my-3" />
                <p className="text-[12px] font-normal text-bm_black w-[110px]">
                  {selectedRole?.summary || "-"}
                </p>
              </Card>
              <Card className="p-2 md:p-4">
                <h2>Personal Details</h2>
                <Separator className="bg-bm__beige my-3" />
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    First Name:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.firstName || "-"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Last Name:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.lastName || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Middle Name:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.middleName || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Email Address:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.email || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Phone Number:{" "}
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.phone || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Alternate Number:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.alternatePhone || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Date of Birth:{" "}
                  </p>{" "}
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.DOB || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Gender:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.gender || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Skin Color:
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    State of Origin:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.origin || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Height:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.height || "-"}
                  </p>
                </div>{" "}
                <div className="flex gap-2">
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    Dress Size:
                  </p>
                  <p className="text-[12px] font-normal text-bm_black w-[110px]">
                    {selectedRole?.dressSize || "-"}
                  </p>
                </div>
              </Card>
              <Card className="p-6 flex flex-col justify-center gap-2 bg-white border-bm__beige w-full border rounded-[6px]">
                <div className="flex items-center gap-4">
                  <FaLocationDot />
                  <p className="text-[15px] font-medium">Address</p>
                </div>
                <Separator className="bg-bm__gler/50" />
                {selectedRole?.address?.map(
                  (addressItem: any, index: number) => (
                    <div key={index}>
                      <p className="text-[12px] font-normal capitalize">
                        {addressItem?.street ?? ""}
                      </p>
                      <p className="text-[12px] font-normal capitalize">
                        {addressItem?.city ?? ""}
                      </p>
                      <p className="text-[12px] font-normal capitalize">
                        {addressItem?.LGA ?? ""}
                      </p>
                      <p className="text-[12px] font-normal capitalize">
                        {addressItem?.state ?? ""}
                      </p>
                      <p className="text-[12px] font-normal capitalize">
                        {addressItem?.zipCode ?? ""}
                      </p>
                    </div>
                  )
                )}
              </Card>

              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <div className="flex items-center gap-4">
                  <FaGraduationCap />
                  <p className="text-[15px] font-medium">
                    Education & Certification
                  </p>
                </div>
                <Separator className="bg-bm__gler/50" />
                {/* <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Education 1
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="">BSc. in Modelling</p>
                            <PiStackSimpleFillp>Second Class</p>
                            <p>University of Ilorin</p>
                            <p>Class of 2019</p>
                          </div>
                        </div> */}
                {selectedRole?.education?.map(
                  (educationItem: any, index: number) => (
                    <div
                      key={index}
                      className="text-[12px] font-normal gap-2 flex flex-col"
                    >
                      <div className="flex items-center">
                        <p className="text-[12px] font-medium">
                          Education {index + 1}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="capitalize">{educationItem?.degree}</p>
                        <p className="capitalize">{educationItem?.grade}</p>
                        <p className="capitalize">
                          {educationItem?.institution}
                        </p>

                        <p className="capitalize">
                          {new Date(educationItem?.gradYear).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  )
                )}

                <Separator className="bg-bm__gler/50" />
                {/* <div className="text-[12px] font-normal gap-2 flex flex-col">
                          <div className="flex items-center">
                            <p className="text-[12px] font-medium">
                              Certificate 1
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <PiStackSimpleFillp className="">Certificate in Dancing</p>
                            <p>J-Skills School of Dancing</p>
                            <p>2020</p>
                          </div>
                        </div> */}
                {selectedRole?.certifications?.map(
                  (certificationItem: any, index: number) => (
                    <div
                      key={index}
                      className="text-[12px] font-normal gap-2 flex flex-col"
                    >
                      <div className="flex items-center">
                        <p className="text-[12px] font-medium">
                          Certificate {index + 1}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="capitalize">
                          {certificationItem?.certificateName}
                        </p>
                        <p className="capitalize">
                          {certificationItem?.organisation}
                        </p>
                        <p className="capitalize">
                          {certificationItem?.certYear}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </Card>
              <Card className=" p-6 flex flex-col justify-center gap-2 bg-white  border-bm__beige w-full  border rounded-[6px]">
                <div className="flex items-center gap-4">
                  <PiStackSimpleFill />

                  <p className="text-[15px] font-medium">Experience</p>
                </div>
                <Separator className="bg-bm__gler/50" />
                <div className="text-[12px] font-normal gap-2 flex flex-col">
                  {selectedRole?.experience?.map(
                    (experienceItem: any, index: number) => (
                      <div key={index} className="flex flex-col">
                        <div className="flex items-center">
                          <p className="text-[12px] font-medium">
                            Experience {index + 1}
                          </p>
                        </div>
                        <p className="capitalize">
                          {experienceItem?.agencyName}
                        </p>
                        <p className="capitalize">
                          {experienceItem?.projectName}
                        </p>
                        <p className="capitalize">
                          {experienceItem?.projectCategory}
                        </p>
                        <p className="capitalize">
                          {experienceItem?.projectDuration}
                        </p>
                        <p className="capitalize">
                          {/* {experienceItem.salary} */}₦
                          {parseFloat(experienceItem?.salary).toLocaleString(
                            "en-US"
                          )}
                        </p>
                        <p className="capitalize">{experienceItem?.year}</p>
                      </div>
                    )
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
