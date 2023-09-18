    
 
 //anychart.onDocumentReady(function() {
	 function checkIfRegionull(){
		 var clickedRegion = localStorage.getItem("clickedreg");
		 if (clickedRegion = "null"){
			 clickedRegion = Berat_dataSet;
			 
		 }else
		 {
			clickedRegion = localStorage.getItem("clickedreg"); 
		 }
	 }
  // create data set on our data
 var clickedRegion = localStorage.getItem("clickedreg");
  console.log(clickedRegion);
  
   //function splinechartcreator(){ 
   
  // map data for the first series, take x from the zero column and value from the first column of data set
  //var seriesData_1 = dataSetY.mapAs({x: [0], value: [1]});
  //var seriesData_1 = clickedRegion.mapAs({x: [0], value: [1]});  
  var seriesData_1 = SummaryTrend.mapAs({x: [0], value: [1]});
  
    // map data for the second series, take x from the zero column and value from the second column of data set
  //var seriesData_2 = dataSetY.mapAs({x: [0], value: [2]});
 var seriesData_2 = SummaryTrend.mapAs({x: [0], value: [2]});
 // var seriesData_2 = clickedRegion.mapAs({x: [0], value: [2]});
  

  // map data for the third series, take x from the zero column and value from the third column of data set
  //var seriesData_3 = dataSetY.mapAs({x: [0], value: [3]});
  var seriesData_3 = SummaryTrend.mapAs({x: [0], value: [3]});
  //var seriesData_3 = clickedRegion.mapAs({x: [0], value: [3]});
   var seriesData_4 = SummaryTrend.mapAs({x: [0], value: [4]});
   var seriesData_5 = SummaryTrend.mapAs({x: [0], value: [5]});
   var seriesData_6 = SummaryTrend.mapAs({x: [0], value: [6]});
   var seriesData_7 = SummaryTrend.mapAs({x: [0], value: [7]});
   var seriesData_8 = SummaryTrend.mapAs({x: [0], value: [8]});

  // create line chart
  
  chart = anychart.line();

  // turn on chart animation
  chart.animation(true);

  // turn on the crosshair
  chart.crosshair().enabled(true).yLabel().enabled(false);
  chart.crosshair().yStroke(null);

  // set tooltip mode to point
  chart.tooltip().positionMode('point');

  // set chart title text settings
  chart.title('Human impact metrics Trends since 1980.');
  chart.title().padding([0,0,5,0]);
  
  // set yAxis title
  chart.yAxis().title('Count (Number of pple(thousands)');
  //chart.xAxis().labels().padding([5]);

  //Deaths		Injured		Missing		Victims		Affected		Relocated		Evacuated		Losses_Local		Houses_Destroyed		Lost_cattle

  
  
  // create first series with mapped data
  var series_1 = chart.spline(seriesData_1);
  series_1.name('Deaths');
  series_1.hoverMarkers().enabled(true).type('circle').size(4);
  series_1.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

  // create second series with mapped data
  var series_2 = chart.spline(seriesData_2);
  series_2.name('Injured');
  series_2.hoverMarkers().enabled(true).type('circle').size(4);
  series_2.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

  // create third series with mapped data
  var series_3 = chart.spline(seriesData_3);
  series_3.name('Missing');
  series_3.hoverMarkers().enabled(true).type('circle').size(4);
  series_3.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);
  
   // create fourth series with mapped data
  var series_4 = chart.spline(seriesData_4);
  series_4.name('victims');
  series_4.hoverMarkers().enabled(true).type('circle').size(4);
  series_4.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

  
   // create fifth series with mapped data
  var series_5 = chart.spline(seriesData_5);
  series_5.name('Affected');
  series_5.hoverMarkers().enabled(true).type('circle').size(4);
  series_5.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

  
   // create sixth series with mapped data
  var series_6 = chart.spline(seriesData_6);
  series_6.name('Relocated');
  series_6.hoverMarkers().enabled(true).type('circle').size(4);
  series_6.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

  
   // create seventh series with mapped data
  var series_7 = chart.spline(seriesData_7);
  series_7.name('evacuated');
  series_7.hoverMarkers().enabled(true).type('circle').size(4);
  series_7.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);

/*  
   // create eight series with mapped data
  var series_8 = chart.spline(seriesData_8);
  series_8.name('Financial losses (local)');
  series_8.hoverMarkers().enabled(true).type('circle').size(4);
  series_8.tooltip().position('right').anchor('left').offsetX(5).offsetY(5);
*/

  
  
  
  
  
  // turn the legend on
 // chart.legend().enabled(true).fontSize(13).padding([0,0,10,0]);
  chart.legend().enabled(true).fontSize(13).padding([0,0,10,0]);

  // set container id for the chart and set up paddings
  chart.container('container2');
  chart.padding([5,10,5,10]);

  // initiate chart drawing
  chart.draw();
  

// });