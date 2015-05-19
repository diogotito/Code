ArrayList<Ball> balls = new ArrayList<Ball>();

void setup()
{
  size(500,500);
}

void draw()
{
  background(0);
  updateBalls();
  manageBalls();
  updateLabel();
}

void updateBalls()
{
  for (Ball ball : balls)
  {
    ball.update();
    ball.display();
  }
}

void manageBalls()
{
  for (int i = balls.size()-1; i > 0; i--)
  {
    print(i);
  }
}

void mouseReleased()
{
  Ball newBall = new Ball(mouseX, mouseY, random(5,50));
  println("[CLICK] " + newBall);
  balls.add(newBall);
}

void updateLabel()
{
  String text = "Number of balls: " + balls.size();
  fill(100);
  text(text, 1, 11);
  fill(255);
  text(text, 0, 10);
}
