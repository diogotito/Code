/* Skin for dvs htmml5 player */
function ClassicNeoSkinPlay() {

// Configparams
	this.controlHeight=27;
// Limits
	this.minWidth=300;
	this.minHeight=200;
	
	this.Separators;  // separators
	this.simpleRefresh=false;

// set start skin parameters and create additional oblects
    this.SetSkin = function(playerObject) {
   
		if(playerObject.settings.width < this.minWidth)
		{
			playerObject.settings.width=this.minWidth;
			playerObject.dvsplayer.width=this.minWidth;
		}
		if(playerObject.settings.height < this.minHeight)
		{
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
		
		playerObject.dvs_play_control.style.backgroundColor="#333333";
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";
		playerObject.dvs_play_control.style.backgroundImage="url('dvs/images/neo_back_control.png')";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";

        // video
        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		// create additional objects
		// remove volume control from main conteiner and plase it to additional container
		playerObject.dvs_play_control.removeChild(playerObject.volumecontrol);
		

		
		playerObject.neoVolumeBlockControl=document.createElement('div');
		playerObject.neoVolumeBlockControl.dvspl=playerObject;
		playerObject.neoVolumeBlockControl.style.position="absolute";
		playerObject.neoVolumeBlockControl.style.width="25px";
		playerObject.neoVolumeBlockControl.style.height="131px";
		playerObject.neoVolumeBlockControl.style.left=playerObject.dvs_play_conteiner.clientWidth-77 -25+ "px";
		playerObject.neoVolumeBlockControl.style.top=playerObject.dvs_play_conteiner.clientHeight-158 + "px";
		playerObject.neoVolumeBlockControl.style.backgroundImage="url('dvs/images/backvolumecontrol_neo.png')";
		playerObject.neoVolumeBlockControl.appendChild(playerObject.volumecontrol);
		playerObject.dvs_play_conteiner.appendChild(playerObject.neoVolumeBlockControl);
		
		playerObject.volumepic.SetXYdrag(false, true);
			
		
		playerObject.volumecontrol.shadeControl= document.createElement('div');
		playerObject.volumecontrol.appendChild(playerObject.volumecontrol.shadeControl);
		playerObject.volumecontrol.shadeControl.style.position = "absolute";
		playerObject.volumecontrol.shadeControl.style.left = "5px";
		playerObject.volumecontrol.shadeControl.style.width="3px";
		playerObject.volumecontrol.shadeControl.style.backgroundColor="#f2540e";
		playerObject.volumecontrol.shadeControl.style.height=playerObject.volumecontrol.clientHeight-playerObject.volumepicMarker.offsetTop-playerObject.volumepicMarker.clientHeight+3+"px";
		playerObject.volumecontrol.shadeControl.style.top=playerObject.volumepicMarker.offsetTop+playerObject.volumepicMarker.clientHeight-3+"px";
		
		
		playerObject.poscontrol.shadeControl= document.createElement('div');
		playerObject.poscontrol.appendChild(playerObject.poscontrol.shadeControl);
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		playerObject.poscontrol.shadeControl.style.backgroundColor="#f2540e";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		this.DisplayVolumeControl(playerObject);
		this.DisplayVolumePicMarker(playerObject);
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		
		
		//separators
	
		this.Separators = Array();
		
		this.Separators[1]=document.createElement('div');
		this.Separators[1].style.height="15px";
		this.Separators[1].style.width="1px";
		this.Separators[1].style.backgroundColor="#999999";
		this.Separators[1].style.position="absolute";
		this.Separators[1].style.left="33px";
		this.Separators[1].style.top= "6px";
		playerObject.dvs_play_control.appendChild(this.Separators[1]);
		
		this.Separators[2]=document.createElement('div');
		this.Separators[2].style.height="15px";
		this.Separators[2].style.width="1px";
		this.Separators[2].style.backgroundColor="#999999";
		this.Separators[2].style.position="absolute";
		this.Separators[2].style.left="60px";
		this.Separators[2].style.top= "6px";
		playerObject.dvs_play_control.appendChild(this.Separators[2]);		

		this.Separators[3]=document.createElement('div');
		this.Separators[3].style.height="15px";
		this.Separators[3].style.width="1px";
		this.Separators[3].style.backgroundColor="#999999";
		this.Separators[3].style.position="absolute";
		this.Separators[3].style.left=playerObject.dvsplayer.clientWidth -46-25 +"px";
		this.Separators[3].style.top= "6px";
		playerObject.dvs_play_control.appendChild(this.Separators[3]);				
		
		
		playerObject.FullScreenModeButton.style.position = "absolute";
		playerObject.FullScreenModeButton.style.left = (playerObject.dvsplayer.clientWidth-36-25) + "px";
        playerObject.FullScreenModeButton.style.top = "6px";
		playerObject.FullScreenModeButton.style.height="15px";
		playerObject.FullScreenModeButton.style.width="21px";
		playerObject.FullScreenModeButton.style.backgroundImage = "url('dvs/images/fullscreen_neo.png')";

		
		playerObject.neoVolumeBlockControl.style.display="none";
		playerObject.MuteButton.onmouseover=function () {this.dvspl.Skin.OnMuteMouseOver(this.dvspl);}
		
    }
	
	
	this.refresh = function (playerObject) {
   
		if(playerObject.settings.width < this.minWidth)
		{
			playerObject.settings.width=this.minWidth;
			playerObject.dvsplayer.width=this.minWidth;
		}
		if(playerObject.settings.height < this.minHeight)
		{
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
		
		//playerObject.dvs_play_control.style.backgroundColor="#333333";
		playerObject.dvs_play_control.style.width=playerObject.settings.width + "px";
		playerObject.dvs_play_control.style.height=this.controlHeight + "px";
		playerObject.dvs_play_control.style.position="absolute";
		playerObject.dvs_play_control.style.top=(playerObject.settings.height-this.controlHeight)+"px";
		playerObject.dvs_play_control.style.left="0px";
		playerObject.dvs_play_control.style.backgroundImage="url('dvs/images/neo_back_control.png')";
		playerObject.dvs_play_control.style.backgroundRepeat="repeat-x";
		
        playerObject.currPosDigitalDisplay.style.display = "none";
        playerObject.currVolumeDigitalDisplay.style.display = "none";

        playerObject.PlayPauseButton.style.left = "0px";
        playerObject.PlayPauseButton.style.top =  4 + "px";
		
		playerObject.neoVolumeBlockControl.style.position="absolute";
		playerObject.neoVolumeBlockControl.style.width="25px";
		playerObject.neoVolumeBlockControl.style.height="131px";
		playerObject.neoVolumeBlockControl.style.left=playerObject.dvs_play_conteiner.clientWidth-77 + "px";
		playerObject.neoVolumeBlockControl.style.top=playerObject.dvs_play_conteiner.clientHeight-158 + "px";
		playerObject.neoVolumeBlockControl.style.backgroundImage="url('dvs/images/backvolumecontrol_neo.png')";
		
		playerObject.volumepic.SetXYdrag(false, true);

		playerObject.volumecontrol.shadeControl.style.position = "absolute";
		playerObject.volumecontrol.shadeControl.style.left = "5px";
		playerObject.volumecontrol.shadeControl.style.width="3px";
		//playerObject.volumecontrol.shadeControl.style.backgroundColor="#f2540e";
		playerObject.volumecontrol.shadeControl.style.height=playerObject.volumecontrol.clientHeight-playerObject.volumepicMarker.offsetTop-playerObject.volumepicMarker.clientHeight+3+"px";
		playerObject.volumecontrol.shadeControl.style.top=playerObject.volumepicMarker.offsetTop+playerObject.volumepicMarker.clientHeight-3+"px";
		
		playerObject.poscontrol.shadeControl.style.position = "absolute";
		playerObject.poscontrol.shadeControl.style.left = "0px";
        playerObject.poscontrol.shadeControl.style.top = "2px";
		playerObject.poscontrol.shadeControl.style.height="4px";
		//playerObject.poscontrol.shadeControl.style.backgroundColor="#f2540e";
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
		
		this.DisplayVolumeControl(playerObject);
		this.DisplayVolumePicMarker(playerObject);
		
		playerObject.dvsplayer.volume=playerObject.settings.startVolume;
		this.OnVolumeChanged(playerObject);
		
		
		//separators
		this.Separators[1].style.height="15px";
		this.Separators[1].style.width="1px";
		//this.Separators[1].style.backgroundColor="#999999";
		this.Separators[1].style.position="absolute";
		this.Separators[1].style.left="33px";
		this.Separators[1].style.top= "6px";
	
		this.Separators[2].style.height="15px";
		this.Separators[2].style.width="1px";
		//this.Separators[2].style.backgroundColor="#999999";
		this.Separators[2].style.position="absolute";
		this.Separators[2].style.left="60px";
		this.Separators[2].style.top= "6px";

		this.Separators[3].style.height="15px";
		this.Separators[3].style.width="1px";
		//this.Separators[3].style.backgroundColor="#999999";
		this.Separators[3].style.position="absolute";
		this.Separators[3].style.left=playerObject.dvsplayer.clientWidth -46 +"px";
		this.Separators[3].style.top= "6px";
		
		playerObject.FullScreenModeButton.style.position = "absolute";
		playerObject.FullScreenModeButton.style.left = (playerObject.dvsplayer.clientWidth-36-25) + "px";
        playerObject.FullScreenModeButton.style.top = "6px";
		playerObject.FullScreenModeButton.style.height="15px";
		playerObject.FullScreenModeButton.style.width="21px";
		playerObject.FullScreenModeButton.style.backgroundImage = "url('dvs/images/fullscreen_neo.png')";
		
		playerObject.neoVolumeBlockControl.style.display="none";
		playerObject.MuteButton.onmouseover=function () {this.dvspl.Skin.OnMuteMouseOver(this.dvspl);}	
	}
	

    this.SetPlayButton_activeState = function (playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "40px";
        playerObject.PlayPauseButton.style.top = "6px";
        playerObject.PlayPauseButton.style.width = "15px";
        playerObject.PlayPauseButton.style.height = "15px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/playbutton_neo.png') 0px -15px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }


    this.SetPlayButton_unactiveState = function SetPlayButton_unactiveState(playerObject) {
        playerObject.PlayPauseButton.style.position = "absolute";
        playerObject.PlayPauseButton.style.left = "40px";
        playerObject.PlayPauseButton.style.top = "6px";
        playerObject.PlayPauseButton.style.width = "15px";
        playerObject.PlayPauseButton.style.height = "15px";
        playerObject.PlayPauseButton.style.background = "transparent url('dvs/images/playbutton_neo.png') 0px 0px";
        playerObject.PlayPauseButton.style.cursor = "pointer";
    }

    this.SetMuteButton_activeState = function (playerObject) {
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left = (playerObject.settings.width-72-25)+"px";
        playerObject.MuteButton.style.top =  "6px";
        playerObject.MuteButton.style.width = "17px";
        playerObject.MuteButton.style.height = "15px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_neo.png') 0px -15px";
        playerObject.MuteButton.style.cursor = "pointer";
    }

    this.SetMuteButton_unactiveState = function (playerObject) {
        playerObject.MuteButton.style.position = "absolute";
        playerObject.MuteButton.style.left =  (playerObject.settings.width-72-25)+"px";
        playerObject.MuteButton.style.top = "6px";
        playerObject.MuteButton.style.width = "17px";
        playerObject.MuteButton.style.height = "15px";
        playerObject.MuteButton.style.background = "transparent url('dvs/images/mutebutton_neo.png') 0px 0px";
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
		playerObject.volumecontrol.style.width = "13px";
        playerObject.volumecontrol.style.height = "123px";
		playerObject.volumecontrol.style.backgroundColor="transparent";
		playerObject.volumecontrol.style.backgroundImage="url('dvs/images/volcontrol_neo.png')";
		playerObject.volumecontrol.style.top="4px";
		playerObject.volumecontrol.style.left="6px";
		playerObject.volumecontrol.style.cursor="pointer";
		
	}
	
	this.DisplayVolumePicMarker = function (playerObject)
	{
		playerObject.volumepicMarker.style.display="block";
		playerObject.volumepicMarker.style.position="absolute";
		playerObject.volumepicMarker.style.width = "13px";
		playerObject.volumepicMarker.style.border = "none";
        playerObject.volumepicMarker.style.height = "9px";
		playerObject.volumepicMarker.style.left="0px";
		playerObject.volumepicMarker.style.backgroundColor="transparent";
		playerObject.volumepicMarker.style.backgroundImage="url('dvs/images/volpic_neo.png')";
		playerObject.volumepicMarker.style.cursor = "pointer";
	}
	
	// Create and display PositionControl object
	this.DisplayPositionControl = function (playerObject) {
		playerObject.poscontrol.style.display="block";
		playerObject.poscontrol.style.position="absolute";
		playerObject.poscontrol.style.width = playerObject.settings.width-83-95+"px";
        playerObject.poscontrol.style.height = "8px";
		playerObject.poscontrol.style.backgroundColor="transparent";
		playerObject.poscontrol.style.backgroundImage="url('dvs/images/backposcontrol.png')";
		playerObject.poscontrol.style.backgroundRepeat="repeat-x";
		playerObject.poscontrol.style.top="10px";
		playerObject.poscontrol.style.left="70px"; //95-25
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

		playerObject.volumecontrol.shadeControl.style.height=playerObject.volumecontrol.clientHeight-playerObject.volumepicMarker.offsetTop-playerObject.volumepicMarker.clientHeight+3+"px";
		playerObject.volumecontrol.shadeControl.style.top=playerObject.volumepicMarker.offsetTop+playerObject.volumepicMarker.clientHeight-3+"px";
		}
	
	}
	
	this.OnPositionChanged = function(playerObject) 
	{
		playerObject.poscontrol.shadeControl.style.width=(playerObject.pospicMarker.offsetLeft+2)+"px";
	}
	
	this.OnMuteMouseOver = function(playerObject) 
	{
		playerObject.neoVolumeBlockControl.style.display="block";
		this.OnVolumeChanged(playerObject);
		
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
