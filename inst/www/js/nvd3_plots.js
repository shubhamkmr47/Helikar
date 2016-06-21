/*
 *	Contains all the plot functions
 *	MASSIVE TODO: reorganise the variables into SOME consistent system
 */

function makePlot(obj, props) {
	// read.csv
	ocpu.seturl("//public.opencpu.org/ocpu/library/utils/R");

	// plot
	if(obj) {
		var hot = obj.props.data_table;
		var type = obj.props.plot_type;
		var props = obj.props;
		var dataJSON = JSON.stringify(hot.getData());
		var reg = type === "regression";
	}
	else {
		var dataJSON = JSON.stringify(props.data);
		var type = props.type;
	}

	if(type === "regression") type = "scatterChart";

	/*
	 *	Testing NVD3
	 */

	var nvdata = [{key: "Data", values: JSON.parse(dataJSON)}];

	/*
	 *	Slope/intercept
	 */

	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	if(type === "lineChart" || type === "scatterChart") {

		if(reg === true) {
			var slope, intercept;

			var req = ocpu.call("lm", {
				formula: new ocpu.Snippet(props.var_y + " ~ " + props.var_x),
				data: new ocpu.Snippet("jsonlite::fromJSON('" + dataJSON + "')")
			}, function (session) {
				session.getObject(null, {force: true}, function (obj) {
					intercept = obj.coefficients[0];
					slope = obj.coefficients[1];
					console.log(intercept);
					plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name, slope, intercept);

				});
			});
		}
		else {
			plotStandard(dataJSON, type, props.var_x, props.var_y, props.var_g, props.x_name, props.y_name);
		}
	}

	if (type === "plotDendogram") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");
		//var myname = JSON.stringify(dataJSON);

		var myname = '[{"rows":"Mazda RX4","mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.62,"_row":"Mazda RX4"},{"rows":"Mazda RX4 Wag","mpg":21,"cyl":6,"disp":160,"hp":110,"drat":3.9,"wt":2.875,"_row":"Mazda RX4 Wag"},{"rows":"Datsun 710","mpg":22.8,"cyl":4,"disp":108,"hp":93,"drat":3.85,"wt":2.32,"_row":"Datsun 710"},{"rows":"Hornet 4 Drive","mpg":21.4,"cyl":6,"disp":258,"hp":110,"drat":3.08,"wt":3.215,"_row":"Hornet 4 Drive"}]';

		var req = ocpu.rpc("dendogram", {myname: myname}, function(output){
        var dendogramData = output.message;
				alert(dendogramData);
      });

			//if R returns an error, alert the error message
      req.fail(function(){
        alert("Server error: " + req.responseText);
      });
	}

	if (type === "plotKMeans") {

		ocpu.seturl("http://localhost/ocpu/github/shubhamkmr47/Helikar/R");
		//var myname = JSON.stringify(dataJSON);

		var myname = '[[0.0096,0.0283],[0.1053,-0.4595],[-0.1519,-0.3275],[0.0299,-0.1422],[-0.4431,-0.5495],[0.5218,-0.3045],[0.3919,-0.1067],[-0.2034,-0.0542],[0.0907,0.6483],[0.4574,0.0183],[0.3864,-0.1544],[0.175,-0.5264],[0.1139,0.2195],[0.1146,0.4341],[-0.5456,-0.4668],[-0.137,0.5668],[-0.1367,0.2669],[0.3083,0.1026],[-0.5339,-0.4224],[0.0114,0.4013],[0.0563,-0.4791],[0.1473,-0.5208],[0.0644,-0.1285],[-0.0118,0.2024],[0.051,0.2226],[-0.0813,-0.2091],[-0.201,-0.3999],[0.3465,0.1808],[0.056,0.14],[-0.4792,0.3255],[-0.1937,0.2955],[-0.073,-0.0346],[-0.2412,0.1216],[0.3337,-0.1996],[0.1379,0.4444],[0.2814,-0.4178],[0.1038,-0.1664],[0.255,-0.3221],[-0.2745,-0.1017],[-0.0072,-0.0292],[0.2311,-0.0692],[-0.4044,-0.1763],[-0.407,-0.0618],[0.2757,0.0316],[0.3684,0.0814],[0.0149,0.1241],[0.5225,0.1926],[0.0908,-0.1627],[-0.0421,0.3218],[-0.1467,0.0224],[1.2394,0.5003],[0.8019,0.8845],[1.295,0.735],[1.0527,1.4569],[0.814,1.1785],[0.6989,0.577],[0.4427,1.1997],[0.879,0.8012],[1.2741,0.8497],[1.8295,0.8153],[0.9722,0.5095],[1.0712,0.2892],[0.5813,0.6199],[0.922,0.8683],[0.9628,0.7811],[1.3206,0.8219],[0.6911,1.2796],[1.2192,1.2647],[0.7006,0.8767],[0.7398,0.9155],[1.1443,1.2083],[0.5445,1.3173],[1.006,1.0689],[0.6264,0.7918],[0.7061,0.8204],[1.5248,1.2888],[0.6812,0.536],[1.2815,0.805],[1.0439,1.3041],[0.9782,0.9661],[1.2339,0.8383],[0.6874,1.2527],[0.8016,0.9964],[0.7995,1.2135],[1.1569,1.0523],[0.9173,0.8672],[0.6772,1.1078],[1.2194,0.8569],[1.3936,1.0115],[0.9701,0.9463],[1.8212,1.0501],[0.8998,0.77],[0.9107,0.8587],[1.1183,1.2319],[0.9565,1.4298],[0.67,1.1888],[0.4177,1.4679],[0.4863,0.8034],[0.8533,0.796],[0.5229,1.0662]]';

		var req = ocpu.rpc("kmeansClustring", {myname: myname}, function(output){
				var kmeansData = output.message;
				alert(kmeansData);
			});

			//if R returns an error, alert the error message
			req.fail(function(){
				alert("Server error: " + req.responseText);
			});
	}

	if(type === "discreteBarChart")
		plotBar(dataJSON, type, props.var_x, props.var_y);

	if(type === "histogram")
		plotHist(dataJSON, props.var_x, props.var_g);

	if(type === "boxChart")
		plotBox(dataJSON, type, props.var_g, props.var_x, props.x_name, props.y_name);

	/*
	 *	Done testing
	 */

}

function plotHist(array, var_x, var_g) {

	data = JSON.parse(array);
	console.log(data);
	elems = data.map(function (x) {
		return x[var_x];
	});
	console.log(elems);
	console.log(var_g);
	ocpu.seturl("//public.opencpu.org/ocpu/library/graphics/R");
	ocpu.call("hist", {
		x: elems,
		plot: new ocpu.Snippet("FALSE"),
		breaks: Number(var_g) || "Sturges"
	}, function (session) {
		session.getObject(null, {force: true}, function (obj) {
			vals = [];
			mids = obj["mids"];
			counts = obj["counts"];
			mids.forEach(function (d, n) {
				vals.push({"label": d, "value": counts[n]});
			})
			out = [{'key': 'out', 'values': vals}];
			console.log(out);

			d3.selectAll("svg > *").remove();

		 	nv.addGraph(function() {

				var chart = nv.models.discreteBarChart()
				.x(function(d) { return d.label })    //Specify the data accessors.
				.y(function(d) { return d.value })
				.color(d3.scale.category10().range())
				;

				chart.yAxis.tickFormat(d3.format(',.0d'));

				d3.select('#plot-panel')
				.datum(out)
				.call(chart);

				nv.utils.windowResize(chart.update);

				return chart;
			}.bind(this));
		}.bind(this))
	}.bind(this))
}

function plotBar(array, type, var_x, var_y) {

	data = JSON.parse(array);

	vals = [];
	obj = {};
	data.forEach(function (d) {
		vals.push({"x" : d[var_y], "y": d[var_x]});
	});

	out = [{'key': 'out', 'values': vals}];
	console.log(out);

	d3.selectAll("svg > *").remove();

 	nv.addGraph(function() {

		var chart = nv.models[type]()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.value })
		.color(d3.scale.category10().range())
		;

		d3.select('#plot-panel')
		.datum(out)
		.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	}.bind(this));
}

/*
 *  NVD3 data format:
 *     [{key: "group_name", values: [group_elements]}, ...]
 */

function buildData(array, group, slope, intercept) {

	console.log(slope);

    if(!group) {
        return [{key: "Data", values: JSON.parse(array), slope: slope, intercept: intercept}];
    }

    var data = JSON.parse(array);
    var out = [];
    var obj = {}
    data.forEach(function (d) {
        (obj[d[group]] = obj[d[group]] ? obj[d[group]] : []).push(d);
    });

    console.log(obj);

    Object.keys(obj).forEach(function (o) {
        if(o != "null") {
            temp = {key: o, values: obj[o], slope: slope, intercept: intercept};
            out.push(temp);
        }
    });

    return out;
}


function plotStandard(data, type, var_x, var_y, var_g, x_name, y_name, slope, intercept) {
	var myData = buildData(data, var_g, slope, intercept);
    console.log(myData);

	d3.selectAll("svg > *").remove();

 	nv.addGraph(function() {

		var chart = nv.models[type]()
			.x(function(d) { return d[var_x] })    //Specify the data accessors.
			.y(function(d) { return d[var_y] })
			.color(d3.scale.category10().range())
			;

		chart.xAxis.axisLabel(x_name || var_x);
		chart.yAxis.axisLabel(y_name || var_y);

		d3.select('#plot-panel')
			.datum(myData)
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;

	}.bind(this));
}

function realBox(myData, x_name, y_name) {

	console.log(myData);

	d3.selectAll("svg > *").remove();

	nv.addGraph(function() {

		var chart = nv.models.boxPlotChart()
		.x(function(d) { return d.label })    //Specify the data accessors.
		.y(function(d) { return d.values.Q3 })
		.maxBoxWidth(75)
		.staggerLabels(true)
		;

		chart.xAxis.axisLabel(x_name);
		chart.yAxis.axisLabel(y_name);

		d3.select('#plot-panel')
		.datum(myData)
		.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});

}

function plotBox(data, type, var_x, var_y, x_name, y_name) {
	ocpu.seturl("//public.opencpu.org/ocpu/library/stats/R");

	process = [], keys = [];
	var myData = [];

	data = JSON.parse(data);
	categories = _.uniq(data.map(function (d) {
		return d[var_x]
	}));

	categories.forEach(function (x) {
		now = data.filter(function(d) {
			return d[var_x] === x;
		}).map(function(y) {
			return y[var_y]
		});

		if(now[0] !== null)
			process.push({label: x, values: now});
	});

	console.log(process);
	_.initial(process).forEach(function (p) {
		ocpu.call("quantile", {
			x: p.values
		}, function (session) {
			session.getObject(function(out) {
				d = {
					Q1: out[1],
					Q2: out[2],
					Q3: out[3],
					whisker_low: out[0],
					whisker_high: out[4],
					outliers: []
				};
				p.values = d;
				console.log(p);
				myData.push(p);
				console.log(myData);
			});
		});
	});

	var last = _.last(process);

	ocpu.call("quantile", {
		x: last.values
	}, function (session) {
		session.getObject(function(out) {
			d = {
				Q1: out[1],
				Q2: out[2],
				Q3: out[3],
				whisker_low: out[0],
				whisker_high: out[4],
				outliers: []
			};
			last.values = d;
			myData.push(last);
			console.log(myData);

			realBox(myData, x_name, y_name);
		});
	});
}

function plotHierarchical(obj) {

	var data = document.getElementById('plot-panel').innerHTML;
	root = JSON.parse(data);

	var width = 640,
	height = 480;

	var cluster = d3.layout.cluster()
	.size([height - 50, width - 160]);

	var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(40,0)");


	var nodes = cluster.nodes(root),
	links = cluster.links(nodes);

	var link = svg.selectAll(".link")
	.data(links)
	.enter().append("path")
	.attr("class", "link")
	.attr("d", diagonal);

	var node = svg.selectAll(".node")
	.data(nodes)
	.enter().append("g")
	.attr("class", "node")
	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

	node.append("circle")
	.attr("r", 4.5);

	node.append("text")
	.attr("dx", function(d) { return d.children ? 8 : 8; })
	.attr("dy", function(d) { return d.children ? 20 : 4; })
	.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
	.text(function(d) { return d.name; });


	d3.select(self.frameElement).style("height", height + "px");
}
