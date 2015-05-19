class Bird
{
  float x, y, width, height, skyY, groundY;
  float velocity = 0;
  float gravity = 0.5;
  
  Bird(float x, float y, float width, float height, float skyY, float groundY)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.skyY = skyY;
    this.groundY = groundY;
  }
  
  void update()
  {
    velocity += gravity;
    y += velocity;
    if ( y > groundY - height/2)
    {
      y = groundY;
      velocity = 0;
    }
  }
  
  void flapWings()
  {
    if (y > skyY)
      velocity = -10;
  }
  
  void draw()
  {
    rectMode(CENTER);
    fill(255,63,63);
    rect(x, y, width, height); 
  }
  
}
