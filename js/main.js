
var can1;
var can2;
var ctx1;
var ctx2;

var canWidth;
var canHeight;

var lastTime;
var deltaTime;

var bgPic=new Image();

var ane;
var fruit;
var mom;
var baby;
var mx;
var my;

var babyEye=[];
var babyTail=[];
var babyBody=[];
var momEye=[];
var momTail=[];
var momBodyOra=[];
var momBodyBlue=[];
var data;
var wave;
var halo;
var dust;
var dustPic=[];

document.body.onload=game;
function game(){
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameloop();
}
function init(){
    //获得canvas context
    can1=document.getElementById("canvas1");
    //fishes,dust,ui,circle
    ctx1=can1.getContext('2d');
    can2=document.getElementById("canvas2");
    //background,ane,fruits
    ctx2=can2.getContext('2d');

    can1.addEventListener('mousemove',onMousemove,false)

    bgPic.src="src/background.jpg";
    canWidth=can1.width;
    canHeight=can1.height;

    ane=new aneObj();
    ane.init();
    fruit=new fruitObj();
    fruit.init();

    mom=new momObj();
    mom.init();

    baby=new babyObj();
    baby.init();

    mx=canWidth*0.5;
    my=canHeight*0.5;

    data=new dataObj();

    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="src/babyTail"+i+".png"
    }
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="src/babyEye"+i+".png";
    }
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="src/babyFade"+i+".png";
    }
    for(var i=0;i<8;i++){
        momTail[i]=new Image();
        momTail[i].src="src/bigTail"+i+".png"
    }
    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="src/bigEye"+i+".png";
    }
    for(var i=0;i<8;i++){
        momBodyOra[i]=new Image();
        momBodyOra[i].src="src/bigSwim"+i+".png"
        momBodyBlue[i]=new Image();
        momBodyBlue[i].src="src/bigSwimBlue"+i+".png"
    }
    //设置分数的样式
    ctx1.font="30px Verdana";
    ctx1.textAlign="center";
    //碰撞特效
    wave=new waveObj();
    wave.init();
    halo=new haloObj();
    halo.init();

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="src/dust"+i+".png"
    }

    dust=new dustObj();
    dust.init();
}
function gameloop(){
    window.requestAnimationFrame(gameloop);//相当于setInterval只能计算帧数
    var now=Date.now();//当前时间
    deltaTime=now-lastTime;//间隔时间
    lastTime=now;
    if(deltaTime>40){
        deltaTime=40;
    }
    (function drawBackground(){
        ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
    })();//绘制背景

    ane.draw();//绘制海葵
    fruitMonitor();
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight)
    mom.draw();
    momFruitsCollision();//吃果实
    baby.draw();
    momBabyCollision();//喂食
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}
function onMousemove(e){
  if(!data.gameover){
    if(e.offsetX|| e.layerX){
        mx= e.offsetX==undefined? e.layerX: e.offsetX;
        my= e.offsetY==undefined? e.layerY: e.offsetY;
    }
  }
}
