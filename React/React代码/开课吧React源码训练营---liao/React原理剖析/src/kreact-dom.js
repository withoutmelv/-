import {initVNode} from './kvdom';
function render(vnode,container){
    //1.将vnode变成真实DOM
    let node=initVNode(vnode);
    //2.将DOM插入到container之中
    container.appendChild(node);
    // container.innerHTML=`<pre>${JSON.stringify(vnode,null,2)}</pre>`
    
}

export default {render}