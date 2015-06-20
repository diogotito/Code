/* OLD (BAD) ACTIONSCRIPT CODE */

import flash.display.Sprite;
import flash.events.MouseEvent;
import flash.display.DisplayObject;
import flash.text.TextField;
import flash.ui.MouseCursor;
import flash.text.TextFormat;
import flash.display.Shape;
import flash.display.Graphics;

const BLOCK_SIZE:Number = 20;
const GAP_SIZE:Number = 1;

var squares:Array = [];

/*var states:Array = [{state:"0", color:0x888888},
					{state:"1", color:0x333333},
					{state:"↑", color:0x0000FF},
					{state:"→", color:0x0000FF},
					{state:"↓", color:0x0000FF},
					{state:"←", color:0x0000FF},
					{state:"S", color:0x00FF00},
					{state:"F", color:0xFF0000}];*/
var currentX:Number = 19;
var currentY:Number = 24;

while(currentX < (stage.stageWidth-BLOCK_SIZE))
{
	while(currentY < (stage.stageHeight-BLOCK_SIZE))
	{
		var square:Square = new Square();
		square.currentState = 0;
		square.tf = new TextField();
		square.back = new Shape();
		with(square)
		{
			paint(back, 0x888888);
			addChild(back);
			x = currentX;
			y = currentY;
			with(tf){
				y = 1;
				width = BLOCK_SIZE;
				selectable = false;
				var txtf:TextFormat = new TextFormat();
				autoSize = "center";
				txtf.align = "center";
				setTextFormat(txtf);
				multiline = true;
				text = states[currentState].state;
			}
			addChild(tf);
			addEventListener(MouseEvent.ROLL_OVER, onMouseOver);
			addEventListener(MouseEvent.ROLL_OUT, onMouseOut);
			addEventListener(MouseEvent.MOUSE_DOWN, mouseDown);
			addEventListener(MouseEvent.MOUSE_UP, onMouseOver);
			addEventListener(MouseEvent.CLICK, clickHandler);
		}
		addChild(square);
		squares.push(square);
		currentY += BLOCK_SIZE + GAP_SIZE;
	}
	currentX += BLOCK_SIZE + GAP_SIZE;
	currentY = 24;
}


function onMouseOver(event:MouseEvent):void
{
	paint(Sprite(event.currentTarget), 0xAAAAAA);
}

function onMouseOut(event:MouseEvent):void
{
	Square(event.currentTarget).graphics.clear();
}

function mouseDown(event:MouseEvent):void
{
	paint(Sprite(event.currentTarget), 0);
}

function clickHandler(event:MouseEvent):void
{
	var square:Square = Square(event.currentTarget);
	square.currentState ++;
	while(square.currentState >= states.length)
		square.currentState -= states.length;
	square.tf.text = states[square.currentState].state;
	paint(square.back, states[square.currentState].color);
}

function paint(object:*, color:uint):void
{
	if(!object.hasOwnProperty("graphics"))
	{
		throw new Error("Couldn't paint the given object: " + object);
		return;
	}
	object.graphics.clear();
	object.graphics.beginFill(color, .5);
	object.graphics.drawRect(0, 0, BLOCK_SIZE, BLOCK_SIZE);
	object.graphics.endFill();
}