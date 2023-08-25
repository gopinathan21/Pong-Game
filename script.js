const box = document.getElementById("box");
const leftPaddle = document.getElementById("leftPaddle");
const boxWidth = box.clientWidth;
const boxHeight = box.clientHeight;
const leftPaddleHeight = leftPaddle.clientHeight;
const leftPaddleWidth = leftPaddle.clientWidth;
const leftPaddleBounding = leftPaddle.getBoundingClientRect();
const score = document.getElementById('score_value');
let leftPaddleX = 0;
let increasescore = 0;

class Ball {
  constructor(parent, startSpeedY, startSpeedX) {
    this.element = document.createElement("div");
    this.element.className = "ball";
    parent.appendChild(this.element);
    this.x = 200;
    this.y = 200;
    this.speedX = startSpeedX;
    this.speedY = startSpeedY;
    this.size = 20;
    this.animate = this.animate.bind(this);
    this.lastTime = performance.now();
    this.animationFrameID = null;
  }

  animate() {
   
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX += ( 0.001)
    this.speedY += ( 0.001)
  
    if (this.x + this.size > boxWidth || this.x < 0) {
      this.speedX = -this.speedX;
    }
    if ( this.y < 0) {
      this.speedY = -this.speedY;
    }
    if(this.y + this.size > boxHeight){
        
       balls.forEach(ball =>  ball.cancelAnimation())
       this.cancelAnimation()
        alert("you lose")
        return;
    }
  
    const ballXP = this.x; 
    const ballYP = this.y + this.size;
  
    const paddleTopCollision = ballYP > boxHeight - leftPaddleHeight;
    const paddleSideCollision =
      ballXP >= leftPaddleX && ballXP <= leftPaddleX + leftPaddleWidth;
  
    if (paddleTopCollision && paddleSideCollision) {
      leftPaddle.style.backgroundColor = "green";
      this.speedY = -this.speedY;
      increasescore++
      console.log(increasescore)

      score.innerHTML = `${increasescore}`

    } else {
      leftPaddle.style.backgroundColor = "purple";
    }
  
    this.element.style.top = this.y + "px";
    this.element.style.left = this.x + "px";
 this.animationFrameID=  requestAnimationFrame(this.animate.bind(this));
  }  
  cancelAnimation(){
    cancelAnimationFrame(this.animationFrameID)
  } 
}

function onMouse(event) {
  leftPaddleX = event.clientX - leftPaddleBounding.right ; //- leftPaddle/2

  if (leftPaddleX < 0) {
    leftPaddleX = 0;
  }

  if (leftPaddleX + leftPaddleWidth > boxWidth) {
    leftPaddleX = boxWidth;
  }

  leftPaddle.style.left = leftPaddleX + "px";
}

const balls = [new Ball(box, -1, 2), new Ball(box, -2, 1) , new Ball(box,2, -2)];
balls.forEach((ball) => ball.animate());
