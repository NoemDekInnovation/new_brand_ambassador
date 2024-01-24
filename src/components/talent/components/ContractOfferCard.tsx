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
        console.log(response);

        setContract(response?.data.data.contracts[0].contract);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchContract();
    fetchOffers();
  }, []);

  useEffect(() => {
    // Open the modal after the status message is set
    if (statusMessage) {
      setModalOpen(true);
    }
  }, [statusMessage]);

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
        projectId={selectedProject?.project?._id}
        offer={offersx}
      />
      <ContractPopUp
        openContractDialog={openContractDialog}
        setOpenContractDialog={setOpenContractDialog}
        projectId={selectedProject?.project?._id}
        contract={contract}
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
            className="border-red-500 text
            Reject
          </div>

          <div
            className="dark__btn cursor-pointer max-w-fit"

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
