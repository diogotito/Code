package com.td.leveleditor
{
	/**
	 * Use this class to manage local level data by calling the following static functions:
	 * public static function saveLevel(data:Array):void
		 * Use this function to save the passed level data to a local file, 
		 * using a Save dialog box.
	 * public static function loadLevel():void
		 * Use this function to load a level saved in a .ftdl file.
		 * Its data is then converted in a legible array by the property get
		 * levelData.
		 * NOTE: You must listen to the "dataLoaded" Event
		 * (public static const DATA_LOADED) before referencing this property!

	 * @author Diogo
	 */
	import flash.display.Sprite;
	import flash.events.*;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;
	
	public class FileHandler extends Sprite
	{
		public static const DATA_LOADED:String = "dataLoaded";
		
		private var fileRef:FileReference;
		private var _levelData:ByteArray;
		
		public function FileHandler()
		{
			fileRef = new FileReference();
			fileRef.addEventListener(Event.CANCEL, onCancel);
			fileRef.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
			fileRef.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onSecurityError);
			//var textTypeFilter:FileFilter = new FileFilter("TD Levels (*.ftdl)", "*.ftdl");
		}
		
		public function loadLevel():*
		{
			fileRef.browse([new FileFilter("TD Levels (*.ftdl)", "*.ftdl")]);
			fileRef.addEventListener(Event.SELECT, onFileSelected);
		}
		
		
		private function onFileSelected(evt:Event):void
		{
			fileRef.addEventListener(ProgressEvent.PROGRESS, onProgress);
			fileRef.addEventListener(Event.COMPLETE, onComplete);
			fileRef.load();
		}
		
		private function onProgress(evt:ProgressEvent):void
		{
			trace("Loaded " + evt.bytesLoaded + " of " + evt.bytesTotal + " bytes.");
		}
		
		private function onCancel(evt:Event):void
		{
			trace("The browse request was canceled by the user.");
		}
		
		private function onComplete(evt:Event):void
		{
			trace("File was successfully loaded.");
			fileRef.removeEventListener(Event.SELECT, onFileSelected);
			fileRef.removeEventListener(ProgressEvent.PROGRESS, onProgress);
			fileRef.removeEventListener(Event.COMPLETE, onComplete);
			fileRef.removeEventListener(Event.CANCEL, onCancel);
			
			_levelData = fileRef.data;
			dispatchEvent( new Event(DATA_LOADED) );
		}
		
		public function saveLevel(data:Array):void
		{
			var dataToSave:String = data.join("\n").replace(/,/g, "");
			fileRef.addEventListener(Event.SELECT, onSaveFileSelected);
			fileRef.save(dataToSave, "Level_n.ftdl");
		}
		
		private function onSaveFileSelected(evt:Event):void
		{
			fileRef.addEventListener(ProgressEvent.PROGRESS, onSaveProgress);
			fileRef.addEventListener(Event.COMPLETE, onSaveComplete);
			fileRef.addEventListener(Event.CANCEL, onSaveCancel);
		}
		
		private function onSaveProgress(evt:ProgressEvent):void
		{
			trace("Saved " + evt.bytesLoaded + " of " + evt.bytesTotal + " bytes.");
		}
		
		private function onSaveComplete(evt:Event):void
		{
			trace("File saved.");
			fileRef.removeEventListener(Event.SELECT, onSaveFileSelected);
			fileRef.removeEventListener(ProgressEvent.PROGRESS, onSaveProgress);
			fileRef.removeEventListener(Event.COMPLETE, onSaveComplete);
			fileRef.removeEventListener(Event.CANCEL, onSaveCancel);
		}
		
		private function onSaveCancel(evt:Event):void
		{
			trace("The save request was canceled by the user.");
		}
		
		private function onIOError(evt:IOErrorEvent):void
		{
			trace("There was an IO Error.");
		}
		
		private function onSecurityError(evt:Event):void
		{
			trace("There was a security error.");
		}
		
		public function get levelData():Array
		{
			var arrayOfStrings:Array = _levelData.toString().split(/\n/g);
			var dataToReturn:Array = [];
			for each (var row:String in arrayOfStrings) 
			{
				var arrayOfChars:Array = [];
				for (var i:int = 0; i < row.length; i++) 
				{
					arrayOfChars.push(row.charAt(i));
				}
				dataToReturn.push(arrayOfChars);
			}
			return dataToReturn;
		}
	}
}