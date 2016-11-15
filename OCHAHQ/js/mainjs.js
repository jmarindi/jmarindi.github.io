	window.onload = function () {
		var chart = new CanvasJS.Chart("chartContainer1", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Family planning satisfied by any method"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				//font-size:30,
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: new Date(2011, 0), y: 63.2},
					{ x: new Date(2012, 0), y: 63.3},
					{ x: new Date(2013, 0), y: 63.4},
					{ x: new Date(2014, 0), y: 63.5},
					{ x: new Date(2015, 0), y: 63.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 42.7},
					{ x: new Date(2012, 0), y: 43.7},
					{ x: new Date(2013, 0), y: 37.8},
					{ x: new Date(2014, 0), y: 39.9},
					{ x: new Date(2015, 0), y: 39.8},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
		var chart = new CanvasJS.Chart("chartContainer2", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Fertility rate"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 6,
					interval: 1,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					
					{ x: 2011, y: 2.5},
					{ x: 2012, y: 2.5},
					{ x: 2013, y: 2.5},
					{ x: 2014, y: 2.5},
					//{ x: new Date(2015, 0), y: 2.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: 2011, y: 4.9},
					{ x: 2012, y: 5.2},
					{ x: 2013, y: 4.2},
					{ x: 2014, y: 3.6},
					//{ x: new Date(2015, 0), y: 3.6}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
		var chart = new CanvasJS.Chart("chartContainer3", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Maternal Mortality rate"
					},
				axisY2: {
					valueFormatString: "0",

					maximum: 700,
					interval: 100,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					
					{ x: new Date(2011, 0), y: 237.0},
					{ x: new Date(2012, 0), y: 232.0},
					{ x: new Date(2013, 0), y: 226.0},
					{ x: new Date(2014, 0), y: 221.0},
					{ x: new Date(2015, 0), y: 216.0}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 545.0},
					{ x: new Date(2012, 0), y: 549.4},
					{ x: new Date(2013, 0), y: 464.2},
					{ x: new Date(2014, 0), y: 364.3},
					{ x: new Date(2015, 0), y: 325.8},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			
			var chart = new CanvasJS.Chart("chartContainer4", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Life Expectancy at Birth"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: 2011, y: 70.8},
					{ x: 2012, y: 71.0},
					{ x: 2013, y: 71.2},
					{ x: 2014, y: 71.5}
					//{ x: new Date(2015, 0), y: 63.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: 2011, y: 54.3},
					{ x: 2012, y: 56.2},
					{ x: 2013, y: 48.9},
					{ x: 2014, y: 47.2},
					//{ x: new Date(2015, 0), y: 39.8},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			
			var chart = new CanvasJS.Chart("chartContainer5", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Mortality rate, under 5"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: new Date(2011, 0), y: 93.1},
					{ x: new Date(2012, 0), y: 92.3},
					{ x: new Date(2013, 0), y: 75.1},
					{ x: new Date(2014, 0), y: 58.3},
					{ x: new Date(2015, 0), y: 51.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 54.3},
					{ x: new Date(2012, 0), y: 56.2},
					{ x: new Date(2013, 0), y: 48.9},
					{ x: new Date(2014, 0), y: 47.2},
					{ x: new Date(2015, 0), y: 39.8},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			var chart = new CanvasJS.Chart("chartContainer6", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Population Growth"
				},
				axisY2: {
					valueFormatString: "0.0",

					maximum: 4,
					interval: 0.5,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: new Date(2011, 0), y: 1.2},
					{ x: new Date(2012, 0), y: 1.2},
					{ x: new Date(2013, 0), y: 1.2},
					{ x: new Date(2014, 0), y: 1.2},
					{ x: new Date(2015, 0), y: 1.2}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 2.5},
					{ x: new Date(2012, 0), y: 2.5},
					{ x: new Date(2013, 0), y: 1.9},
					{ x: new Date(2014, 0), y: 1.7},
					{ x: new Date(2015, 0), y: 1.6},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			
				var chart = new CanvasJS.Chart("chartContainer7", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Improved Water Source"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: new Date(2011, 0), y: 88.9},
					{ x: new Date(2012, 0), y: 89.5},
					{ x: new Date(2013, 0), y: 90.1},
					{ x: new Date(2014, 0), y: 90.6},
					{ x: new Date(2015, 0), y: 91.0}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 54.5},
					{ x: new Date(2012, 0), y: 57.2},
					{ x: new Date(2013, 0), y: 43.2 },
					{ x: new Date(2014, 0), y: 43.1},
					{ x: new Date(2015, 0), y: 40.5},
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			var chart = new CanvasJS.Chart("chartContainer8", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Improved sanitation facilities"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					{ x: new Date(2011, 0), y: 65.3},
					{ x: new Date(2012, 0), y: 65.9},
					{ x: new Date(2013, 0), y: 66.5},
					{ x: new Date(2014, 0), y: 67.0},
					{ x: new Date(2015, 0), y: 67.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 24.3},
					{ x: new Date(2012, 0), y: 28.4},
					{ x: new Date(2013, 0), y: 22.5},
					{ x: new Date(2014, 0), y: 26.8},
					{ x: new Date(2015, 0), y: 27.1}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			var chart = new CanvasJS.Chart("chartContainer9", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Immunization, Measles"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 100,
					interval: 20,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					//{ x: new Date(2012, 07, 1), y: 28, indexLabel: "loss", markerType: "circle", markerColor: "tomato", markerSize: 12 },
					{ x: new Date(2011, 0), y: 84.8},
					{ x: new Date(2012, 0), y: 84.5},
					{ x: new Date(2013, 0), y: 84.2},
					{ x: new Date(2014, 0), y: 84.5},
					{ x: new Date(2015, 0), y: 84.8}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 69.6},
					{ x: new Date(2012, 0), y: 66.8},
					{ x: new Date(2013, 0), y: 53.0},
					{ x: new Date(2014, 0), y: 49.9},
					{ x: new Date(2015, 0), y: 49.0}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						//chart.render();
					}
				}
			});
   chart.render();	

			var chart = new CanvasJS.Chart("chartContainer10", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "GDP Growth"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 5,
					interval: 1,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					//{ x: new Date(2012, 07, 1), y: 28, indexLabel: "loss", markerType: "circle", markerColor: "tomato", markerSize: 12 },
					{ x: new Date(2011, 0), y: 3.1},
					{ x: new Date(2012, 0), y: 2.5},
					{ x: new Date(2013, 0), y: 2.4},
					{ x: new Date(2014, 0), y: 2.6},
					{ x: new Date(2015, 0), y: 2.5}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 2.8},
					{ x: new Date(2012, 0), y: 4.5},
					{ x: new Date(2013, 0), y: 2.2},
					{ x: new Date(2014, 0), y: 2.6},
					{ x: new Date(2015, 0), y: 1.2}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						//chart.render();
					}
				}
			});
   chart.render();	   
   var chart = new CanvasJS.Chart("chartContainer11", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Unemployment"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 10,
					interval: 2,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					//{ x: new Date(2012, 07, 1), y: 28, indexLabel: "loss", markerType: "circle", markerColor: "tomato", markerSize: 12 },
					{ x: new Date(2011, 0), y: 6.0},
					{ x: new Date(2012, 0), y: 6.0},
					{ x: new Date(2013, 0), y: 6.0},
					{ x: new Date(2014, 0), y: 5.9},
					{ x: new Date(2015, 0), y: 5.9}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 7.9},
					{ x: new Date(2012, 0), y: 7.0},
					{ x: new Date(2013, 0), y: 6.2},
					{ x: new Date(2014, 0), y: 6.5},
					{ x: new Date(2015, 0), y: 6.5}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						//chart.render();
					}
				}
			});
   chart.render();	   
   var chart = new CanvasJS.Chart("chartContainer12", {
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Prevalence of undernourishment"
				},
				axisY2: {
					valueFormatString: "0",

					maximum: 20,
					interval: 5,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
					//tickColor: "#0000ff"
				},
				theme: "theme1",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "World Average",
					dataPoints: [
					//{ x: new Date(2012, 07, 1), y: 28, indexLabel: "loss", markerType: "circle", markerColor: "tomato", markerSize: 12 },
					{ x: new Date(2011, 0), y: 11.8},
					{ x: new Date(2012, 0), y: 11.4},
					{ x: new Date(2013, 0), y: 11.2},
					{ x: new Date(2014, 0), y: 11.0},
					{ x: new Date(2015, 0), y: 10.8}
					
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Country in Need",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2011, 00), y: 15.4},
					{ x: new Date(2012, 0), y: 14.2},
					{ x: new Date(2013, 0), y: 11.1},
					{ x: new Date(2014, 0), y: 10.2},
					{ x: new Date(2015, 0), y: 9.8}
					]
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						//chart.render();
					}
				}
			});
   chart.render();	   
		}
