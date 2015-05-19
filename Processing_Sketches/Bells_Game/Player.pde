static final float PLAYER_SIZE = 50;

class Player extends CircularEntity
{
  
  float velocity_y = 0;
  float friction = 0.02;
  float gravity = 0.25;
  
  PImage playerImage;
  
  Player()
  {
    //playerImage = loadImage("player.png");
    super(mouseX, 500, PLAYER_SIZE/2);
    playerImage = createPlayerImage(ceil(PLAYER_SIZE/2));
  }
  
  void draw()
  {
    imageMode(CENTER);
    image(playerImage, x, y);
  }
  
  void update()
  {
    // Smoothly follow the mouse horizontally
    x = lerp(x, mouseX, 0.2);
    
    // Natural forces in action: Friction, gravity, etc.
    velocity_y += gravity;
    velocity_y *= 1-friction;
    
    // Apply the vertical velocity to the player's y-position
    this.y += velocity_y;
    
    // Colide with the "floor"
    if ( y > 500)
    {
      y = 500;
      velocity_y = 0;
    }

    //println("Player forces: velocity_y=", velocity_y);
  }
  
  void boostUpwards(float amount)
  {
    velocity_y = -sqrt(amount)*2;
    //println("BOOST:", -sqrt(amount)*5);
  }
  
  // I find drawing spheres more fun in Processing than in Photoshop/GIMP
  PGraphics createPlayerImage(int radius)
  {
    PGraphics playerGraphics = createGraphics(radius*2+1, radius*2+1);
    playerGraphics.beginDraw();
    
    playerGraphics.ellipseMode(RADIUS);
    playerGraphics.noFill();
    playerGraphics.strokeWeight(2);
    
    for (int i = 0; i < radius; i++)
    { 
      float colorProgress = sqrt(norm(i, 0, radius));
      int mappedShade = (int) lerp(16, 192, colorProgress);
      playerGraphics.stroke(mappedShade);
      playerGraphics.ellipse(radius,radius,radius-i,radius-i);
    }
    
    playerGraphics.endDraw();
    return playerGraphics;
  }
  
}
