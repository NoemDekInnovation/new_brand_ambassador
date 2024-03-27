import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import talentReducer from "./talent.slice";
import engagetalentReducer from "./engagetalent.slice";
import projectSlice from "./project.slice";
import skillsSlice from "./skills.slice";
import agencyProjectSlice from "./agencyproject.slice";
import favouriteSlice from "./favourite.slice";
import publishProjectSlice from "./publishProject";
import activeProjectSlice from "./ActiveProject";
import completeProject from "./completeProject";
import draftProjectSlice from "./draftProject.slice";
import ProjectApplicationSlice from "./projectApllication.slice";
import talentInviteReducer from "./talentInvitations.slice";
import talentApplicationReducer from "./talentApplications.slice";
import allTalentProject from "./talent/allProjects.slice";
import applicationsReducer from "./applicantions.slice";
import contractOfferReducer from "./contract-offer";
import hireSlice from "./hire.slice";
import agencyReducer from "./agencyTalent.slice";
import currentengageReducer from "./currentengage.slice";
import leadingReducer from "./leading.slice";

// revamp
import projectsSlice from "./revmap/projects";
import talentSlice from "./revmap/talent.slice";

const store = configureStore({
  reducer: {
    contractOffer: contractOfferReducer,
    talentInvite: talentInviteReducer,
    talentApplication: talentApplicationReducer,
    user: userReducer,
    engagedtalent: engagetalentReducer,
    talent: talentReducer,
    project: projectSlice,
    skills: skillsSlice,
    agencyProject: agencyProjectSlice,
    favouriteProject: favouriteSlice,
    publishProject: publishProjectSlice,
    completeProject: completeProject,
    draftProject: draftProjectSlice,
    activeProject: activeProjectSlice,
    projects: activeProjectSlice,
    allTalentProject: allTalentProject,
    projectApplication: ProjectApplicationSlice,
    applications: applicationsReducer,
    hire: hireSlice,
    agency: agencyReducer,
    currentengage: currentengageReducer,
    leading: leadingReducer,
    // revamp
    newProjects: projectsSlice,
    newtalent: talentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
