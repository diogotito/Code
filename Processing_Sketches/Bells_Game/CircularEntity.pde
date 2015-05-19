// Simple base class to represent circular stuff
class CircularEntity
{
  
  float x, y, radius;
  
  CircularEntity(float x, float y, float radius)
  {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  
  CircularEntity () {} // Default "super()" constructor
  
  boolean collidesWith(CircularEntity other)
  {
    return dist(x, y, other.x, other.y) < radius + other.radius;
  }
  
}
