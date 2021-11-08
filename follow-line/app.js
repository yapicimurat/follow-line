let supportLines = [];
let lastPositionX = 0;
const speed = 5;
const car = {
  w: 45,
  h: 25,
  x: 150,
  y: 150,
  angle: 0,
  lastAngle: 0
};

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  lastPositionX = width;
  for(let i = 1;i <= 30;i++)
  {
    createSupportLines();    
  }
  
}

function draw() {
  background(220);
  
  drawWay();
   drawCar();
}


function drawWay()
{
  
  removeWay();
  if(supportLines.length > 1)
  {
    
      for(let i in supportLines)
      {
        i = parseInt(i);
        //support line start
        const supportLineS = supportLines[i];
        //support line end
        const supportLineE = supportLines[i + 1];
        
        
        if(i == supportLines.length - 1)
        {
           supportLineS.x1 -= speed;
           supportLineS.x2 -= speed;
           break; 
        }
        
        push();
        stroke(0);
        strokeWeight(3);
        line(supportLineS.x1,supportLineS.y1,supportLineE.x1,supportLineE.y1);
        supportLineS.x1 -= speed;
        supportLineS.x2 -= speed;
        pop();
        
      }
  }
}

function drawCar()
{
  if(mouseIsPressed)
  {
    car.x = mouseX - car.w / 2;
    car.y = mouseY - car.h / 2;
  }
  else
  {
    
    for(let i in supportLines)
    {
      i = parseInt(i);
      
      const currentLine = supportLines[i];
      const currentLineAfter = supportLines[i + 1] 
      
      if(currentLine.x1 < car.x && currentLineAfter.x1 > car.x)
      {
        car.y = currentLine.y1 - car.h;
        car.angle = atan2(currentLineAfter.y1 - (car.y + car.h),currentLineAfter.x1 - (car.x + car.w / 2));
        const differentAtX = abs(currentLine.y1 - currentLineAfter.y1);
        car.y += sin(car.angle) * differentAtX;
        break;
      }
      
      
    }
    
  }
     
  
  
  //draw car using rect() function
  push();
  fill("red");
  stroke(0);
  strokeWeight(0);
  translate(car.x,car.y + car.h / 2);
  
  
  //firstly, back to 0 angle 
  //after go to new angle
  rotate(car.lastAngle * -1);
  rotate(car.angle);
  car.lastAngle = car.angle;
  rect(-car.w / 2,-car.h / 2,car.w,car.h);
  pop();
  
}

function createSupportLines()
{
  const randomOffsetX = (random(100,150));
  if(supportLines.length == 0)
  {
    lastPositionX = width + randomOffsetX;
  }
  else
  {
    lastPositionX =  supportLines[supportLines.length - 1].x1 + randomOffsetX;
  }
  
  supportLines.push({
    x1: lastPositionX,
    y1: random(height - 70,height - 90),
    x2: lastPositionX,
    y2: height + 100
  });
 
}

function removeWay()
{
  
  for(let i in supportLines)
  {
    i = parseInt(i);
    const {x1} = supportLines[i];
    
    if(x1 <= -300)
    {
      createSupportLines();
      supportLines.shift();
    } 
  }
}



