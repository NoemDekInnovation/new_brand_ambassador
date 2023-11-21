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
import { useRef } from "react";
import Carousel from "react-multi-carousel";
import { FaArrowRight } from "react-icons/fa";

export const responsive = {
  xLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 1440 },
    items: 7,
    slidesToSlide: 2,
  },
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 1440, min: 800 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 7,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export function CurrentProjects({
  card_title,
  card_content,
}: {
  card_title: string;
  card_content: { isCurrent: boolean; content: number[] };
}) {
  const projects = [1, 2, 3, 4, 5, 6, 7].map((_, idx) => {
    return (
      <Card
        className=" bg-white p-2 mx-3 rounded-md md:w-[244px] shadow-md"
        key={idx}
      >
        <CardTitle className="text-[15px] font-medium leading-[15px]">
          Project Name
        </CardTitle>
        <CardDescription className="text-[10px] leading-4 font-normal">
          This is the decription... This is the description
        </CardDescription>
        <Separator className="my-1" />
        <div className="flex text-[14px] py-2">
          <p className="text-bm__niv pr-2 border-r-2 border-r-black mr-2 font-medium text-sm">
            Project Code: NIV23{" "}
          </p>
          <p className="text-bm__niv font-medium text-sm">300 Brand</p>
        </div>
        <div className="flex text-[14px] py-2">
          <p className="text-bm__niv underline pr-2 border-r-2 border-r-black mr-2 font-medium text-sm">
            {" "}
            300 Applications
          </p>
          <p className="text-bm__niv underline font-medium text-sm">
            10 Supervisors{" "}
          </p>
        </div>
        <Separator className="my-1" />
        <div className="flex text-[8px] gap-2 m-2">
          <div className=" font-normal">November 30 - December 30</div>
          <div className="">.</div>
          <div className="font-normal">Lagos, Abuja, Ogun</div>
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
      <div className="h-[168px]">
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container"
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
              items: 5,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 4,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
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
              <TalentCard />{" "}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
// export function CurrentProjects({
//   card_title,
//   card_content,
// }: {
//   card_title: string;
//   card_content: { isCurrent: boolean; content: number[] };
// }) {
//   const projects = [1, 2, 3, 4, 5, 6, 7].map((_, idx) => {
//     return (
//       <div
//         className="mx-3 border rounded-md p-2 md:p-4 bg-white shadow-md"
//         key={idx}
//         style={{ minWidth: "300px" }}
//       >
//         <h3 className="text-[15px] font-medium">Project Name</h3>
//         <p className="text-[14px]">
//           This is the decription... This is the description
//         </p>
//         <Separator className="my-1" />
//         <div className="flex text-[14px] py-2">
//           <p className="text-bm__niv pr-2 border-r-2 border-r-black mr-2 font-medium text-sm">
//             Project Code: NIV23{" "}
//           </p>
//           <p className="text-bm__niv font-medium text-sm">300 Brand</p>
//         </div>
//         <div className="flex text-[14px] py-2">
//           <p className="text-bm__niv underline pr-2 border-r-2 border-r-black mr-2 font-medium text-sm">
//             300 Applications
//           </p>
//           <p className="text-bm__niv underline font-medium text-sm">
//             10 Supervisors
//           </p>
//         </div>
//         <Separator className="my-1" />
//         <div className="flex text-[13px] gap-2">
//           <div className=" font-normal">Nov -30 - Dec 30</div>
//           <div className="">.</div>
//           <div className="font-normal">Lagos, Abuja, Ogun</div>
//         </div>
//       </div>
//     );
//   });

//   return (
//     <Card className="p-2 md:p-4 bg-white w-[1300px] overflow-auto">
//       <CardHeader className="flex-row p-1 justify-between items-center">
//         <CardTitle>
//           <p className="font-medium text-[15px] whitespace-nowrap">
//             {card_title}
//           </p>
//         </CardTitle>
//       </CardHeader>
//       <Separator className="my-2" />
//       {/* <div className="flex p-2 md:p-4 md:pl-0 pl-0 w-[1300px] overflow-x-auto">
//           {projects}
//         </div>
//         <div className="flex justify-between items-center mt-2">
//           <button
//             className="text-bm_black/75 text-[16px]"
//             onClick={() => scrollProjects(-1)}
//           >
//             <BiChevronLeft />
//           </button>
//           <button
//             className="text-bm_black/75 text-[16px]"
//             onClick={() => scrollProjects(1)}
//           >
//             <BiChevronRight />
//           </button>
//         </div> */}
//       {projects !== null && (
//         <Carousel
//           responsive={responsive}
//           autoPlay={true}
//           swipeable={true}
//           draggable={true}
//           autoPlaySpeed={6000}
//           keyBoardControl={true}
//           customTransition="all 5"
//           transitionDuration={100}
//           showDots={true}
//           infinite={true}
//           partialVisible={false}
//           slidesToSlide={1}
//           dotListClass="custom-dot-list-style"
//           // showDots={true}
//           // responsive={responsive}
//         >
//           {projects}
//         </Carousel>
//       )}
//     </Card>
//   );
// }

export default ProjectCard;
