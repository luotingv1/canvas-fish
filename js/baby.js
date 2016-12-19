
var babyObj=function(){
    this.x;
    this.y;
    //尾巴的动画
    this.babyTailTimer=0;
    this.babyTailCount=0;
    //眨眼睛
    this.babyEyeTimer=0;
    this.babyEyeCount=0;
    this.babyEyeInterval=1000;//图片持续的时间
    //身体变透明
    this.babyBodyTimer=0;
    this.babyBodyCount=0;
};
babyObj.prototype.init= function () {
    this.x=canWidth*0.5-50;
    this.y=canHeight*0.5+50;
    this.angle=0;
};
babyObj.prototype.draw= function () {
    //计算小鱼坐标接近于大鱼尾部 系数设置0.98
    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.98);
    //计算旋转角度
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;//-PI PI
    //计算角度接近于坐标角度
    this.angle=lerpAngle(beta,this.angle,0.6);
    //摆尾动画
    this.babyTailTimer+=deltaTime;
    if( this.babyTailTimer>50){
        this.babyTailCount=( this.babyTailCount+1)%8;//到8从头
        this.babyTailTimer%=50;
    }

    //眨眼动画
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer>this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount+1)%2;//0到1循环
        this.babyEyeTimer %= this.babyEyeInterval;
        //设置眼睛状态保持时间
        if(this.babyEyeCount == 0){
            this.babyEyeInterval=Math.random()*1500+2000;//[2000,3500)
        }else{
            this.babyEyeInterval=200;
        }
    }
    //身体透明
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer>300){
        this.babyBodyCount = this.babyBodyCount+1;
        this.babyBodyTimer %=300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount=19;
            //game over
            data.gameover=true;
        }
    }
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var babyTailCount=this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+23,-babyTail[babyTailCount].height*0.5);
    var babyBodyCount=this.babyBodyCount;
    ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
    var babyEyeCount=this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
    ctx1.restore()
};
