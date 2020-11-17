import {createVNode} from './kvdom';

function createElement(type,props,...children){
    console.log(type)
    delete props.__source;
    delete props.__self;
    props.children=children;
    /**
     * vtype:
     * 1. 原生标签
     * 2. class
     * 3. function
     * 
     */
    let vtype;
    if(typeof type=== 'string'){
        vtype=1;
    }else if(typeof type==='function'){
        if(type.isClassComponent){
            //类组件
            vtype=2;
        }else{
            //函数组件
            vtype=3;
        }
    }

    return createVNode(vtype,type,props);
}

export default {createElement};

export class Component{
    static isClassComponent=true;
    constructor(props){
        this.props=props;
        this.state={};
    }
    setState(){

    }
}