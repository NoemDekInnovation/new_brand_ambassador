import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React, { useEffect, useRef } from "react";
import { Textarea } from "../../../ui/textarea";
import { ImAttachment } from "react-icons/im";
import { Input } from "../../../ui/input";

export default function TalentRequirement({
  next,
  prev,
  cancel,
  errors,
  proposal,
  setProposal,
  document,
  setDocument,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  errors: any;
  proposal: string;
  setProposal: any;
  document: any;
  setDocument: any;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load data from local storage on component mount
  useEffect(() => {
    const savedProposal = localStorage.getItem("proposal");
    const savedDocument = localStorage.getItem("document");

    if (savedProposal) {
      setProposal(savedProposal);
    }

    if (savedDocument) {
      // Convert the stored string back to the File object
      const fileBlob = new Blob([savedDocument], {
        type: "application/octet-stream",
      });
      const file = new File([fileBlob], "document");
      setDocument(file);
    }
  }, []);

  // Save data to local storage whenever proposal or document changes
  useEffect(() => {
    localStorage.setItem("proposal", proposal);
    if (document) {
      
      // Convert the File object to a data URL and save it
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        localStorage.setItem("document", dataURL);
      };
      reader.readAsDataURL(document);
    }
  }, [proposal, document]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

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
    // <div className="px-4 pb-4  md:px-12 xl:px-40">
    //   <Card className="p-4 md:p-8 mt-5 bg-white">
    //     <ChevBackground
    //       text="Tell talent what you require for their proposal"
    //       stage="5"
    //     />
    //     <Card className="w-full py-6 my-7">
    //       <CardContent>
    //         <p className="text-[12px] font-light">
    //           This helps talent to apply the right way{" "}
    //         </p>
    //         <Separator className="my-3 md:my-8 bg-bm__beige" />
    //         {/* <p className="text-[15px] font-medium  mb-3">Project Title</p> */}
    //         <form>
    //           <p className="text-[15px] font-medium  mb-3">
    //             Application Requirements
    //           </p>

    //           <Textarea
    //             placeholder="Describe proposal requirements..."
    //             className="min-h-[250px]"
    //             {...register("projectRequirements")}
    //           />
    //           <p className="text-[12px] text-bm__btn__grey mt-3">
    //             250 Characters
    //           </p>

    //           <Button className="light__btn max-w-[200px] mt-4 hover:underline tranform ">
    //             <div className="flex items-center gap-1">
    //               <ImAttachment className="text-[16px]" />
    //               Attach file
    //             </div>
    //           </Button>
    //         </form>
    //       </CardContent>
    //     </Card>

    //     <div className="flex justify-between">
    //       <div className="flex whitespace-nowrap gap-4 md:gap-8">
    //         <Button className="light__btn max-w-[100px]" onClick={cancel}>
    //           Cancel
    //         </Button>
    //         <Button className="light__btn max-w-[100px]" onClick={prev}>
    //           Back
    //         </Button>
    //       </div>
    //       <div className="flex whitespace-nowrap gap-4 md:gap-8">
    //         <Button className="dark__btn" onClick={next}>
    //           Review Project Post
    //         </Button>
    //       </div>
    //     </div>
    //   </Card>
    // </div>
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-2 md:p-8  bg-white">
        <ChevBackground
          text="Tell talent what you require for their proposal"
          stage="5"
        />
        <Card className="w-full py-6 my-7">
          <CardContent>
            <p className="text-[12px] font-light">
              This helps talent to apply the right way{" "}
            </p>
            <Separator className="my-3 md:my-8 bg-bm__beige" />
            {/* <p className="text-[15px] font-medium  mb-3">Project Title</p> */}

            <p className="text-[15px] font-medium  mb-3">
              Application Requirements
            </p>

            <Textarea
              placeholder="Describe proposal requirements..."
              className="min-h-[250px]"
              onChange={(e) => setProposal(e.target.value)}
            />
            <p className="text-[12px] text-bm__btn__grey mt-3">
              250 Characters
            </p>

            <Button
              className="light__btn max-w-[200px] mt-4"
              onClick={handleDivClick}
            >
              <div className="flex items-center gap-1">
                <ImAttachment className="text-[16px]" />
                Attach file
              </div>
            </Button>
            <Input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              name="document"
            />
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-4 md:mb-0">
            <Button
              className="light__btn max-w-full md:max-w-[100px]"
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              className="light__btn max-w-full md:max-w-[100px]"
              onClick={prev}
            >
              Back
            </Button>
          </div>
          <div className="flex flex-col md:flex-row md:whitespace-nowrap md:gap-8">
            <Button className="dark__btn" onClick={next}>
              Review Project Post
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
