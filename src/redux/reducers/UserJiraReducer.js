/** @format */

import { USER_LOGIN } from "../../util/constants/settingSystem";
import {
  GET_USER_SEARCH,
  USLOGIN,
  GET_USER_BY_PROJECT_ID,
} from "../constants/UserConstants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
};

export const UserJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case GET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
      return { ...state };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }

    default:
      return state;
  }
};
