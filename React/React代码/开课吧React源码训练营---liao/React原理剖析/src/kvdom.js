//vnode==>dom
//diff

//给虚拟DOM加上一层vtype标识
export function createVNode(vtype,type,props){
    const vnode={vtype,type,props};
    return vnode;
}

//将 vnode=》DOM
export function initVNode(vnode){
    const {vtype}=vnode;
    if(!vtype){
        return document.createTextNode(vnode);
    }
    if(vtype===1){
        return createNormalElement(vnode);
    }else if(vtype===2){
        return createClassElement(vnode);
    }else if(vtype===3){
        return createFuncElement(vnode);
    }
    
}

//原生标签 将vnode=》DOM
function createNormalElement(vnode){
    //根据type创建元素
    const{type,props}=vnode;
    let node=document.createElement(type);

    //处理属性,不能把children放到真实节点的属性上
    // Object.keys(props).filter(k=>k!=='children').forEach(item=>{
    //     node[item]=props[item]
    // })
    const {key,children,...rest}=props;
    Object.keys(rest).forEach(k=>{
        //处理特别属性名 className,htmlFor(jsx里面的关键字和属性名重复)
        if(k==='className'){
            node.setAttribute('class',rest[k]);
        }else if(k==='htmlFor'){
            node.setAttribute('for',rest[k]);
        }else if(k==='style'&&typeof rest[k]==='object'){
            // console.log(rest[k])
            const style=Object.keys(rest[k]).map(s=>{
                return `${s}:${rest[k][s]}`
            }).join(';')
            node.setAttribute('style',style);
        }else if(k.startsWith('on')){
            const event=k.toLowerCase();
            //onClick===>onclick
            console.log(rest[k]);
            node[event]=rest[k];

            //使用addEventListener
            // const event=k.slice(2).toLowerCase();
            // console.log(event);
            // node.addEventListener(event,rest[k]);
        }
        else {
            node.setAttribute(k,rest[k]);
        }
    })


    // 递归子元素
    children.forEach(child=>{
        let Nnode=initVNode(child);
        node.appendChild(Nnode);
    })
    return node;
}

//类组件 将vnode=》DOM
function createClassElement(vnode){
    let {type,props}=vnode;
    //type是构造函数
    let instance=new type(props);
    let vvnode=instance.render();
    return initVNode(vvnode);
}

//函数组件 将vnode=》DOM
function createFuncElement(vnode){
    let {type,props}=vnode;
    //type是普通的函数
    let vvnode=type(props);
    return initVNode(vvnode);
}