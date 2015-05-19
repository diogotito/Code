float x, y, theta;

void setup(){
  size(500,500);
  ellipseMode(RADIUS);
}

void draw ()
{
  background(0);
  x += (mouseX-x)/10;
  y += (mouseY-y)/10;
  theta += 2*PI / frameRate * 5;
  ellipse(x, y, sin(theta)*10+20,cos(theta)*10+20);
}
