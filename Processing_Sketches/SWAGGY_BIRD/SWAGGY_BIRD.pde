final float GROUND_Y = 50;
final float SKY_Y = 50;

Bird bird;

void setup()
{
  size(400,600);
  bird = new Bird(100, height/2, 50, 30, SKY_Y, height - GROUND_Y);
}

void draw()
{
  bird.update();
  
  background( 63, 127, 255 );
  bird.draw();
  fill(63,190,63);
  rectMode(CORNER);
  rect(0, height-GROUND_Y, width, height);
}

void mousePressed()
{
  bird.flapWings();
}
