/** @format */

import { GET_ALL_TASK_TYPE } from "../constants/TaskTypeJiraConstants";

const initialState = {
  arrTaskType: [],
};

export const TaskTypeJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASK_TYPE: {
      state.arrTaskType = action.arrTaskType;
      return { ...state };
    }

    default:
      return state;
  }
};
