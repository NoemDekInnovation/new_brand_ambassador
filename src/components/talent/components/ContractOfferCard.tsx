import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { ImAttachment } from "react-icons/im";

const ContractOfferCard = ({ selectedProject }: { selectedProject: any }) => {
  const {
    talentOffers: { offers },
  } = useSelector((state: RootState) => state.contractOffer);
  const user = useSelector((state: RootState) => state.user);

  const [details, setDetails] = useState<any>(null);
  const [offersx, setOffers] = useState<any | null>(null);

  useEffect(() => {
    const filteredApplications = offers.filter((application: any) => {
      console.log(application.project._id);
      return selectedProject.project._id === application.project._id;
    });

    // Now, filteredApplications contains the applications that match the condition.

    setDetails(filteredApplications[0]);
  });
  console.log(offersx);

  const fetchOffers = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `get-talent-offers?project=${selectedProject.project._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setOffers(response?.data.data.offers[0]);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const acceptOffer = async (value: string) => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/accept-or-reject-offer/${selectedProject.project._id}?status=${value}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  return (
    <>
      <Card className="mb-4 md:mb-8">
        <CardContent className="py-4">
          <p>{offersx?.offerName} Contract Offer</p>
          <Separator className="bg-bm__beige my-3 md:my-6" />
          <Card>
            <CardContent className="py-4 gap-2">
              {offersx?.offerDescription}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 min-h-[300px]">
          <p>Attachments</p>
          <Separator className="bg-bm__beige my-3 md:my-6" />

          <ImAttachment className="text-[30px]" />
          {/* <a
            href={offersx && offersx.document[0]}
            className="underline"
            target="_blank"
          >
            {(offersx !== null && offersx.document[0]) || "-"}
          </a> */}
        </CardContent>
      </Card>
      <div className="flex w-full justify-between mt-3 md:mt-6">
        <div
          className="light__btn cursor-pointer max-w-fit"
          onClick={() => acceptOffer("rejected")}
        >
          Cancel
        </div>
        <div
          className="dark__btn cursor-pointer max-w-fit"
          onClick={() => acceptOffer("accepted")}
        >
          Accept
        </div>
      </div>
    </>
  );
};

export default ContractOfferCard;
