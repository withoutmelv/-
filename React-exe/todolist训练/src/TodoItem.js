import React,{Component} from 'react';

class TodoItem extends Component{
    constructor(props){
        super(props);
        this.handleClick=this.handleClick.bind(this);
    }

    render(){
        console.log('child render')
        const {content}=this.props;
        return (
            <div onClick={this.handleClick} >
                {content}
            </div>
        )
    }
    handleClick(){
        const {deleteItem,index}=this.props;
        deleteItem(index);
    }

    //子组件从父组件接受参数
    //只要父组件的render函数执行，子组件的这个生命周期函数就会执行
    //子组件第一次存在父组件中不执行
    //子组件之前存在于父组件之中，会执行
    componentWillReceiveProps(){
        console.log('child componentWillReceiveProps');
    }

    //组件即将被移除之前执行
    componentWillUnmount(){
        console.log('child componentWillUnmount');
    }


}

export default TodoItem;