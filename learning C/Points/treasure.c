#include <stdio.h>
#include <math.h>

enum direction {
  N,
  S,
  E,
  W,
  NE,
  NW,
  SE,
  SW
};

struct point {
  double x;
  double y;
};

void walk (struct point* p, int numSteps, enum direction dir) {
  switch (dir) {
  case N:
    p->y += numSteps;
    break;
  case S:
    p->y -= numSteps;
    break;
  case E:
    p->x += numSteps;
    break;
  case W:
    p->x -= numSteps;
  case NE:
    p->x += numSteps * M_SQRT1_2;
    p->y += numSteps * M_SQRT1_2;
    break;
  case NW:
    p->x += numSteps * M_SQRT1_2;
    p->y -= numSteps * M_SQRT1_2;
    break;
  case SE:
    p->x += numSteps * M_SQRT1_2;
    p->y -= numSteps * M_SQRT1_2;
    break;
  case SW:
    p->x -= numSteps * M_SQRT1_2;
    p->y -= numSteps * M_SQRT1_2;
    break;
  }
}

double point_dist_from_origin(struct point* p) {
  return sqrt(p->x * p->x + p->y * p->y);
}

int main(int argc, char** argv) {
  struct point p = {2.00f, 2.00f};

  walk(&p, 10, S);

  printf("(%.2f; %.2f)\t<---> %.6f\n", p.x, p.y,
	 point_dist_from_origin(&p));
}
