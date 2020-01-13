/*
	Andor Salga

	Record canvas tool
*/
let _p5;
const DEBUG = true;

let Controls, controls;
let playPauseLabel;
let gui;

let cap;
let isRecording = false;
let savedFrames = 0;
let framesToSave = 50;
let isPlaying = true;


Controls = function() {
  this.saveFrame = function() { save(); }

  this.recordVideo = function() {
    cap.start();
    isRecording = true;
  };

  this.playPause = function() {
    isPlaying = !isPlaying;

    if (isPlaying) {
      playPauseLabel.name('playing');
      loop();
    } else {
      playPauseLabel.name('paused');
      noLoop();
    }
  }
};

function saveVideoFrame() {
  if (isRecording === false) return;

  if (savedFrames === framesToSave) {
    isRecording = false;
    savedFrames = 0;
    cap.stop();
    cap.save();
    return;
  }

  cap.capture(_p5.canvas);
  savedFrames++;
}

function initControls() {
  controls = new Controls();
  window.controls = controls;
  gui = new dat.GUI();
  gui.add(controls, 'saveFrame')
    .name('save frame');
  gui.add(controls, 'recordVideo')
    .name('record video');
  playPauseLabel = gui.add(controls, 'playPause')
    .name('playing');

  cap = new CCapture({ format: 'webm', verbose: true, framerate: 30, name: 'test' });
}