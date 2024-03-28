import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const CentreAlert = () => {
  const [close, setClose] = useState(
    localStorage.getItem("alertClosedxx") === "true"
  );

  const handleClose = () => {
    setClose(true);
  };

  useEffect(() => {
    localStorage.setItem("alertClosedxx", close.toString()); // Convert boolean to string
  }, [close]);

  if (close) {
    return null;
  }
  return (
    <Alert className="bg-[#F8F0EB] text-black relative p-4 space-y-2">
      <AlertTitle>This page allows you to add training centers </AlertTitle>
      <AlertDescription>
        <ul className="space-y-2 list-disc mx-4 text-xs">
          <li>
            {" "}
            You will be able to select training centers for your projects when
            you have added them here.
          </li>
          <li>
            You have to add training centers here to be able to select them for
            your projects.
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

export default CentreAlert;
