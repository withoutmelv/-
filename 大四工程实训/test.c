
int main(int argc,char* argv[])
{
	isOddEven(num);
	judge(c);
	sumOfOdd();
	judgeNumber(int a,int b,int c);
	orderNum(int a,int b,int c);
	sumOfNum();
	PlusNum();
	plus();
	suNum(int m);
	shuixianhua();
	circle(double a);
	div(int b);
	qiugen(int a,innt b,int c);
	bubbleSort(int *arr,int n);
}

// 1. 用户输入一个整数，用if...else判断是偶数还是奇数? 
void isOddEven(num){
	if(num%2==0){
	 printf('This is Odd')
	}else{
	 printf('This is Even')
	}
}

//2.输入一个字母，判断是大写还是小写字母
void judge(c){
	if(c<97){
		printf('This is Max')
	}else{
		printf('This is Min')
	}
}

//3.求1~99所有奇数的和，用while语句 
void sumOfOdd(){
	int i=1;
	int sum=0;
	while(i<100){
		sum+=i;
		i+=2;
	}
	printf("1~99 the sum of Odd number is %d",sum);
}


//4.用户输入三个整数，将最大数和最小数输出?
void  judgeNumber(int a,int b,int c){
	int max=0;
	int min=0;
	if(a>b){
		max=a;
	}else{
		max=b;
	}
	if(max>c){
		printf("max is %d",max );
	}else{
		printf("max is %d",c );
	}


	if(a<b){
		min=a;
	}else{
		min=b;
	}

	if(min<c){
		printf("min is %d",min );
	}else{
		printf("min is %d",c );
	}
}

// 5.输入三个数，按从小到大的顺序排列?
void orderNum(int a,int b,int c){
	if(a>b&&b>c){
		printf("%d %d %d",c,b,a );
	}
	if(a>b&&a<c){
		printf("%d %d %d",b,a,c );
	}
	if(b>a&&a>c){
		printf("%d %d %d",c,a,b );
	}
	if(b>a&&b<c){
		printf("%d %d %d",a,b,c);
	}
	if(a>c&&b<c&&a>b){
		printf("%d %d %d",b,c,a );
	}
	if(b>c&&b>a&&a<c){
		printf("%d %d %d",a,c,b );
	}
}

//6. 将1~200末位数为5的整数求和
void sumOfNum(){
	int i=5;
	int sum=0;
	while(i<=200){
		sum+=i;
		i+=10;
	}
	printf("%d",sum );
}

// 7.计算2.5的3次方
void PlusNum(){
	double c=2.5;
	double sum=0.0;
	sum=c*c;
	sum=sum*c;
}

//8.将24的所有因子求积
void plus(){
	int sum=0;
	sum=2*4*6*3*8*12*24;
}
//9.输入一段字符判断是大写，还是小写。若是小写，转换为大写，若是大写，转换为小写
void changeMaxMin(char c){

}
 
//10.判断一个数是否为素数（质数）
void suNum(int m){
	int k=sqrt(m);
	int i;
	for(i=2;i<=k;i++){
		if(m%i==0){
			printf("%d不是素数",m );
			break;
		}
	}
	if(i>=k+1){
		printf("%d是素数",m );
	}

}

//11. 打印出所有的"水仙花数"，所谓"水仙花数"是指一个三位数，其各位数字立方和等于该数本身。
// 例如：153是一个"水仙花数"，因为153=1的三次方＋5的三次方＋3的三次方。
void shuixianhua(){
	for(int a=100;a<1000;a++){
		int z=a/100;
		int x=a/10;
		int c=a-z*100-x*10;
		if(a==z*z*z+x*x*x+c*c*c){
			printf("%d是水仙花数\n",a );
		}
	}
}

// 12.输入一个圆的直径，求它的周长和面积。 
void circle(double a){
	double s=3.14*a;
	double b=a/2;
	double c=3.14*b*b;
	printf("%s周长 %s面积",s,c );
}

//13.输入一个数，判断它是否同时被3和5整除。
void div(int b){
	if(b%3==0){
		if(b%5==0){
			printf("%d能同时被3，5整除",b );
		}
	}else{
		printf("不能整除\n");
	}
}

// 14.输入a，b，c的值。求? ax*x+bx+c=0的根。

void qiugen(int a,innt b,int c){
	int x=b*b-4*a*c;
	if(x>=0){
		double v=sqrt(x);
		double j=(-b+v)/(2*a);
		double k=(-b-v)/(2*a);
		printf("两个相同或者不同根%s %s\n",j,k );
	}else{
		printf("无解");
	}
}

// 15. 冒泡排序法。
void bubbleSort(int *arr,int n)
{
	int m,i,j;
	for(i=0;i<n-1;i++)
		for(j=0;j<n-1-i;j++)
			if(arr[j]>arr[j+1])
			{
				m=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=m;
			}
} 