const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');
const level = document.querySelector('.level');
const level1 = document.querySelector('.level1');
const level2 = document.querySelector('.level2');
const level3 = document.querySelector('.level3');
const btn = document.querySelector('.btn');



let keys = {ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false };

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
    keys[e.key] = true;
    e.preventDefault();
}

function keyUp(e) {
    keys[e.key] = false;
    e.preventDefault();
}

player = {speed:1, score:0};

level1.addEventListener('click', beginner);
level2.addEventListener('click', advance);
level3.addEventListener('click', pro);

function isCollide(a,b){
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top > bRect.bottom) || (aRect.bottom < bRect.top) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveLines() {
    let roadLines = document.querySelectorAll('.lines');
  
    roadLines.forEach(function(item){
        if(item.y >= 700) {
            item.y -= 705;
        }
        item.y += player.speed;
        item.style.top = item.y + "px";
    });
} 

function endGame() {
    player.start = false;
    
    startScreen.classList.remove('hide');
    btn.classList.remove('hide');

    startScreen.innerText = `Game Over
     Your Final score is ${player.score+1} 
     Choose your level to restart game`
}

function moveEnemy(car) {
    let enemyCars = document.querySelectorAll('.enemyCars');
  
    enemyCars.forEach(function(item){

        if (isCollide(car, item)) {
            endGame();
        }
        if(item.y >= 680) {
            item.y -= 705;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }

        item.y += player.speed;
        item.style.top = item.y + "px";
    });
}     

function gamePlay() {
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();

    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y > (road.top + 80)){
            player.y -= player.speed;
        } 
        if(keys.ArrowDown && player.y < (road.height - 80)){
            player.y += player.speed;
        }
        if(keys.ArrowRight && player.x < (road.width-67)){
            player.x += player.speed;
        }
        if(keys.ArrowLeft && player.x > 0){
            player.x -= player.speed;
        }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
    
        window.requestAnimationFrame(gamePlay);

        player.score++;
        score.innerText = `Score: ${player.score}`;
        console.log(player.score);
    }
    
}

function beginner () {
player = {speed:5, score:0};
level.innerText = "Beginner";
start();
}
function advance () {
    player = {speed:10, score:0};
    level.innerText = "Advance";
    start();
}
function pro () {
    player = {speed:15, score:0};
    level.innerText = "Pro";
    start();
}

function start() {
    startScreen.classList.add('hide');
    btn.classList.add('hide');

    gameArea.innerHTML = "";
   
    window.requestAnimationFrame(gamePlay);

    player.start = true;
    player.score = 0;

    for(i = 0; i<5; i++){
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'lines');
        gameArea.appendChild(roadLines);
        roadLines.y = i*140;
        roadLines.style.top = roadLines.y + "px";
    }
    
    for(i = 0; i<3; i++){
        let enemyCars = document.createElement('div');
        enemyCars.setAttribute('class', 'enemyCars');
        gameArea.appendChild(enemyCars);
        enemyCars.style.left = Math.floor(Math.random()*350)+"px";
        enemyCars.y = i*250;
        enemyCars.style.top = i*165 +"px";
        enemyCars.style.backgroundColor = randomColor();
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    gameArea.appendChild(car);


    player.x = car.offsetLeft;
    player.y = car.offsetTop;   
}

function randomColor() {
    function c() {
        let hex = Math.floor(Math.random()*256).toString(16);
        return("0"+String(hex)).substr(-2);
    }
    return "#"+c()+c()+c();
}