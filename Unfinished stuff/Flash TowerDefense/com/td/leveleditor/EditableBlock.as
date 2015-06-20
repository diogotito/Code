package com.td.leveleditor 
{
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.ContextMenuEvent;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filters.GlowFilter;
	import flash.text.AntiAliasType;
	import flash.text.Font;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.ui.ContextMenu;
	import flash.ui.ContextMenuItem;
	
	/**
	 * ...
	 * @author Diogo
	 */
	public class EditableBlock extends MovieClip 
	{
		static private const MOUSE_OVER_COLOR:uint = 0xDDDDDD;
		static private const MOUSE_DOWN_COLOR:Number = 0x444444;
		static private const BLOCK_OPACITY:Number = 0.7;		
		static private const OVERLAY_OPACITY:Number = 0.33;
		
		private var blockSize:Number;
		private var states:BlockStateData
		private var textField:TextField;
		private var format:TextFormat;
		private var backgroundShape:Shape;
		private var overlayShape:Shape;
		
		private var _currentState:int = 0;
		
		public function EditableBlock(blockSize:Number) 
		{
			this.blockSize = blockSize;
			states = new BlockStateData();
			createShapes();	
			createTextField();
			populateContextMenu();
			// Add the Event Listeners:
			addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
			addEventListener(MouseEvent.MOUSE_UP, mouseUp);
			addEventListener(MouseEvent.ROLL_OVER, mouseOver);
			addEventListener(MouseEvent.ROLL_OUT, mouseOut);
			addEventListener(MouseEvent.CLICK, click);
		}
		
		private function populateContextMenu():void 
		{
			var newContextMenu:ContextMenu = new ContextMenu;
			newContextMenu.hideBuiltInItems();
			for each (var state:State in states) 
			{
				var caption:String = state.caption + "\t" + state.text + " [" + state.data + "]";
				var menuItem:ContextMenuItem = new ContextMenuItem(caption);
				menuItem.addEventListener(ContextMenuEvent.MENU_ITEM_SELECT, menuItemSelect);
				newContextMenu.customItems.push(menuItem);
			}
			this.contextMenu = newContextMenu;
		}
		
		private function menuItemSelect(e:ContextMenuEvent):void 
		{
			var itemData:String = ContextMenuItem(e.target).caption;
			//trace(itemData.match(/(?<=. \[)\w(?=\])/)[0];
			//trace(/.+ \[(\w)\]/.exec(itemData));
			var regExp:RegExp = /.+ \[(\w)\]/;
			itemData = regExp.exec(itemData)[1];
			this.currentState = states.indexOf(states.getStateByData(itemData));
		}
		
		//{ region: "button states" handlers
		private function mouseUp(e:MouseEvent):void 
		{
			paintShape(overlayShape, MOUSE_OVER_COLOR);
		}
		
		private function mouseOut(e:MouseEvent):void 
		{
			overlayShape.graphics.clear();
		}
		
		private function mouseOver(e:MouseEvent):void 
		{
			paintShape(overlayShape, MOUSE_OVER_COLOR);
		}
		
		private function mouseDown(e:MouseEvent):void 
		{
			paintShape(overlayShape, MOUSE_DOWN_COLOR);
		}
		//} endregion
		
		private function click(e:MouseEvent):void 
		{
			this.currentState ++;
		}
					
		private function paintShape(shape:Shape, color:uint):void 
		{
			var opacity:Number = shape == overlayShape ? OVERLAY_OPACITY : BLOCK_OPACITY;
			shape.graphics.clear();
			shape.graphics.beginFill(color, opacity);
			shape.graphics.drawRect(0, 0, blockSize, blockSize);
			shape.graphics.endFill();
		}
		
		private function createTextField():void 
		{
			textField = new TextField();
			textField.text = stateData.text;
			var font:Font = new BlockText();
			format = new TextFormat(font.fontName);
			format.align = "center";
			textField.autoSize = "center";
			textField.setTextFormat(format);
			textField.y = 1;
			textField.width = blockSize;
			textField.x = blockSize/2 - textField.width/2;
			textField.selectable = false;
			var glow:GlowFilter = new GlowFilter(0xFFFFFF, 1, 10, 10, 2, 3);
			textField.filters = [glow];
			textField.antiAliasType = AntiAliasType.ADVANCED;
			addChild(textField);
		}
		
		private function createShapes():void 
		{
			backgroundShape = new Shape();
			overlayShape = new Shape();
			paintShape(backgroundShape, stateData.color);
			addChild(backgroundShape);
			addChild(overlayShape);
		}
		
		private function get stateData():State
		{
			return states[_currentState];
		}
		
		public function get currentState():int 
		{
			return _currentState;
		}
		
		public function set currentState(value:int):void 
		{
			while (value >= states.length)
				value -= states.lenght;
			_currentState = value;
			
			paintShape(backgroundShape, stateData.color);
			textField.text = stateData.text;
			format.bold = stateData.bold;
			textField.setTextFormat(format);
		}
		
		public function get text():String
		{
			return textField.text;
		}
		
		public function get data():String
		{
			return stateData.data;
		}
		
		public function set data(value:String):void
		{
			var newID:int = states.indexOf(states.getStateByData(value));
			if (newID >= 0)
				currentState = newID;
			else
				throw new Error("Couldn't found a corresponding state object");
		}
	}
}