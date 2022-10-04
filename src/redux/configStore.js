import {applyMiddleware, combineReducers, createStore} from 'redux';
import reduxThunk from 'redux-thunk'
import {LoadingReducer} from "./reducers/LoadingReducer"

//middleware saga
import createMiddleWareSaga from 'redux-saga';
import { rootSaga } from './saga/rootSaga';
import { UserJiraReducer } from './reducers/UserJiraReducer';
import { ProjectCategoryReducer } from './reducers/ProjectCategoryReducer';
import { ProjectJiraReducer } from './reducers/ProjectJiraReducer';
import { DrawerReducer } from './reducers/DrawerJiraHOCReducer';
import { PriorityJiraReducer } from './reducers/PriorityJiraReducer';
import { TaskTypeJiraReducer } from './reducers/TaskTypeJiraReducer';
import { StatusJiraReducer } from './reducers/StatusJiraReducer';
import { TaskReducer } from './reducers/TaskReducer';

const middleWareSaga = createMiddleWareSaga();
const rootReducer = combineReducers({
    //reducer khai báo tại đây
    LoadingReducer,
    UserJiraReducer,
    ProjectCategoryReducer,
    ProjectJiraReducer,
    DrawerReducer,
    PriorityJiraReducer,
    TaskTypeJiraReducer,
    StatusJiraReducer,
    TaskReducer
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk,middleWareSaga));

//Gọi saga
middleWareSaga.run(rootSaga);


export default store;