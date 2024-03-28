import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const TainingAlert = () => {
  const [close, setClose] = useState(
    sessionStorage.getItem("alertClosedx") === "true"
  );

  const handleClose = () => {
    setClose(true);
  };

  useEffect(() => {
    sessionStorage.setItem("alertClosedx", close.toString()); // Convert boolean to string
  }, [close]);

  if (close) {
    return null;
  }
  return (
    <Alert className="bg-[#F8F0EB] text-black relative p-4 space-y-2">
      <AlertTitle>
        This page allows you to add outlets that you work with on the system{" "}
      </AlertTitle>
      <AlertDescription>
        <ul className="space-y-2 list-disc mx-4 text-xs">
          <li>
            {" "}
            You will be able to select outlets for your projects when you have
            added them here.{" "}
          </li>
          <li>
            You have to add outlets here to be able to select them for your
            projects.{" "}
          </li>
          <li>
            Private Outlets won&apos;t be visible to other Agencies on Campaign
            while Public Outlets will be visible to them
          </li>
        </ul>
      </AlertDescription>
      <span
        className="absolute right-4 cursor-pointer top-4"
        onClick={handleClose}
      >
        <X className="h-4 w-4" />
      </span>
    </Alert>
  );
};

export default TainingAlert;
