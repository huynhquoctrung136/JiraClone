/** @format */

import {
  EDIT_PROJECT_LIST,
  GET_ALL_PROJECT,
  GET_PROJECT_DETAIL,
  GET_PROJECT_LIST,
} from "../constants/ProjectJiraConstants";

const initialState = {
  projectList: [],
  projectEdit: {},
  projectDetail: {},
  arrProject: [], //Nghiep vu getAllProject cho Dropdown
};

export const ProjectJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    //get project
    case GET_PROJECT_LIST: {
      state.projectList = action.projectList;
      return { ...state };
    }
    //Edit Project
    case EDIT_PROJECT_LIST: {
      state.projectEdit = action.projectEditModel;
      return { ...state };
    }
    //getprojectDetail
    case GET_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }
    //getAllProject
    case GET_ALL_PROJECT: {
      state.arrProject=action.arrProject;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
