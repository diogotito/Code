static final float MINIMUM_BELL_SIZE = 5;
static final float MAXIMUM_BELL_SIZE = 20;

// "Static" variables workaround
int __Bell_ID_counter;

class Bell extends CircularEntity
{
  
  final float BELL_DENSITY = 0.2;
  final color BELL_COLOR = color(255,240,0);
  
  int ID;
  
  Bell(float x, float y, float radius)
  {
    super(x, y, radius);
    trackID();
  }
  
  Bell()
  {
    //super(0,0,0);
    trackID();
    this.reset();
  }
  
  void trackID()
  {
    this.ID = __Bell_ID_counter ++;
  }
  
  void reset()
  {
    this.radius = map( sq(norm(ID, 0, NUM_BALLS)), 0, 1, MINIMUM_BELL_SIZE, MAXIMUM_BELL_SIZE);
    this.x = random(width);
    this.y = random(height) - height - sq(radius) - scrollAmount;
    //println("Bell #", ID, "\treset:  x:", x,  "| y:", y, "| radius:", radius);
  }
  
  
  void draw()
  {
    fill(lerpColor(color(0,0,50), BELL_COLOR, norm(radius, MINIMUM_BELL_SIZE, MAXIMUM_BELL_SIZE)));
    ellipseMode(RADIUS);
    ellipse(x, y, radius, radius);
    
  }
  
  void update()
  {
    y += radius * BELL_DENSITY;
    if (y > height - scrollAmount + radius)
      this.reset();
  }

}
