import React, {
  ReactNode,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
} from "react";
import axios from "axios";
import { Card, CardContent } from "../../../ui/card";
import { Dialog, DialogContent, Overlay } from "@radix-ui/react-dialog";
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
import { authAxiosInstance } from "../../../api/axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Contract = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFileNames, setSelectedFileNames] = useState("");
  //  const [documents, setDocuments] = useState<File[]>([]);
  // const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);
  const [offerName, setOfferName] = useState("");
  const [offerDescription, setOfferDescription] = useState("");

  // useEffect(() => {
  //   const savedDocuments = localStorage.getItem("documents");

  //   if (savedDocuments) {
  //     const parsedDocuments: File[] = JSON.parse(savedDocuments);
  //     setDocuments(parsedDocuments);
  //     setSelectedFileNames(parsedDocuments.map((file) => file.name));
  //   }
  // }, []);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { files } = e.target;

  //   if (files?.length) {
  //     const selectedFiles = Array.from(files);
  //     setSelectedFileNames(selectedFiles.map((file) => file.name));
  //     setDocuments(selectedFiles);
  //   }
  // };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    const selectedFiles = fileInput.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      setDocuments((prev) => [...prev, ...filesArray]);
    }
    fileInput.value = "";
  };
  const handleDivClick = () => {
    fileInputRef?.current?.click();
  };

  //
  // useEffect(() => {
  //   // Save selected documents to local storage
  //   localStorage.setItem("documents", JSON.stringify(documents));

  //   // Read files as data URLs
  //   documents.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       const dataURL = e.target?.result as string;
  //       console.log(dataURL); // Do something with the dataURL
  //     };
  //     reader.readAsDataURL(file);
  //   });
  // }, [documents]);

  const handleOnOfferChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOfferName(event.target.value);
  };
  const handleOnDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setOfferDescription(event.target.value);
  };

  const user = useSelector((state: RootState) => state.user);
  const id = "653be48055125474a87dabf4";

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("offerName", offerName);
    formData.append("offerDescription", offerDescription);
    documents.forEach((file, index) => {
      formData.append("document", file);
    });

    if (!user?.user !== undefined) {
      try {
        const response = await authAxiosInstance.post(
          `/create-offer/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user?.user?.authKey || ""}`,
            },
          }
        );
        console.log("Response:", response.data);
        return response.data;
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    }
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
                Create Contract Offer
              </Button>
              {/* </div> */}
            </AlertDialogTrigger>
            <AlertDialogContent className="z-[4000] bg-white ">
              <AlertDialogHeader>
                <AlertDialogTitle>Create Contract Offer</AlertDialogTitle>
                <AlertDialogDescription>
                  <div className=" h-[65vh]">
                    <Card className="w-full pt-4 my-3">
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <h2 className="text-[14px] font-normal capitalize">
                            Contract Details
                          </h2>
                        </div>
                        <Separator className="bg-bm__beige my-6" />
                        <div className="mb-4">
                          <Input
                            placeholder="Contract Offer Name"
                            onChange={handleOnOfferChange}
                          />
                        </div>
                        <Card className="h-[23vh]">
                          <div className="flex flex-col overflow-y-auto h-[23vh]">
                            <textarea
                              className=" break-words p-4 h-[23vh]"
                              placeholder="Describe the offer details here..."
                              onChange={handleOnDescriptionChange}
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
                            Attach Contract Offer File
                          </h2>
                        </div>
                        <Separator className="bg-bm__beige my-6" />
                        <Card className="h-[10vh]">
                          <Button
                            className="light__btn max-w-full mt-4"
                            onClick={handleDivClick}
                          >
                            <div className="flex items-center gap-1">
                              <ImAttachment className="text-[16px]" />
                              Attach file
                            </div>
                          </Button>
                          <Input
                            type="file"
                            // className="hidden"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            name="document"
                            required
                            // multiple
                          />
                          {selectedFileNames && <p>{selectedFileNames}</p>}
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
                <AlertDialogAction>
                  <Button className="dark___btn" onClick={handleSave}>
                    Save
                  </Button>
                </AlertDialogAction>
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
