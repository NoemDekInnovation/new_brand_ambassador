// Example of optimizations and improvements

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
// import { patchAxiosInstance } from "../../../api/axios";
// import OfferModal from "../../../libs/OfferModal";
// import { useToast } from "../../../ui/use-toast";
import ProjectForm from "./ProjectForm"; // Example of breaking down into smaller components
import { useToast } from "../../../../ui/use-toast";
import { RootState } from "../../../../redux/store";
import OfferModal from "../../../../libs/OfferModal";
import { patchAxiosInstance } from "../../../../api/axios";
import { AgencyLayout } from "../../../../components/Layout";

// Define a type or interface for the form data
interface FormData {
  projectTitle: string;
  projectCategory: string;
  // Add more properties for other form fields as needed
}

export default function NewProject({
  cancelProject,
}: {
  cancelProject?: () => void;
}) {
  const { user } = useSelector((state: RootState) => state.user);
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [toggleMenubar, setToggleMenubar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Other state variables and logic...

  const submitHandler = async (formData: FormData) => {
    try {
      // API call to create project
      const response = await patchAxiosInstance.post(
        `/create-project`,
        formData
      );

      setStatusMessage(response.data.message || "Success");
      handleModalOpen(response.data.message || "Success");

      // Other success handling logic...
    } catch (error: any) {
      console.error("Error while posting data:", error);
      toast({
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      // Handle error appropriately...
    }
  };

  const handleModalOpen = (message: string) => {
    setStatusMessage(message);
    setModalOpen(true);

    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Other useEffect and logic...

  return (
    <AgencyLayout
      setToggleMenubar={() => setToggleMenubar(!toggleMenubar)}
      toggleMenubar={toggleMenubar}
    >
      <div className="">
        <ProjectForm
          handleSubmit={submitHandler}
          register={register}
          errors={errors}
          // Other props...
        />
        <OfferModal
          isOpen={isModalOpen}
          onClose={closeModal}
          statusMessage={statusMessage}
        />
      </div>
    </AgencyLayout>
  );
}
