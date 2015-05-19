package swagybird;

import java.util.Iterator;
import processing.core.PApplet;

public class GameScreen extends Screen {

    private static final float GROUND_Y = 50;
    public static final float SKY_Y = 50;

    public Bird player;
    public PipeManager pipes;

    public GameScreen(PApplet root) {
        super(root);
        player = new Bird(100, root.height / 2, 50, 30, SKY_Y, root.height - GROUND_Y);
        pipes = new PipeManager(3, 3);
    }

    @Override
    void draw() {
        // Draws the background
        root.background(63, 127, 255);
        
        // Draws the SWAGgy bird (read: player)
        player.draw(root);
        
        // Draws the pipes
        pipes.draw(root);
        
        // Draws the floor
        root.rectMode(PApplet.CORNER);
        root.fill(20, 127, 40);
        root.rect(0, root.height - GROUND_Y, root.width, root.height);
    }

    @Override
    void update() {
        player.update();
        pipes.update();
    }

    @Override
    void mousePressed() {
        player.flapWings();
    }

}
