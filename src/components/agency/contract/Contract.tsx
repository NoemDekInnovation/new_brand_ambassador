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
import { authAxiosInstance, patchAxiosInstance } from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Empty } from "../../Empty";
import { useToast } from "../../../ui/use-toast";
import OfferModal from "../../../libs/OfferModal";

const Contract = ({ selectedProject }: { selectedProject: any }) => {
  const user = useSelector((state: RootState) => state.user);
  // console.log("id", selectedProject._id);

  const [selectedFileName, setSelectedFileName] = useState("");
  const [offerName, setOfferName] = useState("");
  const [documents, setDocuments] = useState<File[]>([]);
  const [offerDesc, setOfferDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

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

  const handleSave = async () => {
    await handleSubmit();
    setTimeout(() => {
      setModalOpen(true);
    }, 2000);
  };

  return (
    <div>
      <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8 flex items-center gap-2">
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger className="absolute right-[80px] -top-1">
              {/* <div className="px-4"> */}
              <Button className="dark___btn whitespace-nowrap gap-1 items-center ">
                <MdAddCircleOutline className="text-[16px]" />
                Create Offer
              </Button>
              {/* </div> */}
            </AlertDialogTrigger>
            <AlertDialogContent className="z-[4000] bg-white ">
              <AlertDialogHeader>
                <AlertDialogTitle>Create Offer</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className=" h-[65vh]">
                    <Card className="w-full pt-4 my-3">
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <h2 className="text-[14px] font-normal capitalize">
                            Details
                          </h2>
                        </div>
                        <Separator className="bg-bm__beige my-6" />
                        <div className="mb-4">
                          <Input
                            placeholder=" Offer Name"
                            value={offerName}
                            onChange={handleOfferNameChange}
                          />
                        </div>
                        <Card className="h-[23vh]">
                          <div className="flex flex-col overflow-y-auto h-[23vh]">
                            <textarea
                              className=" break-words p-4 h-[23vh]"
                              placeholder="Describe the offer details here..."
                              value={offerDesc}
                              onChange={handleOfferDescChange}
                            />
                          </div>
                          <small>250 characters</small>
                        </Card>
                      </CardContent>
                    </Card>
                    <Card className="w-full pt-4 my-3">
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <h2 className="text-[14px] font-normal capitalize">
                            Attach Offer File
                          </h2>
                        </div>
                        <Separator className="bg-bm__beige my-6" />
                        <small className="text-bm__btn__grey">
                          Please attach only PDF files
                        </small>
                        <Card className="h-[10vh]">
                          <Input
                            type="file"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                          />
                          <Button
                            className="light__btn max-w-full mt-4"
                            onClick={handleDivClick}
                          >
                            <div className="flex items-center gap-1">
                              <ImAttachment className="text-[16px]" />
                              Attach file
                            </div>
                          </Button>
                          {documents.length > 0 && (
                            <div>
                              <ul>
                                {documents.map((file, index) => (
                                  <li key={index}>{file.name}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <Input
                            type="file"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            name="document"
                            required
                          />
                          {selectedFileName && <p>{selectedFileName}</p>}
                        </Card>
                      </CardContent>
                    </Card>
                  </div>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>
                  <Button className="dark___btn">Cancel</Button>
                </AlertDialogCancel>
                <>
                  {/* <Button className="dark___btn" onClick={() => handleSubmit()}>
                    Save
                  </Button> */}
                  <Button
                    className="bg-bm__btn__grey text-white hover:bg-bm__btn__grey/70 px-4 py-1"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <OfferModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    statusMessage={statusMessage}
                  />
                </>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </span>
      <div className="p-4">
        <p className="text-[18px] font-semibold">Contracts</p>
      </div>
      <Separator className="bg-bm__gler/50" />
      {/* <div className="overflow-y-scroll h-[80vh]"> */}
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
    </div>
  );
};

export default Contract;
