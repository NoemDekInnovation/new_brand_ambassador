// ProjectForm.tsx

import React, { useState } from "react";
// Import necessary types from react-hook-form
import { SubmitHandler, FieldValues } from "react-hook-form";
import GetStarted from "../../../../components/agency/createproject/GetStarted";
import AboutProject from "../../../../components/agency/createproject/aboutProject";
import RequiredTalents from "../../../../components/agency/createproject/requiredTalents";
import ProjectBudget from "../../../../components/agency/createproject/projectBudget";
import TalentRequirement from "../../../../components/agency/createproject/talentRequirement";
import ProjectDetails from "../../../../components/agency/createproject/projectDetails";
import OfferModal from "../../../../libs/OfferModal";
import { DayOfWeek } from "../../../../redux/types";

// Define props interface for ProjectForm component
interface ProjectFormProps {
  //   handleSubmit: SubmitHandler<FieldValues>; // Use SubmitHandler<FieldValues> for handleSubmit
  register: any; // Replace 'any' with specific types if using TypeScript
  errors: any; // Replace 'any' with specific error types if using TypeScript
  // Other props as needed
}
const ProjectForm: React.FC<ProjectFormProps> = ({
  //   handleSubmit,
  register,
  errors,
}) => {
  const [currentStep, setCurrentStep] = useState("getStarted");

  const [workDays, setWorkDays] = useState<DayOfWeek[]>([]);
  const [proposal, setProposal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [document, setDocument] = useState<any>("");
  const [draftStatus, setDraftStatus] = useState<any | null>(null);
  const [reusableProject, setReusableProject] = useState<any | null>(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    // console.log(step);
  };

  return (
    <>
      {/* <div className="">
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
      </div> */}
    </>
  );
};

export default ProjectForm;
