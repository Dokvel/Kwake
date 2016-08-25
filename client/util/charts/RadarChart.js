export function RadarChartFunc(id, data, options) {
	var cfg = {
	 labelFactor: 1.25,
	 dotRadius: 0,
	 strokeWidth: 30
	};

	//Put all of the options into cfg variable
	if('undefined' !== typeof options){
	  for(var i in options){
			if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }
	}

	var maxValue = d3.max(data, function(i){return 5});

	var allAxis = (data[0].map(function(i, j){return i.axis})),
		total = allAxis.length,
		radius = Math.min(cfg.w/2, cfg.h/2),
		Format = d3.format('%'),
		angleSlice = Math.PI * 2 / total;

	// Scale for the radius
	var rScale = d3.scale.linear()
		.range([0, radius])
		.domain([0, maxValue]);

	// Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();

	// Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);

	// Append g element
	var g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

	// Append defs element
	var defines = svg.append('defs');

	// Append glow filter
	var filter = defines.append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	// Append shadow filter
	var filter = defines.append('filter').attr('id', 'shadow');

	var feOffset = filter.append('feOffset')
		.attr('result', 'offOut')
		.attr('in', 'SourceAlpha')
		.attr('dx', '0')
		.attr('dy', '10');

	var feGaussianBlur = filter.append('feGaussianBlur')
		.attr('result', 'blurOut')
		.attr('in', 'offOut')
		.attr('stdDeviation', '10');

	var feBlend = filter.append('feBlend')
		.attr('in', 'SourceGraphic')
		.attr('in2', 'blurOut')
		.attr('mode', 'normal');

	// Append linear gradient
	var gradient = defines.append("linearGradient")
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
	var axisGrid = g.append("g").attr("class", "axisWrapper");

	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()

	//Append the labels at each axis
	axis.append("text")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("fill", "#fefefe")
		.text(function(d){return d})

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////

	//The radial line function
	var radarLine = d3.svg.line.radial()
		.interpolate("cardinal-closed")
		.radius(function(d) { return rScale(d.value); })
		.angle(function(d,i) {	return i*angleSlice; });

	//Create a wrapper for the blobs
	var blobWrapper = g.selectAll(".radarWrapper")
		.data(data)
		.enter().append("g");

	//Create the outlines
	blobWrapper
		.append("path")
		.attr("d", function(d,i) { return radarLine(d); })
		.style("stroke-width", cfg.strokeWidth + "px")
		.style("stroke", function(d,i) { return cfg.color(i); })
		.style("fill", function(d,i) { return cfg.color(i); })
		.style("opacity", function(d,i) { return cfg.opacity(i); })
}
