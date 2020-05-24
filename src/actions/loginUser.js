import { SET_ALERT, CLEAR_ALERT, SET_USER } from '../config';

export default (loginState, pervReg) => async dispatch => {
  dispatch({ type: CLEAR_ALERT });

  /* Check if User exists */
  let user = pervReg.filter(v => v.email === loginState.email && v.phone === loginState.phone);
  if (user.length === 0) {
    dispatch({ 
      type: SET_ALERT,
      data: { type: 'danger', msg: 'User does not exist..!! Kindly register.' }
    });
    return false;
  }
  console.log(user);

  dispatch({ 
      type: SET_USER,
      data: user[0]
  });
  
  dispatch({ 
    type: SET_ALERT,
    data: { type: 'success', msg: 'Successfully Logged In.' }
  });
}