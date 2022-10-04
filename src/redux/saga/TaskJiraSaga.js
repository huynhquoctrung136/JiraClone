import { call, put, select, takeLatest } from "redux-saga/effects";
import { taskJiraService } from "../../services/TaskJiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { notifiFunction } from "../../util/Notifications/NotificationJira";
import { CLOSE_DRAWER } from "../constants/DrawerJiraConstanst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConstanst";
import {
  GET_PROJECT_DETAIL,
  GET_PROJECT_DETAIL_SAGA,
} from "../constants/ProjectJiraConstants";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODEL,
  CREATE_TASK_SAGA,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API_SAGA,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
  UPDATE_TASK_SAGA,
} from "../constants/TaskJiraConstanst";

function* createTaskSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  try {
    const { data, status } = yield call(() =>
      taskJiraService.createTask(action.newTask)
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);
    }

    yield put({
      type: CLOSE_DRAWER,
    });

    notifiFunction("success", "Create task successfully!");
  } catch (err) {
    console.log(err);
    console.log(err.response);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}

//getTaskDetail
function* getTaskDetailSaga(action) {
  //console.log("action", action);
  try {
    const { data, status } = yield call(() =>
      taskJiraService.getTaskDetail(action.taskId)
    );
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_DETAIL,
        taskDetailModal: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

//updateStatusTask
function* updateStatusTaskSaga(action) {
  const { taskUpdateStatus } = action;
  try {
    const { data, status } = yield call(() =>
      taskJiraService.updateStatusTask(taskUpdateStatus)
    );

    console.log("data", data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdateStatus.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiUpdateStatusTaskSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga);
}

function* handleChangePostAPISaga(action) {
  // console.log('abc', action)
  //Gọi action làm thay đổi taskDetail modal
  switch (action.actionType) {
    case CHANGE_TASK_MODEL:
      {
        const { value, name } = action;
        yield put({
          type: CHANGE_TASK_MODEL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelect } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelect,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
  }

  //Save qua api updateTaskSaga
  //Lây dữ liệu từ state.taskDetailModal
  let { taskDetailModal } = yield select((state) => state.TaskReducer);
  //console.log("taskDetailModal sau khi thay doi", taskDetailModal);
  //Biến đổi dữ liệu state.taskDetailModal thành dữ liệu api cần
  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });
  const taskUpdate = { ...taskDetailModal, listUserAsign };
  const { data, status } = yield call(() =>
    taskJiraService.updateTask(taskUpdate)
  );
  try {
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_PROJECT_DETAIL_SAGA,
        projectId: taskUpdate.projectId,
      });
      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdate.taskId,
      });
    }
  } catch (err) {
    console.log(err.response?.data);
    console.log(err);
  }
}

export function* theoDoiHandleChangePostAPISaga() {
  yield takeLatest(HANDLE_CHANGE_POST_API_SAGA, handleChangePostAPISaga);
}

//update Task
function* updateTaskSaga(action) {}

export function* theoDoiUpdateTaskSaga() {
  yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga);
}
