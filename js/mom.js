
var momObj=function(){
    this.x;
    this.y;
    //尾巴的动画
    this.momTailTimer=0;
    this.momTailCount=0;
    //眨眼睛
    this.momEyeTimer=0;
    this.momEyeCount=0;
    this.momEyeInterval=1000;//图片持续的时间
    //鱼身体变化
    this.momBodyCount=0;

};
momObj.prototype.init= function () {
    this.x=canWidth*0.5;
    this.y=canHeight*0.5;
    this.angle=0;
};
momObj.prototype.draw= function () {
    //计算大鱼坐标接近于鼠标位置 系数设置0.9
    this.x=lerpDistance(mx,this.x,0.9);
    this.y=lerpDistance(my,this.y,0.9);
    //计算旋转角度
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-PI PI
   //计算角度接近于坐标角度
    this.angle=lerpAngle(beta,this.angle,0.6);
    //摆尾动画
    this.momTailTimer+=deltaTime;
    if( this.momTailTimer>50){
        this.momTailCount=( this.momTailCount+1)%8;//到8从头
        this.momTailTimer%=50;
    }
    //眨眼动画
    this.momEyeTimer += deltaTime;
    if(this.momEyeTimer>this.momEyeInterval){
        this.momEyeCount = (this.momEyeCount+1)%2;//0到1循环
        this.momEyeTimer %= this.momEyeInterval;
        //设置眼睛状态保持时间
        if(this.momEyeCount == 0){
            this.momEyeInterval=Math.random()*1500+2000;//[2000,3500)
        }else{
            this.momEyeInterval=200;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    var momBodyCount=this.momBodyCount;
    if(data.double==1)//判断果实颜色
    {
        ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
    }else{
        ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);

    }

    var momEyeCount=this.momEyeCount;
    ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);

    var momTailCount=this.momTailCount;
    ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
    ctx1.restore()

};
