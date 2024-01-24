// import DeliveryCard from "./DeliveryCard";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { useToast } from "../../../ui/use-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  campaignAuthAxiosInstance,
  patchAxiosInstance,
} from "../../../api/axios";
import OfferModal from "../../../libs/OfferModal";
import { Button } from "../../../ui/button";
import { Checkbox } from "../../../ui/checkbox";

export default function OfferPopUp({
  setOpenOfferDialog,
  openOfferDialog,
  projectId,
  offer,
}: {
  offer: any;
  setOpenOfferDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openOfferDialog: boolean;
  projectId: any;
}) {
  const user = useSelector((state: RootState) => state.user);

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  console.log(isAccepted);

  const acceptOffer = async (value: string) => {
    if (user?.user?.accountId !== undefined) {
      try {
        const response = await campaignAuthAxiosInstance.post(
          `/accept-or-reject-offer/${projectId}?status=${value}`,
          { agreed: isAccepted },
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          // close();
          // setPopUp();
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
  return (
    <Transition.Root show={openOfferDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000]"
        onClose={setOpenOfferDialog}
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
                        onClick={() => setOpenOfferDialog(false)}
                      >
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="bg-white pt-6 shadow-xl w-full rounded-t-xl">
                    <div className="px-4 sm:px-6 pb-4 flex justify-between">
                      <Dialog.Title className="text-[24px] font-semibold leading-6 text-gray-900">
                        Offer
                      </Dialog.Title>
                      {/* <p className="text-[20px] text-primary-600 cursor-pointer">
                        New +
                      </p> */}
                    </div>
                    <div className="flex h-[85vh] flex-col overflow-y-scroll bg-white pb-6 shadow-xl w-full rounded-t-xl">
                      <div className="relative mt-1 flex-1 px-4 sm:px-6 h-full flex flex-col">
                        <Separator className="bg-bm__beige my-6 " />
                        <Card className="w-full pt-4 my-3 bg-[#F3F3F380] border border-[#D7D8DA]">
                          <CardContent>
                            <div className="flex items-center justify-center">
                              <h2 className="text-center text-[14px] font-normal capitalize mb-3">
                                {offer?.offerName} Offer{" "}
                              </h2>
                            </div>
                            <Separator className="bg-bm__beige my-3 " />

                            <div className="flex flex-col overflow-y-auto h-[23vh]">
                              <p className=" break-words p-4 text-[12px] font-normal h-[23vh]">
                                {offer?.offerDescription}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                        {offer?.terms && (
                          <Card className="w-full pt-4 my-3 bg-[#F3F3F380] border border-[#D7D8DA]">
                            <CardContent>
                              <div className="flex items-center justify-center">
                                <h2 className="text-center text-[14px] font-normal capitalize mb-3">
                                  Terms and Conditions
                                </h2>
                              </div>
                              <Separator className="bg-bm__beige my-3 " />
                              <div className="flex flex-col overflow-y-auto h-[23vh]">
                                <p className=" break-words p-4 text-[12px] font-normal h-[23vh]">
                                  {offer?.terms}
                                </p>
                              </div>
                              <Separator className="bg-bm__beige my-3 " />
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="terms2"
                                  onCheckedChange={() =>
                                    setIsAccepted(!isAccepted)
                                  }
                                />
                                <label
                                  htmlFor="terms2"
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  Accept terms and conditions
                                </label>
                              </div>{" "}
                            </CardContent>
                          </Card>
                        )}
                        {offer?.policies && (
                          <Card className="w-full pt-4 my-3 bg-[#F3F3F380] border border-[#D7D8DA]">
                            <CardContent>
                              <div className="flex items-center justify-center">
                                <h2 className="text-center text-[14px] font-normal capitalize mb-3">
                                  Policies
                                </h2>
                              </div>
                              <Separator className="bg-bm__beige my-3 " />

                              <div className="flex flex-col overflow-y-auto h-[23vh]">
                                <p className=" break-words p-4 text-[12px] font-normal h-[23vh]">
                                  {offer?.policies}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        )}

                        <div className="flex justify-between mt-auto mb-[30px] pb-[40px] ">
                          <div className="flex items-center gap-3">
                            <Button
                              className="bg-[#D7D8DA] text-[#7A7F86] hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                              onClick={() => setOpenOfferDialog(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              className="bg-[#D7D8DA] text-[#7A7F86] hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                              // onClick={() => setOpenOfferDialog(false)}
                              onClick={() => acceptOffer("rejected")}
                            >
                              Decline Offer
                            </Button>
                          </div>
                          <Button
                            className="bg-bm__btn__grey text-white hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                            onClick={() => acceptOffer("accepted")}
                          >
                            Accept Offer
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
