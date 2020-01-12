let Controls, controls;
let gui;


window._test = function() {
  console.log('test');
}

Controls = function() {
  this.saveFrame = function() {
    console.log('save frame');
    save();
  }
  this.recordVideo = function() {
    console.log('record video');
  };
};

function initCapture() {

  controls = new Controls();
  gui = new dat.GUI();
  gui.add(controls, 'saveFrame');
  gui.add(controls, 'recordVideo');

  cap = new CCapture({ format: 'webm', verbose: true, framerate: 30, name: 'test' });
}