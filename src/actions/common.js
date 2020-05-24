import jwt from 'jsonwebtoken'
import { 
  SALT_KEY, 
  SET_USER_LOGOUT
} from '../config'

export const verifyToken = token => async dispatch => {
  try {
    let decoded = jwt.verify(token, SALT_KEY)
    if (decoded.exp < Date.now() / 1000) {
      dispatch({ type: SET_USER_LOGOUT })
    }
  } catch (e) {
    dispatch({ type: SET_USER_LOGOUT })
  }
}
