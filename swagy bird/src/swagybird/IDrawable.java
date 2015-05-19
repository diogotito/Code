/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package swagybird;

import processing.core.PApplet;

/**
 *
 * @author DiogoTito
 */
public interface IDrawable {
    public void draw(PApplet root);
    public void update(Screen parent);
}
