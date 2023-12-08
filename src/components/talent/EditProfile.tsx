import React, { useEffect, useState } from "react";
import { MainLayout } from "../Layout";
import Overview from "./components/Overview";
import PersonalDetails from "./components/PersonalDetails";
import Address from "./components/Address";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Social from "./components/Social";
import Skills from "./components/Skills";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";


import {
  AddressProps,
  CertificateProps,
  EducationProps,
  ExperienceProps,
  PersonalProps,
  SocialsProps,
} from "../../redux/types";
import { patchAxiosInstance } from "../../api/axios";
import { fetchUserTalentsData } from "../../redux/talent.slice";
import { Dispatch, SetStateAction } from "react";
import { Country, State } from "country-state-city";



let countryData = Country.getAllCountries();
let stateData = State.getAllStates();

const nationalityOptions = countryData.map((country) => ({
  value: country.name,
  label: country.name,
}));

const originOptions = stateData.map((state) => ({
  value: state.name,
  label: state.name,
}));
// 
type TalentOption = {
  label: string;
  value: string;
};

type E164Number = string;

export default function EditProfile() {
  const talentOptions: TalentOption[] = [
    { label: "ba", value: "ba" },
    { label: "supervisor", value: "supervisor" },
    { label: "usher", value: "usher" },
  ]

  const { user } = useSelector((state: RootState) => state.user);
  const { talentData } = useSelector((state: RootState) => state.talent);
  console.log(talentData);
  const dispatch = useDispatch<AppDispatch>();

  const cancelProject = () => {};
  const [currentStep, setCurrentStep] = useState("overView");

  const [overView, setOverView] = useState({
    summary: "",
    profilePic: null as File | null,
  });

  // console.log(overView.profilePic);
  const [selectedNationality, setSelectedNationality] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);

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
      }
])
  // const [certificate, setCertificate] = useState<CertificateProps[]>([
  //   {
  //     certificateName: '',
  //     organisation: '',
  //     certYear: '',
  //     // _id: '',
  //   },
  // ]);

  const [certificate, setCertificate] = useState<CertificateProps[]>([
    {
      certificateName: "",
      organisation: "",
      certYear: "",
      // _id: '',
    },
  ]);

  // const [socials, setSocials] = useState<SocialsProps>({
  //   facebook: "",
  //   twitter: "",
  //   instagram: "",
  //   linkedin: "",
  // });

  // const [skillData, setSkillData] = useState<string[]>([]);

  const [opportunities, setOpportunites] = useState<string[]>([]) 
  // console.log(opportunities);
   

  // const [successModal, setSuccessModal] = useState(false);

  // const [loading, setLoading] = useState(false);

  const [phn, setPhn]: [E164Number, Dispatch<SetStateAction<E164Number>>] =
    useState("");
  const [altPhn, setAltPhn]: [
    E164Number,
    Dispatch<SetStateAction<E164Number>>
  ] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhn(value);
  };

  const handleAltPhoneChange = (value: string) => {
    setAltPhn(value);
  };

  useEffect(() => {
    // Assuming talentData has the same structure as PersonalProps
    setPersonal((prevPersonal) => ({
      ...prevPersonal,
      ...talentData,
    }));
    setOverView((prevOverView) => ({
      ...prevOverView,
      ...talentData,
    }));
    setAddress((prevAddress) => ({
      ...prevAddress,
      ...talentData.address, // Assuming talentData has an 'address' property
    }));
    // setExperiences((prevExperiences) => [
    //   ...prevExperiences,
    //   ...talentData.experiences,
    // ]);
    if (talentData.experiences && Array.isArray(talentData.experiences)) {
      setExperiences((prevExperiences) => [
        ...prevExperiences,
        ...talentData.experiences,
      ]);
    }
    setEducation((prevEducation) => [
      ...prevEducation,
      ...talentData.education,
    ]);
    // if (talentData.education && Array.isArray(talentData.education)) {
    //   setEducation((prevEducation) => [
    //     ...prevEducation,
    //     ...talentData.education,
    //   ]);
    // }
    // setCertificate((prevCertificates) => [
    //   ...prevCertificates,
    //   ...talentData.certificates,
    // ]);
    if (talentData.certificates && Array.isArray(talentData.certificates)) {
      setCertificate((prevCertificates) => [
        ...prevCertificates,
        ...talentData.certificates,
      ]);
    }
    // setSkillData((prevSkills) => [...prevSkills, ...talentData.skills]);
    if (talentData.skills && Array.isArray(talentData.skills)) {
      setSkillData((prevSkills) => [...prevSkills, ...talentData.skills]);
    }
  }, [talentData]);
  const [socials, setSocials] = useState<SocialsProps>({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
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
      alert('You can only select up to 5 skills.');
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
      phone: phn || personal.phone,
      summary: overView.summary,
      alternatePhone: altPhn || personal.alternatePhone,
      DOB: personal.DOB,
      gender: 'Male',
      nationality: personal.nationality,
      origin: personal.origin,
      height: personal.height,
      skinColor: personal.skinColor,
      dressSize: personal.dressSize,
      languages: [personal.languages],
      skills: skillData,
      opportunities: opportunities,
      education: education,
      certifications: certificate,
      experience: experiences,
      socials: socials,
    };

    const formData = new FormData();

    const handleData = (data: any, parentKey: any) => {
      for (const key in data) {
        const value = data[key];
        const newKey = parentKey ? `${parentKey}[${key}]` : key;

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            const itemKey = `${newKey}[${index}]`;
            if (typeof item === 'object') {
              handleData(item, itemKey);
            } else {
              formData.append(itemKey, item);
            }
          });
        } else if (typeof value === 'object') {
          handleData(value, newKey);
        } else {
          formData.append(newKey, value);
        }
      }
    };

    handleData(payload, null);

    // Address information (as an array)
    formData.append('address[0][street]', address.street);
    formData.append('address[0][city]', address.city);
    formData.append('address[0][LGA]', address.LGA);
    formData.append('address[0][state]', address.state);
    formData.append('address[0][zipCode]', address.zipCode);

    if (overView.profilePic !== null) {
      formData.append('profilePic', overView.profilePic);
    }

    if (user?.accountId !== undefined) {
      try {
        const response = await patchAxiosInstance.patch(
          `/profile-details`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.authKey || ''}`,
            },
          }
        );
        console.log('RESPONSE:', response);
        setSuccessModal(true);
        setTimeout(() => {
          cancelProject();
        }, 3000);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        {currentStep === 'overView' && (
          <MainLayout>
            <Overview
              next={() => handleStepChange('personal')}
              cancel={cancelProject}
              overView={overView}
              setOverView={setOverView}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
        {currentStep === 'personal' && (
          <MainLayout>
            <PersonalDetails
              next={() => handleStepChange('address')}
              prev={() => handleStepChange('overView')}
              cancel={cancelProject}
              setPersonal={setPersonal}
              personal={personal}
              handlePhoneChange={handlePhoneChange}
              handleAltPhoneChange={handleAltPhoneChange}
              nationalityOptions={nationalityOptions}
              setSelectedNationality={setSelectedNationality}
              setSelectedOrigin={setSelectedOrigin}
              originOptions={originOptions}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
        {currentStep === 'address' && (
          <MainLayout>
            <Address
              next={() => handleStepChange('education')}
              prev={() => handleStepChange('personal')}
              cancel={cancelProject}
              setAddress={setAddress}
              address={address}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
        {currentStep === 'education' && (
          <MainLayout>
            <Education
              next={() => handleStepChange('experience')}
              prev={() => handleStepChange('address')}
              cancel={cancelProject}
              setEducation={setEducation}
              education={education}
              setCertificate={setCertificate}
              certificate={certificate}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
        {currentStep === 'experience' && (
          <MainLayout>
            <Experience
              next={() => handleStepChange('skills')}
              prev={() => handleStepChange('education')}
              cancel={cancelProject}
              experiences={experiences}
              setExperiences={setExperiences}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
        {currentStep === 'skills' && (
          <MainLayout>
            <Skills
              next={() => handleStepChange('social')}
              prev={() => handleStepChange('experience')}
              cancel={cancelProject}
              create={() => handleSubmit()}
              talentOptions={talentOptions}
              skillsData={skillData}
              handleSkillSelect={handleSkillSelect}
              setOpportunites={setOpportunites}
              handleSkillDelete={handleSkillDelete}
            />
          </MainLayout>
        )}
        {currentStep === 'social' && (
          <MainLayout>
            <Social
              next={() => handleStepChange('personal')}
              prev={() => handleStepChange('skills')}
              cancel={cancelProject}
              socials={socials}
              setSocials={setSocials}
              create={() => handleSubmit()}
            />
          </MainLayout>
        )}
      </div>
    </>
  );
}
