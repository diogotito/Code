function DVS_html5player() {
    ////////////////////////////////////////////////////////////////////////////////////////
    this.dvs_play_conteiner;    				// conteiner for all video player objects
	this.dvs_play_control;    					// conteiner for all control player objects
    this.Skin;      							// Skin for player
	this.VideoTitle="";							// Titile for video source file
    this.settings = new dvsplay_settings();     // settings of player

	// self links
    this.dvspl = this;  // self link to crossobjects event functions
    this.volpic;

    this.dvsplayer; // video playaer object

	////////////////////////////////////////////////////////////////////////////////////////
    // Objects of user control interface
	
    this.currPosDigitalDisplay; 				// digital display of numeric play position
    this.currVolumeDigitalDisplay; 				// digital display of numeric volume position
	
    this.PlayPauseButton;						// Play-Pause button
    this.MuteButton;							// Mute Button
    this.AutoPlayButton;						// autoPlay and revert button
	this.FullScreenModeButton;					// Full screen mode switcher button

    // Objects for volume and position control
    // Markers to volume and position display and control
    this.pospicMarker;      					// object Marker for position displaying
    this.volumepicMarker;   					// object Marker for volume Displaying
	
	// dragable objects to regeln volume and play position
    this.pospic;								// Pic marker for position control
    this.volumepic;								// Pic marker for volume control

    // Object volume control and position control
    this.poscontrol;        					// Object tu display position
    this.volumecontrol;     					// Object to display volume

    ////////////////////////////////////////////////////////////////////////////////////////
	// Initial object function
	
	// Main init player object
    this.Init = function (playerControlID) {
        DVS_AddPlayers(this);  					// Add player to global event function
        this.InitObjects(playerControlID);  	// Create main player objects
		this.Skin.SetSkin(this);				// Set player skin and add additional player objects
			
		// Events for player buttons
		this.PlayPauseButton.dvspl=this;		// Create self link
        this.PlayPauseButton.onclick = function () { this.dvspl.dvsPlayPause(); }
		this.MuteButton.dvspl=this;
        this.MuteButton.onclick = function () { this.dvspl.dvsMute(); }
		this.AutoPlayButton.dvspl=this;
        this.AutoPlayButton.onclick = function () { this.dvspl.dvsautoPlay(); }
		this.FullScreenModeButton.dvspl=this;
		this.FullScreenModeButton.onclick = function () { this.dvspl.FullScreen(); }
		
		this.InitControlVisibility(); // Set visible style and controls from player skin
        this.InitStartDisplayOption(); // Apply start settings and options
    }
	
	this.refresh = function() {
		this.Skin.refresh(this);
		this.InitControlVisibility();  // Set visible style and controls from player skin
        this.InitStartDisplayOption(); // Apply start settings and options
	}
	
	// Create  main player objects
    this.InitObjects = function (dvsplayConteinerID) {
        // init object variables

        this.dvs_play_conteiner = document.getElementById(dvsplayConteinerID);
        if (this.dvs_play_conteiner != null) {
		
			this.dvs_play_conteiner.dvspl=this;
            this.dvs_play_conteiner.style.position = "relative";
			
            var video = this.dvs_play_conteiner.getElementsByTagName('VIDEO');
            if (video.length > 0) {
                this.dvsplayer = video[0];
				this.dvsplayer.dvspl=this;
				if(this.settings.autoSize) {
					this.settings.width=this.dvsplayer.videoWidth;
					this.settings.height=this.dvsplayer.videoHeight;
				}
                this.dvsplayer.width = this.settings.width;
                this.dvsplayer.height = this.settings.height;
				this.dvsplayer.style.position="absolute";
				this.dvsplayer.style.left="0px";
				this.dvsplayer.style.right="0px";
            }
            
			this.dvs_play_control=document.createElement('div');
			this.dvs_play_control.style.position="absolute";
			this.dvs_play_conteiner.appendChild(this.dvs_play_control);
			
			
			this.PlayPauseButton = document.createElement('div');
			this.dvs_play_control.appendChild(this.PlayPauseButton); 
			
            this.MuteButton = document.createElement('div');
			this.dvs_play_control.appendChild(this.MuteButton); 
			
            this.AutoPlayButton = document.createElement('div');
			this.dvs_play_control.appendChild(this.AutoPlayButton); 
			
			this.FullScreenModeButton = document.createElement('div');
			this.dvs_play_control.appendChild(this.FullScreenModeButton); 
				
            this.currPosDigitalDisplay =  document.createElement('input');
			this.dvs_play_control.appendChild(this.currPosDigitalDisplay); 
			
            this.currVolumeDigitalDisplay =  document.createElement('input');
			this.dvs_play_control.appendChild(this.currVolumeDigitalDisplay); 
			
            this.volumecontrol = document.createElement('div');
			this.volumecontrol.dvspl = this;
			this.dvs_play_control.appendChild(this.volumecontrol); 
			
            this.volumepicMarker = document.createElement('div');
			this.volumecontrol.appendChild(this.volumepicMarker); 

                //this.poscontrol = document.getElementById('poscontrol');
            this.poscontrol = document.createElement('div');
			this.poscontrol.dvspl = this;
			this.dvs_play_control.appendChild(this.poscontrol); 
			
            this.pospicMarker = document.createElement('div');
			this.poscontrol.appendChild(this.pospicMarker); 

                // volume regeln control
            var dragObjects = this.volumepicMarker;
            this.volumepic = new DVS_DragObject(dragObjects);
            this.volumepic.SetXYdrag(true, false);
            this.volumepic.onDragMoveOccured = this.ShowCurrentVolumeSet;
            this.volumepic.dvspl = this;
            this.volpic = this.volumepic;

                //this.volumeControl = document.getElementById('volumecontrol');
            this.volumecontrol.ChildPic = this.volumepic;
            this.volumecontrol.onmousedown = DVS_CorrectXYparent;
			this.volumecontrol.onclick= this.VolumeClickChange;
			

                // position regeln and display control
            var dragObjects = this.pospicMarker;
            this.pospic = new DVS_DragObject(dragObjects);
            this.pospic.SetXYdrag(true, false);
            this.pospic.onDragMoveOccured = this.ShowCurrentPosSet;
            this.pospic.dvspl = this;

                //this.poscontrol = document.getElementById('poscontrol');
            this.poscontrol.ChildPic = this.pospic;
            this.poscontrol.onmousedown = DVS_CorrectXYparent;
			this.poscontrol.onclick = this.PositionClickChange;
            //}
        }
    }
	
	// Init visual style controls
    this.InitControlVisibility = function () {
	
		this.dvs_play_conteiner.style.backgroundColor=this.settings.backgroundColor;
		this.dvsplayer.style.backgroundColor=this.settings.backgroundColor;
	
        if (this.settings.displayVolumeDigital) this.currVolumeDigitalDisplay.style.display = "block";
        else this.currVolumeDigitalDisplay.style.display = "none";

        if (this.settings.displayVideoLengthDigitals) 
		{
			this.currPosDigitalDisplay.style.display = "block";
			this.Skin.DisplayPositionDigital(this);
		}
        else 
		{
			this.currPosDigitalDisplay.style.display = "none";
		}

		// MuteButton
        if (this.settings.displayMuteButton) 
		{
			this.MuteButton.style.display = "block";
			if(this.settings.muteButtonAtStart)
			{
				this.Skin.SetMuteButton_activeState(this);
				this.dvsplayer.muted = true;
			}
			else
			{
				this.Skin.SetMuteButton_unactiveState(this);	
				this.dvsplayer.muted = false;
			}
		}
		else
		{
			this.MuteButton.style.display = "none";
		}
		
		// PlayPause Button
        if (this.settings.displayPlayPauseButton)
		{
			this.PlayPauseButton.style.display = "block";
			if(this.settings.autoPlay)
			{
				this.Skin.SetPlayButton_activeState(this);
			}
			else
			{
				this.Skin.SetPlayButton_unactiveState(this);
			}
		}
		else
		{
			this.PlayPauseButton.style.display = "none";
		}
		
		
		// autoPlay button
        if (this.settings.displayAutoPlayButton) 
		{
			this.AutoPlayButton.style.display = "block";
			if(this.settings.autoPlay)
			{
				this.Skin.SetAutoPlayButton_activeState(this);
			}
			else
			{
				this.Skin.SetAutoPlayButton_unactiveState(this);
			}
		}

		
		if (this.settings.displayFullScreenModeButton && browser() == "FF")
		{
			this.FullScreenModeButton.style.display="block";
		}
		else
		{
			this.FullScreenModeButton.style.display="none";
		}

		
		if (this.settings.displayVolumeControl)
		{		
			this.volumecontrol.style.display = "block";
			this.Skin.DisplayVolumeControl(this);
			this.Skin.DisplayVolumePicMarker(this);
        }
		else 
		{ this.volumecontrol.style.display = "none"; }

        if (this.settings.displayTrackBar) 
		{
			this.poscontrol.style.display = "block";
			this.Skin.DisplayPositionControl(this);
			this.Skin.DisplayPositionPicMarker(this);

		}
        else 
		{
			this.poscontrol.style.display = "none";
		}
    }

	// Init start display position 
    this.InitStartDisplayOption = function () {
        // set startposition volume control and play control
		var dragType = this.volpic.GetXYdrag();
            //var dragType = this.GetXYdrag();
        if (dragType.x == true) {
			this.ShowCurrentVolumeSet(this.settings.startVolume, 0);
        }
        if (dragType.y == true) {
			this.ShowCurrentVolumeSet(0,this.settings.startVolume);
        }

        this.ShowCurrentPosSet(this.settings.startPosition, 0);

        // Display starting position
        this.ShowCurrentVolume();

        this.dvsplayer.autoplay = this.settings.autoPlay;
        if (this.settings.autoPlay) {
            // to opera, chrome and safari need to start manualy
            this.dvsplayer.play();
            this.Skin.SetPlayButton_activeState(this);
            this.Skin.SetAutoPlayButton_activeState(this);
        }
    }

    
	////////////////////////////////////////////////////////////////////////////////////////
    // Click PlayPause button
    this.dvsPlayPause = function () {
        if (this.dvsplayer.paused || this.dvsplayer.ended) {
            this.dvsplayer.play();
            this.Skin.SetPlayButton_activeState(this);
        }
        else {
            this.dvsplayer.pause();
            this.Skin.SetPlayButton_unactiveState(this);
        }
    }
	
	this.Play = function () {
        if (this.dvsplayer != null) {
            this.dvsplayer.play();
        }
    }
	
	this.Pause = function () {
        if (this.dvsplayer != null) {
            this.dvsplayer.pause();
        }	
	}
	
	this.Rewing = function () {
        if (this.dvsplayer != null) {
            this.dvsplayer.currentTime=0;
        }	
	}

    // Click Mute button
    this.dvsMute = function () {
        if (this.dvsplayer.muted) {
            this.dvsplayer.muted = false;
            //this.MuteButton.setAttribute('class', 'MuteButton_unactiveState');
            this.Skin.SetMuteButton_unactiveState(this);
        }
        else {
            this.dvsplayer.muted = true;
            //this.MuteButton.setAttribute('class', 'MuteButton_activeState');
            this.Skin.SetMuteButton_activeState(this);
        }
    }

    //Click autoPlay button
    this.dvsautoPlay = function () {
        if (this.dvsplayer.autoplay) {
            this.dvsplayer.autoplay = false;
            //this.AutoPlayButton.setAttribute('class', 'AutoPlayButton_unactiveState');
            this.Skin.AutoPlayButton_unactiveState(this);
        }
        else {
            this.dvsplayer.autoplay = true;
            //this.AutoPlayButton.setAttribute('class', 'AutoPlayButton_activeState');
            this.Skin.AutoPlayButton_activeState(this);
        }
    }

	// Click Full screen button
	this.FullScreen = function () {
		try
		{
			this.dvsplayer.mozRequestFullScreen();
		}
		catch (e)
		{

		}
		
		try
		{
			this.dvsplayer.webkitDisplayingFullscreen=true;
		}
		catch (e)
		{
		
		}
	}

    // show in text field numeric value of volume set and correct volume value in player object	
    this.ShowCurrentVolumeSet = function (x, y) {
        try {
            var dragType = this.volpic.GetXYdrag();
            //var dragType = this.GetXYdrag();
            if (dragType.x == true) {
                this.dvspl.currVolumeDigitalDisplay.value = (x * 100).toFixed(0);
                this.dvspl.dvsplayer.volume = x;
				this.dvspl.Skin.OnVolumeChanged(this.dvspl);
            }

            if (dragType.y == true) {
                this.dvspl.currVolumeDigitalDisplay.value = (y * 100).toFixed(0);
                this.dvspl.dvsplayer.volume = 1-y;
				this.dvspl.Skin.OnVolumeChanged(this.dvspl);
            }
        }
        catch (e) {
        }
    }

    // show in text field numeric value of position set and correct position value in player object
    this.ShowCurrentPosSet = function (x, y) {
        try {
            this.dvspl.currPosDigitalDisplay.value = DVS_secTominsec(x);
            var newPos=this.dvspl.dvsplayer.duration * x;
            if(newPos > 0 && newPos <this.dvspl.dvsplayer.duration)
            {
                this.dvspl.dvsplayer.currentTime = newPos;
				this.dvspl.Skin.OnPositionChanged(this.dvspl);
            }
        }
        catch (e) {
        }
    }

    // Show current position
    this.ShowCurrentPos = function () {
        this.dvspl.currPosDigitalDisplay.value = DVS_secTominsec(this.dvspl.dvsplayer.currentTime);
        this.dvspl.pospicMarker.style.left = (this.dvspl.dvsplayer.currentTime / this.dvspl.dvsplayer.duration) * this.dvspl.poscontrol.offsetWidth + "px";
        if (this.dvspl.dvsplayer.ended) {
            if (this.dvspl.dvsplayer.autoplay) {
                this.dvspl.ShowCurrentPosSet(this.settings.startPosition, 0);
                this.dvspl.dvsplayer.play();
                this.dvspl.Skin.SetPlayButton_activeState(this.dvspl);
            }
            else {
                this.dvspl.Skin.SetPlayButton_unactiveState(this.dvspl);
            }
        }
    }

    this.ShowCurrentVolume = function () {
		this.Skin.OnVolumeChanged(this);
    }

    this.MouseDownOccured = function () {
        this.setAttribute('class', 'downState');
    }
	
	this.PositionClickChange = function (e) {
		var pos = DVS_getElementPosition(this);
		//alert((this.ChildPic.correctX-pos.left)+";"+(this.ChildPic.correctY-pos.top));
		var x = y = 0;
		var e = e || window.event;
 		if (document.attachEvent != null) { // Internet Explorer & Opera
			x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
		} else if (!document.attachEvent && document.addEventListener) { // Gecko
			x = e.clientX + window.scrollX;
			y = e.clientY + window.scrollY;
		} 
		x=x-pos.left;
		y=y-pos.top;
		var position=x/pos.width;
		
		this.dvspl.ShowCurrentPosSet(position,0)
		
		//alert(position);
	}
	
	this.VolumeClickChange = function (e) {
		var pos = DVS_getElementPosition(this);
		var x = y = 0;
		var e = e || window.event;
 		if (document.attachEvent != null) { // Internet Explorer & Opera
			x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
			y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
		} else if (!document.attachEvent && document.addEventListener) { // Gecko
			x = e.clientX + window.scrollX;
			y = e.clientY + window.scrollY;
		} 
		x=x-pos.left;
		y=y-pos.top;
		var volumeX=x/pos.width;
		var volumeY=y/pos.height;
		
		this.dvspl.ShowCurrentVolumeSet(volumeX,volumeY);
    }
	
}

// Init global interval
var DVS_playerObjects = Array();
var DVS_settings_timerImterval = 200;

function DVS_AddPlayers(playerObject) {
    var i = 0;
    if (DVS_playerObjects != null) {
        i = DVS_playerObjects.length;
    }
    DVS_playerObjects[i] = playerObject;
}

var DVS_ShowCurrentPos = function () {

    if (DVS_playerObjects != null) {
        for (var i = 0; i < DVS_playerObjects.length; i++) {
            DVS_playerObjects[i].currPosDigitalDisplay.value = DVS_secTominsec(DVS_playerObjects[i].dvsplayer.currentTime);
            DVS_playerObjects[i].pospicMarker.style.left = (DVS_playerObjects[i].dvsplayer.currentTime / DVS_playerObjects[i].dvsplayer.duration) * DVS_playerObjects[i].poscontrol.offsetWidth - (DVS_playerObjects[i].pospicMarker.offsetWidth/2) + "px";
			DVS_playerObjects[i].Skin.OnPositionChanged(DVS_playerObjects[i]);
            if (DVS_playerObjects[i].dvsplayer.ended) {
				//debugger;
                if (DVS_playerObjects[i].settings.autoRewind) {
                    DVS_playerObjects[i].ShowCurrentPosSet(DVS_playerObjects[i].settings.startPosition, 0);
                    DVS_playerObjects[i].dvsplayer.play();
                    DVS_playerObjects[i].Skin.SetPlayButton_activeState(DVS_playerObjects[i]);
                }
                else {
                    DVS_playerObjects[i].Skin.SetPlayButton_unactiveState(DVS_playerObjects[i]);
                }
            }
			
			if( DVS_playerObjects[i].settings.autoSize ) {
				if (DVS_playerObjects[i].dvsplayer.videoWidth != DVS_playerObjects[i].dvsplayer.width || 
				    DVS_playerObjects[i].dvsplayer.videoHeight != DVS_playerObjects[i].dvsplayer.height) {
				
					DVS_playerObjects[i].dvsplayer.width =DVS_playerObjects[i].dvsplayer.videoWidth;
					DVS_playerObjects[i].dvsplayer.height=DVS_playerObjects[i].dvsplayer.videoHeight;
					DVS_playerObjects[i].settings.width =DVS_playerObjects[i].dvsplayer.videoWidth;
					DVS_playerObjects[i].settings.height=DVS_playerObjects[i].dvsplayer.videoHeight+DVS_playerObjects[i].Skin.controlHeight;
					
					if(DVS_playerObjects[i].Skin.simpleRefresh) {
						DVS_playerObjects[i].Skin.refresh(DVS_playerObjects[i]);
					}
					else {
						DVS_playerObjects[i].refresh();
					}
				}
			}
        }
    }
}

var DVS_timer = window.setInterval(function () { DVS_ShowCurrentPos(); }, DVS_settings_timerImterval);
var DVS_close_timer;








