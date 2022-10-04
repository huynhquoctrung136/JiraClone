/** @format */

import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/DrawerJiraConstanst";
import React from "react";
const initialState = {
  visible: false,
  title: "",
  ComponentContentDrawer: <p>default</p>,
  callBackSubmit: (propsValue) => {
    alert("click demo");
  },
};

export const DrawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER: {
      return { ...state, visible: true };
    }
    case CLOSE_DRAWER: {
      return { ...state, visible: false };
    }
    case OPEN_FORM_EDIT_PROJECT: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    }
    case SET_SUBMIT_EDIT_PROJECT: {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    case OPEN_FORM_CREATE_TASK: {
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };
    }
    case SET_SUBMIT_CREATE_TASK: {
      state.callBackSubmit=action.submitFunction;
      return { ...state};
    }

    default:
      return { ...state };
  }
};
