import { all } from "redux-saga/effects";
import * as Users from './UserJiraSaga'
import * as ProjectCategorySaga from "./ProjectCategorySaga"
import * as ProjectSaga from "./ProjectSaga"
import * as PrioritySaga from "./PriorityJiraSaga"
import * as TaskTypeSaga from "./TaskTypeJiraSaga"
import * as TaskSaga from "./TaskJiraSaga";
import * as StatusSaga from "./StatusJiraSaga";
export function* rootSaga() {

  yield all([
    // UserSaga
    Users.theoDoiSignIn(),
    Users.theoDoigetUserSaga(),
    Users.theoDoiAddUserProjectSaga(),
    Users.theoDoiRemoveUserFromProject(),
    Users.theoDoiGetUserByProjectId(),
    //ProjectCategorySaga
    ProjectCategorySaga.theoDoiGetAllProjectCategory(),
    //ProjectSaga
    ProjectSaga.theoDoiCreateProject(), 
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateListProjectSaga(),
    ProjectSaga.theoDoiDeleteListProjectSaga(),
    ProjectSaga.theoDoiGetProjectDetailSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),

    //PrioritySaga
    PrioritySaga.theoDoiGetAllPriority(),

    //TaskTypeSaga
    TaskTypeSaga.theoDoiGetAllTaskType(),


    //TaskSaga
    TaskSaga.theoDoiCreateTaskSaga(),
    TaskSaga.theoDoiGetTaskDetailSaga(),
    TaskSaga.theoDoiUpdateStatusTaskSaga(),
    TaskSaga.theoDoiHandleChangePostAPISaga(),
    TaskSaga.theoDoiUpdateTaskSaga(),

    //StatusSaga
    StatusSaga.theoDoiGetAllStatusSaga(),
  ])


}