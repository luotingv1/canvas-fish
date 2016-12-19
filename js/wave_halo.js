var waveObj=function () {
  this.x=[];
  this.y=[];
  this.alive=[];
  this.r=[];
}
waveObj.prototype.num=10;//初始化有10个光圈
waveObj.prototype.init=function (){
  for(var i=0;i<this.num;i++){
    this.alive[i]=false;
    this.r[i]=0;
  }
}
waveObj.prototype.draw=function() {
  ctx1.save();
  ctx1.lineWidth=2;
  ctx1.shadowBlur=10;
  ctx1.shadowColor="white";
  for(var i=0;i<this.num;i++){
      if(this.alive[i]){//如果born那就draw
          this.r[i]+=deltaTime*0.1;
          if(this.r[i]>50){
            this.alive[i]=false;
            break;
          }
          var alpha=1-this.r[i]/50;
          ctx1.beginPath();
          ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
          ctx1.closePath();
          ctx1.strokeStyle="rgba(255,255,255,"+alpha+")";
          ctx1.stroke();
      }
  }
  ctx1.restore();
}
waveObj.prototype.born=function (x,y) {
  for(var i=0;i<this.num;i++){
      if(!this.alive[i]){
        this.alive[i]=true;
        this.r[i]=20;
        this.x[i]=x;
        this.y[i]=y;
          //born
          return;
      }
  }
}
/**************************************************************/
var haloObj=function(){
  this.x=[];
  this.y=[];
  this.alive=[];
  this.r=[];
}
haloObj.prototype.num=5;//初始化有5个波动
haloObj.prototype.init=function (){
  for(var i=0;i<this.num;i++){
    this.alive[i]=false;
    this.r[i]=0;
  }
}
haloObj.prototype.draw=function() {
  ctx1.save();
  ctx1.lineWidth=2;
  ctx1.shadowBlur=10;
  ctx1.shadowColor="raba(203,91,0,1)";
  for(var i=0;i<this.num;i++){
      if(this.alive[i]){//如果born那就draw
          this.r[i]+=deltaTime*0.05;
          if(this.r[i]>100){
            this.alive[i]=false;
            break;
          }
          var alpha=1-this.r[i]/100
          ctx1.beginPath();
          ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
          ctx1.closePath();
          ctx1.strokeStyle="rgba(203,91,0,"+alpha+")";
          ctx1.stroke();
      }
  }
  ctx1.restore();
}
haloObj.prototype.born=function (x,y) {
  for(var i=0;i<this.num;i++){
      if(!this.alive[i]){
        this.alive[i]=true;
        this.r[i]=10;
        this.x[i]=x;
        this.y[i]=y;
          //born
          return;
      }
  }
}
