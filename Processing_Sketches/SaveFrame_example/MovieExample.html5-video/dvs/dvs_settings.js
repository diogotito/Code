function dvsplay_settings () {
// Basic parameters
this.width=600;							// Player's width
this.height = 400;						// Player's height including control panel

this.backgroundColor="#000000";			// Player's fill color, in RGB format. E.g. "#0000FF" - blue
this.controlBackgroundColor="#333333";

// Parameter affecting visibility of controls
this.displayMuteButton = true;			// Display/hide Mute button. true - display, false - do not display
this.displayPlayPauseButton = true;		// Display/hide Play/Pause button. true - display, false - do not display
this.displayAutoPlayButton = true;		// Display/hide AutoPlay button. true - display, false - do not display
this.displayFullScreenModeButton = true;

this.displayVolumeControl = true;		// Display/hide volume control button. true - display, false - do not display
this.displayTrackBar = true;			// Display/hide control of playback position. true - display, false - do not display

this.displayVolumeDigital = true; 		// Display/hide digital volume control. true - display, false - do not display
this.displayVideoLengthDigitals = true; // Display/hide digital control of playback position. true - display, false - do not display

// Parameters of the initial state of the player
this.startVolume = 0.5; 				// Initial volume level. Values from 0 (no sound) to 1 (maximum volume)
this.startPosition = 0; 				// Initial position of playback. Values from 0 (the beginning of clip) to 1 (the end of clip)
this.muteButtonAtStart = false; 		// Initial state of Mute button. true – no sound, false – function not activated

this.autoRewind = true; 				// Automatic rewind. true - automatic rewind starts at the end of the clip, the video starts again, false - at the end of video playback stops.
this.autoPlay = true; 		    		// Auto-play. true - playback starts automatically after the page is loaded, false - playback starts when the button is pressed

this.autoSize=false;					// setup size of player by video size
}