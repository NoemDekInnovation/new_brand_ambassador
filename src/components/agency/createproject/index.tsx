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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchSkills, SkillsStateProps } from "../../../redux/skills.slice";

//  type aboutProjectSchemaType = z.infer<typeof aboutProjectSchema>;

export default function NewProject({
  cancelProject,
  setDefault,
}: {
  cancelProject: () => void;
  setDefault: Dispatch<SetStateAction<string>>;
}) {
  const aboutProjectSchema = z.object({
    projectTitle: z.string(),
    projectCategory: z.string(),
    projectCode: z.string().min(1),
    projectLocation: z.string(),
    projectDescription: z.string(),
    projectRequirements: z.string(),
    document: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    opportunities: z.string(),
    qualifications: z.string(),
    skills: z.string(),
    workingDays: z.string(),
    paymentOptions: z.string(),
    salary: z.string(),
  });

  const defaultValues = {
    projectTitle: "",
    projectCategory: "",
    projectCode: "",
    projectLocation: "",
    projectDescription: "",
    projectRequirements: "",
    document: "",
    startDate: "",
    endDate: "",
    opportunities: "",
    qualifications: "",
    skills: "",
    workingDays: "",
    paymentOptions: "",
    salary: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: zodResolver(aboutProjectSchema),
    defaultValues: defaultValues,
  });

  const [currentStep, setCurrentStep] = useState("getStarted");
  // const [currentStep, setCurrentStep] = useState("projectDetails");
  // const dispatch = useDispatch<AppDispatch>();
  // useEffect(() => {
  //   dispatch(fetchSkills());
  // }, [dispatch]);
  // const [formData, setFormData] = useState<aboutProjectSchemaType>({
  //   projectTitle: "",
  //   projectCategory: "",
  //   projectCode: "",
  //   projectLocation: "",
  //   projectDescription: "",
  //   projectRequirements: "",
  //   document: "",
  //   projectDuration: {
  //     startDate: "",
  //     endDate: "",
  //   },
  //   talent: [{
  //     opportunities: "",
  //     qualifications: "",
  //     skills: "",
  //   }],
  //   workingDays: "",
  //   budget: {
  //     opportunities: "",
  //     workingOptions: "",
  //     salary: "",
  //   },

  // })

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  // const saveData = () => {
  //   const formData = getValues();
  //   localStorage.setItem(currentStep, JSON.stringify(formData));
  //   console.log(formData)
  // };

  // const saveData = () => {
  //   const updatedFormData = getValues();
  //   setFormData(updatedFormData);
  //   localStorage.setItem(currentStep, JSON.stringify(updatedFormData));
  //   console.log(updatedFormData);
  // };

  return (
    <div>
      {currentStep === "aboutProject" && (
        <AboutProject
          next={() => {
            // saveData();
            handleStepChange("requiredTalents");
          }}
          prev={() => handleStepChange("getStarted")}
          cancel={cancelProject}
          register={register}
          errors={errors}
        />
      )}
      {currentStep === "requiredTalents" && (
        // <RequiredTalents
        //   next={() => handleStepChange("projectBudget")}
        //   // next={() => handleStepChange("aboutProject")}
        //   prev={() => handleStepChange("aboutProject")}
        //   cancel={cancelProject}
        //   register={register}
        //   errors={errors}
        // />
        <RequiredTalents
          next={() => {
            // saveData()
            handleStepChange("projectBudget");
          }}
          prev={() => handleStepChange("aboutProject")}
          cancel={cancelProject}
          register={register}
          errors={errors}
        />
      )}
      {currentStep === "talentRequirement" && (
        <TalentRequirement
          next={() => {
            // saveData()
            handleStepChange("projectDetails");
          }}
          prev={() => handleStepChange("projectBudget")}
          cancel={cancelProject}
          register={register}
          errors={errors}
        />
      )}
      {currentStep === "projectBudget" && (
        <ProjectBudget
          next={() => {
            // saveData()
            handleStepChange("talentRequirement");
          }}
          prev={() => handleStepChange("requiredTalents")}
          // projectBudget={projectBudget}
          cancel={cancelProject}
          register={register}
          errors={errors}
        />
      )}
      {currentStep === "getStarted" && (
        <GetStarted
          next={() => handleStepChange("aboutProject")}
          cancel={cancelProject}
        />
      )}
      {currentStep === "projectDetails" && (
        <ProjectDetails
          // next={() => handleStepChange("requiredTalents")}
          prev={() => handleStepChange("talentRequirement")}
          cancel={cancelProject}
          // setDefault={setDefault}
        />
      )}
    </div>
  );
}
