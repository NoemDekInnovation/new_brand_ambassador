import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import axios from "axios";
import { Card, CardContent } from "../../../ui/card";
// import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImAttachment, ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  MdAddCircleOutline,
  MdFamilyRestroom,
  MdOutlineProductionQuantityLimits,
  MdPostAdd,
} from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import { Button } from "../../../ui/button";
import { RiStackshareLine } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../ui/alert-dialog";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";
import {
  authAxiosInstance,
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Empty } from "../../Empty";
import { useToast } from "../../../ui/use-toast";
import OfferModal from "../../../libs/OfferModal";
import OfferPopUp from "./offerPopUp";
import ContractPopUp from "./contractPopup";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Contract = ({ selectedProject }: { selectedProject: any }) => {
  const user = useSelector((state: RootState) => state.user);

  type ContractProps = "contracts" | "offers";

  const [selectedFileName, setSelectedFileName] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [offerName, setOfferName] = useState("");
  const [offerDesc, setOfferDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [contractStatus, setContractStatus] = useState<ContractProps>("offers");
  const [statusMessage, setStatusMessage] = useState("");
  const [offers, setOffers] = useState<any | null>(null);
  const [contracts, setContracts] = useState<any | null>(null);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [openContractDialog, setOpenContractDialog] = useState(false);

  const { toast } = useToast();

  const handleOfferNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOfferName(event.target.value);
  };

  const handleOfferDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOfferDesc(event.target.value);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const selectedFiles = fileInput.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setDocuments((prevDocuments) => [...prevDocuments, ...filesArray]);
    }
    fileInput.value = "";
  };

  const handleDivClick = () => {
    // Trigger a click event on the hidden input
    fileInputRef?.current?.click();
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    formData.append("offerName", offerName);
    formData.append("offerDescription", offerDesc);

    documents.forEach((file, index) => {
      formData.append("document", file);
    });

    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.post(
          `/create-offer/${selectedProject._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setStatusMessage(response.data.message || "Success");
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Open the modal after the status message is set
    if (statusMessage) {
      setModalOpen(true);
    }
  }, [statusMessage]);

  const fetchContractOffers = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/offers/${selectedProject._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );

        const offers = response.data.data.projectOffers;
        setOffers(offers);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  const fetchContracts = async () => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance(
          `/contracts/${selectedProject._id}`,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );

        const contracts = response.data.data.projectContracts;

        setContracts(contracts);
      } catch (error) {
        console.error("Error while fetiching Notifications:", error);
      }
    }
  };

  useEffect(() => {
    fetchContracts();
    fetchContractOffers();
  }, [openAddressDialog]);

  const renderParagraphs = (text: string) => {
    // Replace newline characters with <br> tags
    const paragraphs = text
      ?.split("\n")
      ?.map((paragraph: string, index: number) => (
        <p key={index}>{paragraph}</p>
      ));

    return paragraphs;
  };

  return (
    <>
      <div>
        <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Menu as="div" className=" inline-block text-left cursor-pointer">
              <div className="absolute right-[80px] -top-1">
                <Menu.Button>
                  <Button className="dark___btn whitespace-nowrap gap-1 items-center ">
                    <MdAddCircleOutline className="text-[16px]" />
                    Create Offer/Contract
                  </Button>{" "}
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-[80px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => setOpenAddressDialog(true)}
                        >
                          Offer{" "}
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => setOpenContractDialog(true)}
                        >
                          Contract{" "}
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </span>
        <div className="p-4">
          <p className="text-[18px] font-semibold">Contracts</p>
        </div>
        <Separator className="bg-bm__gler/50 " />
        <div className="flex item-center m-0 border rounded-md w-fit my-4">
          <button
            className={`${
              contractStatus === "offers" ? "bg-[#DCDDDF]" : ""
            } px-4 gap-2 transistion-all duration-1000`}
            onClick={() => {
              // dispatch(
              //   filterApplications({ id: ProjectId, status: "shortlisted" })
              // );
              setContractStatus("offers");
            }}
          >
            Offers
            <span className="text-[16px] font-semibold text-black">
              {" "}
              {/* ({applications?.data?.totalShortlists}) */}
            </span>
          </button>

          <div className="h-9 w-0.5 bg-[#D7D8DA]"></div>
          <button
            className={`${
              contractStatus === "contracts" ? "bg-[#DCDDDF]" : ""
            } px-4 gap-2 transistion-all duration-1000`}
            onClick={() => {
              // dispatch(filterApplications({ id: ProjectId, status: "rejected" }));
              setContractStatus("contracts");
            }}
          >
            Contracts{" "}
            <span className="text-[16px] font-semibold text-black">
              {/* ({applications?.data?.totalRejected}) */}
            </span>
          </button>
        </div>
        <Separator className="bg-bm__gler/50" />
        {contractStatus === "offers" && offers && offers.length > 0 && (
          <div className="mr-4">
            {offers.map((offer: any, idx: number) => {
              return (
                <Card className="w-full p-4 my-3 ">
                  <div className="text-[15px] font-medium">
                    {offer?.offerName}
                  </div>
                  <div
                    className="break-words text-[10px] font-normal mt-2"
                    key={idx}
                  >
                    {renderParagraphs(offer?.offerDescription)}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
        {contractStatus === "contracts" &&
          contracts &&
          contracts.length > 0 && (
            <div className="mr-4">
              {contracts.map((contract: any, idx: number) => {
                return (
                  <Card className="w-full p-4 my-3 ">
                    <div className="text-[15px] font-medium">
                      {contract?.contractName}
                    </div>
                    <div
                      className="break-words text-[10px] font-normal mt-2"
                      key={idx}
                    >
                      {renderParagraphs(contract?.contractDescription)}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

        {offers && contractStatus === "offers" && offers.length === 0 && (
          <Card className="w-full pt-4 my-3 overflow-y-scroll h-[80vh]">
            <CardContent>
              {/* <Card className="h-[40vh]"> */}

              <div className="flex flex-col overflow-y-auto h-[40vh]">
                <p className=" capitalize break-words p-4">
                  <Empty children />
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {!offers && (
          <Card className="w-full pt-4 my-3 overflow-y-scroll h-[80vh]">
            <CardContent>
              {/* <Card className="h-[40vh]"> */}

              <div className="flex flex-col overflow-y-auto h-[40vh]">
                <p className=" capitalize break-words p-4">
                  <Empty children />
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <OfferPopUp
        openAddressDialog={openAddressDialog}
        setOpenAddressDialog={setOpenAddressDialog}
        projectId={selectedProject?._id}
      />
      <ContractPopUp
        openContractDialog={openContractDialog}
        setOpenContractDialog={setOpenContractDialog}
        projectId={selectedProject?._id}
      />
    </>
  );
};

export default Contract;
