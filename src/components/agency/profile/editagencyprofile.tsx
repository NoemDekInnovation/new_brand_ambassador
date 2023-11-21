import React, { useState } from "react";
import { MainLayout } from "../../Layout";
// import Overview from "../../../components/talent/components/Overview";
import PersonalDetails from "../../../components/talent/components/PersonalDetails";
import Address from "../../../components/talent/components/Address";
import Education from "../../../components/talent/components/Education";
import Experience from "../../../components/talent/components/Experience";
import Social from "../../../components/talent/components/Social";
import Skills from "../../../components/talent/components/Skills";
import KeyCompany from "./editdetails/keycompany";
import CompanyDetails from "./editdetails/conpanydetails";

const EditAgencyProfile = () => {
  const [currentStep, setCurrentStep] = useState("keyCompany");

  const [keyCompany, setKeyCompany] = useState({});
  const cancelProject = () => {};
  // const [experiences, setExperiences] = useState([
  //   {
  //     agencyName: "",
  //     projectName: "",
  //     projectCategory: "",
  //     projectDuration: "",
  //     salary: "",
  //     year: "",
  //     _id: "",
  //   },
  // ]);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };


  return (
    <div>
      {currentStep === "keyCompany" && (
        <MainLayout>
          <KeyCompany
            next={() => handleStepChange("companyDetails")}
            cancel={cancelProject}
            keyCompany={keyCompany}
            setKeyCompany={setKeyCompany}
          />
        </MainLayout>
      )}
      {currentStep === "companyDetails" && (
        <MainLayout>
          <CompanyDetails
            next={() => handleStepChange("")}
            prev={() => handleStepChange("keyCompany")}
            cancel={cancelProject}
          />
        </MainLayout>
      )}
    </div>
  );
};

export default EditAgencyProfile;
