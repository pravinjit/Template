import { ADD_TODO } from "../config"

export default (value) => async dispatch =>{
    dispatch({
        type: ADD_TODO,
        data: value
    })
}