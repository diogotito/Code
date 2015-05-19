class Ball
{
  public PVector position, velocity;
  public float radius;
  public Ball(float x, float y, float radius)
  {
    position = new PVector(x,y);
    this.radius = radius;
    velocity = PVector.random2D();
    velocity.mult(random(0.5, 3));
  }
  
  void update()
  {
    position.add(velocity);
  }
  
  void display()
  {
    fill(255);
    ellipseMode(RADIUS);
    ellipse(position.x, position.y, radius, radius);
  }
  
  String toString()
  {
    return "Ball of " + radius + "px on " + position + " with a velocity of " + velocity;
  }
}
