import { SET_USER, CLEAR_USER, BAN_USER,SET_USER_LOGIN, SET_USER_LOGOUT } from '../config';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.data;
    case CLEAR_USER:
      return {};
    case BAN_USER:
      return {
        ...state,
        banned: true
      };
    case SET_USER_LOGIN:
      return {
        ...action.data,
        loggedIn: true
      }
    case SET_USER_LOGOUT:
      return {}
    default:
      return state;
  }
}