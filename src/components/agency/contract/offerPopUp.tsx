// import DeliveryCard from "./DeliveryCard";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { Input } from "../../../ui/input";
import { useToast } from "../../../ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";
import OfferModal from "../../../libs/OfferModal";
import { Button } from "../../../ui/button";

export default function OfferPopUp({
  setOpenAddressDialog,
  openAddressDialog,
  projectId,
}: {
  setOpenAddressDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openAddressDialog: boolean;
  projectId: any;
}) {
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [offerName, setOfferName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [offerDesc, setOfferDesc] = useState("");
  const [offerPolicy, setOfferPolicy] = useState("");
  const [offerTerms, setOfferTerms] = useState("");

  const { toast } = useToast();

  const handleOfferNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOfferName(event.target.value);
  };

  const handleOfferDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOfferDesc(event.target.value);
  };

  const handleOfferPolicyChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOfferPolicy(event.target.value);
  };

  const handleOfferTermsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setOfferTerms(event.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    if (user?.user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.post(
          `/create-offer/${projectId}`,
          {
            offerName: offerName,
            offerDescription: offerDesc,
            terms: offerTerms,
            policies: offerPolicy,
          },
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setStatusMessage(response.data.message || "Success");
        setModalOpen(true);
        setOfferDesc("");
        setOfferName("");
        setOfferPolicy("");
        setOfferTerms("");

        setTimeout(() => {
          setModalOpen(false);
          setOpenAddressDialog(false);
        }, 2000);
      } catch (error: any) {
        console.error("Error submitting form:", error);
        if (error.response && error.response.status === 400) {
          // Extract and display the specific error message from the API response
          setStatusMessage(error.response.data.message || "Bad Request");
        } else {
          // Display a generic error message for other error scenarios
          setStatusMessage("An error occurred while saving. Please try again.");
        }
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });

        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSave = async () => {
    await handleSubmit();
  };

  return (
    <Transition.Root show={openAddressDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000]"
        onClose={setOpenAddressDialog}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 flex max-w-full px-10   justify-center w-full">
              {/* <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"> */}
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-7xl flex flex-col justify-end">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    // className="bg-green-300"
                  >
                    <div className="">
                      {/* <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4"> */}
                      <button
                        type="button"
                        className="border-0"
                        onClick={() => setOpenAddressDialog(false)}
                      >
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="bg-white pt-6 shadow-xl w-full rounded-t-xl">
                    <div className="px-4 sm:px-6 pb-4 flex justify-between">
                      <Dialog.Title className="text-[24px] font-semibold leading-6 text-gray-900">
                        Create Offer
                      </Dialog.Title>
                      {/* <p className="text-[20px] text-primary-600 cursor-pointer">
                        New +
                      </p> */}
                    </div>
                    <div className="flex h-[85vh] flex-col overflow-y-scroll bg-white pb-6 shadow-xl w-full rounded-t-xl">
                      <div className="relative mt-1 flex-1 px-4 sm:px-6">
                        <Separator className="bg-bm__beige my-6 " />
                        <div className="mb-4">
                          <Input
                            placeholder=" Offer Name"
                            value={offerName}
                            onChange={handleOfferNameChange}
                          />
                        </div>
                        <Card className="w-full pt-4 my-3">
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <h2 className="text-[14px] font-normal capitalize mb-3">
                                Offer Details
                              </h2>
                            </div>

                            <Card className="h-[23vh] mb-3">
                              <div className="flex flex-col overflow-y-auto h-[23vh]">
                                <textarea
                                  className=" break-words p-4 h-[23vh]"
                                  placeholder="Write the details of your offer here"
                                  value={offerDesc}
                                  onChange={handleOfferDescChange}
                                />
                              </div>
                              {/* <small>250 characters</small> */}
                            </Card>
                          </CardContent>
                        </Card>
                        <Card className="w-full pt-4 my-3">
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <h2 className="text-[14px] font-normal capitalize mb-3">
                                Terms and Conditions
                              </h2>
                            </div>

                            <Card className="h-[23vh] mb-3">
                              <div className="flex flex-col overflow-y-auto h-[23vh]">
                                <textarea
                                  className=" break-words p-4 h-[23vh]"
                                  placeholder="Write your terms and conditions here"
                                  value={offerTerms}
                                  onChange={handleOfferTermsChange}
                                />
                              </div>
                              {/* <small>250 characters</small> */}
                            </Card>
                          </CardContent>
                        </Card>{" "}
                        <Card className="w-full pt-4 my-3">
                          <CardContent>
                            <div className="flex justify-between items-center">
                              <h2 className="text-[14px] font-normal capitalize mb-3">
                                Policies
                              </h2>
                            </div>

                            <Card className="h-[23vh] mb-3">
                              <div className="flex flex-col overflow-y-auto h-[23vh]">
                                <textarea
                                  className=" break-words p-4 h-[23vh]"
                                  placeholder="Write your policies here"
                                  value={offerPolicy}
                                  onChange={handleOfferPolicyChange}
                                />
                              </div>
                              {/* <small>250 characters</small> */}
                            </Card>
                          </CardContent>
                        </Card>
                        <div className="flex justify-between">
                          <Button
                            className="bg-[#D7D8DA] text-[#7A7F86] hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                            onClick={() => setOpenAddressDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            className="bg-bm__btn__grey text-white hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <OfferModal
                            isOpen={isModalOpen}
                            onClose={() => setModalOpen(false)}
                            statusMessage={statusMessage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
