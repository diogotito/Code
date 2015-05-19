void setup()
{
  size(510, 510);
  colorMode(HSB);
  ellipseMode(RADIUS);
  noFill();
  strokeWeight(2);
}

void draw()
{
  background(frameCount % 255, 255, 255);
  for (int i = 0; i < 360; i+=5)
  {
    stroke( (frameCount + i) % 255, 255, 255);
    ellipse(255, 255, i, i);
  }
}
