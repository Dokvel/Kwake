import _ from 'lodash';

export function RadarChartFunc(id, data, options) {
	let width = 300;
	let height = 300;

	let cfg = {
	 labelFactor: 1.25,
	 strokeWidth: 30
	};

	//Put all of the options into cfg variable
	if('undefined' !== typeof options){
	  for(let i in options){
			if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }
	}

	let maxValue = d3.max(data, function(i) {return 5});

	let allAxis = (data[0].map(function(i, j) {return i.axis})),
		total = allAxis.length,
		radius = Math.min(width/2, height/2),
		angleSlice = Math.PI * 2 / total;

	// Scale for the radius
	let rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);

	// Initiate the radar chart SVG
  d3.select("#radarChartSVG").remove();
	let svg = d3.select(id).append("svg")
		.attr("id", "radarChartSVG")
		.attr("viewBox", "0 0 "+ width * 1.33 +" "+ height * 1.33)

	// Append g element
	let g = svg.append("g")
		.attr("transform", "translate(" + (width/1.5) + "," + (height/1.5) + ")");

	// Append defs element
	let defines = svg.append('defs');

	// Append glow filter
	let filter = defines.append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur')
			.attr('stdDeviation','1')
			.attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	// Append linear gradient
	let gradient = defines.append("linearGradient")
	  .attr("id", "gradient")
	  .attr("x1", "0%")
	  .attr("y1", "100%")
	  .attr("x2", "100%")
	  .attr("y2", "0%")
	  .attr("spreadMethod", "pad");
	gradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "rgb(239,177,105)")
    .attr("stop-opacity", 1);
	gradient.append("stop")
    .attr("offset", "83%")
    .attr("stop-color", "rgb(255,80,104)")
    .attr("stop-opacity", 1);
	gradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "rgb(255,80,104)")
    .attr("stop-opacity", 1);

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////

	//Wrapper for the axes
	let axisGrid = g.append("g").attr("class", "axisWrapper");

	//Create the straight lines radiating outward from the center
	let axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()

	//Append the labels at each axis
	axis.append("text")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){
			return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2);
		})
		.attr("y", function(d, i){
			return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2);
		})
		.attr("fill", "#fefefe")
		.text(function(d){return d})

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	let radarLine = d3.svg.line.radial()
		.interpolate("cardinal-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) { return i*angleSlice; });

	//The morphing radial line function
	let morphingRadarLine = d3.svg.line.radial()
		.interpolate("cardinal-closed")
		.radius(function(d) { return rScale(d.value * _.random(mult[0], mult[1])); })
		.angle(function(d,i) { return i*angleSlice; });

	//Create a wrapper for the blobs
	let blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g");

	//Create the outlines
	blobWrapper
		.append("path")
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("filter" , function(d,i) { return cfg.filter(i); })
		.style("opacity", function(d,i) { return cfg.opacity(i); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.attr("d", function(d,i) { return radarLine(d); })
		.attr('class', function(d,i) { return 'animation-' + cfg.animation(i); })

	let mult;

	d3.select('.animation-morphing')
		.each(morph);

	function morph() {
		let path = d3.select(this);
		(function repeat() {
	    path = path.transition()
        .duration(5000)
				.ease("linear")
				.attr("d", function(d,i) {
					if (cfg.color(i) === '#B2C4FF' && cfg.animation(i) === 'morphing') {
						mult = [.66, 1.66];
						return morphingRadarLine(d, mult);
					} else {
						mult = [.8, 1.2];
						return morphingRadarLine(d, mult);
					}
				})
        .each("end", repeat);
	  })();
	}
}
