var fs = require('fs');
var SamplePlayer = require('openmusic-sample-player');
var setterGetterify = require('setter-getterify');
var Promise = require('es6-promise').Promise;

module.exports = function(context) {
	
	var node = context.createGain();
	var nodeProperties = {
		propertyA: 'default value for A',
		propertyB: 0.123456,
		propertyC: 0x123456,
		propertyD: { 'also': 'objects are ok too' }
	};
	var drumSamplePlayer = SamplePlayer(context);
	var bassDrum = fs.readFileSync(__dirname + '/samples/bassdrum.wav');
	var arrayBuffer = bassDrum.toArrayBuffer();

	setterGetterify(node, nodeProperties);

	node.start = function(when, offset, duration) {
		
		console.log('start', 'when', when, 'offset', offset, 'duration', duration);

		when = when !== undefined ? when : 0;
		offset = offset !== undefined ? offset : 0;
		
	};

	node.ready = function() {
		return new Promise(function(resolve, reject){
			context.decodeAudioData(arrayBuffer, function(buffer) {
				drumSamplePlayer.buffer = buffer;
				resolve();
			}, function(err) {
				reject(err);
			});
		});
	};

	node.stop = function(when) {
	};

	node.cancelScheduledEvents = function(when) {
	};

	node.playSample = function(sampleName) {
		console.log("hiiii");
	};

	return node;

};
