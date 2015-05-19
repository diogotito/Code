package swagybird;

import processing.core.PApplet;

public class Bird implements IDrawable {

    float x;
    float y;
    float width;
    float height;
    float skyY;
    float groundY;

    float velocity = 0f;
    float gravity = 0.5f;

    public Bird(float x, float y,
            float width, float height,
            float skyY, float groundY) {
        super();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.skyY = skyY;
        this.groundY = groundY;
    }

    public void update(Screen parent) {
        velocity += gravity;
        y += velocity;
        if (y > groundY - height / 2) {
            y = groundY - height / 2;
            velocity = 0;
        }
    }

    public void flapWings() {
        if (y > skyY) {
            velocity = -10;
        }
    }

    public void draw(PApplet root) {
        root.fill(128, 180, 20);
        root.rectMode(PApplet.CENTER);
        root.rect(x, y, width, height);
    }

}
