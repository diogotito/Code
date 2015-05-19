package processing.test.bells_game;

import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class Bells_Game extends PApplet {

static final int NUM_BALLS = 50;

int score;

GameWorld gameWorld;

PImage background;

public void setup()
{
 
    
  background = loadImage("background.jpg");
  
  gameWorld = new GameWorld(NUM_BALLS);
  
}

public void draw()
{
  //imageMode(CORNER);
  //image(background, 0, 0, width, height);
  background(0);
  
  gameWorld.update();
  gameWorld.draw();

  drawInfo();
}
static final float MINIMUM_BELL_SIZE = 5;
static final float MAXIMUM_BELL_SIZE = 20;

// "Static" variables workaround
int __Bell_ID_counter;

class Bell extends CircularEntity
{
  
  final float BELL_DENSITY = 0.2f;
  final int BELL_COLOR = color(255,240,0);
  
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
  
  public void trackID()
  {
    this.ID = __Bell_ID_counter ++;
  }
  
  public void reset()
  {
    this.radius = map( sq(norm(ID, 0, NUM_BALLS)), 0, 1, MINIMUM_BELL_SIZE, MAXIMUM_BELL_SIZE);
    this.x = random(width);
    this.y = random(height) - height - sq(radius) - scrollAmount;
    //println("Bell #", ID, "\treset:  x:", x,  "| y:", y, "| radius:", radius);
  }
  
  
  public void draw()
  {
    fill(lerpColor(color(0,0,50), BELL_COLOR, norm(radius, MINIMUM_BELL_SIZE, MAXIMUM_BELL_SIZE)));
    ellipseMode(RADIUS);
    ellipse(x, y, radius, radius);
    
  }
  
  public void update()
  {
    y += radius * BELL_DENSITY;
    if (y > height - scrollAmount + radius)
      this.reset();
  }

}
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
  
  public boolean collidesWith(CircularEntity other)
  {
    return dist(x, y, other.x, other.y) < radius + other.radius;
  }
  
}
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
  
  public void update()
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
    
    if ( player.y + scrollAmount < 200 || player.y + scrollAmount > 600 )
      scrollAmount -= player.velocity_y;
  }
  
  public void draw()
  {
    pushMatrix();
    translate(0, scrollAmount);
    
    for (Bell bell : bells)
      bell.draw();
    
    player.draw();
    
    stroke(255);
    line(0, 525, width, 525);
    stroke(0);
    
    popMatrix();
  }
  
}
int _text_y = 12;

public void drawInfo()
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

public void displayInfo(String title, Object value)
{
  text(title, 2, _text_y);
  text(value.toString(), 60, _text_y);
  _text_y += 12;
}
static final float PLAYER_SIZE = 50;

class Player extends CircularEntity
{
  
  float velocity_y = 0;
  float friction = 0.02f;
  float gravity = 0.25f;
  
  PImage playerImage;
  
  Player()
  {
    //playerImage = loadImage("player.png");
    super(mouseX, 500, PLAYER_SIZE/2);
    playerImage = createPlayerImage(ceil(PLAYER_SIZE/2));
  }
  
  public void draw()
  {
    imageMode(CENTER);
    image(playerImage, x, y);
  }
  
  public void update()
  {
    // Smoothly follow the mouse horizontally
    x = lerp(x, mouseX, 0.2f);
    
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
  
  public void boostUpwards(float amount)
  {
    velocity_y = -sqrt(amount)*2;
    //println("BOOST:", -sqrt(amount)*5);
  }
  
  public PGraphics createPlayerImage(int radius)
  {
    PGraphics playerGraphics = createGraphics(radius*2, radius*2);
    //println(radius);
    playerGraphics.beginDraw();
    playerGraphics.ellipseMode(RADIUS);
    playerGraphics.noFill();
    playerGraphics.colorMode(RGB, radius);
    playerGraphics.strokeWeight(2);
    for (int i = 0; i < radius; i++)
    { 
      playerGraphics.stroke(i);
      playerGraphics.ellipse(radius,radius,radius-i,radius-i);
    }
    playerGraphics.endDraw();
    return playerGraphics;
  }
  
}

  public int sketchWidth() { return 540; }
  public int sketchHeight() { return 960; }
}
