import React from "react";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex w-screen h-screen z-[10000000] fixed top-0 bottom-0 left-0 right-0 bg-black/40 items-center justify-center">
      <ThreeCircles
        height="100"
        width="100"
        color="gray"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
}
