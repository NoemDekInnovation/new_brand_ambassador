// import DeliveryCard from "./DeliveryCard";
import { Dialog, Transition } from "@headlessui/react";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import OfferModal from "../../../libs/OfferModal";
import { Button } from "../../../ui/button";
import SelectOption from "../../../libs/select";
import { capitalizeFirstLetter } from "../../../libs/capitalizeFirstLetter";

export default function SendContractPopUp({
  setOpenContractDialog,
  openContractDialog,
  setModalOpen,
  isModalOpen,
  offerSelectorList,
  handleSelection,
  selectedOffer,
  handleOffer,
  statusMessage,
}: {
  setOpenContractDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openContractDialog: boolean;
  setModalOpen: any;
  isModalOpen: any;
  statusMessage: string;
  offerSelectorList: any;
  handleSelection: any;
  selectedOffer: any;
  handleOffer: any;
}) {
  return (
    <Transition.Root show={openContractDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[1000]"
        onClose={setOpenContractDialog}
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
                        onClick={() => setOpenContractDialog(false)}
                      >
                        <span className="sr-only">Close panel</span>
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="bg-white p-6 shadow-xl w-full rounded-t-xl">
                    <div className="px-4 sm:px-6 pb-4 flex justify-between">
                      <Dialog.Title className="text-[24px] font-semibold leading-6 text-gray-900">
                        Send Contract
                      </Dialog.Title>
                    </div>
                    <Separator className="bg-bm__beige my-4" />
                    <SelectOption
                      id="origin"
                      name="origin"
                      defaultValue={"companyProfile.address[0].state"}
                      options={offerSelectorList}
                      onChange={(e: any) => handleSelection(e.value)}
                      placeholder="Select Contract"
                      required
                      isDisabled={false}
                      className="max-w-[400px]"
                    />

                    <Separator className="bg-bm__beige my-6 " />
                    <div className=" h-[65vh] overflow-y-scroll">
                      <Card className="w-full pt-4 my-3 bg-[#D7D8DA]">
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <h2 className="text-[14px] font-normal capitalize">
                              {selectedOffer !== null &&
                                capitalizeFirstLetter(
                                  selectedOffer[0].contractName || ""
                                )}{" "}
                              Name
                            </h2>
                          </div>
                          <Separator className="bg-bm__beige my-4" />
                          <Card className="min-h-[23vh] h-fit border-[#93979D]">
                            <div className="flex flex-col overflow-y-auto ">
                              <p className=" capitalize break-words p-4">
                                {selectedOffer !== null &&
                                  capitalizeFirstLetter(
                                    selectedOffer[0].contractDescription || ""
                                  )}
                              </p>
                            </div>
                          </Card>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="flex justify-between mt-4">
                      <Button
                        className="bg-[#D7D8DA] text-[#7A7F86] hover:bg-bm__btn__grey/70 px-4 py-1 px-7"
                        onClick={() => setOpenContractDialog(false)}
                      >
                        Cancel
                      </Button>

                      <Button
                        className="dark___btn max-w-fit"
                        onClick={handleOffer}
                      >
                        Send Contract
                      </Button>
                      <OfferModal
                        isOpen={isModalOpen}
                        onClose={() => setModalOpen(false)}
                        statusMessage={statusMessage}
                      />
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
