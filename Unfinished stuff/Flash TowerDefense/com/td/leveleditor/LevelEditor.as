package com.td.leveleditor  {
	
	import fl.controls.Button;
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.display.SimpleButton;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.filters.BitmapFilterQuality;
	import flash.filters.GlowFilter;
	import flash.net.URLRequest;
	import flash.text.TextField;
	import flash.ui.ContextMenu;
	
	
	public class LevelEditor extends MovieClip {
		
		public var fileHandler:FileHandler;
		private var blockEditor:BlockEditor;
		public var saveButton:SimpleButton;
		public var openButton:SimpleButton;
		public var traceButton:Button;
		public var clearButton:Button;
		
		public function LevelEditor() {
			fileHandler = new FileHandler();
			createBlockEditor();
			hideMenuItems();
			traceButton.addEventListener(MouseEvent.CLICK, traceButton_click);
			saveButton.addEventListener(MouseEvent.CLICK, saveButton_click);
			openButton.addEventListener(MouseEvent.CLICK, openButton_click);
			clearButton.addEventListener(MouseEvent.CLICK, clearButton_click);
		}
		
		private function hideMenuItems():void 
		{
			var menu:ContextMenu = new ContextMenu();
			menu.hideBuiltInItems();
			contextMenu = menu;
		}
		
		private function clearButton_click(e:MouseEvent):void 
		{
			blockEditor.clearLevel()
		}
		
		private function saveButton_click(e:MouseEvent):void 
		{
			fileHandler.saveLevel(blockEditor.getLevelData());
		}
		
		private function openButton_click(e:MouseEvent):void 
		{
			fileHandler.loadLevel();
			fileHandler.addEventListener(FileHandler.DATA_LOADED, dataLoaded);
		}		
		
		private function dataLoaded(e:Event):void 
		{
			blockEditor.setLevelData(fileHandler.levelData);
		}
		
		private function traceButton_click(e:MouseEvent):void 
		{
			trace(blockEditor.getLevelData().join("\n").replace(/,/g, ""));
		}
			
		private function createBlockEditor():void 
		{
			blockEditor = new BlockEditor(10, 20);
			blockEditor.scaleX = blockEditor.scaleY = 1.75;
			blockEditor.x = stage.stageWidth - blockEditor.width - ( stage.stageHeight - blockEditor.height ) / 2;
			blockEditor.y = ( stage.stageHeight - blockEditor.height ) / 2;
			addChild(blockEditor);
		
		}
	}
	
}
