import React, { useState } from 'react';
import NewTalentCards from './NewTalentCards/index';
import TalentsView from './TalentsView';

export default function TalentTab() {
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [talent, setTalent] = useState(null);

  const toggleView = () => {
    setShowNewProject(!showNewProject);
  };

  return (
    <div>
      {showNewProject && talent && projectId ? (
        <NewTalentCards
          cancelProject={toggleView}
          projectId={projectId}
          talent={talent}
        />
      ) : (
        <TalentsView
          newProject={toggleView}
          setProjectId={setProjectId}
          setTalent={setTalent}
        />
      )}
    </div>
  );
}
