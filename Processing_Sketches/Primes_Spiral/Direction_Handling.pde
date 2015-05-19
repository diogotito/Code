int getNextDirection(int side)
{
  switch (side)
  {
    case UP:
      return LEFT;
    case LEFT:
      return DOWN;
    case DOWN:
      return RIGHT;
    case RIGHT:
      return UP;
  }
  return 0;
}

PVector getDirectionVector(int side)
{
  switch (side)
  {
    case UP:
      return PVectorWorkaround(0,-1);
    case LEFT:
      return PVectorWorkaround(-1,0);
    case DOWN:
      return PVectorWorkaround(0,1);
    case RIGHT:
      return PVectorWorkaround(1,0);
  }
  return PVectorWorkaround(0,0);
}

PVector PVectorWorkaround(int x, int y)
{
  PVector vector = new PVector();
  vector.x = (float) x;
  vector.y = (float) y;
  return vector;
}
