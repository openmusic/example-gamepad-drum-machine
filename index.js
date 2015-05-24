var fs = require('fs');
var SamplePlayer = require('openmusic-sample-player');
var setterGetterify = require('setter-getterify');
var Promise = require('es6-promise').Promise;

module.exports = function(context) {
	
	var node = context.createGain();

	// Set up setters & getters

	var nodeProperties = {
		propertyA: 'default value for A',
		propertyB: 0.123456,
		propertyC: 0x123456,
		propertyD: { 'also': 'objects are ok too' }
	};

	setterGetterify(node, nodeProperties);

	// Set up samples

	var samplePlayers = [];

	var bassDrum = fs.readFileSync(__dirname + '/samples/bassdrum.wav');
	var clap = fs.readFileSync(__dirname + '/samples/clap.wav');
	var cowbell = fs.readFileSync(__dirname + '/samples/cowbell.wav');
	var claves = fs.readFileSync(__dirname + '/samples/claves.wav');
	var maracas = fs.readFileSync(__dirname + '/samples/maracas.wav');
	var hiHatClosed = fs.readFileSync(__dirname + '/samples/hihat_closed.wav');

	var samples = [
		bassDrum,
		clap,
		cowbell,
		claves,
		maracas,
		hiHatClosed
	];

	
	node.start = function(when, offset, duration) {
		
		console.log('start', 'when', when, 'offset', offset, 'duration', duration);

		when = when !== undefined ? when : 0;
		offset = offset !== undefined ? offset : 0;
		
	};

	node.ready = function() {
		// return new Promise(function(resolve, reject){
		// 	context.decodeAudioData(arrayBuffer, function(buffer) {
		// 		drumSamplePlayer.buffer = buffer;
		// 		resolve();
		// 	}, function(err) {
		// 		reject(err);
		// 	});
		// });
		var samplesLoaded = [];
		
		// disconnect existing samplers just in case
		samplePlayers.forEach(function(s) {
			s.disconnect();
		});

		// dump them, and let's start again
		samplePlayers = [];
		
		samples.forEach(function(sample, index) {
			var samplePlayer = new SamplePlayer(context);
			var arrayBuffer = sample.toArrayBuffer();
		
			samplePlayers.push(samplePlayer);
			samplePlayer.connect(node);
		
			var sampleLoaded = new Promise(function(resolve, reject) {
				context.decodeAudioData(arrayBuffer, function(buffer) {
					samplePlayer.buffer = buffer;
					resolve(buffer);
				}, function(err) {
					reject(err);
				});
			});

			samplesLoaded.push(sampleLoaded);
		});
		
		return Promise.all(samplesLoaded);
	};

	node.stop = function(when) {
	};

	node.cancelScheduledEvents = function(when) {
	};

	node.playSample = function(sampleIndex) {
		samplePlayers[sampleIndex].start();
	};

	return node;

};
