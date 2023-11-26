import React, { useEffect, useState } from "react";
import FurtherTalentDetails from "./FurtherTalentDetails";
import PersonalDetails from "./PersonalDetails";
import Address from "./Address";
import Education from "./Education";
import Experience from "./Experience";
import Skills from "./Skills";
import Social from "./Social";
import {
  AddressProps,
  CertificateProps,
  EducationProps,
  ExperienceProps,
  PersonalProps,
  SkillProp,
  SocialsProps,
} from "../../../redux/types";
import { Dialog, DialogContent } from "../../../ui/dialog";
import { TbProgressCheck } from "react-icons/tb";

import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";
import { multerAxiosInstance } from "../../../api/axios";

type TalentOption = {
  label: string;
  value: string;
};

export default function NewTalentCards({
  cancelProject,
}: {
  cancelProject: () => void;
}) {
  const talentOptions: TalentOption[] = [
    { label: "Brand Ambassador", value: "brand ambassador" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Usher", value: "usher" },
  ];
  const { user } = useSelector((state: RootState) => state.user);
  const [currentStep, setCurrentStep] = useState("overView");

  const [overView, setOverView] = useState({
    summary: "",
    profilePic: "",
  });

  const [personal, setPersonal] = useState<PersonalProps>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    alternatePhone: "",
    DOB: "",
    gender: "",
    origin: "",
    nationality: "",
    height: "",
    skinColor: "",
    dressSize: "",
    languages: "",
  });

  const [address, setAddress] = useState<AddressProps>({
    street: "",
    city: "",
    LGA: "",
    state: "",
    zipCode: "",
  });

  const [experiences, setExperiences] = useState<ExperienceProps[]>([
    {
      agencyName: "",
      projectName: "",
      projectCategory: "",
      projectDuration: "",
      salary: "",
      year: "",
      // _id: '',
    },
  ]);

  const [education, setEducation] = useState<EducationProps[]>([
    {
      institution: "",
      degree: "",
      grade: "",
      gradYear: "",
      // _id: '',
    },
  ]);

  const [certificate, setCertificate] = useState<CertificateProps[]>([
    {
      certificateName: "",
      organisation: "Agency",
      certYear: "",
      // _id: '',
    },
  ]);

  const [socials, setSocials] = useState<SocialsProps>({
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
  });

  const [skillData, setSkillData] = useState<string[]>([]);

  const [successModal, setSuccessModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const handleSkillSelect = (id: any) => {
    if (skillData.length < 5) {
      setSkillData([...skillData, id]);
    } else {
      alert("You can only select up to 5 skills.");
    }
  };

  const handleSkillDelete = (index: number) => {
    const updatedSkillData = [...skillData];
    updatedSkillData.splice(index, 1);
    setSkillData(updatedSkillData);
  };

  const handleSubmit = async () => {
    const payload: any = {
      firstName: personal.firstName,
      lastName: personal.lastName,
      middleName: personal.middleName,
      email: personal.email,
      phone: personal.phone,
      projectId: "653be3fc55125474a87dabed",
      role: "supervisor",
      summary: overView.summary,
      alternatePhone: personal.alternatePhone,
      DOB: personal.DOB,
      gender: personal.gender,
      nationality: personal.nationality,
      origin: personal.origin,
      height: personal.height,
      skinColor: personal.skinColor,
      dressSize: personal.dressSize,
      languages: [personal.languages],
      skills: ["tech", "football"],
      opportunities: talentOptions,
      education: education,
      certifications: certificate,
      experience: experiences,
      socials: {
        facebook: socials.facebook,
        twitter: socials.twitter,
        instagram: socials.instagram,
        linkedin: socials.linkedin,
      },
    };

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

    // Address information (as an array)
    formData.append("address[0][street]", address.street);
    formData.append("address[0][city]", address.city);
    formData.append("address[0][LGA]", address.LGA);
    formData.append("address[0][state]", address.state);
    formData.append("address[0][zipCode]", address.zipCode);

    formData.append("profilePic", overView.profilePic);

    if (user?.accountId !== undefined) {
      try {
        const response = await multerAxiosInstance.post(
          `/${user?.accountId}/register-talent`,
          formData
        );
        setSuccessModal(true);
        setTimeout(() => {
          cancelProject();
        }, 3000);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        // console.log(error);
      }
    }
    // Now you can use formData for your POST request
  };

  return (
    <>
      <div>
        {currentStep === "overView" && (
          <FurtherTalentDetails
            next={() => handleStepChange("personal")}
            cancel={cancelProject}
            overView={overView}
            setOverView={setOverView}
            create={() => handleSubmit()}
          />
        )}
        {currentStep === "personal" && (
          <PersonalDetails
            next={() => handleStepChange("address")}
            prev={() => handleStepChange("overView")}
            cancel={cancelProject}
            setPersonal={setPersonal}
            personal={personal}
            create={() => handleSubmit()}
          />
        )}
        {currentStep === "address" && (
          <Address
            next={() => handleStepChange("education")}
            prev={() => handleStepChange("personal")}
            cancel={cancelProject}
            setAddress={setAddress}
            address={address}
            create={() => handleSubmit()}
          />
        )}
        {currentStep === "education" && (
          <Education
            next={() => handleStepChange("experience")}
            prev={() => handleStepChange("address")}
            cancel={cancelProject}
            setEducation={setEducation}
            education={education}
            setCertificate={setCertificate}
            certificate={certificate}
            create={() => handleSubmit()}
          />
        )}
        {currentStep === "experience" && (
          <Experience
            next={() => handleStepChange("skills")}
            prev={() => handleStepChange("education")}
            cancel={cancelProject}
            experiences={experiences}
            setExperiences={setExperiences}
            create={() => handleSubmit()}
          />
        )}
        {currentStep === "skills" && (
          <Skills
            next={() => handleStepChange("social")}
            prev={() => handleStepChange("experience")}
            cancel={cancelProject}
            create={() => handleSubmit()}
            talentOptions={talentOptions}
            skillsData={skillData}
            handleSkillSelect={handleSkillSelect}
            handleSkillDelete={handleSkillDelete}
          />
        )}
        {currentStep === "social" && (
          <Social
            next={() => handleStepChange("personal")}
            prev={() => handleStepChange("skills")}
            cancel={cancelProject}
            socials={socials}
            setSocials={setSocials}
            create={() => handleSubmit()}
          />
        )}
      </div>
      <Dialog open={successModal}>
        <DialogContent className="bg-bm_card_grey flex flex-col items-center justify-center max-w-[360px] py-16">
          <TbProgressCheck className="font-normal text-[155px] text-green-700" />

          <div className="">Upload Successful</div>
          <p className="text-[12px] font-normal text-center">
            Your uploaded list have been added to “My Talent”
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
