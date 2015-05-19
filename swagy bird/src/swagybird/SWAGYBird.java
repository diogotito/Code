package swagybird;

import processing.core.PApplet;

@SuppressWarnings("serial")
public class SWAGYBird extends PApplet {

    Screen currentScreen;

    public void setup() {
        size(400, 600);
        currentScreen = new GameScreen(this);
    }

    public void draw() {
        currentScreen.update();
        currentScreen.draw();
    }

    public void mousePressed() {
        currentScreen.mousePressed();
    }

    public static void main(String _args[]) {
        PApplet.main(new String[]{swagybird.SWAGYBird.class.getName()});
    }
}
