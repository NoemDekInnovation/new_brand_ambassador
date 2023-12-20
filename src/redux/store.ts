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
import allTalentProjectReducer from "./talent/allProjects.slice";
import applicationsReducer from "./applicantions.slice";
import contractOfferReducer from "./contract-offer";
import agencyReducer from "./agencyTalent.slice";
import likeReducer from "./like.slice"



const store = configureStore({
  reducer: {
    contractOffer: contractOfferReducer,
    talentInvite: talentInviteReducer,
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
    allTalentProject: allTalentProjectReducer,
    projectApplication: ProjectApplicationSlice,
    applications: applicationsReducer,
    agency: agencyReducer,
    like: likeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
