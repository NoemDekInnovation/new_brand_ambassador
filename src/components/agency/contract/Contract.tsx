import React, { ReactNode, useEffect, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
import { TbMap2, TbProgressCheck } from "react-icons/tb";
import { ImCancelCircle, ImStatsDots } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import {
  MdAddCircleOutline,
  MdFamilyRestroom,
  MdOutlineProductionQuantityLimits,
  MdPostAdd,
} from "react-icons/md";
import { BsFillCollectionFill } from "react-icons/bs";
import darkUnion from "../../assets/Union.png";
import subtract from "../../assets/Subtract.png";
import subtract2 from "../../assets/Subtract2.png";
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

const Contract = ({}: //   popUp,
//   setPopUp,
//   selectedProject,
{
  //   popUp: boolean;
  //   setPopUp: any;
  //   selectedProject: any;
}) => {
  return (
    <div>
      <span className="absolute top-0 right-0 text-sm text-[#6F797A] p-8 flex items-center gap-2">
        <button className="dark___btn text-[12px]">
          <div className="flex items-center gap-2">
            <MdAddCircleOutline className="text-[16px]" />
            <AlertDialog>
              <AlertDialogTrigger>
                {/* <div className="px-4"> */}
                <span className="whitespace-nowrap">Create Contract Offer</span>
                {/* </div> */}
              </AlertDialogTrigger>
              <AlertDialogContent className="z-[4000] bg-white h-[80vh] ">
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Contract Offer</AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className=" h-[60vh]">
                      <Card className="w-full pt-4 my-3">
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <h2 className="text-[14px] font-normal capitalize">
                              Application Letter
                            </h2>
                          </div>
                          <Separator className="bg-bm__beige my-6" />
                          <Card className="h-[20vh]">
                            <div className="flex flex-col overflow-y-auto h-[40vh]">
                              <p className=" capitalize break-words p-4">
                                Lorem ipsum dolor sit amet consectetur. Viverra
                                mattis vitae odio in sem non eu elementum.
                                Vehicula ut amet parturient dui nam sit amet.
                                Luctus mattis mattis viverra eleifend enim
                                bibendum viverra duis. At et vel elit nibh orci
                                volutpat diam tempus volutpat. Hendrerit
                                ullamcorper dolor nunc malesuada laoreet. Id
                                venenatis integer ac et morbi ut sagittis velit.
                                Pharetra libero dolor eget lacinia. Tristique
                                leo eu augue lectus a sit et etiam nunc.
                                Consequat risus sit enim tristique nunc eget
                                molestie. Ac sed vivamus aliquam egestas at.
                                Ullamcorper tellus facilisi mauris est id. Hac
                                quam interdum consequat lorem condimentum
                                tincidunt est. Eu auctor convallis urna est in
                                maecenas nisi senectus. Netus dui mi at donec
                                pellentesque facilisi lorem tincidunt.
                              </p>
                            </div>
                          </Card>
                        </CardContent>
                      </Card>
                      <Card className="w-full pt-4 my-3">
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <h2 className="text-[14px] font-normal capitalize">
                              Attach Contract Offer File
                            </h2>
                          </div>
                          <Separator className="bg-bm__beige my-6" />
                          <Card className="h-[10vh]"></Card>
                        </CardContent>
                      </Card>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </button>
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
              Lorem ipsum dolor sit amet consectetur. Viverra mattis vitae odio
              in sem non eu elementum. Vehicula ut amet parturient dui nam sit
              amet. Luctus mattis mattis viverra eleifend enim bibendum viverra
              duis. At et vel elit nibh orci volutpat diam tempus volutpat.
              Hendrerit ullamcorper dolor nunc malesuada laoreet. Id venenatis
              integer ac et morbi ut sagittis velit. Pharetra libero dolor eget
              lacinia. Tristique leo eu augue lectus a sit et etiam nunc.
              Consequat risus sit enim tristique nunc eget molestie. Ac sed
              vivamus aliquam egestas at. Ullamcorper tellus facilisi mauris est
              id. Hac quam interdum consequat lorem condimentum tincidunt est.
              Eu auctor convallis urna est in maecenas nisi senectus. Netus dui
              mi at donec pellentesque facilisi lorem tincidunt.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contract;
