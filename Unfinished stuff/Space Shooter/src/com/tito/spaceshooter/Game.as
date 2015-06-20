package com.tito.spaceshooter 
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.events.Event;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	
	public class Game extends Bitmap 
	{
		public static const NUM_RECTS:int = 10;
		public var pixels:BitmapData;
		public var rects:Vector.<Rectangle>;
		public var asteroid:Bitmap;
		public var asteroidPos:Point;
		
		[Embed(source = "../../../../img/coisa.png")]
		public var coisa:Class;
		
		public function Game(width:int, height:int) 
		{
			asteroid = new coisa()
			asteroidPos = new Point(Math.random() * width, Math.random() * height);
			
			pixels = new BitmapData(width, height, false, 0x000000);
			super(pixels);
			
			rects = new Vector.<Rectangle>(NUM_RECTS);
			for (var i:int = 0; i < NUM_RECTS; i++) 
			{
				var rect:Rectangle = new Rectangle();
				rect.x = Math.random() * width;
				rect.y = Math.random() * height;
				rect.width = Math.random() * (width - rect.x);
				rect.height = Math.random() * (height - rect.y);
				rects[i] = rect;
			}
			addEventListener(Event.ENTER_FRAME, doEveryFrame);
		}
		
		private function doEveryFrame(e:Event):void 
		{
			pixels.fillRect(pixels.rect, 0x000000);
			for each (var rect:Rectangle in rects) 
			{
				rect.x += Math.random()*2 - 1;
				rect.y += Math.random()*2 - 1;
				pixels.fillRect(rect, 0xFFFFFF);
			}
			
			asteroidPos.x += Math.random() * 2 - 1;
			asteroidPos.y += Math.random() * 2 - 1;
			pixels.copyPixels(asteroid.bitmapData, asteroid.bitmapData.rect, asteroidPos);
		}
		
	}

}