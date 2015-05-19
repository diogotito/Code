static final int NUM_BALLS = 50;

int score;

GameWorld gameWorld;

PImage background;

void setup()
{
  size(540, 960-300);
    
  background = loadImage("background.jpg");
  
  gameWorld = new GameWorld(NUM_BALLS);
  
}

void draw()
{
  //imageMode(CORNER);
  //image(background, 0, 0, width, height);
  background(0);
  
  gameWorld.update();
  gameWorld.draw();

  drawInfo();
}
