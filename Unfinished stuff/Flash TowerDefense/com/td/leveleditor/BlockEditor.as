package com.td.leveleditor 
{
	import flash.display.MovieClip;
	import flash.display.Shape;
	
	/**
	 * ...
	 * @author Diogo
	 */
	public class BlockEditor extends MovieClip 
	{
		private var gridSize:Number;
		private var numLines:int;
		private var blocksArray:Array = [];
		private var grid:Shape;
		
		public function BlockEditor(numLines:int = 0, gridSize:Number = 20) 
		{
			this.numLines = numLines;
			this.gridSize = gridSize;
			
			grid = new Shape();
			grid.graphics.lineStyle(1);
			for (var i:int = 0; i <= numLines; i++)
			{
				// Draw 1 column and 1 row to the grid
				grid.graphics.moveTo(gridSize * i, 0);
				grid.graphics.lineTo(i * gridSize, numLines * gridSize);
				grid.graphics.moveTo(0, gridSize * i);
				grid.graphics.lineTo(numLines * gridSize, gridSize * i);
				// Add an EditableBlock instance for each new grid cell on the current row
				var rowOfBlocks:Array = [];
				if (i != numLines) // This prevents an useless row of block to be created
					for (var j:int = 0; j < numLines; j++) 
				{
					var block:EditableBlock = new EditableBlock(gridSize);
					block.x = j * gridSize;
					block.y = i * gridSize;
					addChild(block);
					rowOfBlocks.push(block);
				}
				blocksArray.push(rowOfBlocks);
			}
			addChild(grid);
		}		
		
		public function getLevelData():Array 
		{
			var result:Array = new Array();
			for (var i:int = 0; i < blocksArray.length; i++)
			{
				var row:Array = [];
				for each(var block:EditableBlock in blocksArray[i])
				{
					row.push(block.data);
				}
				result[i] = row;
			}
			return result;
		}
		
		public function setLevelData(data:Array)
		{
			trace("public function setLevelData() {")
			for (var row:int = 0; row < data.length; row++) 
			{
				trace("\tChecking row " + row.toString());
				for (var char:int = 0; char < data[row].length; char++) 
				{
					var currentBlock:EditableBlock= blocksArray[row][char] as EditableBlock;
					if (currentBlock != null)
					{
						trace("\t\tChanging "+currentBlock+"'s data to " + data[row][char]);
						currentBlock.data = data[row][char];
					}
				}
			}
		}
		
		public function clearLevel():void 
		{
			trace("Clearing level...");
			for each (var row:Array in blocksArray) 
			{
				for each (var block:EditableBlock in row) 
				{
					block.currentState = 0;
				}
			}
		}
	}
}