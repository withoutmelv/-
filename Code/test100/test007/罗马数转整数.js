/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
     var str=s.split("");
     var num=0;
     var rem=[{key:"M",val:1000},
            {key:"D",val:500},
            {key:"C",val:100},
            {key:"L",val:50},
            {key:"X",val:10},
            {key:"V",val:5},
            {key:"I",val:1}];
    for(let j=0;j<str.length;j++){
    	var count=100;
        for(let i=0;i<rem.length;i++){
            if(j!=str.length-1){
               if(str[j+1]==rem[i].key){
                    count=i;
                }

                if(str[j]=="I"||str[j]=="X"||str[j]=="C"){
                    if(str[j]==rem[i].key){
                        if(count<i){
                            var value=rem[count].val-rem[i].val;
                            num+=value;
                            j++;
                        }
                    }
                }

                if(str[j]==rem[i].key){
                    num+=rem[i].val;
                }
            }else{
                if(str[j]==rem[i].key){
                    num+=rem[i].val;
                }
            }   
        }
    }
    return num;
};

romanToInt("CXC");