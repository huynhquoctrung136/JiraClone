/** @format */

import { GET_ALL_PROJECT_CATEGORY } from "../constants/ProjectJiraConstants";

const initialState = {
  arrCategory: [],
};

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      state.arrCategory = action.data;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
