import React, { ReactNode } from "react";
import { Card } from "../../../ui/card";

const ItemCard = ({
  title,
  children,
  red,
}: {
  red?: boolean;
  title: string;
  children: ReactNode;
}) => {
  return (
    <Card
      className={` relative w-full p-3 md:p-6 mt-2 mb-8 ${
        red && "border-bm__ox__red"
      }`}
    >
      <h4 className="absolute -top-3 bg-white px-3">{title}</h4>
      {children}
    </Card>
  );
};

export default ItemCard;
