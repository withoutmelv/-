class Vue extends EventTarget{
    constructor(opts){
        super();
        this.$opts=opts;
        this.$data=opts.data;
        this.observer(this.$data)
        this.compile();
    }
    observer(data){
        //数据劫持
        let keys=Object.keys(data);
        keys.forEach(key=>{
            let that=this;
            let val=data[key];//在defineProperty之前获取data[key]的值
            Object.defineProperty(data,key,{
                configurable:true,
                enumerable:true,
                get(){
                    //不能直接return data[key]
                    //data[key]-->get--->data[key]
                    //死循环
                    console.log('get...')
                    console.log(":",val);
                    return val;
                },
                set(newVal){
                    console.log('set...');
                    //注册编译事件
                    that.dispatchEvent(new CustomEvent(key,{
                        detail:newVal
                    }));
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
        console.log(111);
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
                    //监听编译事件
                    this.addEventListener($1,e=>{
                        let newVal=e.detail;
                        let oldValue=this.$data[$1]
                        let reg=new RegExp(oldValue)
                        let res=node.textContent.replace(reg,newVal);
                        node.textContent=res;
                    })
                }

                
            }

            //nodeType===1元素节点
            if(node.nodeType===1){
                // console.log("元素");
                if(node.childNodes.length>0){
                    this.compileNodes(node);
                } 
            }
        })
    }
}