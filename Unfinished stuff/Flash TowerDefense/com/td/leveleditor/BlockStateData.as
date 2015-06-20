package com.td.leveleditor 
{
	/**
	 * Aqui pode-se editar os vários estados de cada bloco de nível editável, escrevendo:
	 * push( { text:<texto>|<n Unicode>, data:<caracter>,color:<n hexadecimal RRGGBB>, bold: <true|false> } );
	 * @author Diogo
	 */
	
	public dynamic class BlockStateData extends Array 
	{
		
		public function BlockStateData() 
		{
			
			push( { text:"0", data:"0", color:0x888888, bold: false,
					caption: "An empty block" } );
					
			push( { text:9679, data:"1", color:0x222222, bold: false,
					caption: "A block that makes part of the enemies' path" } );
					
			push( { text:10005, data:"X", color:0x888888, bold: false,
					caption: "An ocupied block where the player can't put any towers" } );
					
			push( { text:8593, data:"U", color:0x0000FF, bold: true,
					caption: "Makes the enemies go up" } );
					
			push( { text:8594, data:"R", color:0x0000FF, bold: true,
					caption: "Makes the enemies go right" } );
					
			push( { text:8595, data:"D", color:0x0000FF, bold: true,
					caption:"Makes the enemies go down" } );
					
			push( { text:8592, data:"L", color:0x0000FF, bold: true,
					caption: "Makes the enemies go left" } );
					
			push( { text:10032, data:"S", color:0x00FF00, bold: true,
					caption: "Represents a spot where the enemies appear" } );
					
			push( { text:10026, data:"F", color:0xFF0000, bold: true,
					caption: "Represents the end of the enemies' path" } );
					
		}
		//{ funcionalidades indispensáveis:
		public function getStateByData(data:String):State
		{
			for each (var state:State in this) 
			{
				if (state.data == data) return state
			}
			return null
		}
		
		override AS3 function push(...rest):uint 
		{
			var obj:Object = rest[0];
			if (obj.text is uint) 
				obj.text = String.fromCharCode(obj.text);
			var state:State =new State(obj.data, obj.text, obj.color, obj.bold, obj.caption);
			return super.push(state);
		}
		//}
	}
}