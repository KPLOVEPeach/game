var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var w = canvas.width;
var h = canvas.height;
var id = setInterval(draw,10);

var time1 = 31;
var count1 = 0;

var time2 = 13;
var count2 = 0;

var player = new Image();
player.src ="image/player.png";
var playerX = w / 2;
var playerY = h / 2;

var enemy1 = new Image();
var enemy2 = new Image();
var enemy3 = new Image();
enemy1.src = "image/enemy1.png";
enemy2.src = "image/enemy2.png";
enemy3.src = "image/enemy3.png";
var enemy = [enemy1, enemy2, enemy3];
var enemyX = [0, w / 2 - 50, w - 100];
var enemyY = [h / 2 - 50, 0, h / 2 - 50];
var enemyInitialX = [0,w / 2 - 50, w - 100];
var enemyInitialY = [h / 2 - 50, 0, h / 2 - 50];

var item1 = new Image();
var item2 = new Image();
var item3 = new Image();
item1.src = "image/item1.png";
item2.src = "image/item2.png";
item3.src = "image/item3.png";
var item = [item1, item2, item3];
var itemX = [0,0,0];
var itemY = [0,0,0];

function draw(){
    ctx.fillStyle = "#FAEFD4";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#662E1C";
    ctx.fillRect(0, 0, w / 2 - 50, 100);
    ctx.fillRect(w / 2 + 50, 0, w / 2 - 50, 100);
    ctx.fillRect(0, 0, 100, h / 2 - 50);
    ctx.fillRect(0, h / 2 + 50, 100, h / 2 - 50); 
    ctx.fillRect(w - 100, 0, 100, h / 2 - 50);
    ctx.fillRect(w - 100, h / 2 + 50, 100, h / 2 - 50);

    if(count1 % 100 == 0){
        time1 -= 1;
    }

    if(count2 % 100 == 0){
        time2 -= 1;
       if(time2 === 0){
         time2 = 12;  
       }
    }

    if(time1 === 6){
        time2 = 6;
    }

    if(time1 === 0){
        time2 = 0;
    }

    ctx.font = "30px 'MS ゴシック'";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("残り時間:" + time1, 50, 50);
    ctx.drawImage(player,playerX,playerY,100,100);

    ctx.font = "30px 'ＭＳ ゴシック'";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText("鬼開放まで:" + time2, 1150, 50);

    for(var i = 0; i < 3; i ++){
        ctx.drawImage(enemy[i], enemyX[i], enemyY[i], 100, 100);
        
        if(i > Math.floor((30 - time1) / 12)){
            continue;
        }
    
        var tilt = (playerY - enemyY[i]) / (playerX - enemyX[i]);
        var x = Math.sqrt(1 / (1 + tilt * tilt));
        if(playerX > enemyX[i]){
            enemyX[i] += x;
            enemyY[i] += tilt * x;
        }
        else{
            enemyX[i] -= x;
            enemyY[i] -= tilt * x;
        }

        if(enemyY[i] > playerY - 55 && enemyY[i] < playerY + 55 &&
            enemyX[i] > playerX - 55 && enemyX[i] < playerX + 55){
            ctx.font = "50px 'MS ゴシック'";
            ctx.fillStyle = "#EA5549";
            ctx.fillText("GAME OVER...",w / 2 - 150,h / 2);
            clearInterval(id);
        }
    }

    for(var i = 0; i < 3; i ++){
        ctx.drawImage(item[i], itemX[i], itemY[i], 50, 50)
        if(count1 % 500 == 0){
            itemX[i] = Math.random()*(w - 300) + 100;
            itemY[i] = Math.random()*(h - 200) + 100;
        }
        if(itemY[i] > playerY - 40 && itemY[i] < playerY + 75 &&
           itemX[i] > playerX - 40 && itemX[i] < playerX + 75){
           enemyX[i] = enemyInitialX[i];
           enemyY[i] = enemyInitialY[i];
           itemX[i] = - 100;
           itemY[i] = - 100;    
        }
    }
    if(time1 == 0){
       ctx.font = "50px 'MSゴシック'";
       ctx.fillStyle = "#333333";
       ctx.fillText("GAME CLEAR!",w / 2 - 150, h / 2); 
       clearInterval(id);
    }
    count1 += 1;

    count2 += 1;
}

document.onkeydown = keydown;
function keydown(e){
    if(e.which == 37 && playerX > 100){
        playerX -= 20;
    }
    else if(e.which ==38 && playerY > 100){
        playerY -= 20;
    }
    else if(e.which ==39 && playerX < w - 200){
        playerX += 20;   
    }
    else if(e.which == 40 && playerY < h - 100){
        playerY += 20;
    }
}

