package com.td.turrets
{
	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	/**
	 * Esta class define uma torre num jogo "Tower Defense"
	 * @author Diogo
	 */
	public class BaseTurret extends MovieClip
	{
		public static const BULLET_SPEED:Number = 10;
		public static const ROTATION_SPEED:Number = 10;
		
		private var canShot:Boolean = true;
		
		public function BaseTurret()
		{
			addEventListener(Event.ADDED_TO_STAGE, init)
		}
		
		private function init(e:Event):void
		{
			stop();
			addEventListener(Event.ENTER_FRAME, doEveryFrame);
			stage.addEventListener(MouseEvent.CLICK, onClickHandler);
			
			var tf:TextField = new TextField();
			tf.text = "IDEIAS!!";
			stage.addChild(tf);
		}
		
		private function onClickHandler(e:MouseEvent):void 
		{
			if(canShot) shot();
		}
		
		private function doEveryFrame(e:Event):void 
		{
			if (currentFrame == totalFrames)
			{
				gotoAndStop(1);
				canShot = true;
			}
			
			if(canShot) pointTowards(stage.mouseX, stage.mouseY);
		}
		
		private function pointTowards(dx:Number, dy:Number):void 
		{
			// Calcular a nova rotação
			var rotateTo:Number = Math.atan2(dy - y, dx - x) * 180 / Math.PI;
			
			// Manter o valor da nova rotação positivo, para não haver conflitos
			if (rotateTo > rotation + 180) rotateTo -= 360;
			if (rotateTo < rotation - 180) rotateTo += 360;
			
			// Rodar o canhão, de acordo com o seu limite de ROTATION_SPEED
			if (Math.abs(rotateTo - rotation) < ROTATION_SPEED)
				rotation = rotateTo;
			else 
			{
				if (rotateTo > rotation)
					rotation += ROTATION_SPEED;
				else
					rotation -= ROTATION_SPEED;
			}
		}
		
		private function shot():void 
		{
			canShot = false;
			play();
			
			var bullet:Bullet = new Bullet(rotation, BULLET_SPEED);
			parent.addChildAt(bullet, parent.getChildIndex(this));
			bullet.x = this.x + Math.cos(rotation * Math.PI / 180) * (130 - bullet.width);
			bullet.y = this.y + Math.sin(rotation * Math.PI / 180) * (130 - bullet.height);
		}
	
	}

}