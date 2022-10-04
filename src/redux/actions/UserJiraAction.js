/** @format */

//Tong Hop Action Cua User
import { USER_SIGNIN_SAGA } from "../constants/UserConstants";

export const signInJiraAction = (email, password) => {
  return {
    type: USER_SIGNIN_SAGA,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
