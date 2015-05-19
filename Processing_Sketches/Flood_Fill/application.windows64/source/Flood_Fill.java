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

public class Flood_Fill extends PApplet {

int colorToFill;

ArrayList<Point> floodPoints = new ArrayList<Point>();
ArrayList<Point> newPoints;


public void setup()
{
  size(500,500);
  noSmooth();
}


public void draw()
{
  
  if (floodPoints != null)
  {
    newPoints = new ArrayList<Point>();
    for (Point point : floodPoints)
    {
      markPixel(point.x+1, point.y); // Right
      markPixel(point.x-1, point.y); // Left
      markPixel(point.x, point.y-1); // Up
      markPixel(point.x, point.y+1); // Down
    }
    println(newPoints.size());
    floodPoints = newPoints;
  }
  
}

public void markPixel(int x, int y)
{
  Point newPoint = new Point(x,y);
  if(newPoint.getColor() == colorToFill)
  {
    newPoints.add(newPoint);
    set(newPoint.x, newPoint.y, 0);
  }
}

public void mouseClicked()
{
  floodPoints.add(new Point(mouseX, mouseY));
  colorToFill = get(mouseX, mouseY);
}

public void mouseDragged()
{
  line(pmouseX, pmouseY, mouseX, mouseY);
}


class Point
{
  
  int x;
  int y;
  
  Point (int x, int y)
  {
    this.x = x;
    this.y = y;
  }
  
  public boolean isInsideSketch()
  {
    return  (x >= 0) && (x < width) &&
            (y >= 0) && (y < height);
  }
  
  public int getColor()
  {
    if (!this.isInsideSketch())
      return 0;  
    return get(this.x, this.y);
  }
  
  //Make sure we override
  public @Override
  boolean equals(Object point)
  {
    //Make sure we can compare these
    if(!(point instanceof Point))
      return false;
   
    //Cast the object to a Point and compare
    return this.x == ((Point) point).x && this.y == ((Point) point).y;
  }
  
  public String toString()
  {
    return "(" + this.x + "," + this.y + ")";
  }
  
}
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "Flood_Fill" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
