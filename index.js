/*
	Andor Salga

	Record canvas tool
*/
let _p5;
const DEBUG = true;

let Controls, controls;
let gui;

let cap;
let isRecording = false;
let savedFrames = 0;
let framesToSave = 100;
		
Controls = function() {
  this.saveFrame = () => save()

  this.recordVideo = function() {
    console.log('record video');
    cap.start();
    isRecording = true;
  };
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

function initCapture() {

  controls = new Controls();
  gui = new dat.GUI();
  gui.add(controls, 'saveFrame');
  gui.add(controls, 'recordVideo');

  cap = new CCapture({ format: 'webm', verbose: true, framerate: 30, name: 'test' });
}
