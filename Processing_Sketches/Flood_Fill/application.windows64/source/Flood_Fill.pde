color colorToFill;

ArrayList<Point> floodPoints = new ArrayList<Point>();
ArrayList<Point> newPoints;


void setup()
{
  size(500,500);
  noSmooth();
}


void draw()
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

void markPixel(int x, int y)
{
  Point newPoint = new Point(x,y);
  if(newPoint.getColor() == colorToFill)
  {
    newPoints.add(newPoint);
    set(newPoint.x, newPoint.y, 0);
  }
}

void mouseClicked()
{
  floodPoints.add(new Point(mouseX, mouseY));
  colorToFill = get(mouseX, mouseY);
}

void mouseDragged()
{
  line(pmouseX, pmouseY, mouseX, mouseY);
}


