import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Separator } from "../../ui/seperator";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { AiOutlineImport } from "react-icons/ai";
import { DropdownMenuSeparator } from "../../ui/dropdown-menu";
import { PiWarningFill } from "react-icons/pi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { campaignAuthAxiosInstance } from "../../api/axios";
import OfferModal from "../../libs/OfferModal";

export default function PreviewBoard({ setPreview }: { setPreview: any }) {
  const { failedImport, successfulImport } = useSelector(
    (state: RootState) => state.talent
  );

  const { user } = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  console.log(
    "successfulImport",
    successfulImport.map((s: any) => {
      return s?.talentData;
    })
  );

  const saveTalents = async () => {
    if (user?.accountId !== undefined) {
      try {
        setIsLoading(true);
        const requestData = successfulImport.map((s: any) => {
          return s?.talentData;
        });

        const response = await campaignAuthAxiosInstance.post(
          `/save-talent-upload`,
          requestData,

          {
            headers: {
              Authorization: `Bearer ${user.authKey || ""}`,
            },
          }
        );
        console.log(response);
        setPreview();
        setIsLoading(false);
        // setSuccessModal(false);
        setSuccessModal(true);
        setSuccessMessage(`Talent have been imported successfully`);

        return setTimeout(() => {
          setSuccessModal(false);
        }, 3000);
        // setProjects(response?.data?.data?.publishedProjects);
      } catch (error) {
        setIsLoading(false);

        // console.error("Error while fetiching projects:", error);
        // Handle error appropriately (e.g., show a user-friendly message)
      }
    }
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div className="flex justify-between w-full mt-3">
              <p>Successful Uploads</p>
              <p>{successfulImport?.length || 0} Successful Uploads</p>
            </div>
            <Separator className="my-3" />
            <div className="max-h-[300px] overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Middle Name</TableHead>
                    <TableHead>Profile Overview</TableHead>
                    <TableHead>Email Address</TableHead>
                    <TableHead>Telephone Number</TableHead>
                    <TableHead>Alternative Number</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Date of Birth</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {successfulImport?.map(({ data, idx }) => {
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {data["FIRST NAME"]}
                        </TableCell>
                        <TableCell> {data["LAST NAME"]}</TableCell>
                        <TableCell> {data["MIDDLE NAME"]}</TableCell>
                        <TableCell>{data["PROFILE OVERVIEW"]}</TableCell>
                        <TableCell> {data["EMAIL"]}</TableCell>
                        <TableCell> {data["TELEPHONE NUMBER"]}</TableCell>
                        <TableCell>
                          {" "}
                          {data["ALTERNATIVE NUMBER"] || "-"}
                        </TableCell>
                        <TableCell> {data["GENDER"]}</TableCell>
                        <TableCell>{data["DATE OF BIRTH"]}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="mt-5: md:mt-10 ">
          <div className="flex justify-between w-full">
            <p>Failed Uploads</p>
            <p>{failedImport?.length || 0} Failed Uploads</p>
          </div>
          <Separator className="my-3" />
          <div className="max-h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Middle Name</TableHead>
                  <TableHead>Profile Overview</TableHead>
                  <TableHead>Email Address</TableHead>
                  <TableHead>Telephone Number</TableHead>
                  <TableHead>Alternative Number</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  {/* <TableHead>Error Message</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {failedImport.map(({ data, message, idx }) => {
                  return (
                    <>
                      <TableRow key={idx} className="cursor-pointer">
                        <TableCell className="font-medium">
                          <HoverCard>
                            <HoverCardTrigger>
                              {data["FIRST NAME"] || "-"}
                            </HoverCardTrigger>
                            <HoverCardContent>{message}</HoverCardContent>
                          </HoverCard>
                        </TableCell>{" "}
                        <TableCell>
                          <HoverCard>
                            <HoverCardTrigger>
                              {data["LAST NAME"] || "-"}{" "}
                            </HoverCardTrigger>
                            <HoverCardContent>{message}</HoverCardContent>
                          </HoverCard>
                        </TableCell>
                        <TableCell> {data["MIDDLE NAME"] || "-"}</TableCell>
                        <TableCell>
                          {data["PROFILE OVERVIEW"] !== "nil"
                            ? data["PROFILE OVERVIEW"] || "-"
                            : "-"}
                        </TableCell>
                        <TableCell> {data["EMAIL"] || "-"}</TableCell>
                        <TableCell>
                          {" "}
                          {data["TELEPHONE NUMBER"] || "-"}
                        </TableCell>
                        <TableCell>
                          {" "}
                          {data["ALTERNATIVE NUMBER"] || "-"}
                        </TableCell>
                        <TableCell> {data["GENDER"] || "-"}</TableCell>
                        <TableCell>
                          <HoverCard>
                            <HoverCardTrigger>
                              {data["DATE OF BIRTH"] || "-"}
                            </HoverCardTrigger>
                            <HoverCardContent>{message}</HoverCardContent>
                          </HoverCard>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <Separator className="bg-bm__beige my-4" />
        <div className="flex justify-between">
          <Dialog>
            <DialogTrigger className="light__btn max-w-[150px] mt-2p">
              Close
            </DialogTrigger>

            <DialogContent className="w-full max-w-[360px] p-2 md:p-6 shadow-md bg-white">
              <DialogHeader className="p-0">
                <div className="flex justify-center items-center mt-3">
                  <DialogTitle>
                    <PiWarningFill className="text-[80px]" />
                  </DialogTitle>
                </div>
              </DialogHeader>

              <div className="text-[12px] gap-4 flex flex-col text-center">
                <p className="text-[18px] font-medium">
                  Do you want to save changes and create talent?{" "}
                </p>
                <DropdownMenuSeparator className="bg-bm__beige my-3" />

                <p className="text-[12px] font-normal">
                  A link will be sent to the email address provided to complete
                  the registration.
                </p>
              </div>
              <DropdownMenuSeparator className="bg-bm__beige my-3" />
              <div className="flex justify-between gap-3 whitespace-nowrap">
                <Button className="light__btn mt-2">Discard </Button>
                <Button className="dark__btn mt-2" onClick={saveTalents}>
                  Save and Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button className="dark__btn max-w-[200px]" onClick={saveTalents}>
            Save and Create
          </Button>

          {/* <Button className="dark__btn max-w-[150px]">Save</Button>
          <Button className="dark__btn max-w-[150px]">Save</Button> */}
        </div>
      </div>
          
      <OfferModal
        isOpen={successModal}
        onClose={() => setSuccessModal(false)}
        statusMessage={successMessage}
      />
    </>
  );
}
