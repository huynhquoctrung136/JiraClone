/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
import { statusJiraService } from "../../services/StatusJiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../constants/StatusJiraConstants";

function* getAllStatusSaga(action) {
  try {
    const { data, status } = yield call(() => statusJiraService.getAllStatus());
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_STATUS,
        arrStatus: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    console.log(err.response?.data);
  }
}

export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
