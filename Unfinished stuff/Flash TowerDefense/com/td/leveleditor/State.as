package com.td.leveleditor 
{
	/**
	 * ...
	 * @author Diogo
	 */
	public class State 
	{
		
		public var data:String;
		public var text:String;
		public var color:uint;
		public var bold:Boolean;
		public var caption;
		
		public function State(data:String, text:String, color:uint = 0x888888, bold:Boolean = true,
							  caption:String = "") 
		{
			this.data = data;
			this.text = text;
			this.color = color;
			this.bold = bold;
			this.caption = caption;
		}
		
	}

}