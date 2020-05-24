import { EDIT_TODO } from "../config"

export default (value) => async dispatch =>{
    dispatch({
        type: EDIT_TODO,
        data: value
    })
}