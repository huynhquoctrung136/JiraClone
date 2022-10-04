import { GET_ALL_PRIORITY } from "../constants/PriorityJiraConstants"

const initialState = {
    arrPriority:[],
}

export const PriorityJiraReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_PRIORITY:{
    state.arrPriority=action.arrPriority;
    return {...state}
  }

  default:
    return state
  }
}
