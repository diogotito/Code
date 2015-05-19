class Point
{
  
  int x;
  int y;
  
  Point (int x, int y)
  {
    this.x = x;
    this.y = y;
  }
  
  boolean isInsideSketch()
  {
    return  (x >= 0) && (x < width) &&
            (y >= 0) && (y < height);
  }
  
  color getColor()
  {
    if (!this.isInsideSketch())
      return 0;  
    return get(this.x, this.y);
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
