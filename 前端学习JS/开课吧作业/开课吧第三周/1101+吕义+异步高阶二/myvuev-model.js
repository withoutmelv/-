class Vue{
    constructor(opts){
        this.$opts=opts;
        this.$data=opts.data;
        this.observer(this.$data)
        this.compile();
    }
    observer(data){
        //数据劫持
        let keys=Object.keys(data);
        keys.forEach(key=>{
            //生成管理器
            let dep=new Dep();
            let val=data[key];//在defineProperty之前获取data[key]的值
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    //不能直接return data[key]
                    //data[key]-->get--->data[key]
                    //死循环
                    console.log('get...')
                    //收集watcher
                    if(Dep.target){
                        dep.addSub(Dep.target);
                    } 
                    return val;
                },
                set(newVal){
                    console.log('set...');
                    //触发notify--->触发watcher里的update
                    //--->update-->cb-->视图更新
                    dep.notify(newVal);
                    val=newVal;
                    return
                }
            })
        })
    }

    compile(){
        let ele=document.querySelector(this.$opts.el);
        // console.log(ele);
        this.compileNodes(ele);
        // console.log(111);
    }

    compileNodes(ele){
        let childNodes=ele.childNodes;
        [...childNodes].forEach(node=>{
            // console.log(node.nodeType);
            //查找大胡子语法
            //nodeType===3文本节点
            if(node.nodeType===3){
                // console.log("文本",node.textContent);
                //查找大胡子语法,正则表达式
                let reg=/\{\{\s*([a-z]+)\s*\}\}/g;
                if(reg.test(node.textContent)){
                    let $1=RegExp.$1;//第一个捕获组
                    let newVal=this.$data[$1];//新数据
                    let res=node.textContent.replace(reg,newVal);
                    node.textContent=res;
                    
                    //实例化watcher
                    new Watcher(this.$data,$1,(newVal)=>{
                        // console.log('更新视图');
                        let oldValue=this.$data[$1];
                        let reg=new RegExp(oldValue);
                        let res=node.textContent.replace(reg,newVal);
                        node.textContent=res;
                    });
                    
                }

                
            }

            //nodeType===1元素节点
            if(node.nodeType===1){
                // console.log("元素");
                let attrs=node.attributes;
                [...attrs].forEach(attr=>{
                    let attrName=attr.name;
                    let attrValue=attr.value;
                    //v-model
                    if(attrName==='v-model'){
                        node.value=this.$data[attrValue];
                        node.addEventListener('input',e=>{
                            //set 自动响应，触发视图更新
                            this.$data[attrValue]=e.target.value;
                        })
                    }

                    //v-html
                    if(attrName==='v-html'){
                        node.innerHTML=this.$data[attrValue];
                    }

                    //v-text
                    if(attrName==='v-text'){
                        node.innerText=this.$data[attrValue];
                    }
                })
                
                if(node.childNodes.length>0){
                    this.compileNodes(node);
                } 
            }
        })
    }
}

//管理器
class Dep{
    constructor(){
        this.subs=[];
    }

    addSub(sub){
        this.subs.push(sub);
    }

    notify(newVal){
        this.subs.forEach(sub=>{
            sub.update(newVal);
        });
    }
}

class Watcher{
    constructor(data,key,cb){
        Dep.target=this;
        data[key];//触发get收集watcher
        this.cb=cb;
        Dep.target=null;
    }
    update(newVal){
        this.cb(newVal);
    }
}