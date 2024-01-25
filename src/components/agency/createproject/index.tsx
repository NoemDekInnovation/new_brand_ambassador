import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import GetStarted from "./GetStarted";
import AboutProject from "./aboutProject";
import RequiredTalents from "./requiredTalents";
import TalentRequirement from "./talentRequirement";
import ProjectBudget from "./projectBudget";
import ProjectDetails from "./projectDetails";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { DayOfWeek, RequiredTalentsProps } from ".";
import { DayOfWeek, RequiredTalentsProps } from "../../../redux/types";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";
import OfferModal from "../../../libs/OfferModal";
import { useToast } from "../../../ui/use-toast";
// import Loading from "../../../components/l";

const aboutProjectSchema = z.object({
  projectTitle: z.string(),
  projectCategory: z.string(),
  projectCode: z.string().min(1),
  projectLocation: z.string(),
  projectDescription: z.string(),
  projectRequirements: z.string(),
  document: z.string(),
  projectDuration: z.object({
    startDate: z.string(),
    endDate: z.string(),
  }),
  talent: z.array(
    z.object({
      opportunities: z.string(),
    })
  ),
  qualifications: z.string(),
  skills: z.string(),
  workingDays: z.string(),
  budget: z.object({
    opportunities: z.string(),
    workingOptions: z.string(),
    salary: z.string(),
  }),
});

type aboutProjectSchemaType = z.infer<typeof aboutProjectSchema>;

export default function NewProject({
  cancelProject,
}: // setDefault,
{
  cancelProject: () => void;
  // setDefault: Dispatch<SetStateAction<string>>;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState("getStarted");
  // const [currentStep, setCurrentStep] = useState("projectDetails");

  // console.log(currentStep);

  const [aboutProject, setAboutProject] = useState({
    projectTitle: "",
    projectCategory: "",
    projectCode: "",
    projectLocation: [],
    projectDescription: "",
    startDate: "",
    endDate: "",
  });
  const [requiredTalents, setRequiredTalents] = useState<
    RequiredTalentsProps[]
  >([
    {
      opportunities: "",
      qualifications: "",
      skills: [],

      paymentOptions: "",
      salary: "",
    },
  ]);

  const [workDays, setWorkDays] = useState<DayOfWeek[]>([]);
  const [proposal, setProposal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [document, setDocument] = useState("");
  const [draftStatus, setDraftStatus] = useState<boolean | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const clearLocalStorage = () => {
    localStorage.removeItem("aboutProject");
    localStorage.removeItem("requiredTalent");
    localStorage.removeItem("projectBudget");
    localStorage.removeItem("proposal");
    localStorage.removeItem("document");
  };

  useEffect(() => {
    clearLocalStorage();
  }, []);

  const [projectPost, setProjectPost] = useState({
    startDate: "",
    endDate: "",
  });
  // console.log(projectPost);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    // console.log(step);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<aboutProjectSchemaType>({
    resolver: zodResolver(aboutProjectSchema),
  });

  const openModal = (message: string) => {
    setStatusMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleModalOpen = (message: string) => {
    openModal(message);

    // Automatically close the modal after a delay (e.g., 3000 milliseconds)
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  const submitHandler = async (isDraft: boolean) => {
    setDraftStatus(isDraft);
    try {
      setIsLoading(true);

      const payload = {
        draft: isDraft,
        projectTitle: aboutProject.projectTitle,
        projectCategory: aboutProject.projectCategory,
        projectCode: aboutProject.projectCode,
        projectLocation: aboutProject.projectLocation,
        projectDescription: aboutProject.projectDescription,
        projectRequirements: proposal,
        projectDuration: {
          startDate: aboutProject.startDate,
          endDate: aboutProject.endDate,
        },
        talent: requiredTalents,
        workingDays: workDays,
        projectPost: projectPost,
      };

      const formData = new FormData();
      // console.log("FORMDATA", formData);
      appendDataToFormData(payload, formData);
      formData.append("document", document);

      if (user?.accountId !== undefined) {
        try {
          const response = await patchAxiosInstance.post(
            `/create-project`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${user.authKey || ""}`,
              },
            }
          );

          // console.log("response", response);
          setStatusMessage(response.data.message || "Success");
          const responseMessage = response.data.message || "Success";
          handleModalOpen(responseMessage);
          localStorage.removeItem("selectedfile");
          // setSuccessModal(true);
          setTimeout(() => {
            cancelProject();
          }, 3000);
        } catch (error: any) {
          console.error("Error while posting data:", error);

          toast({
            description: error?.response?.data?.message,
            variant: "destructive",
          });
          // Handle error appropriately (e.g., show a user-friendly message)
        }
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      if (error.response && error.response.status === 400) {
        // Extract and display the specific error message from the API response
        setStatusMessage(error.response.data.message || "Bad Request");
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      } else {
        // Display a generic error message for other error scenarios
        setStatusMessage("An error occurred while saving. Please try again.");
        toast({
          description: error?.response?.data?.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const appendDataToFormData = (
    data: any,
    formData: FormData,
    parentKey = ""
  ) => {
    for (const key in data) {
      const value = data[key];
      const newKey = parentKey ? `${parentKey}[${key}]` : key;

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const itemKey = `${newKey}[${index}]`;
          if (typeof item === "object") {
            appendDataToFormData(item, formData, itemKey);
          } else {
            formData.append(itemKey, item);
          }
        });
      } else if (typeof value === "object") {
        appendDataToFormData(value, formData, newKey);
      } else {
        formData.append(newKey, value);
      }
    }
  };

  useEffect(() => {
    // Open the modal after the status message is set
    if (statusMessage) {
      setModalOpen(true);
    }
  }, [statusMessage]);

  return (
    <>
      {/* {isLoading && <Loading />} */}

      <div>
        {currentStep === "getStarted" && (
          <GetStarted
            next={() => handleStepChange("aboutProject")}
            cancel={cancelProject}
            projectName={projectName}
            setProjectName={setProjectName}
          />
        )}
        {currentStep === "aboutProject" && (
          <AboutProject
            next={() => {
              handleStepChange("requiredTalents");
            }}
            prev={() => handleStepChange("getStarted")}
            cancel={cancelProject}
            aboutProject={aboutProject}
            setAboutProject={setAboutProject}
          />
        )}
        {currentStep === "requiredTalents" && (
          <RequiredTalents
            next={() => {
              handleStepChange("projectBudget");
            }}
            prev={() => handleStepChange("aboutProject")}
            cancel={cancelProject}
            errors={errors}
            requiredTalents={requiredTalents}
            setRequiredTalents={setRequiredTalents}
          />
        )}
        {currentStep === "projectBudget" && (
          <ProjectBudget
            next={() => handleStepChange("talentRequirement")}
            prev={() => handleStepChange("requiredTalents")}
            cancel={cancelProject}
            errors={errors}
            requiredTalents={requiredTalents}
            setRequiredTalents={setRequiredTalents}
            workDays={workDays}
            setWorkDays={setWorkDays}
          />
        )}
        {currentStep === "talentRequirement" && (
          <TalentRequirement
            next={() => handleStepChange("projectDetails")}
            prev={() => handleStepChange("projectBudget")}
            cancel={cancelProject}
            errors={errors}
            proposal={proposal}
            setProposal={setProposal}
            document={document}
            setDocument={setDocument}
          />
        )}

        {currentStep === "projectDetails" && (
          <>
            <ProjectDetails
              prev={() => handleStepChange("talentRequirement")}
              cancel={cancelProject}
              aboutProject={aboutProject}
              document={document}
              requiredTalents={requiredTalents}
              proposal={proposal}
              workDays={workDays}
              setProjectPost={setProjectPost}
              projectPost={projectPost}
              projectName={projectName}
              submit={submitHandler}
              edit={handleStepChange}
              onModalOpen={handleModalOpen}
            />
            <OfferModal
              isOpen={isModalOpen}
              onClose={closeModal}
              statusMessage={statusMessage}
            />
          </>
        )}
      </div>
    </>
  );
}
