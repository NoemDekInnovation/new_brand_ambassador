import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { campaignAuthAxiosInstance } from "../../../api/axios";
import { ImAttachment } from "react-icons/im";
import OfferModal from "../../../libs/OfferModal";
import { EmptyBox } from "../../Empty";
import OfferPopUp from "./offerPopUp";
import ContractPopUp from "./contractPopup";

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
  const [contract, setContract] = useState<any | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [openOfferDialog, setOpenOfferDialog] = useState(false);
  const [openContractDialog, setOpenContractDialog] = useState(false);

  console.log("offersx", offersx);

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

  const fetchContract = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `get-talent-contracts?project=${selectedProject.project._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );

        setContract(response?.data.data.contracts[0]);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  console.log(contract);
  useEffect(() => {
    fetchContract();
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
      {offersx && (
        <Card className="mb-4 md:mb-8">
          <CardContent className="py-4">
            <h3 className="text-[15px] font-medium">Offer</h3>
            <Separator className="bg-bm__beige my-3 md:my-6" />
            <Card
              className="hover:bg-gray-200/40 transition-all duration-300"
              onClick={() => setOpenOfferDialog(true)}
            >
              <CardContent className="py-4 gap-2">
                <h3 className="text-[15px] font-medium mb-2">
                  {offersx?.offerName}
                </h3>

                <p className="text-[10px] font-normal">
                  {offersx?.offerDescription}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
      {!offersx && (
        <Card className="mb-4 md:mb-8">
          <CardContent className="py-4">
            <h3 className="text-[15px] font-medium mb-2">Offer</h3>
            <Separator className="bg-bm__beige my-3 md:my-6" />
            <Card>
              <CardContent className="py-4 gap-2">
                <EmptyBox>
                  <p className="text-black py-3">
                    You have not received an offer.
                  </p>
                </EmptyBox>{" "}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
      {contract && (
        <Card className="mb-4 md:mb-8">
          <CardContent className="py-4">
            <h3 className="text-[15px] font-medium mb-2">Contract</h3>
            <Separator className="bg-bm__beige my-3 md:my-6" />
            <Card
              className="hover:bg-gray-200/40 transition-all duration-300"
              onClick={() => setOpenContractDialog(true)}
            >
              <CardContent className="py-4 gap-2">
                <h3 className="text-[15px] font-medium">
                  {contract?.contractName}
                </h3>

                <p className="text-[10px] font-normal">
                  {contract?.contractDescription}
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
      {!contract && (
        <Card className="mb-4 md:mb-8">
          <CardContent className="py-4">
            <h3 className="text-[15px] font-medium mb-2">Contract</h3>
            <Separator className="bg-bm__beige my-3 md:my-6" />
            <Card>
              <CardContent className="py-4 gap-2">
                <EmptyBox>
                  <p className="text-black py-3">
                    You have not received a contract.
                  </p>
                </EmptyBox>{" "}
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
      <OfferPopUp
        openOfferDialog={openOfferDialog}
        setOpenOfferDialog={setOpenOfferDialog}
        projectId={selectedProject?._id}
        offer={offersx}
      />
      <ContractPopUp
        openContractDialog={openContractDialog}
        setOpenContractDialog={setOpenContractDialog}
        projectId={selectedProject?._id}
      />

      {/* <div className="flex w-full justify-between mt-3 md:mt-6">
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
      </div> */}
    </>
  );
};

export default ContractOfferCard;
