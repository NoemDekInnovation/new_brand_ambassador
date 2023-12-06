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
import { useEffect, useRef } from "react";
import Carousel from "react-multi-carousel";
import { FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchactiveproject } from "../../redux/ActiveProject";

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

  useEffect(() => {
    dispatch(fetchactiveproject());
  }, [dispatch]);

  const projects = activeProject.map((project, idx) => {
    console.log(project);
    if (!Array.isArray(activeProject)) {
      return <div>Loading...</div>;
    }

    return (
      <Card
        className=" bg-white p-2 mx-3 rounded-md md:w-[234px] shadow-md"
        key={idx}
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
    );
  });

  return (
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
  );
}

const ProjectCard = ({
  card_title,
  card_content,
}: {
  card_title: string;
  card_content: { isCurrent: boolean; content: number[] };
}) => {
  return (
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
                View all favourites{" "}
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
        {card_content.content.map((_, idx) => {
          return (
            <div key={idx}>
              <TalentCard />
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProjectCard;
