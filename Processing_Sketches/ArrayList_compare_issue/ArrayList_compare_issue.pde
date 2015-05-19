ArrayList<Point> list;

void setup()
{
  list = new ArrayList<Point>();
  list.add(new Point(10,10));
  Point samePoint = new Point(10,10);
  println(list.get(0) == samePoint, list.get(0).equals(samePoint));
  println(list, samePoint, list.contains(samePoint)); 
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
  
  //Make sure we override
  @ Override
  boolean equals(Object point)
  {
    //Make sure we can compare these
    if(!(point instanceof Point))
      return false;
   
    //Cast the object to a Point and compare
    return this.x == ((Point) point).x && this.y == ((Point) point).y;
  }
  
  String toString()
  {
    return "(" + this.x + "," + this.y + ")";
  }
  
}
