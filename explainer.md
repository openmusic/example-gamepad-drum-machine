<h1>Making a Drum Machine Controller by a USB GamePad using audio-node-template</h1>
<h2>Step 1: Clone the audio-node-template repository</h2>
<p>Put stuff about cloning here</p>
<h3>What's inside audio-node-template</h3>
<h4>index.js</h4>
<pre>
	<code class="language-javascript">
		var setterGetterify = require('setter-getterify');

		module.exports = function(context) {
			
			var node = context.createGain();
			var nodeProperties = {
				propertyA: 'default value for A',
				propertyB: 0.123456,
				propertyC: 0x123456,
				propertyD: { 'also': 'objects are ok too' }
			};

			setterGetterify(node, nodeProperties);

			node.start = function(when, offset, duration) {
				
				console.log('start', 'when', when, 'offset', offset, 'duration', duration);

				when = when !== undefined ? when : 0;
				offset = offset !== undefined ? offset : 0;
				
			};

			node.stop = function(when) {
			};

			node.cancelScheduledEvents = function(when) {
			};

			return node;

		};
	</code>
</pre>