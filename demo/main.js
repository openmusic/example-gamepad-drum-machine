require('webcomponents-lite');
require('openmusic-oscilloscope').register('openmusic-oscilloscope');


var ac = new AudioContext();
var limiter = ac.createDynamicsCompressor();

limiter.connect(ac.destination);

var analyser = ac.createAnalyser();
analyser.connect(limiter);

var oscilloscope = document.querySelector('openmusic-oscilloscope');
oscilloscope.attachTo(analyser);

// Change below depending on what your audio node needs to do:
var SuperGamepadDrumMachine = require('../');
var node = SuperGamepadDrumMachine(ac);
node.connect(analyser);

//make happen ok
node.ready().then(function(){
	node.playSample();
});

var gamepad;
var buttonStates;

window.addEventListener("gamepadconnected", function(e){
	gamepad = e.gamepad;
	buttonStates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  console.log(e.gamepad);
  setInterval(checkButtons, 100);
});

function checkButtons() {
	for (var i = gamepad.buttons.length - 1; i >= 0; i--) {
		if (buttonStates[i] != gamepad.buttons[i].pressed) {
			buttonStates[i] = gamepad.buttons[i].pressed;
			if (gamepad.buttons[i].pressed) {
				node.playSample();
			};
		};
	};
};



