int currentNumber = 1;

int x;
int y;
int sideSize = 1;
int sideDirection = DOWN;
int sidePosition = 0;
PVector directionVector = getDirectionVector(sideDirection);

void setup()
{
  //frameRate(1);
  size(100,100);
  x = width/2;
  y = height/2;
}

void draw()
{
  currentNumber ++;
  if (sidePosition == sideSize-1)
  {
    sidePosition = 0;
    if ( sideDirection == UP || sideDirection == DOWN )
      sideSize ++;
    sideDirection = getNextDirection(sideDirection);
    directionVector = getDirectionVector(sideDirection);
  }
  sidePosition ++;
  x += (int) directionVector.x;
  y += (int) directionVector.y;
  
  fill(0);
  rect(0,0,textWidth(Integer.toString(currentNumber)),13);
  fill(255);
  text(currentNumber,1,11);
  
  if(isPrime(currentNumber))
    point(x,y);
}
