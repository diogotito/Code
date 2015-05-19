var note_duration = 1;
var timer = 0;

var note = 1;
var instrument = 1;

var notes = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392.00, 415.30, 440.00, 466.16, 493.88, 523.25, 554.37];
var notes2play = [1, 3, 5, 6, 8, 10, 12, 13];

var instruments = [sine_wave, triangle_wave, sawtooth_wave, square_wave];

function dsp(t) {
  timer ++;
  if (timer > 10000) {
    timer = 0;
    note ++;
  }
  if (note > notes2play.length) {
    note = 1;
    instrument ++;
  }
  if (instrument > instruments.length) {
    instrument = 1;
  }
  return instruments[instrument-1](t, notes[notes2play[note-1]], 1);
  //return sawtooth_wave(t, 1, 0.1);
}


/*******************
 * Wave generators *
 *******************/

function square_wave (t, frequence, amplitude=0.1) {
  return (t%(1/frequence) > 0.5/frequence) * amplitude - amplitude/2;
}

function sawtooth_wave (t, frequence, amplitude=0.1) {
  return (1 - (2 * t * frequence) % 2) * amplitude/2;
}

function triangle_wave (t, frequence, amplitude=0.1) {
  return Math.abs(1 - (2 * t * frequence) % 2) * amplitude - amplitude/2;
}

function sine_wave (t, frequence, amplitude=0.1){
  return amplitude/2 * Math.sin(t * 2*Math.PI * frequence);
}


