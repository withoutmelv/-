// import React from "react";
// import ReactDOM from "react-dom";
import React, { Component } from "./kreact";
import ReactDOM from "./kreact-dom";

function Comp(props) {
  return <h2>hi {props.name}</h2>;
}

class Comp2 extends Component{
  render(){
    return (
      <div>
        <h2>hi {this.props.name}</h2>
      </div>
    )
  }
}



const jsx=(
  <div id="test" key='a' onClick={()=>{alert('click')}} style={{color:'red',border:'1px solid red'}}>
    <span>hello world</span>
    <Comp name="这是函数组件"/>
    <Comp2 name="这是类组件" />
  </div>
)

console.log(jsx);

ReactDOM.render(jsx, document.querySelector("#root"));
