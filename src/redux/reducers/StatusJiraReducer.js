/** @format */

import { GET_ALL_STATUS } from "../constants/StatusJiraConstants";

const initialState = {
    arrStatus:[],
};

export const StatusJiraReducer =(state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS: {
      state.arrStatus=action.arrStatus
      return { ...state };
    }

    default:
      return state;
  }
};
