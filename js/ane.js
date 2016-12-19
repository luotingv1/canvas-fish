/**
 * Created by uid on 2016/12/7.
 */
var aneObj=function(){
  //start point ,control point ,end point(sin)
    this.rootx=[];
    this.headx=[];//当前x值
    this.heady=[];
    this.alpha=0;//摆动角度
    this.amp=[];//摆动幅度
};
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.rootx[i]=i*16+Math.random()*20;//[0,1]
        this.headx[i]=this.rootx[i];
        this.heady[i]=canHeight-230+Math.random()*50;
        this.amp[i]=Math.random()*50+50;
    }
    //console.log(2)
};
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha)//[-1,1]
    ctx2.save();//保存样式
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        //开始绘制 beginpath
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canHeight);
        this.headx[i]=this.rootx[i]+l*this.amp[i];
        ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};
/***********************************************************************/
var dustObj=function(){
  this.x=[];
  this.y=[];
  this.amp=[];
  this.Num=[];
  this.alpha;
}
dustObj.prototype.num=30;
dustObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
      this.x[i]=Math.random()*canWidth;
      this.y[i]=Math.random()*canHeight;
      this.amp[i]=30+Math.random()*25;
      this.Num[i]=Math.floor(Math.random()*7);//[0,7)
    }
    this.alpha=0;
}
dustObj.prototype.draw=function(){
   this.alpha+=deltaTime*0.0008;
   var l=Math.sin(this.alpha);
    for(var i=0;i<this.num;i++){
      var Num=this.Num[i];
      ctx1.drawImage(dustPic[Num],this.x[i]+this.amp[i]*l,this.y[i]);
    }
}
