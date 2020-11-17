import {CHANGE_INPUT_VALUE,LIST_VALUE,ITEM_DELETE,INIT_LIST} from './actionTypes'


const defaultState={
    inputValue:'',
    list:["Hello","Sill"],
    data:['1','2','3','4']
}

//reducer 可以接收state,但是绝不能修改state
export default (state=defaultState,action)=>{
    if(action.type===CHANGE_INPUT_VALUE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.inputValue=action.value;
        return newState;
    }else if(action.type===LIST_VALUE){
        const newState=JSON.parse(JSON.stringify(state));
        newState.list.push(newState.inputValue);
        newState.inputValue='';
        return newState;
    }else if(action.type===ITEM_DELETE){
        const newState=JSON.parse(JSON.stringify(state));
        console.log(action.index);
        newState.list.splice(action.index,1);
        return newState;
    }else if(action.type===INIT_LIST){
        const newState=JSON.parse(JSON.stringify(state));
        newState.list=action.data;
        return newState;
    }
    return state;
}