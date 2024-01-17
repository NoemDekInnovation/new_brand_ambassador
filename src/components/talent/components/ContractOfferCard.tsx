import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { ImAttachment } from "react-icons/im";
import OfferModal from "../../../libs/OfferModal";

const ContractOfferCard = ({
  selectedProject,
  setPopUp,
  close,
}: {
  setPopUp: any;
  close: any;
  selectedProject: any;
}) => {
  const {
    talentOffers: { offers },
  } = useSelector((state: RootState) => state.contractOffer);
  const user = useSelector((state: RootState) => state.user);

  const [details, setDetails] = useState<any>(null);
  const [offersx, setOffers] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const filteredApplications = offers.filter((application: any) => {
      return selectedProject.project._id === application.project._id;
    });

    // Now, filteredApplications contains the applications that match the condition.

    setDetails(filteredApplications[0]);
  });

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
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          close();
          setPopUp();
        }, 2000);
        setStatusMessage(response.data.message || "Success");
      } catch (error: any) {
        console.error("Error while fetiching Notifications:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
      }
    }
  };

  useEffect(() => {
    // Open the modal after the status message is set
    if (statusMessage) {
      setModalOpen(true);
    }
  }, [statusMessage]);

  const handleOffer = async () => {
    await acceptOffer("accepted");
    setTimeout(() => {
      setModalOpen(true);
    }, 2000);
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
          onClick={() => {
            close();
            setPopUp();
          }}
        >
          Cancel
        </div>
        <div className="flex gap-2">
          <div
            className="border-red-500 text-red-500 rounded-md max-w-fit cursor-pointer  p-1 px-6 border"
            // onClick={() => acceptOffer("accepted")}
            onClick={() => acceptOffer("rejected")}
          >
            Reject
          </div>

          <div
            className="dark__btn cursor-pointer max-w-fit"
            onClick={() => acceptOffer("accepted")}
            // onClick={handleOffer}
          >
            Accept
          </div>
        </div>
        <OfferModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          statusMessage={statusMessage}
        />
      </div>
    </>
  );
};

export default ContractOfferCard;
