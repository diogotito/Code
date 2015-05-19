int _text_y = 12;

void drawInfo()
{
  stroke(255);
  fill(0, 128);
  rect(0, 0, 132, 14*4);
  fill(255);
  
  displayInfo("Player y:", gameWorld.player.y);
  displayInfo("Player vy:", gameWorld.player.velocity_y);
  displayInfo("Scrolling:", scrollAmount);
  displayInfo("y-scroll:", gameWorld.player.y + scrollAmount); 
  _text_y = 12;
  
  stroke(0);
}

void displayInfo(String title, Object value)
{
  text(title, 2, _text_y);
  text(value.toString(), 60, _text_y);
  _text_y += 12;
}
