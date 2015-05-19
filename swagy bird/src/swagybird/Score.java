/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package swagybird;

import processing.core.PApplet;
import processing.core.PImage;

/**
 *
 * @author DiogoTito
 */
public class Score implements IDrawable
{

    private int scoreValue = 0;
    private final int characterWidth;
    private final PImage numberSprite;
    private final PImage currentScoreImage;
    
    public Score(PImage numberSprite)
    {
        this.numberSprite = numberSprite;
        characterWidth = numberSprite.width / 10;
        currentScoreImage = new PImage();
        computeScoreImage();
    }
    
    public int getScoreValue() {
        return this.scoreValue;
    }
    
    @Override
    public void draw(PApplet root) {
        root.image(currentScoreImage, 50, 50, characterWidth*2, numberSprite.height*2);
    }

    @Override
    public void update(Screen parent) {
        System.out.println("New Score: " + Integer.toString(scoreValue));
        scoreValue++;
        computeScoreImage();
    }

    private void computeScoreImage() {
        String scoreString = Integer.toString(scoreValue);
        currentScoreImage.init(characterWidth * scoreString.length(), numberSprite.height, PApplet.ARGB);
        for(int i = 0; i < scoreString.length(); i++){
            int sourceX = (scoreValue%(int)(Math.pow(10, i+1))) * characterWidth;
            currentScoreImage.copy(numberSprite, sourceX, 0, characterWidth, numberSprite.height, i*characterWidth, 0, characterWidth, numberSprite.height);
        }
    }
    
}
