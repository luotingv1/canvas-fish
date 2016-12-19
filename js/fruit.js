var fruitObj=function(){
    this.alive=[];//果实的存在方式
    this.orange=new Image();
    this.blue=new Image();
    this.x=[];
    this.y=[];
    this.aneNum=[];
    this.spd=[];//生长速度和上浮的速度
    this.l=[];//果实大小到图片默认大小为止
    this.fruitType=[];
};
fruitObj.prototype.num=30;//默认30个果实 可以设置难度
fruitObj.prototype.init=function(){//初始化操作
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;//默认未出生
        this.x[i]=0;
        this.y[i]=0;
        this.aneNum[i]=0;
        this.l[i]=0;//默认大小
        this.spd[i]=Math.random()*0.017+0.003;//速度在0.003-0.02
        this.fruitType[i]="";
    }
    this.orange.src="src/fruit.png";
    this.blue.src="src/blue.png";
};

fruitObj.prototype.draw= function () {
    for(var i=0;i<this.num;i++) {
        //出生 长大 上浮
        if (this.alive[i]) {
            if(this.fruitType[i]=="blue"){
                var pic=this.blue;
            }else{
                var pic=this.orange;
            };
            if (this.l[i] <= 14)
            {//果实生长
                var Num=this.aneNum[i];
                this.x[i]=ane.headx[Num];
                this.y[i]=ane.heady[Num];
                this.l[i] += this.spd[i] * deltaTime;
            }
            else
            {this.y[i] -= this.spd[i] * 7 * deltaTime;}
            ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
            if (this.y[i] < 10)
            {this.alive[i] = false;}
        }
    }
};
fruitObj.prototype.born=function(i){
    this.aneNum[i]=Math.floor(Math.random()*ane.num);//海葵的id
    this.l[i]=0;
    this.alive[i]=true;//出生的状态变化
    var ran=Math.random();
    if(ran<0.2){//orange,blue
        this.fruitType[i]="blue";
    }else{
        this.fruitType[i]="orange";
    }

};
fruitObj.prototype.dead=function(i){
   this.alive[i]=false;
}
function fruitMonitor(){//监听果实存在数量
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i])
            num++;
    }//监听存在数量
    if(num<15){//数量少于15 发射果实
        sendFruit();
    }
}
function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){//如果不存在
            fruit.born(i);
            return;
        }
    }
}
