import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";
import { X } from "lucide-react";
import { useState, useEffect } from "react";

const UserAlert = () => {
  const [close, setClose] = useState(
    sessionStorage.getItem("alertClosed") === "true"
  );

  const handleClose = () => {
    setClose(true);
  };

  useEffect(() => {
    sessionStorage.setItem("alertClosed", close.toString()); // Convert boolean to string
  }, [close]);

  if (close) {
    return null;
  }
  return (
    <Alert className="bg-[#F8F0EB] text-black relative p-4 space-y-2">
      <AlertTitle>Users are your employees that work for you.</AlertTitle>
      <AlertDescription>
        <ul className="space-y-2 list-disc mx-4 text-xs">
          <li>Users are your employees that work for you. </li>
          <li>You can create as many users as you want</li>
          <li>Users performs the same functions as the Agency Admin</li>
          <li>However, Users cannot create other users</li>
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

export default UserAlert;
