import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";

import { Separator } from "../../../ui/seperator";
import { Link } from "react-router-dom";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { BiMessageDetail } from "react-icons/bi";
import drago from "../../../assets/drago.jpg";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

export const MyApplication = ({
  card_title,
  card_width,
}: {
  card_width?: string;
  card_title: string;
}) => {
  const { talentApplications, totalPending, totalRejected, totalSuccessful } =
    useSelector((state: RootState) => state.talentApplication);

  return (
    <Card className={`p-2 md:p-4 bg-white  w-full ${card_width}`}>
      <CardHeader className="flex-row p-1 justify-between items-center">
        <div className="flex space-x-3">
          <CardTitle className="">
            <p className="font-medium text-[15px] ">{card_title}</p>
          </CardTitle>
        </div>
      </CardHeader>
      <Separator className="my-2 bg-bm__beige" />
      <Tabs defaultValue="success" className="mb-0">
        <TabsList className="p-0 justify-between flex">
          <TabsTrigger className="p-0 h-3" value="success">
            {" "}
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Successful</p>
              <span className="bg-bm__niv text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {totalSuccessful}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger className="px-0" value="pending">
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Pending</p>
              <span className="bg-bm_card__orange text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {totalPending}
              </span>
            </div>
          </TabsTrigger>
          <TabsTrigger className="px-0" value="reject">
            <div className="flex space-x-1 items-center">
              <p className="text-bm_black text-[8px]">Rejected</p>
              <span className="bg-bm__red text-[8px] p-0 px-1 h-3 flex items-center rounded-[5px] text-white">
                {totalRejected}{" "}
              </span>
            </div>
          </TabsTrigger>
        </TabsList>
        <Separator className="my-2" />
        <TabsContent value="success">
          {talentApplications?.slice(0, 3)?.map((project: any, idx: number) => {
            return (
              project.status === "hired" && (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex space-x-2">
                      <img src={drago} alt="" width={18} height={18} />
                      <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                      <p className="text-bm__ox__red text-[10px] underline">
                        Applied
                      </p>
                    </div>
                    <h3 className="font-medium text-[15px] ">
                      {" "}
                      {project?.project?.projectTitle}
                    </h3>
                    <p className="font-normal text-[10px]">
                      {project?.project?.projectDescription}
                    </p>
                    <div className="flex space-x-2 text-[8px]">
                      <span>
                        <BiMessageDetail className=" text-[14px]" />
                      </span>
                      <p>Responded 3hrs ago</p>{" "}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              )
            );
          })}
        </TabsContent>
        <TabsContent value="pending">
          {" "}
          {talentApplications?.slice(0, 3)?.map((project: any, idx: number) => {
            return (
              project.status === "applied" && (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1">
                    <div className="flex space-x-2">
                      <img src={drago} alt="" width={18} height={18} />
                      <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                      <p className="text-bm__ox__red text-[10px] underline">
                        Applied
                      </p>
                    </div>
                    <h3 className="font-medium text-[15px] ">
                      {" "}
                      {project?.project?.projectTitle}
                    </h3>
                    <p className="font-normal text-[10px]">
                      {project?.project?.projectDescription}
                    </p>
                    <div className="flex space-x-2 text-[8px]">
                      <span>
                        <BiMessageDetail className=" text-[14px]" />
                      </span>
                      <p>Responded 3hrs ago</p>{" "}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              )
            );
          })}
        </TabsContent>
        <TabsContent value="reject">
          {" "}
          {talentApplications?.slice(0, 3)?.map((project: any, idx: number) => {
            return (
              project.status === "rejected" && (
                <div className="" key={idx}>
                  <CardContent className="p-0 space-y-1 bg-green-200">
                    <div className="flex space-x-2">
                      <img src={drago} alt="" width={18} height={18} />
                      <p className="border-r px-2 text-[12px]">Cool Ltd.</p>
                      <p className="text-bm__ox__red text-[10px] underline">
                        Rejected
                      </p>
                    </div>
                    <h3 className="font-medium text-[15px] ">
                      {" "}
                      {project?.project?.projectTitle}
                    </h3>
                    <p className="font-normal text-[10px]">
                      {project?.project?.projectDescription}
                    </p>
                    <div className="flex space-x-2 text-[8px]">
                      <span>
                        <BiMessageDetail className=" text-[14px]" />
                      </span>
                      <p>Responded 3hrs ago</p>{" "}
                    </div>
                  </CardContent>
                  {idx !== 2 && <Separator className="my-2 bg-bm__beige" />}
                </div>
              )
            );
          })}
        </TabsContent>
      </Tabs>
      <Separator className="my-2" />
      <CardFooter className="mt-3 p-0 gap-6  flex justify-center text-[10px] w-full">
        <div
          onClick={() => {
            const content = "My Applications";
            // Stringify the object before storing it in localStorage
            const stringifiedContent = JSON.stringify(content);

            // Store the stringified content in localStorage
            localStorage.setItem("defaultProject", stringifiedContent);

            localStorage.setItem("defaultTab", "projects"); // Store in local storage
            // localStorage.setItem("defaultTalent", card_title); // Store in local storage
            window.location.reload();
          }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <p>See all applications</p> <HiOutlineArrowSmRight />
        </div>
      </CardFooter>
    </Card>
  );
};
