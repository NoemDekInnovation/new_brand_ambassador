export interface TalentProps {
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  metaData: {
    verificationCode: string;
    isActive: boolean;
    createdBy: string;
  };
  _id: string;
  accountType: string;
  firstName: string;
  lastName: string;
  middleName: string;
  fullName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  gender: string;
  DOB: string;
  age: number;
  origin: string;
  nationality: string;
  height: string;
  dressSize: string;
  languages: string[];
  profilePic: string;
  summary: string;
  address: {
    street: string;
    city: string;
    LGA: string;
    state: string;
    zipCode: string;
    _id: string;
  }[];
  education: {
    institution: string;
    degree: string;
    grade: string;
    gradYear: string;
    _id: string;
  }[];
  certifications: [
    {
      certificateName: string;
      organisation: string;
      certYear: string;
      _id: string;
    }
  ];
  experience: {
    agencyName: string;
    projectName: string;
    projectCategory: string;
    projectDuration: string;
    salary: string;
    year: string;
    _id: string;
  }[];
  skills: string[];
  opportunities: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProjectProps {
  projectDuration: {
    startDate: string;
    endDate: string;
  };
  metaData: {
    createdBy: string;
    isActive: boolean;
  };
  _id: string;
  projectTitle: string;
  projectCategory: string;
  projectCode: string;
  projectLocation: string;
  projectDescription: string;
  talent: {
    opportunities: string;
    _id: string;
  }[];
  qualifications: string[];
  skills: string[];
  workingDays: string[];
  budget: {
    opportunities: string;
    workingOptions: string;
    salary: string;
    _id: string;
  }[];

  projectRequirements: string;
  document: [];
  createdAt: string;
  updatedAt: string;
  __v: 1;
}

export interface ExperienceProps {
  agencyName: string;
  projectName: string;
  projectCategory: string;
  projectDuration: string;
  salary: string;
  year: string;
  // _id: string;
  [key: string]: string;
}

export interface SkillsProps {
  id: string;
  name: string;
}

export interface PersonalProps {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  DOB: string;
  gender: string;
  origin: string;
  nationality: string;
  height: string;
  skinColor: string;
  languages: string;
  dressSize: string;
  [key: string]: string;
}

export interface AddressProps {
  street: string;
  city: string;
  LGA: string;
  state: string;
  zipCode: string;
}

export interface EducationProps {
  degree: string;
  institution: string;
  grade: string;
  gradYear: string;

  [key: string]: string;
}

export interface CertificateProps {
  certificateName: string;
  organisation: string;
  certYear: string;

  [key: string]: string;
}

export interface SocialsProps {
  linkedin?: string;
  twitter?: string;
  facebook: string;
  instagram: string;
}

export interface SkillProp {
  result: string;
}

export interface AboutProjectProps {
  projectTitle: string;
  projectCategory: string;
  projectCode: string;
  projectLocation: string[];
  projectDescription: string;
  startDate: string;
  endDate: string;
}

export interface ProjectPostProps {
  startDate: string;
  endDate: string;
}

export interface RequiredTalentsProps {
  talentType: string;
  qualification: string;
  relevantSkills: string[];
  paymentOptions: string;
  salary: string;

  [key: string]: string | string[];
}

export interface favProp {
  agency: string;
  createdAt: string;
  updatedAt: string;
  _v: number;
  _id: string;
  favoriteTalent: [
    {
      talent: {
        DOB: string;
        accountType: string;
        address: [
          {
            street: string;
            city: string;
            LGA: string;
            state: string;
            zipCode: string;
            _id: string;
          }
        ];
        age: number;
        alternatePhone: string;
        certifications: [
          {
            certYear: string;
            certificateName: string;
            organisation: string;
            _id: string;
          }
        ];
        createdAt: string;
        dressSize: string;
        education: [
          {
            degree: string;
            gradYear: string;
            grade: string;
            institution: string;
            _id: string;
          }
        ];
        email: string;
        experience: [
          {
            agencyName: string;
            projectCategor: string;
            projectDuration: string;
            projectName: string;
            salary: string;
            year: string;
            _id: string;
          }
        ];
        firstName: string;
        fullName: string;
        gender: string;
        height: string;
        languages: string[];
        lastName: string;
        metaData: {
          createdBy: string;
          isActive: boolean;
          verificationCode: string;
        };
        middleName: string;
        opportunities: string;
        origin: string;
        phone: string;
        profilePic: string;
        skills: string[];
        socials: {
          facebook: string;
          instagram: string;
          linkedin: string;
          twitter: string;
        };
        summary: string;
      };
    }
  ];
}

export type DayOfWeek = "S" | "M" | "T" | "W" | "T" | "F" | "S" | string;
