import React,{Component,Fragment} from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state={
            inputValue:'',
            list:[]
        }    
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleBtnClick=this.handleBtnClick.bind(this);
        this.handleItemDelete=this.handleItemDelete.bind(this);
    }
    //在组件即将被挂载到页面上时自动执行
    componentWillMount(){
        console.log('componentwillmount');
    }

    //组件挂载到页面之后自动执行
    componentDidMount(){
        console.log('componentdidmount');
    }

    //组件更新之前会自动执行
    shouldComponentUpdate(){
        console.log('shouldcomponentupdate');
        return true;
    }

    //组件更新之前自动执行在shouldComponentUpdate之后
    componentWillUpdate(){
        console.log('componentWillUpdate');
    }

    //组件更新完成之后会自动执行
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    //componentwillReciveProps需要组件有接受props才能使用
    //componentWillUnmount组件即将被移除之前
    render(){
        console.log('Parent render');
        return (
            <Fragment>
                <div>
                    <label htmlFor="insertArea">输入内容</label>
                    <input
                        id="insertArea"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                        ref={(output)=>{this.input=output}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return (
                                <div key={index}>
                                    <TodoItem
                                        content={item}
                                        
                                        index={index}
                                        deleteItem={this.handleItemDelete}
                                    />
                                </div>
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
    }

    handleInputChange(){
        const value=this.input.value;
        this.setState(()=>({
            inputValue: value
        }))
    }

    handleBtnClick(){
        this.setState((prevState)=>({
            list:[...prevState.list,prevState.inputValue],
            inputValue:''
        }))
    }

    handleItemDelete(index){
        // this.setState((prevState)=>{
        //     const list=[...prevState.list];
        //     list.splice(index,1);
        //     return list;
        // }
        // );
        const list=[...this.state.list];
        list.splice(index,1);

        this.setState({
            list
        });
    }
    
}

export default TodoList;