/** @format */

import { call, put, takeLatest, delay } from "redux-saga/effects";
import { jiraprojectService } from "../../services/JiraProjectService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstanst";
import {
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_LIST_SAGA,
  EDIT_PROJECT_LIST_SAGA,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
  GET_PROJECT_LIST,
  GET_PROJECT_LIST_SAGA,
} from "../constants/ProjectJiraConstants";
import { history } from "../../util/history";
import { CLOSE_DRAWER } from "../constants/DrawerJiraConstanst";
import { notifiFunction } from "../../util/Notifications/NotificationJira";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../constants/UserConstants";


// createProject
function* createProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.createProject(action.newProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProject() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProject);
}

//getListProject
function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.getListProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_LIST,
        projectList: data.content,
      });

    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_PROJECT_LIST_SAGA, getListProjectSaga);
}

//updateListProject
function* updateListProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.updateListProject(action.projectUpdate)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_LIST_SAGA,
      });
      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiUpdateListProjectSaga() {
  yield takeLatest(EDIT_PROJECT_LIST_SAGA, updateListProjectSaga);
}

//deleteListProject
function* deleteListProject(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.deleteListProject(action.idProject)
    );
    if (status === STATUS_CODE.SUCCESS) {
      notifiFunction("success", "Delete project successfully !");
    }
    yield put({
      type: GET_PROJECT_LIST_SAGA,
    });
    yield put({
      type: CLOSE_DRAWER,
    });

    yield put({
      type: HIDE_LOADING,
    });
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
}
export function* theoDoiDeleteListProjectSaga() {
  yield takeLatest(DELETE_PROJECT_LIST_SAGA, deleteListProject);
}

//projectDetailSaga
function* getProjectDetailSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.getProjectDetail(action.projectId)
    );
    yield put({
      type: GET_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.log("404 not found !");
    console.log(err);
    console.log(err.response);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga);
}

//getAllProject
function* getAllProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      jiraprojectService.getAllProject()
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });


      yield put({
        type:GET_USER_BY_PROJECT_ID_SAGA,
        idProject:data.content[0].id
      })
    }
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
