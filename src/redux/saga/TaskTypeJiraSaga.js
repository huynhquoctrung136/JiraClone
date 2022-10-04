/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
import { taskTypeJiraService } from "../../services/TaskTypeJiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_TASK_TYPE, GET_ALL_TASK_TYPE_SAGA } from "../constants/TaskTypeJiraConstants";

function* TaskTypeJiraSaga(action) {
    try {
        const {data,status}=yield call(()=>taskTypeJiraService.getAllTaskType())
        if(status===STATUS_CODE.SUCCESS)
        {
            yield put({
                type:GET_ALL_TASK_TYPE,
                arrTaskType:data.content
            })   
        }
    } catch (err) {
        console.log(err)
        console.log(err.response);
    }

}

export function* theoDoiGetAllTaskType() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA,TaskTypeJiraSaga);
}
