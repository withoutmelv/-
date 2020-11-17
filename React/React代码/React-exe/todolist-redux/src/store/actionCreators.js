import {INIT_LIST,CHANGE_INPUT_VALUE,LIST_VALUE,ITEM_DELETE} from './actionTypes';
import axios from 'axios';
export const changeInputValueAction=(value)=>({
    type:CHANGE_INPUT_VALUE,
    value
});

export const handleBtnClickAction=()=>({
    type:LIST_VALUE
});

export const handleItemDeleteAction=(index)=>({
    type:ITEM_DELETE,
    index
});

export const initListAction=(data)=>({
    type:INIT_LIST,
    data
});

export const todoList=()=>{
    return (dispatch)=>{
        axios.get('/list.json').then((res)=>{
            var data=res.data;
            const action=initListAction(data);
            dispatch(action);
        })
    }
    
}