/* Skin for dvs htmml5 player */
function LineSimpleSkinPlay() {

// Configparams
	this.controlHeight=27;
// Limits
	this.minWidth=300;
	this.minHeight=200;
	
	this.Separators;  // separators
	this.simpleRefresh=false;
	
	this.volumeBarControlSettings= {count:7, width:12, height:2, offsetBottom:0, offsetTop:2, offsetLeft:2, passiveBackground:"#333333", activeBackground:"#990000"};

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
		
		//playerObject.dvs_play_control.style.backgroundColor=playerObject.settings.controlBackgroundColor;
		playerObject.dvs_play_control.style.backgroundColor="#FFFFFF";
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";

		//playerObject.dvs_play_control.style.backgroundImage="url('dvs/images/neo_back_control.png')";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";

        //video
        //playerObject.dvsplayer.style.backgroundColor = "#000000";

        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		// create additional objects
		//remove volume control from main conteiner and plase it to additional container
		playerObject.dvs_play_control.removeChild(playerObject.volumecontrol);
		
		playerObject.neoVolumeBlockControl=document.createElement('div');
		playerObject.neoVolumeBlockControl.dvspl=playerObject;
		playerObject.neoVolumeBlockControl.style.position="absolute";
		playerObject.neoVolumeBlockControl.style.width="16px";
		playerObject.neoVolumeBlockControl.style.height="36px";
		playerObject.neoVolumeBlockControl.style.left=playerObject.dvs_play_conteiner.clientWidth-28 + "px";
		playerObject.neoVolumeBlockControl.style.top=playerObject.dvs_play_conteiner.clientHeight-34-27 + "px";
		playerObject.neoVolumeBlockControl.style.backgroundImage="url('dvs/images/backvolumecontrol_linesimple.png')";
		playerObject.neoVolumeBlockControl.appendChild(playerObject.volumecontrol);
		playerObject.dvs_play_conteiner.appendChild(playerObject.neoVolumeBlockControl);
		
		playerObject.volumepic.SetXYdrag(false, true);
		
		this.DisplayVolumeControl(playerObject);
		this.DisplayVolumePicMarker(playerObject);
		
		var i;
		var stepY=(playerObject.volumecontrol.clientHeight-this.volumeBarControlSettings.offsetBottom-this.volumeBarControlSettings.offsetTop-this.volumeBarControlSettings.height*this.volumeBarControlSettings.count)/(this.volumeBarControlSettings.count-1);
				
		playerObject.volumecontrol.volumeBars=Array(this.volumeBarControlSettings.count);
		
		for (i=0; i<this.volumeBarControlSettings.count; i++)
		{
			playerObject.volumecontrol.volumeBars[i]=document.createElement('div');
			playerObject.volumecontrol.volumeBars[i].style.position="absolute";
			playerObject.volumecontrol.volumeBars[i].style.left=this.volumeBarControlSettings.offsetLeft + "px";
			playerObject.volumecontrol.volumeBars[i].style.top=this.volumeBarControlSettings.offsetTop+(this.volumeBarControlSettings.count-i-1)*(this.volumeBarControlSettings.height+stepY) + "px";
			
			playerObject.volumecontrol.volumeBars[i].style.width=this.volumeBarControlSettings.width + "px";
			playerObject.volumecontrol.volumeBars[i].style.height=this.volumeBarControlSettings.height+"px";
			
			playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.passiveBackground;
			
			playerObject.volumecontrol.volumeBars[i].zIndex=5;
			
			playerObject.volumecontrol.appendChild(playerObject.volumecontrol.volumeBars[i]);
		}

		playerObject.poscontrol.shadeControl= document.createElement('div');
		playerObject.poscontrol.appendChild(playerObject.poscontrol.shadeControl);
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		playerObject.poscontrol.shadeControl.style.backgroundColor="#990000";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		
		
		//separators
		playerObject.neoVolumeBlockControl.style.display="none";
		playerObject.MuteButton.onmouseover=function () {this.dvspl.Skin.OnMuteMouseOver(this.dvspl);}
		
    }
	
    this.refresh = function(playerObject) {

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
       // playerObject.dvs_play_conteiner.style.backgroundColor = playerObject.settings.backgroundColor;
		
		//playerObject.dvs_play_control.style.backgroundColor=playerObject.settings.controlBackgroundColor;
		//playerObject.dvs_play_control.style.backgroundColor="#FFFFFF";
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";

		//playerObject.dvs_play_control.style.backgroundImage="url('dvs/images/neo_back_control.png')";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";

        //video
        //playerObject.dvsplayer.style.backgroundColor = "#000000";

        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		// create additional objects
		playerObject.neoVolumeBlockControl.style.position="absolute";
		playerObject.neoVolumeBlockControl.style.width="16px";
		playerObject.neoVolumeBlockControl.style.height="36px";
		playerObject.neoVolumeBlockControl.style.left=playerObject.dvs_play_conteiner.clientWidth-28 + "px";
		playerObject.neoVolumeBlockControl.style.top=playerObject.dvs_play_conteiner.clientHeight-34-27 + "px";
		playerObject.neoVolumeBlockControl.style.backgroundImage="url('dvs/images/backvolumecontrol_linesimple.png')";
	
		playerObject.volumepic.SetXYdrag(false, true);
		
		this.DisplayVolumeControl(playerObject);
		this.DisplayVolumePicMarker(playerObject);
		
		var i;
		var stepY=(playerObject.volumecontrol.clientHeight-this.volumeBarControlSettings.offsetBottom-this.volumeBarControlSettings.offsetTop-this.volumeBarControlSettings.height*this.volumeBarControlSettings.count)/(this.volumeBarControlSettings.count-1);
				
		/*		
		for (i=0; i<this.volumeBarControlSettings.count; i++) {
			playerObject.volumecontrol.volumeBars[i].style.position="absolute";
			playerObject.volumecontrol.volumeBars[i].style.left=this.volumeBarControlSettings.offsetLeft + "px";
			playerObject.volumecontrol.volumeBars[i].style.top=this.volumeBarControlSettings.offsetTop+(this.volumeBarControlSettings.count-i-1)*(this.volumeBarControlSettings.height+stepY) + "px";
			playerObject.volumecontrol.volumeBars[i].style.width=this.volumeBarControlSettings.width + "px";
			playerObject.volumecontrol.volumeBars[i].style.height=this.volumeBarControlSettings.height+"px";
			playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.passiveBackground;
			playerObject.volumecontrol.volumeBars[i].zIndex=5;
		}

		*/
		
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		//playerObject.poscontrol.shadeControl.style.backgroundColor="#990000";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		
		//separators
		playerObject.neoVolumeBlockControl.style.display="none";
		playerObject.MuteButton.onmouseover=function () {this.dvspl.Skin.OnMuteMouseOver(this.dvspl);}
    }	
	
	

    this.SetPlayButton_activeState = function (playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "13px";
        playerObject.PlayPauseButton.style.top = "5px";
        playerObject.PlayPauseButton.style.width = "17px";
        playerObject.PlayPauseButton.style.height = "17px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/playbutton_simpleline.png') 0px -17px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }


    this.SetPlayButton_unactiveState = function SetPlayButton_unactiveState(playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "13px";
        playerObject.PlayPauseButton.style.top = "5px";
        playerObject.PlayPauseButton.style.width = "17px";
        playerObject.PlayPauseButton.style.height = "17px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/playbutton_simpleline.png') 0px 0px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }

    this.SetMuteButton_activeState = function (playerObject) {
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left = (playerObject.settings.width-28)+"px";
        playerObject.MuteButton.style.top =  "8px";
        playerObject.MuteButton.style.width = "15px";
        playerObject.MuteButton.style.height = "11px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_linesimple.png') 0px -11px";
        playerObject.MuteButton.style.cursor = "pointer";
    }

    this.SetMuteButton_unactiveState = function (playerObject) {
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left =  (playerObject.settings.width-28)+"px";
        playerObject.MuteButton.style.top = "8px";
        playerObject.MuteButton.style.width = "15px";
        playerObject.MuteButton.style.height = "11px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_linesimple.png') 0px 0px";
        playerObject.MuteButton.style.cursor = "pointer";
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
		playerObject.volumecontrol.style.width = "16px";
        playerObject.volumecontrol.style.height = "34px";
		playerObject.volumecontrol.style.backgroundColor="transparent";
		//playerObject.volumecontrol.style.backgroundImage="url('dvs/images/volcontrol_neo.png')";
		playerObject.volumecontrol.style.top="0px";
		playerObject.volumecontrol.style.left="0px";
		playerObject.volumecontrol.style.cursor="pointer";
		
	}
	
	this.DisplayVolumePicMarker = function (playerObject)
	{
		playerObject.volumepicMarker.style.display="block";
		playerObject.volumepicMarker.style.position="absolute";
		playerObject.volumepicMarker.style.width = "16px";
		playerObject.volumepicMarker.style.border = "none";
        playerObject.volumepicMarker.style.height = "4px";
		playerObject.volumepicMarker.style.left="0px";
		playerObject.volumepicMarker.style.backgroundColor="transparent";
		//playerObject.volumepicMarker.style.border="1px solid red";
		//playerObject.volumepicMarker.style.backgroundImage="url('dvs/images/volpic_neo.png')";
		playerObject.volumepicMarker.style.cursor = "pointer";
	}
	
	// Create and display PositionControl object
	this.DisplayPositionControl = function (playerObject) {
		playerObject.poscontrol.style.display="block";
		playerObject.poscontrol.style.position="absolute";
		playerObject.poscontrol.style.width = playerObject.settings.width-42-42+"px";
        playerObject.poscontrol.style.height = "8px";
		playerObject.poscontrol.style.backgroundColor="transparent";
		playerObject.poscontrol.style.backgroundImage="url('dvs/images/backposcontrol.png')";
		playerObject.poscontrol.style.backgroundRepeat="repeat-x";
		playerObject.poscontrol.style.top="10px";
		playerObject.poscontrol.style.left="42px";
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
		if(playerObject.neoVolumeBlockControl.style.display != "none")
		{
		var volume = playerObject.dvsplayer.volume;
		
		playerObject.volumepicMarker.style.top = playerObject.volumecontrol.clientHeight*(1-volume) + "px";
		var i;
		for (i=0; i<this.volumeBarControlSettings.count; i++)
		{
			if(i/(this.volumeBarControlSettings.count-1) < volume)
			{
				playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.activeBackground;
			}
			else
			{
				playerObject.volumecontrol.volumeBars[i].style.backgroundColor=this.volumeBarControlSettings.passiveBackground;
			}
		}
		
		}
	
	}
	
	this.OnPositionChanged = function(playerObject) 
	{
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
	}
	
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
	
	
	
	
}
