/** @format */

import { call, put, takeLatest } from "redux-saga/effects";
import { priorityJiraService } from "../../services/PriorityJiraService";
import { STATUS_CODE } from "../../util/constants/settingSystem";
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from "../constants/PriorityJiraConstants";

function* getAllPrioritySaga(action) {
    try {
        const {data,status}=yield call(()=>priorityJiraService.getAllPriority())
        if(status===STATUS_CODE.SUCCESS)
        {
            yield put({
                type:GET_ALL_PRIORITY,
                arrPriority:data.content
            })   
        }
    } catch (err) {
        console.log(err)
        console.log(err.response);
    }

}

export function* theoDoiGetAllPriority() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA,getAllPrioritySaga);
}
