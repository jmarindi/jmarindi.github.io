 /*MAIN JS;
 
		 */
		 var Relocated_dataPoints = [
					{ x: new Date(2001, 0), y: 0.90 },
					{ x: new Date(2002, 0), y: 0.25 },
					{ x: new Date(2003, 0), y: 0.30 },
					{ x: new Date(2004, 0), y: 0.28 },
					{ x: new Date(2005, 0), y: 0.33 },
					{ x: new Date(2006, 0), y: 0.35 },
					{ x: new Date(2007, 0), y: 0.40 },
					{ x: new Date(2008, 0), y: 0.42 },
					{ x: new Date(2009, 0), y: 0.33 },
					{ x: new Date(2010, 0), y: 0.44 },
					{ x: new Date(2011, 0), y: 0.60 },
					{ x: new Date(2012, 0), y: 0.47 },
					{ x: new Date(2013, 0), y: 0.75 },
					{ x: new Date(2014, 0), y: 0.60 },
					{ x: new Date(2015, 0), y: 0.66 },
					{ x: new Date(2016, 0), y: 0.68 }
					];
					
		 var deaths_dataPoints = [
					{ x: new Date(2001, 0), y: 0.90 },
					{ x: new Date(2002, 0), y: 0.25 },
					{ x: new Date(2003, 0), y: 0.30 },
					{ x: new Date(2004, 0), y: 0.28 },
					{ x: new Date(2005, 0), y: 0.33 },
					{ x: new Date(2006, 0), y: 0.35 },
					{ x: new Date(2007, 0), y: 0.40 },
					{ x: new Date(2008, 0), y: 0.42 },
					{ x: new Date(2009, 0), y: 0.33 },
					{ x: new Date(2010, 0), y: 0.44 },
					{ x: new Date(2011, 0), y: 0.60 },
					{ x: new Date(2012, 0), y: 0.47 },
					{ x: new Date(2013, 0), y: 0.75 },
					{ x: new Date(2014, 0), y: 0.60 },
					{ x: new Date(2015, 0), y: 0.66 },
					{ x: new Date(2016, 0), y: 0.68 }
					];			
		 

		function chartdrawer(){
			var chart = new CanvasJS.Chart("chart1", {	
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Human Impact  ('000's')"
				},
				axisY2: {
					valueFormatString: "0.0 ",

					maximum: 2.2,
					interval: .2,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
				},
				theme: "theme2",
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
					name: "Relocated",
					dataPoints:Relocated_dataPoints
				/*	dataPoints: [
					{ x: new Date(2001, 0), y: 0.20 },
					{ x: new Date(2002, 0), y: 0.25 },
					{ x: new Date(2003, 0), y: 0.30 },
					{ x: new Date(2004, 0), y: 0.28 },
					{ x: new Date(2005, 0), y: 0.33 },
					{ x: new Date(2006, 0), y: 0.35 },
					{ x: new Date(2007, 0), y: 0.40 },
					{ x: new Date(2008, 0), y: 0.42 },
					{ x: new Date(2009, 0), y: 0.33 },
					{ x: new Date(2010, 0), y: 0.44 },
					{ x: new Date(2011, 0), y: 0.60 },
					{ x: new Date(2012, 0), y: 0.47 },
					{ x: new Date(2013, 0), y: 0.75 },
					{ x: new Date(2014, 0), y: 0.60 },
					{ x: new Date(2015, 0), y: 0.66 },
					{ x: new Date(2016, 0), y: 0.68 }
					] */
				},
				
				{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "Evacuated",
					dataPoints: [
					{ x: new Date(2001, 0), y: 0 },
					{ x: new Date(2002, 0), y: 0.001 },
					{ x: new Date(2003, 0), y: 0.01 },
					{ x: new Date(2004, 0), y: 0.05 },
					{ x: new Date(2005, 0), y: 0.1 },
					{ x: new Date(2006, 0), y: 0.15 },
					{ x: new Date(2007, 0), y: 0.22 },
					{ x: new Date(2008, 0), y: 0.38 },
					{ x: new Date(2009, 0), y: 0.56 },
					{ x: new Date(2010, 0), y: 0.77 },
					{ x: new Date(2011, 0), y: 0.91 },
					{ x: new Date(2012, 0), y: 0.94 },
					{ x: new Date(2013, 0), y: 0.91 },
					{ x: new Date(2014, 0), y: 0.94 },
					{ x: new Date(2015, 0), y: 0.91 },
					{ x: new Date(2016, 0), y: 0.94 }
					]
				},
				
				{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "Deaths",
					dataPoints:CS_Deaths
					/*dataPoints: [
					{ x: new Date(2001, 0), y: 0 },
					{ x: new Date(2002, 0), y: 0.001 },
					{ x: new Date(2003, 0), y: 0.004 },
					{ x: new Date(2004, 0), y: 0.006 },
					{ x: new Date(2005, 0), y: 0.01 },
					{ x: new Date(2006, 0), y: 0.12 },
					{ x: new Date(2007, 0), y: 0.15 },
					{ x: new Date(2008, 0), y: 0.18 },
					{ x: new Date(2009, 0), y: 0.16 },
					{ x: new Date(2010, 0), y: 0.20 },
					{ x: new Date(2011, 0), y: 0.22 },
					{ x: new Date(2012, 0), y: 0.24 },
					{ x: new Date(2013, 0), y: 0.31 },
					{ x: new Date(2014, 0), y: 0.30 },
					{ x: new Date(2015, 0), y: 0.37 },
					{ x: new Date(2016, 0), y: 0.33 }
					] */
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Displaced",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2001, 00), y: 0.18 },
					{ x: new Date(2002, 00), y: 0.2 },
					{ x: new Date(2003, 0), y: 0.25 },
					{ x: new Date(2004, 0), y: 0.35 },
					{ x: new Date(2005, 0), y: 0.42 },
					{ x: new Date(2006, 0), y: 0.5 },
					{ x: new Date(2007, 0), y: 0.58 },
					{ x: new Date(2008, 0), y: 0.67 },
					{ x: new Date(2009, 0), y: 0.78 },
					{ x: new Date(2010, 0), y: 0.88 },
					{ x: new Date(2011, 0), y: 0.98 },
					{ x: new Date(2012, 0), y: 1.04 },
					{ x: new Date(2013, 0), y: 1.12 },
					{ x: new Date(2014, 0), y: 1.14 },
					{ x: new Date(2015, 0), y: 1.07 },
					{ x: new Date(2016, 0), y: 1.20 }
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Missing",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2001, 00), y: 0.16 },
					{ x: new Date(2002, 0), y: 0.17 },
					{ x: new Date(2003, 0), y: 0.18 },
					{ x: new Date(2004, 0), y: 0.19 },
					{ x: new Date(2005, 0), y: 0.20 },
					{ x: new Date(2006, 0), y: 0.23 },
					{ x: new Date(2007, 0), y: 0.261 },
					{ x: new Date(2008, 0), y: 0.289 },
					{ x: new Date(2009, 0), y: 0.3 },
					{ x: new Date(2010, 0), y: 0.31 },
					{ x: new Date(2011, 0), y: 0.32 },
					{ x: new Date(2012, 0), y: 0.33 }
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Injured and sick",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2001, 00), y: 0.20 },
					{ x: new Date(2002, 0), y: 0.24 },
					{ x: new Date(2003, 0), y: 0.25 },
					{ x: new Date(2004, 0), y: 0.28 },
					{ x: new Date(2005, 0), y: 0.30 },
					{ x: new Date(2006, 0), y: 0.34 },
					{ x: new Date(2007, 0), y: 0.36 },
					{ x: new Date(2008, 0), y: 0.39 },
					{ x: new Date(2009, 0), y: 0.42 },
					{ x: new Date(2010, 0), y: 0.43 },
					{ x: new Date(2011, 0), y: 0.45 },
					{ x: new Date(2012, 0), y: 0.47 }
					]
				},
				
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Affected",
					axisYType: "secondary",
					dataPoints: [
					{ x: new Date(2001, 00), y: 0.11 },
					{ x: new Date(2002, 0), y: 0.15 },
					{ x: new Date(2003, 0), y: 0.16 },
					{ x: new Date(2004, 0), y: 0.19 },
					{ x: new Date(2005, 0), y: 0.14 },
					{ x: new Date(2006, 0), y: 0.18 },
					{ x: new Date(2007, 0), y: 0.24 },
					{ x: new Date(2008, 0), y: 0.20 },
					{ x: new Date(2009, 0), y: 0.28 },
					{ x: new Date(2010, 0), y: 0.30 },
					{ x: new Date(2011, 0), y: 0.33 },
					{ x: new Date(2012, 0), y: 0.36 }
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
			
					
			var chart = new CanvasJS.Chart("chart2", {	
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Physical Impact"
				},
				axisY2: {
					valueFormatString: "0.0 ",                     
					maximum: 1.2,
					interval: .2,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
				},
				axisX:{
                valueFormatString: "#"
                 },
				theme: "theme2",
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
					name: "Houses Damaged",
				dataPoints: [
					{ x: 2001, y: 0 },
					{ x: 2002, y: 0.001 },
					{ x: 2003, y: 0.01 },
					{ x: 2004, y: 0.05 },
					{ x: 2005, y: 0.1 },
					{ x: 2006, y: 0.15 },
					{ x: 2007, y: 0.22 },
					{ x: 2008, y: 0.38 },
					{ x: 2009, y: 0.56 },
					{ x: 2010, y: 0.77 },
					{ x: 2011, y: 0.91 },
					{ x: 2012, y: 0.94 }
					] 
					
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Houses destroyed",
					axisYType: "secondary",
				dataPoints: [
					{ x: 2001, y: 0.18 },
					{ x: 2002, y: 0.2 },
					{ x: 2003, y: 0.25 },
					{ x: 2004, y: 0.35 },
					{ x: 2005, y: 0.42 },
					{ x: 2006, y: 0.5 },
					{ x: 2007, y: 0.58 },
					{ x: 2008, y: 0.67 },
					{ x: 2009, y: 0.78 },
					{ x: 2010, y: 0.88 },
					{ x: 2011, y: 0.98 },
					{ x: 2012, y: 1.04 }
					]
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "crops (Ha)",
					axisYType: "secondary",
					valueFormatString:  "#",
					dataPoints: [
					{ x: 2001, y: 0.16 },
					{ x: 2002, y: 0.17 },
					{ x: 2003, y: 0.18 },
					{ x: 2004, y: 0.19 },
					{ x: 2005, y: 0.20 },
					{ x: 2006, y: 0.23 },
					{ x: 2007, y: 0.261 },
					{ x: 2008, y: 0.289 },
					{ x: 2009, y: 0.3 },
					{ x: 2010, y: 0.31 },
					{ x: 2011, y: 0.32 },
					{ x: 2012, y: 0.33 }
					]   
				
				} ,
								{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Roads affected (Mts)",
					axisYType: "secondary",
					valueFormatString:  "#",
					dataPoints: [
					{ x: 2001, y: 0.20 },
					{ x: 2002, y: 0.50 },
					{ x: 2003, y: 0.60 },
					{ x: 2004, y: 0.40 },
					{ x: 2005, y: 0.30 },
					{ x: 2006, y: 0.66 },
					{ x: 2007, y: 0.70 },
					{ x: 2008, y: 0.78 },
					{ x: 2009, y: 0.80 },
					{ x: 2010, y: 0.90 },
					{ x: 2011, y: 0.70 },
					{ x: 2012, y: 0.70 }
					]   
				
				} ,
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Hospitals",
					axisYType: "secondary",
					valueFormatString:  "#",
					dataPoints: [
					{ x: 2001, y: 0.05 },
					{ x: 2002, y: 0.10 },
					{ x: 2003, y: 0.15 },
					{ x: 2004, y: 0.10 },
					{ x: 2005, y: 0.20 },
					{ x: 2006, y: 0.26 },
					{ x: 2007, y: 0.30 },
					{ x: 2008, y: 0.28 },
					{ x: 2009, y: 0.30 },
					{ x: 2010, y: 0.35 },
					{ x: 2011, y: 0.40 },
					{ x: 2012, y: 0.30 }
					]   
				
				} ,
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Educational centres",
					axisYType: "secondary",
					valueFormatString:  "#",
					dataPoints: [
					{ x: 2001, y: 0.30 },
					{ x: 2002, y: 0.40 },
					{ x: 2003, y: 0.45 },
					{ x: 2004, y: 0.70 },
					{ x: 2005, y: 0.20 },
					{ x: 2006, y: 0.50 },
					{ x: 2007, y: 0.30 },
					{ x: 2008, y: 0.18 },
					{ x: 2009, y: 0.40 },
					{ x: 2010, y: 0.38 },
					{ x: 2011, y: 0.60 },
					{ x: 2012, y: 0.40 }
					]   
				
				} ,
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "livestock",
					axisYType: "secondary",
				dataPoints: [
					{ x: 2001, y: 0.11 },
					{ x: 2002, y: 0.20 },
					{ x: 2003, y: 0.24 },
					{ x: 2004, y: 0.23 },
					{ x: 2005, y: 0.27 },
					{ x: 2006, y: 0.30 },
					{ x: 2007, y: 0.35 },
					{ x: 2008, y: 0.37 },
					{ x: 2009, y: 0.40 },
					{ x: 2010, y: 0.50 },
					{ x: 2011, y: 0.60 },
					{ x: 2012, y: 0.80 }
					]
				},

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
			
			var chart = new CanvasJS.Chart("chart3", {	
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Losses Reported"
				},
				axisY2: {
					valueFormatString: "0.0 ",                     
					maximum: 1.2,
					interval: .2,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
				},
				axisX:{
                valueFormatString: "#"
                 },
				theme: "theme2",
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
					name: "Losses in Local Currency",
				dataPoints: [
					{ x: 2001, y: 0 },
					{ x: 2002, y: 0.001 },
					{ x: 2003, y: 0.01 },
					{ x: 2004, y: 0.05 },
					{ x: 2005, y: 0.1 },
					{ x: 2006, y: 0.15 },
					{ x: 2007, y: 0.22 },
					{ x: 2008, y: 0.38 },
					{ x: 2009, y: 0.56 },
					{ x: 2010, y: 0.77 },
					{ x: 2011, y: 0.91 },
					{ x: 2012, y: 0.94 }
					] 
					
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Losses in USD",
					axisYType: "secondary",
				dataPoints: [
					{ x: 2001, y: 0.18 },
					{ x: 2002, y: 0.2 },
					{ x: 2003, y: 0.25 },
					{ x: 2004, y: 0.35 },
					{ x: 2005, y: 0.42 },
					{ x: 2006, y: 0.5 },
					{ x: 2007, y: 0.58 },
					{ x: 2008, y: 0.67 },
					{ x: 2009, y: 0.78 },
					{ x: 2010, y: 0.88 },
					{ x: 2011, y: 0.98 },
					{ x: 2012, y: 1.04 }
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
			
		}
		
		//Global map functions 
		var mapclickedcountry = "";
		var mapclickedcountryObject = [];
		var clickedregiondataDimension = [];
		var Relocated = 0;
        var Evacuated = 0;
        var Deaths = {}; //single object
        var Displaced = 0;
        var Missing = 0;
        var Injured_and_sick = 0;
        var Affected = 0;
		var Human_impact = [];
		var Combined_Human_impact = [];
		var Physical_impact = [];
		var Combined_Physical_impact = [];
		var Losses_reported = [];
		var Combined_Losses_reported = [];
		var uploadeddata = [];
		var uploadedgraphdata = [];
		var valuespercounty = [];
		var AffectedTotal = [];
		var X, Y = '';
		var DeathObjects = [];
		var result2,result3,result4,result5,result6,result7,result8,result9,result10,result11,result12,result13,result14,result15,result16 = [];
	
	//variables for clicked data
	    var clickeddata_All = [];
	    var CS_Country_ID = 0;
	    var CS_Country = '';
	    var CS_ISO = '';
	    var CS_Code_Region = 0;
	    var CS_YEAR1 = 0;
	    var CS_Deaths = [];
		var CSO_Deaths = {};
	    var CS_Injured = [];
	    var CS_Missing = [];
	    var CS_Houses_Destroyed = [];
	    var CS_Damaged_houses = [];
	    var CS_Victims = [];
	    var CS_Affected = [];
	    var CS_Relocated = [];
	    var CS_Evacuated = [];
	    var CS_LossesUSD = [];
	    var CS_Losses_Local = [];
	    var CS_Educational_centres = [];
	    var CS_Hospitals = [];
	    var CS_Crops_per_ha = [];
	    var CS_Lost_cattle = [];
	    var CS_roads_mts = [];
		
		
function mapdrawer(){
//Main Javascript file for the map visual

  var width = 430,
      height = 355; // lesser the value, map moves up

  // Setting color domains(intervals of values) for our map

  var color_domain = [50, 150, 350, 750, 1500]
  var ext_color_domain = [0, 50, 150, 350, 750, 1500]
  var legend_labels = ["< 50", "50+", "150+", "350+", "750+", "> 1500"]              
  var color = d3.scale.threshold()
                .domain(color_domain)
                .range(["#adfcad", "#ffcb40", "#ffba00", "#ff7d73", "#ff4e40", "#ff1300"]);
 
  var div = d3.select("#map").append("div")   
     .attr("class", "tooltip")               
     .style("opacity", 0);

  var svg = d3.select("#map").append("svg")
                             .attr("width", width)
                             .attr("height", height)
                             .style("margin", "10px auto");

  var projection = d3.geo.albers()
                         .center([2.594676, 4.4997]) //Adjusts the centre of the map displayed. it is x, y inverted
                         .rotate([-35, 4])
                        // .parallels([10, 20])
						 .parallels([7, 3])
                         .scale(2000)
                         .translate([width / 2, height / 2]);

  var path = d3.geo.path().projection(projection);

  //Reading map file and data

  queue()
     .defer(d3.json, "KenyaCounties.json")
	 .defer(d3.csv, "Kenya_indicators.csv")
     .defer(d3.csv, "Kenya_all.csv")
     .await(ready);
	
	
	 
//making individual data objects
function objectify(){
	
}


  //Start of Choropleth drawing

  function ready(error, map, indicators, alldata) {
   var rateById = {};
   var nameById = {};
   uploadeddata = [indicators];
   uploadedgraphdata = [alldata];
   //console.log(indicators[3]);
  // console.log(uploadeddata);
  // console.log(uploadedgraphdata);
   
   //data.forEach(function(d) {
	indicators.forEach(function(d) {
    rateById[d.ISO] = +d.Deaths;
    nameById[d.ISO] = d.Country;
  });
  
 /* //Doing type conversion to the right formats
  uploadedgraphdata.forEach(function(d) {
 return {
     Country: d.Country,	
    ISO: d.ISO,	
    Deaths: +d.Deaths,
   Code_Region: +d.Code_Region,
   Injured: +d.Injured,
   Missing: +d.Missing,	
   House_Destroyed: +d.House_Destroyed,
   Damaged_houses: +d.Damaged_houses,
   Affected: +d.Affected,
   Relocated: +d.Relocated,
   Evacuated: +d.Evacuated,
   LossesUSD: +d.LossesUSD,
   Losses_Local: +d.Losses_Local,
  Educational_centres: +d.Educational_centres,
  Hospitals:  +d.Hospitals,
  Crops_per_ha:  +d.Crops_per_ha,
  Lost_cattle:  +d.Lost_cattle,
  roads_mts:  +d.roads_mts
  }});
  console.log(uploadedgraphdata[1]);
 */ 

  //Pick row headers
  var headerRow = Object.keys(indicators[0]);
  //console.log(headerRow);
  
  
 
  
  //console.log(cf.size());
 
 //==============================================
  //pick specific data based on clicked county
  function pickdataforclicked(){
	 alldata.map(function(d) {	  
    if (d['Country']== mapclickedcountry) {
		
					
		//Human_impact = [+d['Deaths'],+d['Injured'],+d['Affected'],+d['Relocated'],+d['Evacuated'], +d['Missing']];
		Human_impact = ['YEAR:' +d['YEAR1'],'Deaths:' +d['Deaths'],'Injured:'+d['Injured'],'Affected:'+d['Affected'],'Relocated:'+d['Relocated'],'Evacuated:'+d['Evacuated'], 'Missing:' +d['Missing']];
		
			
		// Pick data on physical impact
		Physical_impact = ['COUNTRY_ID:'+d['Code_Region'],'YEAR:'+d['YEAR1'],'Houses_Destroyed:'+d['Houses_Destroyed'],'Damaged_Houses:'+d['Damaged_houses'],'Education_centres:'+d['Educational_centres'],'Hospitals:'+d['Hospitals'],'Damages_in_crops_Ha:'+d['Crops_per_ha'], 'Lost_Cattle:' +d['Lost_cattle'],'Damages_in_roads_Mts:'+d['roads_mts']];
		// Pick data for losses reported
		Losses_reported = ['COUNTRY_ID:'+d['Code_Region'],'YEAR:'+d['YEAR1'],'Losses_USD:' +d['LossesUSD'],'Losses_Local:'+d['Losses_Local']];
		//makecountyarraydata();
       // console.log(Human_impact);
		//console.log(Physical_impact);
		//console.log(Losses_reported);
		
		//per_category_per_year();
		//figurespercategory();
		//sumcategory();
    }
  })};
 
  
  //Slicing further per year per category for the given region. This code picks up data from the 3 arrays in pickdataforclicked() function
  function makecountyarraydata(){
  alldata.map(function(d) {	  
    if (d['Country']== mapclickedcountry) {
		
		        //CS_Deaths = ['YEAR:'+d['YEAR1'],'Deaths:' +d['Deaths'],'COUNTRY_ID:'+d['Code_Region']];
				
				CS_Deaths = [ 'x: new Date('+d['YEAR1']+ ' ' + ',' +'0 )'+',' + 'y:' +d['Deaths']];
				//CSO_Deaths.push(CS_Deaths) //{CS_Deaths};
				Deaths = {CS_Deaths};
				//Deaths = {CSO_Deaths};
				DeathObjects.push(CSO_Deaths);
				
				
			    CS_Injured = ['YEAR:'+d['YEAR1'],'Injured:' +d['Injured']];
                CS_Missing = ['YEAR:'+d['YEAR1'],'Missing:' +d['Missing']];
                CS_Houses_Destroyed = ['YEAR:'+d['YEAR1'],'Houses_Destroyed:' +d['Houses_Destroyed']]; 
                CS_Damaged_houses = ['YEAR:'+d['YEAR1'],'Damaged_houses:' +d['Damaged_houses']]; 
                CS_Victims = ['YEAR:'+d['YEAR1'],'Victims:' +d['Victims']];
                CS_Affected = ['YEAR:'+d['YEAR1'],'Affected:' +d['Affected']];
                CS_Relocated = ['YEAR:'+d['YEAR1'],'Relocated:' +d['Relocated']];
                CS_Evacuated = ['YEAR:'+d['YEAR1'],'Evacuated:' +d['Evacuated']];
                CS_LossesUSD = ['YEAR:'+d['YEAR1'],'LossesUSD:' +d['LossesUSD']];
                CS_Losses_Local = ['YEAR:'+d['YEAR1'],'Losses_Local:' +d['Losses_Local']];
                CS_Educational_centres = ['YEAR:'+d['YEAR1'],'Educational_centres:' +d['Educational_centres']];
                CS_Hospitals = ['YEAR:'+d['YEAR1'],'Hospitals:' +d['Hospitals']];
                CS_Crops_per_ha = ['YEAR:'+d['YEAR1'],'Crops_per_ha:' +d['Crops_per_ha']];
                CS_Lost_cattle = ['YEAR:'+d['YEAR1'],'Lost_Cattle:' +d['Lost_Cattle']];
	            CS_roads_mts = ['YEAR:'+d['YEAR1'],'roads_mts:' +d['roads_mts']];
	console.log(CS_Deaths);
	console.log(DeathObjects);
	// console.log(CS_Injured);
   //  console.log(CS_Missing);
   //  console.log(CS_Houses_Destroyed);
	
  }
 // console.log(CS_Injured);
 // console.log(CS_Missing);
  //console.log(CS_Houses_Destroyed);
  
  })}; 
  
  
 //===============================================
 //some summation code
 function sumcategory(){
  AffectedTotal = d3.nest()
  .key(function(d) { return d.Country; })
  .rollup(function(v) { return d3.sum(v, function(d) { return d.Affected; }); })
  .map(uploadedgraphdata);
   console.log(JSON.stringify(AffectedTotal));
 };
//Nesting code
 
 function figurespercategory(){
	 valuespercounty = d3.nest()
                            .key(function(d) { return d.country; })
                            .entries(uploadedgraphdata);
		console.log(valuespercounty);					
 };
  
  //Drawing Choropleth

  svg.append("g")
     .attr("class", "ISO")
     .selectAll("path")
     .data(topojson.object(map, map.objects.KenyaCounties).geometries)
     .enter().append("path")
     .attr("d", path)
     .style("fill", function(d) {
       return color(rateById[d.properties.ISO]); 
  })
  .style("opacity", 0.8)

  //Adding mouseevents
  .on("mouseover", function(d) {
    d3.select(this).transition().duration(300).style("opacity", 1);
    div.transition().duration(300)
    .style("opacity", 1)
    div.text(nameById[d.properties.ISO] + " : " + rateById[d.properties.ISO])
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY -30) + "px");
	
  })
  .on("mouseout", function() {
     d3.select(this)
    .transition().duration(300)
    .style("opacity", 0.8);
    div.transition().duration(300)
    .style("opacity", 0);
	
  })
   .on("click", function(d) {
	d3.select(this)
	mapclickedcountry = nameById[d.properties.ISO];
	console.log(mapclickedcountry);
	pickdataforclicked();
	makecountyarraydata();
	chartdrawer();
	//filteregiondata();

  })
  
  }; // <-- End of Choropleth drawing
  
  //************************************************************************
//Identiffy clicked country
function pickcountry(data){	
	var props = data.properties; //json properties
	var region = d3.select("#"+ ("props.COUNTYCO")); //select the current region
	mapclickedcountry = region;
	region = "";
};

 //Cross filter work
  function filteregiondata()
  {
  var cf = crossfilter(uploadedgraphdata);
   clickedregiondataDimension = cf.dimension(function(d) {return d.Country});
   clickedregiondataDimension.filter(function(d) {return d === 'Isiolo'});
  console.log(clickedregiondataDimension.top(2));
  
  }


//************************************************************************
 
  //Adding legend for the Choropleth

  var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 20, ls_h = 20;

  legend.append("rect")
        .attr("x", 20)
        .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
        .attr("width", ls_w)
        .attr("height", ls_h)
        .style("fill", function(d, i) { return color(d); })
        .style("opacity", 0.8);

  legend.append("text")
        .attr("x", 50)
        .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
        .text(function(d, i){ return legend_labels[i]; });  
}
window.onload = function () {

chartdrawer();
}

//Dropdown 

// The csv data upload chart rendered here
  var dataPoints = [];
	 
        function getDataPointsFromCSV(csv) {
            var dataPoints = csvLines = points = [];
            csvLines = csv.split(/[\r?\n|\r|\n]+/);         
		        
            for (var i = 0; i < csvLines.length; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    dataPoints.push({ 
                        x: parseFloat(points[0]), 
                        y: parseFloat(points[1]) 		
                    });
                }
            return dataPoints;
        }
	