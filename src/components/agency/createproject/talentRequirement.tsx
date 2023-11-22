import ChevBackground from "../../../ui/chevbackground";
import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";
import React from "react";
import { Textarea } from "../../../ui/textarea";

export default function TalentRequirement({
  next,
  prev,
  cancel,
  register,
  errors,
}: {
  next: () => void;
  prev: () => void;
  cancel: () => void;
  register: any;
  errors: any;
}) {
  return (
    <div className="px-4 pb-4  md:px-12 xl:px-40">
      <Card className="p-4 md:p-8 m-8 bg-white">
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
            <form>
              <p className="text-[15px] font-medium  mb-3">
                Proposal Requirements
              </p>

              <Textarea
                placeholder="Describe proposal requirements..."
                className="min-h-[250px]"
                {...register("projectRequirements")}
              />
              <p className="text-[12px] text-bm__btn__grey mt-3">
                250 Characters
              </p>

              <Button className="light__btn max-w-[200px] mt-4">
                Attach file
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="light__btn max-w-[100px]" onClick={cancel}>
              Cancel
            </Button>
            <Button className="light__btn max-w-[100px]" onClick={prev}>
              Back
            </Button>
          </div>
          <div className="flex whitespace-nowrap gap-4 md:gap-8">
            <Button className="dark__btn" onClick={next}>
              Review Project Post
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
