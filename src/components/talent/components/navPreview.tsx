import React, { useRef, useState } from "react";
import { Card, CardContent } from "../../../ui/card";
import { ImAttachment, ImCancelCircle } from "react-icons/im";
import { Separator } from "../../../ui/seperator";
import ItemCard from "./ItemCard";
import { Button } from "../../../ui/button";
import {
  DayObject,
  daysOfWeek,
} from "../../agency/createproject/projectBudget";
import { GiPaperClip } from "react-icons/gi";
import { IoMdShare } from "react-icons/io";
import { Input } from "../../../ui/input";

const NavPreview = ({
  popUp,
  setPopUp,
  selectedProject,
  apply,
  close,
  setApply,
}: // projectId,
{
  setApply: any;
  close: any;
  apply: boolean;
  popUp: boolean;
  setPopUp: any;
  selectedProject: any;
  // projectId: string;
}) => {
  const startDate = new Date(selectedProject?.projectDuration?.startDate);
  const endDate = new Date(selectedProject?.projectDuration?.endDate);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedFileName, setSelectedFileName] = useState("");
  const [document, setDocument] = useState<File>({} as File);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      setSelectedFileName(fileInput.files[0].name);
    }

    if (files?.length) {
      const selectedFile = Array.from(files);
      setDocument(selectedFile[0]);
    }
  };

  const handleDivClick = () => {
    // Trigger a click event on the hidden input
    fileInputRef?.current?.click();
  };

  return (
    <div
      className={`fixed z-[1000] bg-black/50  w-[100%] items-center justify-end flex flex-col transition-all duration-1000 inset-0 ${
        popUp
          ? "translate-y-0 opacity-100 h-[100vh] -bottom-5"
          : "translate-y-[1000px] opacity-0 "
      }`}
    >
      <Card className="p-4 relative bg-white w-[90VW] h-[95vh] overflow-hidden md:p-10">
        <div className="flex justify-between w-full">
          Notification Title{" "}
          <span className=" text-sm text-[#6F797A]">
            <ImCancelCircle
              className="w-[20px] h-[20px] cursor-pointer ml-2 md:ml-6"
              onClick={() => {
                close();
                setPopUp();
              }}
            />
          </span>
        </div>
        <Separator className="bg-bm__beige my-2 mb-10 " />
        Notification body
      </Card>
    </div>
  );
};

export default NavPreview;
