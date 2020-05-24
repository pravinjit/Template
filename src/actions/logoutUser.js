import { CLEAR_USER, CLEAR_TOKEN } from '../config';

export default () => async dispatch => {
  dispatch({ 
    type: CLEAR_USER 
  });
  
  dispatch({ 
    type: CLEAR_TOKEN 
  });
}