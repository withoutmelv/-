import React from 'react';
import {Input,Button,List} from 'antd';

//无状态组件，性能高，就是一个函数，而不是一个带有各种生命周期函数的类
//当一个class只有render函数时，就可以转换成无状态组件
const TodoListUI=(props)=>{
    return(
        <div>
            <div>
            <Input placeholder="todo list" style={{width:'300px',marginRight:'10px'}} 
                onChange={props.handleInputChange}
                value={props.inputValue}
                />
            <Button type="primary" onClick={props.handleBtnCilck}>提交</Button>
            </div>
            <List
            style={{width:'300px',marginTop:'20px'}}
            bordered
            dataSource={props.list}
            renderItem={(item,index)=>
                (
                    <List.Item 
                        onClick={()=>{props.handleItemDelete(index)}}>
                        {item}
                    </List.Item>
                )
            }
            />
        </div>
    )
}

// class TodoListUI extends Component{
//     render(){
//         return(
//             <div>
//                 <div>
//                 <Input placeholder="todo list" style={{width:'300px',marginRight:'10px'}} 
//                     onChange={this.props.handleInputChange}
//                     value={this.props.inputValue}
//                     />
//                 <Button type="primary" onClick={this.props.handleBtnCilck}>提交</Button>
//                 </div>
//                 <List
//                 style={{width:'300px',marginTop:'20px'}}
//                 bordered
//                 dataSource={this.props.list}
//                 renderItem={(item,index)=>
//                     (
//                         <List.Item 
//                             onClick={()=>{this.props.handleItemDelete(index)}}>
//                             {item}
//                         </List.Item>
//                     )
//                 }
//                 />
//             </div>
//         )
        
//     }
// }

export default TodoListUI;