//判断大鱼和果实的距离
function momFruitsCollision(){
    if(!data.gameover){
      for(var i=0;i<fruit.num;i++){
          if(fruit.alive[i]){
              //计算距离 坐标差
              var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
              if(l<900){//如果小于900就吃掉 900是平方值
                  fruit.dead(i);
                  data.fruitNum++;
                  mom.momBodyCount++;//吃到的果实数量反应在身体上
                  if(mom.momBodyCount>7)
                      mom.momBodyCount=7;
                  if(fruit.fruitType[i]=="blue"){
                      data.double=2;
                  }
                  wave.born(fruit.x[i],fruit.y[i]);
              }
          }
      }
    }
}
//大鱼喂小鱼
function momBabyCollision(){
  if(data.fruitNum>0&&!data.gameover){
    var l=calLength2(mom.x,mom.y,baby.x,baby.y);
    if(l<900){
        //小鱼恢复生命
        baby.babyBodyCount-=mom.momBodyCount;//当前小鱼的生命加上果实的数量
        //吃到果实归0
        mom.momBodyCount=0;
        //加分
        data.addScore()
        //draw halo
        halo.born(baby.x,baby.y);
    }

  }

}
