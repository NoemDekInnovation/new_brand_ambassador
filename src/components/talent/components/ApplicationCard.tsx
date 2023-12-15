import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ImAttachment } from "react-icons/im";

const ApplicationCard = ({ selectedProject }: { selectedProject: any }) => {
  const user = useSelector((state: RootState) => state.user);

  const [details, setDetails] = useState<any>(null);

  const fetchAppLetter = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          "get-talent-applications",
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        console.log(
          response?.data?.data?.talentApplications,
          "hello yuta",
          selectedProject.project._id
        );
        const applicationsResponse = response?.data?.data?.talentApplications;

        const filteredApplications = applicationsResponse.filter(
          (application: any) => {
            console.log(application.project._id);
            return selectedProject.project._id === application.project._id;
          }
        );

        // Now, filteredApplications contains the applications that match the condition.

        setDetails(filteredApplications[0]);
        // console.log(
        //   applicationsResponse,
        //   "bitter",
        //   filteredApplications[0]?.applicationLetter
        // );

        // setDetails(response?.data.data.offers);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchAppLetter();
  }, []);
  return (
    <>
      <Card className="mb-4 md:mb-8">
        <CardContent className="py-4">
          <p>Application Letter</p>
          <Separator className="bg-bm__beige my-3 md:my-6" />
          <Card>
            <CardContent className="py-4 gap-2">
              {(details !== null && details.applicationLetter) || "-"}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 min-h-[300px]">
          <p>Attachments</p>

          <Separator className="bg-bm__beige my-3 md:my-6" />

          <ImAttachment className="text-[30px]" />
          <a
            href={details && details.document[0]}
            className="underline"
            target="_blank"
          >
            {(details !== null && details.document[0]) || "-"}
          </a>
        </CardContent>
      </Card>
    </>
  );
};

export default ApplicationCard;
