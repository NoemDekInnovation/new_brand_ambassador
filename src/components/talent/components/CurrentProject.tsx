import { useSelector } from "react-redux";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import drago from "../../../assets/drago.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { GiEmptyHourglass } from "react-icons/gi";

export const CurrentProject = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const [currentProject, setCurrentProject] = useState<any>();

  const fetchApplications = async () => {
    if (user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/current-project`,

          {
            headers: {
              Authorization: `Bearer ${user?.authKey || ""}`,
            },
          }
        );

        // console.log(response.data);

        setCurrentProject(response.data?.projects[0].project);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <Card className="p-2 md:p-4 bg-white">
      <CardHeader className="flex-row p-1 justify-between items-center">
        <CardTitle>
          <p className="font-medium text-[15px] whitespace-nowrap">
            Current Project
          </p>
        </CardTitle>
      </CardHeader>

      <div>
        <Separator className="my-2 bg-[#D7D8DA]" />

        {!currentProject && (
          <div className="h-[90px] flex items-center justify-center flex-col gap-2">
            <GiEmptyHourglass className="text-20" />
            No Active Project
          </div>
        )}
        {currentProject && (
          <>
            <CardContent className="p-0 space-y-1">
              <div className="flex space-x-2">
                {!currentProject?.metaData?.createdBy?.companyLogo && (
                  <div className="flex rounded-full h-[18px] w-[18px] bg-bm__beige"></div>
                )}
                {currentProject?.metaData?.createdBy?.companyLogo && (
                  <img
                    src={currentProject?.metaData?.createdBy?.companyLogo}
                    alt="profile"
                    width={18}
                    height={18}
                    className="rounded-full  h-[18px] w-[18px] object-cover"
                  />
                )}

                <p className="px-2 text-[12px] text-[#252525B2] font-medium capitalize">
                  {/* <p className="border-r px-2 text-[12px] capitalize"> */}
                  {currentProject?.metaData?.createdBy?.agencyName}
                </p>
              </div>
              <h3 className="font-medium text-[15px] ">
                {currentProject?.projectTitle}
              </h3>
              <p className="font-normal text-[10px] text-[#252525]">
                {currentProject?.projectDescription}
              </p>

              <div className="flex md:space-x-2 text-bm__niv text-[10px] font-black items-center flex-wrap">
                <div className="">ID: {currentProject?.projectCode} </div>
                <div className="text-[16px] p-0  pb-2 px-2">.</div>
                <div className="">
                  {" "}
                  Outlet: {currentProject?.projectLocation[0]}
                </div>
                <div className="text-[16px] p-0  pb-2 px-2">.</div>
                {/* <br className="block md:hidden" /> */}

                <div className="">
                  Supervisor: {currentProject?.supervisorName || "-"}{" "}
                </div>
              </div>
            </CardContent>
            <CardFooter className="mt-1 p-0 md:gap-6 flex-col sm:flex-row  sm:items-end items-start ">
              <div className="flex md:space-x-2 text-bm__grey__text text-[8px] h-full flex-wrap">
                {currentProject?.workingDays.map((_: any, idx: number) => {
                  return (
                    <div key={idx} className="capitalize">
                      {_},
                    </div>
                  );
                })}
                <div className="text-[11px] p-0  pb-1 px-1">.</div>

                <div className="">
                  {" "}
                  <Moment format="D MMM ">
                    {currentProject?.projectDuration?.startDate}
                  </Moment>{" "}
                  -{" "}
                  <Moment format="D MMM ">
                    {currentProject?.projectDuration?.endDate}
                  </Moment>{" "}
                </div>
                <div className="text-[11px] p-0  pb-1 px-1">.</div>
                {currentProject?.projectLocation.map((_: any, idx: number) => {
                  return (
                    <div key={idx} className="capitalize">
                      {_},
                    </div>
                  );
                })}
              </div>

              {/* <button className="bg-ox__btn max-w-fit text-[12px] mt-2">
                Add Report
              </button> */}
            </CardFooter>
          </>
        )}
      </div>
    </Card>
  );
};
