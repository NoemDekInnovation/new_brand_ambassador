import React from "react";
import { Card, CardContent } from "../../../ui/card";
import { Separator } from "../../../ui/seperator";

const ContractOfferCard = () => {
  return (
    <>
      <Card className="mb-4 md:mb-8">
        <CardContent className="py-4">
          <p>Contract Offer</p>
          <Separator className="bg-bm__beige my-3 md:my-6" />
          <Card>
            <CardContent className="py-4 gap-2">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi ullam perferendis, voluptates hic rerum commodi
                assumenda eum, debitis tempore dolore facere odit modi
                accusantium incidunt atque, voluptatem expedita eligendi sequi.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi ullam perferendis, voluptates hic rerum commodi
                assumenda eum, debitis tempore dolore facere odit modi
                accusantium incidunt atque, voluptatem expedita eligendi sequi.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="py-4 min-h-[300px]">
          <p>Attachments</p>
          <Separator className="bg-bm__beige my-3 md:my-6" />
        </CardContent>
      </Card>
      <div className="flex w-full justify-between mt-3 md:mt-6">
        <div className="light__btn max-w-fit">Cancel</div>
        <div className="dark__btn max-w-fit">Accept</div>
      </div>
    </>
  );
};

export default ContractOfferCard;
