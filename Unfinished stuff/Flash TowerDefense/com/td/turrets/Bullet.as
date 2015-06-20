package com.td.turrets 
{
	import flash.display.GradientType;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.geom.Matrix;
	
	/**
	 * ...
	 * @author Diogo
	 */
	public class Bullet extends Sprite 
	{
		
		private var speedX:Number;
		private var speedY:Number;
		
		public function Bullet(directionDegrees:Number, speed:Number) 
		{
			//drawGraphics();
			rotation = directionDegrees;
			speedX = Math.cos(directionDegrees * Math.PI / 180) * speed; 
			speedY = Math.sin(directionDegrees * Math.PI / 180) * speed;
			
			addEventListener(Event.ENTER_FRAME, moveBullet);
		}
		
		private function drawGraphics():void 
		{
			graphics.clear();
			/*graphics.beginFill(0);
			graphics.drawCircle(0, 0, 10);
			graphics.endFill();*/
			var matrix:Matrix = new Matrix();
			matrix.createGradientBox(10, 10, 0, -5, -5);

			graphics.beginGradientFill(	GradientType.RADIAL,
										[0xCCCCCC, 0x666666],
										[1, 1],
										[0, 255],
										matrix);
			graphics.drawCircle(0, 0, 10);
			graphics.endFill();
		}
				
		private function moveBullet(e:Event):void 
		{
			x += speedX;
			y += speedY;
		}
		
	}

}