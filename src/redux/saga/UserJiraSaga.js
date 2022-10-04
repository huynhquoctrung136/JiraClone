/** @format */
import { call, delay, takeLatest, put } from "redux-saga/effects";
import { userjiraService } from "../../services/UserJiraService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../util/constants/settingSystem";
import {
  ADD_USER_PROJECT_SAGA,
  GET_USER_SAGA,
  GET_USER_SEARCH,
  REMOVE_USER_FROM_PROJECT_SAGA,
  USER_SIGNIN_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  USLOGIN,
} from "../constants/UserConstants";
import { history } from "../../util/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstanst";
import { GET_PROJECT_LIST_SAGA } from "../constants/ProjectJiraConstants";

//Quan ly Action Saga User

//SignIn User Saga
function* signInSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);

  //Gọi api
  try {
    const { data } = yield call(() =>
      userjiraService.signInJira(action.userLogin)
    );
    //Thành công lưu vào localStorage
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    history.push("/projectmanagement");
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignIn() {
  yield takeLatest(USER_SIGNIN_SAGA, signInSaga);
}

//getUserSaga
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userjiraService.getUserJira(action.keyWord)
    );

    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
}

export function* theoDoigetUserSaga() {
  yield takeLatest(GET_USER_SAGA, getUserSaga);
}

//addUserProjectSaga
function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userjiraService.assignUserProject(action.userProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
    }
    yield put({
      type: GET_PROJECT_LIST_SAGA,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
}

//removeUserFromProject
export function* theoDoiAddUserProjectSaga() {
  yield takeLatest(ADD_USER_PROJECT_SAGA, addUserProjectSaga);
}

//removeUserFromProject
function* removeUserFromProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userjiraService.removeUserFromProject(action.userProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
    }
  } catch (err) {
    console.log(err.response);
    console.log(err);
  }
}

export function* theoDoiRemoveUserFromProject() {
  yield takeLatest(REMOVE_USER_FROM_PROJECT_SAGA, removeUserFromProjectSaga);
}

//getUserByProjectId

function* getUserByProjectId(action) {
  try {
    const { data, status } = yield call(() =>
      userjiraService.getUserByProjectId(action.idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: []
      });
    }
  }
}

export function* theoDoiGetUserByProjectId() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectId);
}
