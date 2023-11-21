import React, { useState } from 'react';
import { MainLayout } from '../Layout';
import Overview from './components/Overview';
import PersonalDetails from './components/PersonalDetails';
import Address from './components/Address';
import Education from './components/Education';
import Experience from './components/Experience';
import Social from './components/Social';
import Skills from './components/Skills';

const EditProfile = () => {
  const [currentStep, setCurrentStep] = useState('overView');

  const [overView, setOverView] = useState({});
  const cancelProject = () => {};
  const [experiences, setExperiences] = useState([
    {
      agencyName: '',
      projectName: '',
      projectCategory: '',
      projectDuration: '',
      salary: '',
      year: '',
      _id: '',
    },
  ]);

  console.log(experiences);

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };
  return (
    <div>
      {currentStep === 'overView' && (
        <MainLayout>
          <Overview
            next={() => handleStepChange('personal')}
            cancel={cancelProject}
            overView={overView}
            setOverView={setOverView}
          />
        </MainLayout>
      )}
      {currentStep === 'personal' && (
        <MainLayout>
          <PersonalDetails
            next={() => handleStepChange('address')}
            prev={() => handleStepChange('overView')}
            cancel={cancelProject}
          />
        </MainLayout>
      )}
      {currentStep === 'address' && (
        <MainLayout>
          <Address
            next={() => handleStepChange('education')}
            prev={() => handleStepChange('personal')}
            cancel={cancelProject}
          />
        </MainLayout>
      )}
      {currentStep === 'education' && (
        <MainLayout>
          <Education
            next={() => handleStepChange('experience')}
            prev={() => handleStepChange('address')}
            cancel={cancelProject}
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
          />
        </MainLayout>
      )}
      {currentStep === 'skills' && (
        <MainLayout>
          <Skills
            next={() => handleStepChange('social')}
            prev={() => handleStepChange('experience')}
            cancel={cancelProject}
          />
        </MainLayout>
      )}
      {currentStep === 'social' && (
        <MainLayout>
          <Social
            next={() => handleStepChange('personal')}
            prev={() => handleStepChange('skills')}
            cancel={cancelProject}
          />
        </MainLayout>
      )}
    </div>
  );
};

export default EditProfile;
