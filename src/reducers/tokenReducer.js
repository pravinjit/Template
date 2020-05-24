import { SET_TOKEN, CLEAR_TOKEN } from "../config";

export default (state = {}, action) =>{
  switch (action.type) {
    case SET_TOKEN:
      return action.data;
    case CLEAR_TOKEN:
      return "";
    default:
      return state
  }
}