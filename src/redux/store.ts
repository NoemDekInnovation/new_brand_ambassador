import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";
import talentReducer from "./talent.slice";
import projectSlice from "./project.slice";
import skillsSlice from "./skills.slice";
import agencyProjectSlice from "./agencyproject.slice";
import favouriteSlice from "./favourite.slice";
import publishProjectSlice from "./publishProject";
import activeProjectSlice from "./ActiveProject"
import completeProject from "./completeProject";
import draftProjectSlice from "./draftProject.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
