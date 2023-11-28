// import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
// import GetStarted from "./GetStarted";
// import AboutProject from "./aboutProject";
// import RequiredTalents from "./requiredTalents";
// import TalentRequirement from "./talentRequirement";
// import ProjectBudget from "./projectBudget";
// import ProjectDetails from "./projectDetails";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { fetchSkills, SkillsStateProps } from "../../../redux/skills.slice";
// import { DayOfWeek, RequiredTalentsProps } from "../../../redux/types";

// //  type aboutProjectSchemaType = z.infer<typeof aboutProjectSchema>;

// export default function NewProject({
//   cancelProject,
//   setDefault,
// }: {
//   cancelProject: () => void;
//   setDefault: Dispatch<SetStateAction<string>>;
// }) {

//   const { user } = useSelector((state: RootState) => state.user);

//   const [isLoading, setIsLoading] = useState(false);

//   // const [currentStep, setCurrentStep] = useState("getStarted");

//   const [aboutProject, setAboutProject] = useState({
//     projectTitle: "",
//     projectCategory: "",
//     projectCode: "",
//     projectLocation: [],
//     projectDescription: "",
//     startDate: "",
//     endDate: "",
//   });
//   const [requiredTalents, setRequiredTalents] = useState<
//     RequiredTalentsProps[]
//   >([
//     {
//       talentType: "",
//       qualification: "",
//       relevantSkills: [],

//       paymentOptions: "",
//       salary: "",
//     },
//   ]);

//   const [workDays, setWorkDays] = useState<DayOfWeek[]>([]);
//   const [proposal, setProposal] = useState("");
//   const [projectName, setProjectName] = useState("");
//   const [document, setDocument] = useState("");
//   const [successModal, setSuccessModal] = useState(false);

//   const clearLocalStorage = () => {
//     localStorage.removeItem("aboutProject");
//     localStorage.removeItem("requiredTalent");
//     localStorage.removeItem("projectBudget");
//     localStorage.removeItem("proposal");
//     localStorage.removeItem("document");
//   };

//   useEffect(() => {
//     clearLocalStorage();
//   }, []);

//   const [projectPost, setProjectPost] = useState({
//     startDate: "",
//     endDate: "",
//   });
//   console.log(projectPost);

//   const aboutProjectSchema = z.object({
//     projectTitle: z.string(),
//     projectCategory: z.string(),
//     projectCode: z.string().min(1),
//     projectLocation: z.string(),
//     projectDescription: z.string(),
//     projectRequirements: z.string(),
//     document: z.string(),
//     startDate: z.string(),
//     endDate: z.string(),
//     opportunities: z.string(),
//     qualifications: z.string(),
//     skills: z.string(),
//     workingDays: z.string(),
//     paymentOptions: z.string(),
//     salary: z.string(),
//   });

//   const defaultValues = {
//     projectTitle: "",
//     projectCategory: "",
//     projectCode: "",
//     projectLocation: "",
//     projectDescription: "",
//     projectRequirements: "",
//     document: "",
//     startDate: "",
//     endDate: "",
//     opportunities: "",
//     qualifications: "",
//     skills: "",
//     workingDays: "",
//     paymentOptions: "",
//     salary: "",
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     getValues,
//   } = useForm({
//     resolver: zodResolver(aboutProjectSchema),
//     defaultValues: defaultValues,
//   });

//   const [currentStep, setCurrentStep] = useState("getStarted");
//   // const [currentStep, setCurrentStep] = useState("projectDetails");
//   // const dispatch = useDispatch<AppDispatch>();
//   // useEffect(() => {
//   //   dispatch(fetchSkills());
//   // }, [dispatch]);
//   // const [formData, setFormData] = useState<aboutProjectSchemaType>({
//   //   projectTitle: "",
//   //   projectCategory: "",
//   //   projectCode: "",
//   //   projectLocation: "",
//   //   projectDescription: "",
//   //   projectRequirements: "",
//   //   document: "",
//   //   projectDuration: {
//   //     startDate: "",
//   //     endDate: "",
//   //   },
//   //   talent: [{
//   //     opportunities: "",
//   //     qualifications: "",
//   //     skills: "",
//   //   }],
//   //   workingDays: "",
//   //   budget: {
//   //     opportunities: "",
//   //     workingOptions: "",
//   //     salary: "",
//   //   },

//   // })

//   const handleStepChange = (step: string) => {
//     setCurrentStep(step);
//   };

//   // const saveData = () => {
//   //   const formData = getValues();
//   //   localStorage.setItem(currentStep, JSON.stringify(formData));
//   //   console.log(formData)
//   // };

//   // const saveData = () => {
//   //   const updatedFormData = getValues();
//   //   setFormData(updatedFormData);
//   //   localStorage.setItem(currentStep, JSON.stringify(updatedFormData));
//   //   console.log(updatedFormData);
//   // };

//   return (
//     <div>
//       {currentStep === "aboutProject" && (
//         <AboutProject
//           next={() => {
//             // saveData();
//             handleStepChange("requiredTalents");
//           }}
//           prev={() => handleStepChange("getStarted")}
//           cancel={cancelProject}
//           register={register}
//           errors={errors}
//         />
//       )}
//       {currentStep === "requiredTalents" && (
//         // <RequiredTalents
//         //   next={() => handleStepChange("projectBudget")}
//         //   // next={() => handleStepChange("aboutProject")}
//         //   prev={() => handleStepChange("aboutProject")}
//         //   cancel={cancelProject}
//         //   register={register}
//         //   errors={errors}
//         // />
//         <RequiredTalents
//           next={() => {
//             // saveData()
//             handleStepChange("projectBudget");
//           }}
//           prev={() => handleStepChange("aboutProject")}
//           cancel={cancelProject}
//           register={register}
//           errors={errors}
//         />
//       )}
//       {currentStep === "talentRequirement" && (
//         <TalentRequirement
//           next={() => {
//             // saveData()
//             handleStepChange("projectDetails");
//           }}
//           prev={() => handleStepChange("projectBudget")}
//           cancel={cancelProject}
//           register={register}
//           errors={errors}
//         />
//       )}
//       {currentStep === "projectBudget" && (
//         <ProjectBudget
//           next={() => {
//             // saveData()
//             handleStepChange("talentRequirement");
//           }}
//           prev={() => handleStepChange("requiredTalents")}
//           // projectBudget={projectBudget}
//           cancel={cancelProject}
//           register={register}
//           errors={errors}
//         />
//       )}
//       {currentStep === "getStarted" && (
//         <GetStarted
//           next={() => handleStepChange("aboutProject")}
//           cancel={cancelProject}
//         />
//       )}
//       {currentStep === "projectDetails" && (
//         <ProjectDetails
//           // next={() => handleStepChange("requiredTalents")}
//           prev={() => handleStepChange("talentRequirement")}
//           cancel={cancelProject}
//           // setDefault={setDefault}
//         />
//       )}
//     </div>
//   );
// }

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

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { fetchSkills, SkillsStateProps } from "../../../redux/skills.slice";
import { campaignAuthAxiosInstance, multerAxiosInstance, patchAxiosInstance } from "../../../api/axios";
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
  setDefault,
}: {
  cancelProject: () => void;
  setDefault: Dispatch<SetStateAction<string>>;
}) {
  const { user } = useSelector((state: RootState) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  const [currentStep, setCurrentStep] = useState("getStarted");
  console.log(currentStep);

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
  console.log(requiredTalents);

  const [workDays, setWorkDays] = useState<DayOfWeek[]>([]);
  const [proposal, setProposal] = useState("");
  const [projectName, setProjectName] = useState("");
  const [document, setDocument] = useState("");
  const [successModal, setSuccessModal] = useState(false);

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
  console.log(projectPost);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
    console.log(step);
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

  // const saveData = () => {
  //   const formData = getValues();
  //   localStorage.setItem(currentStep, JSON.stringify(formData));
  // };
  const payload: any = {
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
  
  // const submitHandler = async (isDraft: boolean) => {
  //   setIsLoading(true);
  //   const payload: any = {
  //     draft: isDraft,
  //     projectTitle: aboutProject.projectTitle,
  //     projectCategory: aboutProject.projectCategory,
  //     projectCode: aboutProject.projectCode,
  //     projectLocation: [aboutProject.projectLocation],
  //     projectDescription: aboutProject.projectDescription,
  //     projectRequirements: proposal,
  //     document: "document",
      

  //     projectDuration: {
  //       startDate: aboutProject.startDate,
  //       endDate: aboutProject.endDate,
  //     },

  //     talent: requiredTalents,
  //     workingDays: workDays,
  //     projectPost: projectPost,
  //   };
    
  //   try {
  //     const formData = new FormData();
  //     const handleData = (data: any, parentKey: any) => {
  //       for (const key in data) {
  //         const value = data[key];
  //         const newKey = parentKey ? `${parentKey}[${key}]` : key;

  //         if (Array.isArray(value)) {
  //           value.forEach((item, index) => {
  //             const itemKey = `${newKey}[${index}]`;
  //             if (typeof item === "object") {
  //               handleData(item, itemKey);
  //             } else {
  //               formData.append(itemKey, item);
  //             }
  //           });
  //         } else if (typeof value === "object") {
  //           handleData(value, newKey);
  //         } else {
  //           formData.append(newKey, value);
  //         }
  //       }
  //     };

  //     handleData(payload, null);
  //     formData.append("document", document);
  //     // formData.append("document", "document");   

  //     if (user?.accountId !== undefined) {
  //       console.log(payload, "formData", user.authKey);
  //       // const user = localStorage.getItem("userData");
  //       // const parsedUser = JSON.parse(user);

  //       try {
  //         const response = await multerAxiosInstance.post(
  //           `/create-project`,
  //           payload,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${user.authKey || ""}`,
  //             },
  //           }
  //         );
  //         console.log(response);
  //         console.log(payload, "formData", user?.accountId);
  //         setSuccessModal(true);
  //         setTimeout(() => {
  //           cancelProject();
  //         }, 3000);
  //         // setLoading(false);
  //       } catch (error: any) {
  //         // setLoading(false);
  //         console.log(error);
  //       }
  //     }
  //     setIsLoading(false);
  //   } catch (error) {
  //     setIsLoading(false);

  //     console.log(error);
  //   }
  // };

  const submitHandler = async (isDraft: boolean) => {
    setIsLoading(true);
    const payload: any = {
      draft: isDraft,
      projectTitle: aboutProject.projectTitle,
      projectCategory: aboutProject.projectCategory,
      projectCode: aboutProject.projectCode,
      projectLocation: [aboutProject.projectLocation],
      projectDescription: aboutProject.projectDescription,
      projectRequirements: proposal,
      document: "document",
      

      projectDuration: {
        startDate: aboutProject.startDate,
        endDate: aboutProject.endDate,
      },

      talent: requiredTalents,
      workingDays: workDays,
      projectPost: projectPost,
    };
    try {
      const formData = new FormData();
      const handleData = (data: any, parentKey: any) => {
        for (const key in data) {
          const value = data[key];
          const newKey = parentKey ? `${parentKey}[${key}]` : key;

          if (Array.isArray(value)) {
            value.forEach((item, index) => {
              const itemKey = `${newKey}[${index}]`;
              if (typeof item === "object") {
                handleData(item, itemKey);
              } else {
                formData.append(itemKey, item);
              }
            });
          } else if (typeof value === "object") {
            handleData(value, newKey);
          } else {
            formData.append(newKey, value);
          }
        }
      };

      handleData(payload, null);
      formData.append("document", document);
      // formData.append("document", "document");   

      if (user?.accountId !== undefined) {
        console.log(payload, "formData", user.authKey);
        // const user = localStorage.getItem("userData");
        // const parsedUser = JSON.parse(user);

        try {
          const response = await patchAxiosInstance.post(
            `/create-project`,
            payload,
            {
              headers: {
                Authorization: `Bearer ${user.authKey || ""}`,
              },
            }
          );
          console.log(response);
          console.log(payload, "formData", user?.accountId);
          setSuccessModal(true);
          setTimeout(() => {
            cancelProject();
          }, 3000);
          // setLoading(false);
        } catch (error: any) {
          // setLoading(false);
          console.log(error);
        }
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      console.log(error);
    }
  };

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
          />
        )}
      </div>
    </>
  );
}
