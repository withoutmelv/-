import React,{Component} from 'react';
import 'antd/dist/antd.css';

import store from './store';
//import {CHANGE_INPUT_VALUE,LIST_VALUE,ITEM_DELETE} from './store/actionTypes';
import {todoList,changeInputValueAction,handleBtnClickAction,handleItemDeleteAction} from './store/actionCreators';
import TodoListUI from './TodoListUI';


class App extends Component{

  constructor(props){
    super(props);
    this.state=store.getState();
    this.handleInputchange=this.handleInputChange.bind(this);
    this.handleStoreChange=this.handleStoreChange.bind(this);
    this.handleBtnCilck=this.handleBtnCilck.bind(this);
    this.handleItemDelete=this.handleItemDelete.bind(this);
    store.subscribe(this.handleStoreChange);
  }

  render(){
  
    return (
      <TodoListUI
        handleInputChange={this.handleInputChange}
        inputValue={this.state.inputValue}
        handleBtnCilck={this.handleBtnCilck}
        list={this.state.list}
        handleItemDelete={this.handleItemDelete}
        
      />
    ) 
  }

  componentDidMount(){
    const action=todoList();
    store.dispatch(action);
  }


  handleInputChange(e){
    const action=changeInputValueAction(e.target.value);
    store.dispatch(action);
  }

  handleStoreChange(){
    this.setState(store.getState());
  }

  handleBtnCilck(){
    const action=handleBtnClickAction();
    store.dispatch(action);
  }

  handleItemDelete(index){
    const action=handleItemDeleteAction(index);
    store.dispatch(action);
  }

}

export default App;
