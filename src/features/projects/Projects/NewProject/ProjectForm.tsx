// ProjectForm.tsx

import React, { useEffect, useState } from "react";
// Import necessary types from react-hook-form
import { SubmitHandler, FieldValues } from "react-hook-form";
import GetStarted from "../../../../components/agency/createproject/GetStarted";
import AboutProject from "../../../../components/agency/createproject/aboutProject";
import RequiredTalents from "../../../../components/agency/createproject/requiredTalents";
import ProjectBudget from "../../../../components/agency/createproject/projectBudget";
import TalentRequirement from "../../../../components/agency/createproject/talentRequirement";
import ProjectDetails from "../../../../components/agency/createproject/projectDetails";
import OfferModal from "../../../../libs/OfferModal";
import { DayOfWeek, RequiredTalentsProps } from "../../../../redux/types";
import { useNavigate } from "react-router-dom";
import { patchAxiosInstance } from "../../../../api/axios";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { useToast } from "../../../../ui/use-toast";

// Define props interface for ProjectForm component
interface ProjectFormProps {
  handleSubmit: any; // Use SubmitHandler<FieldValues> for handleSubmit
  register: any; // Replace 'any' with specific types if using TypeScript
  errors: any; // Replace 'any' with specific error types if using TypeScript
  // Other props as needed
  //   cancelProject: any;
}
const ProjectForm: React.FC<ProjectFormProps> = ({
  handleSubmit,
  register,
  errors,
  //   cancelProject,
}) => {
  const navigate = useNavigate();
  const cancelProject = () => navigate("/projects");

  const { user } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState("getStarted");

  const [aboutProject, setAboutProject] = useState({
    projectTitle: "",
    projectCategory: "",
    // projectCode: "",
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
  const [document, setDocument] = useState<any>("");
  const [draftStatus, setDraftStatus] = useState<any | null>(null);
  const [reusableProject, setReusableProject] = useState<any | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [projectPost, setProjectPost] = useState({
    startDate: "",
    endDate: "",
  });

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    // console.log(step);
  };

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
        // projectCode: aboutProject.projectCode,
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

  useEffect(() => {
    // setProjectName = { setProjectName };
    setAboutProject({
      projectTitle: reusableProject?.projectTitle || "",
      projectCategory: reusableProject?.projectCategory || "",
      // projectCode: "",
      projectLocation: reusableProject?.projectLocation || [],
      projectDescription: reusableProject?.projectTitle || "",
      startDate: reusableProject?.projectDuration?.startDate || "",
      endDate: reusableProject?.projectDuration?.endDate || "",
    });
    if (reusableProject?.talent && Array?.isArray(reusableProject?.talent)) {
      setRequiredTalents(
        [...reusableProject?.talent] || [
          {
            opportunities: "",
            qualifications: "",
            skills: [],

            paymentOptions: "",
            salary: "",
          },
        ]
      );
    }
    if (
      reusableProject?.workingDays &&
      Array?.isArray(reusableProject?.workingDays)
    ) {
      setWorkDays([...reusableProject?.workingDays] || []);
    }
    // setRequiredTalents = { setRequiredTalents };
    // setRequiredTalents = { setRequiredTalents };

    // setWorkDays([...reusableProject?.workDays]);
    setProposal(reusableProject?.projectRequirements);
    setDocument(reusableProject?.document[0] || "");

    if (
      reusableProject?.document &&
      Array?.isArray(reusableProject?.document)
    ) {
      setDocument([...reusableProject?.document] || [""]);
    }

    // setDocument = { [...reusableProject?.document] };
    // setProjectPost = { setProjectPost };
  }, [reusableProject]);

  return (
    <>
      <div className="bg-white">
        <div className="px-4 pt-6  md:px-12 xl:px-40">
          <div className="text-[12px] text-bm__grey__text__100 cursor-pointer">
            <span onClick={cancelProject}>Projects</span>
            <span className="mx-1">{">"}</span>
            <span className="underline text-black">Create Project</span>
          </div>
        </div>
        {currentStep === "getStarted" && (
          <GetStarted
            next={() => handleStepChange("aboutProject")}
            cancel={cancelProject}
            projectName={projectName}
            setProjectName={setProjectName}
            // reusableProject={reusableProject}
            setReusableProject={setReusableProject}
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
};

export default ProjectForm;
