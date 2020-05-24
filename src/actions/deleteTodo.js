import { DELETE_TODO } from "../config";

export default (value) => async dispatch =>{
    dispatch({
        type: DELETE_TODO,
        data:value
    })
}