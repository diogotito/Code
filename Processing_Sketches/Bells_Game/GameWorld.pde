static float scrollAmount = 0;

class GameWorld
{
  
  Player player;
  Bell[] bells;
  
  GameWorld(int numBalls)
  {
    player = new Player();
  
    // Initialize the bells pool
    bells = new Bell[numBalls];
    for (int i = 0; i < numBalls; i++)
      bells[i] = new Bell();
  }
  
  void update()
  {
    for (Bell bell : bells)
    {
      bell.update();
      if(bell.collidesWith(player))
      {
        bell.reset();
        player.boostUpwards(bell.radius);
      }
    }
    
    player.update();
    
    // If the player is close to the top edge or to the bottom edge
    if ( player.y + scrollAmount < 200 || player.y + scrollAmount > 600 )
      // Scroll the screen so that we can follow the player
      scrollAmount -= player.velocity_y;
  }
  
  void draw()
  {
    pushMatrix();
    translate(0, scrollAmount);
    
    for (Bell bell : bells)
      bell.draw();
    drawFloor();
    player.draw();
    
    popMatrix();
  }
  
  void drawFloor()
  {
    stroke(255);
    strokeWeight(2);
    fill(64, 128, 32);
    rect(-3, 525, width+3, height+3);
    stroke(0);
    strokeWeight(1);
  }
  
}
