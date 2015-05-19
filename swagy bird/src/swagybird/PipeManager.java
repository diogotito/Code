/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package swagybird;

import processing.core.PApplet;

public class PipeManager implements IDrawable {

    public static final int PIPE_GAP = 200;
    public static final int PAIR_GAP = 150;
    public static final int PIPE_WIDTH = 100;

    public int scrollSpeed;

    private PipePair[] pipeArray;
    private PipePair lastPipe;

    public PipeManager(int numPipes, int scrollSpeed) {
        this.scrollSpeed = scrollSpeed;
        pipeArray = new PipePair[numPipes];
        for (int i = 0; i < numPipes; i++) {
            int pipePosition = (i + 2) * (PIPE_GAP + PIPE_WIDTH);
            int randomHeight = (int) (Math.random() * 500) + 50;
            pipeArray[i] = new PipePair(pipePosition, randomHeight);
        }
        lastPipe = pipeArray[pipeArray.length - 1];
    }

    public void update(Screen parent) {
        for (PipePair pipePair : pipeArray) {
            if (pipePair.isCollidingWith(((GameScreen)parent).player)) {
                // TODO: Game Over man!
            }
            pipePair.x -= scrollSpeed;
            if (pipePair.x < -PIPE_WIDTH) {
                pipePair.x = lastPipe.x + PIPE_WIDTH + PIPE_GAP;
                lastPipe = pipePair;
            }
        }
    }

    public void draw(PApplet root) {
        root.rectMode(PApplet.CORNER);
        for (PipePair pair : pipeArray) {
            root.rect(pair.x, 0, PIPE_WIDTH, pair.gapHeight);
            root.rect(pair.x, pair.gapHeight + PAIR_GAP, PIPE_WIDTH, 2000);
        }
    }

    public static class PipePair {

        int x, gapHeight;

        public PipePair(int x, int gapHeight) {
            this.x = x;
            this.gapHeight = gapHeight;
        }
        
        public boolean isCollidingWith(Bird player) {
            return Math.random() > 0.5; // ORLY??!
            // TODO: Acabar código de deteção de colisão
        }

    }

}
