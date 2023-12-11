import React, { Dispatch, SetStateAction, useState } from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { patchAxiosInstance } from "../../../api/axios";

type E164Number = string;


const EditAgencyProfile = () => {
  const [currentStep, setCurrentStep] = useState("keyCompany");
  const [loading, setLoading] = useState(false);
    const [phn, setPhn]: [E164Number, Dispatch<SetStateAction<E164Number>>] =
      useState("");

      

  const [keyCompany, setKeyCompany] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    profilePic: "",
  });
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
    const handlePhoneChange = (value: string) => {
      setPhn(value);
    };
  const { user } = useSelector((state: RootState) => state.user); 


    const handleEditSubmit = async () => {
      setLoading(true);
      const profileData = new FormData();
      profileData.append("firstName", keyCompany.firstName);
      profileData.append("lastName", keyCompany.lastName);
      profileData.append("phone", phn || keyCompany.phone);
      // profileData.append("profilePic", editData.profilePic);
      if (keyCompany.profilePic !== null) {
        profileData.append("profilePic", keyCompany.profilePic);
      }

      if (user?.accountId !== undefined) {
        console.log("authkey", user.authKey);
        try {
          const response = await patchAxiosInstance.patch(
            `/edit-admin`,
            // `/${user?.accountId}/edit-admin`,
            profileData,
            {
              headers: {
                Authorization: `Bearer ${user.authKey || ""}`,
              },
            }
          );

          setLoading(false);
        } catch (error) {
          setLoading(false);
          // Handle error
        }
      }
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
            create={() => handleEditSubmit()}
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
