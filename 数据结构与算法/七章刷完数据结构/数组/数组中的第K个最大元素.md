## 数组中的第K个最大元素

![image-20201224093456932](C:\Users\lenovo\AppData\Roaming\Typora\typora-user-images\image-20201224093456932.png)

暴力解法：利用快排排序完之后，取出第K大的元素

改进：快排每次找到pivot的时候都能得到pivot的下标位置，因为pivot的下标位置是最终排序好的位置，**所以只要某次划分的pivot为倒数第 k 个下标的时候，我们就已经找到了答案**

```js
//quickselect用来查询pivot的下标
function quickSelect(arr,left,right){
    if(left<right){
        var x=arr[right],i=left-1;temp;
        for(var j=left;j<=right;j++){
            if(arr[j]<=x){
                i++;
                temp=arr[j];
                arr[j]=arr[i];
                arr[i]=temp;
            }
        }
    }
    return i;
}

function findKthLargestHelper(nums,k){
    function findKth(nums,left,right,k){
        if(left>=right){
            return nums[left];
        }
        var index=quickSelect(nums,left,right);
        //index===nums.length-k
        if(index===nums.length-k){
            return nums[index];
        }else if(index<=nums.length-k){
            //在数组的前半段找
            return findKth(nums,index+1,right,k);
        }else{
            //到数组的后半段找
            return findKth(nums,left,index-1,k);
        }
    }
    return findKth(nums,0,nums,length-1,k);
}


```

