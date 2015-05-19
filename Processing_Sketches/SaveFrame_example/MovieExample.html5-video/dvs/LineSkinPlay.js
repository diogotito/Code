/* Skin for dvs htmml5 player */

function LineSkinPlay() {

// Configparams
	this.controlHeight=27;
	
	this.volumeBarControlSettings= {count:4 , minHeight:4, maxHeight:10, offsetLeft:6, barWidth:4, passiveBackground:"#cccccc", activeBackground:"#66cc33"};
	
// Limits
	this.minWidth=300;
	this.minHeight=200;
	
	this.simpleRefresh=false;
	

// set start skin parameters and create additional oblects
   this.SetSkin = function(playerObject) {
   
		if(playerObject.settings.width < this.minWidth) {
			playerObject.settings.width=this.minWidth;
			playerObject.dvsplayer.width=this.minWidth;
		}
		
		if(playerObject.settings.height < this.minHeight) {
			playerObject.settings.height=this.minHeight;
			playerObject.dvsplayer.height=this.minHeight;
		}
		
		playerObject.settings.displayVolumeDigital=false;
		playerObject.settings.displayVideoLengthDigitals=false;
   
		// set skin style
		playerObject.dvs_play_conteiner.style.height=playerObject.settings.height + "px";
		playerObject.dvsplayer.style.height=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_conteiner.style.width = playerObject.dvsplayer.clientWidth + "px";
        playerObject.dvs_play_conteiner.style.backgroundColor = playerObject.settings.backgroundColor;
		playerObject.dvs_play_control.style.backgroundColor=playerObject.settings.controlBackgroundColor;
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";

        //video
        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		// create additional objects
		playerObject.poscontrol.shadeControl= document.createElement('div');
		playerObject.poscontrol.appendChild(playerObject.poscontrol.shadeControl);
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		playerObject.poscontrol.shadeControl.style.backgroundColor="#66cc33";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		
		this.DisplayVolumeControl(playerObject);
		
		
		playerObject.volumecontrol.volumeBars=Array();
		
		var i;
		var stepY=(this.volumeBarControlSettings.maxHeight-this.volumeBarControlSettings.minHeight)/(this.volumeBarControlSettings.count-1);
		var stepX=(playerObject.volumecontrol.clientWidth-2*this.volumeBarControlSettings.offsetLeft-this.volumeBarControlSettings.count*this.volumeBarControlSettings.barWidth)/(this.volumeBarControlSettings.count-1);
		
		for (i=0; i<this.volumeBarControlSettings.count; i++)
		{
			playerObject.volumecontrol.volumeBars[i]=document.createElement('div');
			playerObject.volumecontrol.volumeBars[i].style.position="absolute";
			playerObject.volumecontrol.volumeBars[i].style.left=this.volumeBarControlSettings.offsetLeft + i*(stepX+this.volumeBarControlSettings.barWidth) + "px";
			playerObject.volumecontrol.volumeBars[i].style.top=playerObject.volumecontrol.clientHeight-this.volumeBarControlSettings.minHeight-stepY*i + "px";
			
			playerObject.volumecontrol.volumeBars[i].style.width=this.volumeBarControlSettings.barWidth + "px";
			playerObject.volumecontrol.volumeBars[i].style.height=this.volumeBarControlSettings.minHeight+stepY*i+"px";
			
			playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.passiveBackground;
			
			playerObject.volumecontrol.volumeBars[i].zIndex=5;
			
			playerObject.volumecontrol.appendChild(playerObject.volumecontrol.volumeBars[i]);
		}
		
		this.DisplayVolumePicMarker(playerObject);
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		

		
		playerObject.FullScreenModeButton.style.position = "absolute";
		playerObject.FullScreenModeButton.style.left = (playerObject.dvsplayer.clientWidth-27) + "px";
        playerObject.FullScreenModeButton.style.top = "6px";
		playerObject.FullScreenModeButton.style.height="10px";
		playerObject.FullScreenModeButton.style.width="10px";
		playerObject.FullScreenModeButton.style.backgroundImage = "url('dvs/images/fullscreen_line.png')";
    }
	
	this.refresh = function (playerObject) {
		if(playerObject.settings.width < this.minWidth) {
			playerObject.settings.width=this.minWidth;
			playerObject.dvsplayer.width=this.minWidth;
		}
		
		if(playerObject.settings.height < this.minHeight) {
			playerObject.settings.height=this.minHeight;
			playerObject.dvsplayer.height=this.minHeight;
		}
		
		playerObject.settings.displayVolumeDigital=false;
		playerObject.settings.displayVideoLengthDigitals=false;
   
		// set skin style
		playerObject.dvs_play_conteiner.style.height=playerObject.settings.height + "px";
		
		playerObject.dvsplayer.style.height=(playerObject.settings.height-this.controlHeight)+"px";
		
		playerObject.dvs_play_conteiner.style.width = playerObject.dvsplayer.clientWidth + "px";
        //playerObject.dvs_play_conteiner.style.backgroundColor = playerObject.settings.backgroundColor;
		
		//playerObject.dvs_play_control.style.backgroundColor=playerObject.settings.controlBackgroundColor;
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";
		
		//video
        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		// create additional objects
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		//playerObject.poscontrol.shadeControl.style.backgroundColor="#66cc33";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		this.DisplayVolumeControl(playerObject);
		
		var i;
		var stepY=(this.volumeBarControlSettings.maxHeight-this.volumeBarControlSettings.minHeight)/(this.volumeBarControlSettings.count-1);
		var stepX=(playerObject.volumecontrol.clientWidth-2*this.volumeBarControlSettings.offsetLeft-this.volumeBarControlSettings.count*this.volumeBarControlSettings.barWidth)/(this.volumeBarControlSettings.count-1);
		
		for (i=0; i<this.volumeBarControlSettings.count; i++) {
			playerObject.volumecontrol.volumeBars[i].style.position="absolute";
			playerObject.volumecontrol.volumeBars[i].style.left=this.volumeBarControlSettings.offsetLeft + i*(stepX+this.volumeBarControlSettings.barWidth) + "px";
			playerObject.volumecontrol.volumeBars[i].style.top=playerObject.volumecontrol.clientHeight-this.volumeBarControlSettings.minHeight-stepY*i + "px";
			
			playerObject.volumecontrol.volumeBars[i].style.width=this.volumeBarControlSettings.barWidth + "px";
			playerObject.volumecontrol.volumeBars[i].style.height=this.volumeBarControlSettings.minHeight+stepY*i+"px";
			//playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.passiveBackground;
			playerObject.volumecontrol.volumeBars[i].zIndex=5;
		}
		
		this.DisplayVolumePicMarker(playerObject);
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		
		playerObject.FullScreenModeButton.style.position = "absolute";
		playerObject.FullScreenModeButton.style.left = (playerObject.dvsplayer.clientWidth-27) + "px";
        playerObject.FullScreenModeButton.style.top = "6px";
		playerObject.FullScreenModeButton.style.height="10px";
		playerObject.FullScreenModeButton.style.width="10px";
		playerObject.FullScreenModeButton.style.backgroundImage = "url('dvs/images/fullscreen_line.png')";
	}	

	////////////////////////////
    this.SetPlayButton_activeState = function (playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "18px";
        playerObject.PlayPauseButton.style.top = "4px";
        playerObject.PlayPauseButton.style.width = "18px";
        playerObject.PlayPauseButton.style.height = "19px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/line_play_button.png') 0px -19px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }


    this.SetPlayButton_unactiveState = function SetPlayButton_unactiveState(playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "18px";
        playerObject.PlayPauseButton.style.top = "4px";
        playerObject.PlayPauseButton.style.width = "18px";
        playerObject.PlayPauseButton.style.height = "19px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/line_play_button.png') 0px 0px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }
	////////////////////////////
    this.SetMuteButton_activeState = function (playerObject) {
	/*
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left = (playerObject.settings.width-72)+"px";
        playerObject.MuteButton.style.top =  "6px";
        playerObject.MuteButton.style.width = "18px";
        playerObject.MuteButton.style.height = "19px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_neo.png') 0px -15px";
        playerObject.MuteButton.style.cursor = "pointer";
		*/
    }

    this.SetMuteButton_unactiveState = function (playerObject) {
	/*
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left =  (playerObject.settings.width-72)+"px";
        playerObject.MuteButton.style.top = "6px";
        playerObject.MuteButton.style.width = "17px";
        playerObject.MuteButton.style.height = "15px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_neo.png') 0px 0px";
        playerObject.MuteButton.style.cursor = "pointer";
		*/
    }

    this.SetAutoPlayButton_activeState = function (playerObject) {

    }

    this.SetAutoPlayButton_unactiveState = function (playerObject) {

    }
	// sliders
	
	// VolumeControl
	this.DisplayVolumeControl = function (playerObject)
	{
	
		playerObject.volumecontrol.style.display="block";
		playerObject.volumecontrol.style.position="absolute";
		playerObject.volumecontrol.style.width = "37px";
        playerObject.volumecontrol.style.height = "10px";
		playerObject.volumecontrol.style.backgroundColor="transparent";
		//playerObject.volumecontrol.style.backgroundImage="url('dvs/images/volcontrol_neo.png')";
		playerObject.volumecontrol.style.top="6px";
		playerObject.volumecontrol.style.left=playerObject.settings.width - 75 + "px";
		playerObject.volumecontrol.style.cursor="pointer";
		
	}
	
	this.DisplayVolumePicMarker = function (playerObject)
	{
		playerObject.volumepicMarker.style.display="block";
		playerObject.volumepicMarker.style.position="absolute";
		playerObject.volumepicMarker.style.width = "5px";
		playerObject.volumepicMarker.style.border = "none";
        playerObject.volumepicMarker.style.height = "10px";
		playerObject.volumepicMarker.style.left="0px";
		playerObject.volumepicMarker.style.backgroundColor="transparent";
		//playerObject.volumepicMarker.style.border="1px solid green";
		//playerObject.volumepicMarker.style.backgroundImage="url('dvs/images/volpic_neo.png')";
		playerObject.volumepicMarker.style.cursor = "pointer";
		playerObject.volumepicMarker.style.zIndex=10;
	}
	
	// Create and display PositionControl object
	this.DisplayPositionControl = function (playerObject) {
		playerObject.poscontrol.style.display="block";
		playerObject.poscontrol.style.position="absolute";
		playerObject.poscontrol.style.width = playerObject.settings.width-85-54+"px";
        playerObject.poscontrol.style.height = "8px";
		playerObject.poscontrol.style.backgroundColor="transparent";
		playerObject.poscontrol.style.backgroundImage="url('dvs/images/backposcontrol.png')";
		playerObject.poscontrol.style.backgroundRepeat="repeat-x";
		playerObject.poscontrol.style.top="10px";
		playerObject.poscontrol.style.left="54px";
		playerObject.poscontrol.style.cursor="pointer";
	}	
	
	this.DisplayPositionPicMarker = function (playerObject)
	{
		playerObject.pospicMarker.style.display="block";
		playerObject.pospicMarker.style.position="absolute";
		playerObject.pospicMarker.style.width = "8px";
		playerObject.pospicMarker.style.border = "none";
        playerObject.pospicMarker.style.height = "8px";
		playerObject.pospicMarker.style.top="0px";
		playerObject.pospicMarker.style.backgroundColor="transparent";
		playerObject.pospicMarker.style.backgroundImage="url('dvs/images/pospic.png')";
		playerObject.pospicMarker.style.cursor = "pointer";
	}

	this.DisplayPositionDigital = function (playerObject) {

	}
	
	
	
	/*********************************************************************/

	this.OnVolumeChanged = function(playerObject) 
	{
		//if(playerObject.neoVolumeBlockControl.style.display != "none")
		//{
		var volume = playerObject.dvsplayer.volume;
		var pos = playerObject.volumecontrol.clientWidth*(volume);
		playerObject.volumepicMarker.style.left = pos + "px";

		var pos2=pos+playerObject.volumepicMarker.clientWidth/2;
		var i;
		for(i=0; i<playerObject.Skin.volumeBarControlSettings.count; i++)
		{
			if(playerObject.volumecontrol.volumeBars[i].offsetLeft < pos2)
			{
				playerObject.volumecontrol.volumeBars[i].style.backgroundColor=playerObject.Skin.volumeBarControlSettings.activeBackground;
			}
			else
			{
				playerObject.volumecontrol.volumeBars[i].style.backgroundColor=playerObject.Skin.volumeBarControlSettings.passiveBackground;				
			}
		}
	
	}
	
	this.OnPositionChanged = function(playerObject) 
	{
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
	}
	
	/*
	this.OnMuteMouseOver = function(playerObject) 
	{
		playerObject.neoVolumeBlockControl.style.display="block";
		
		playerObject.dvs_play_conteiner.onmousemove=function(e) { 
		e = DVS_fixEvent(e);
		var mX = e.pageX;
		var mY = e.pageY; 
		var pos = DVS_getElementPosition(this.dvspl.neoVolumeBlockControl);
		if(mX < pos.left-5 || mX > pos.left+pos.width+5 || mY < pos.top -5 || mY > pos.top+pos.height+20)
		{
			this.dvspl.neoVolumeBlockControl.style.display="none";
			this.dvspl.dvs_play_conteiner.onmousemove=null;
		}
		
		};
	}
	*/
	
	
	
	
}
