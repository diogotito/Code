package swagybird;

import processing.core.PApplet;

public abstract class Screen
{
	protected PApplet root;
	
	public Screen(PApplet root)
	{
		this.root = root;
	}
	
	abstract void draw();
	abstract void update();
	abstract void mousePressed();
}