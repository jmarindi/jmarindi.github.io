
var StatusRingChart = dc.pieChart("#Status-ring-chart"),
   //	Linechart  = dc.lineChart("#chart-line-conflict")
   // Conflict_bar_chart  = dc.barChart("#chart_bar_conflict")
	PerYearRowChart = dc.rowChart("#chart-row-peryear");
	
/*	
var ConflictData = [
    {out_of_school: 350, in_school: 200, risk_dropping: 100, conflicts: 100,Year: "2010"},
	{out_of_school: 500, in_school: 300, risk_dropping: 250, conflicts: 150,Year: "2011"},
	{out_of_school: 800, in_school: 600, risk_dropping: 450, conflicts: 130,Year: "2012"},
	{out_of_school: 800, in_school: 400, risk_dropping: 550, conflicts: 180,Year: "2013"},
	{out_of_school: 500, in_school: 550, risk_dropping: 250, conflicts: 200,Year: "2014"},
	{out_of_school: 600, in_school: 700, risk_dropping: 300, conflicts: 230,Year: "2015"},
	{out_of_school: 900, in_school: 800, risk_dropping: 480, conflicts: 250,Year: "2016"}
];
/*
// normalize/parse data
ConflictData.forEach(function(d) {
    d.conflict = d.conflict.match(/\d+/);
}); 

// set crossfilter
var ndx = crossfilter(ConflictData),
    yearsDim  = ndx.dimension(function(d) {return +d.Year;}),
   conflictsDim = ndx.dimension(function(d) {return d.conflicts;}),
	conflictsGroup = conflictsDim.group().reduceSum(function(d) {return d.Year;});
   	
	Conflict_bar_chart
        .width(400)
        .height(300)
        //.x(d3.time.scale().domain([new Date(2011, 0, 1), new Date(2015, 11, 31)]))
		.x(d3.scale.linear())//.domain([2010,2017]))
		.brushOn(false)
        .xAxisLabel('Year')
        .yAxisLabel('Conflict incidents')
		.elasticX(true)
        .dimension(yearsDim)
        .group(conflictsGroup);
     Conflict_bar_chart.render();
*/

d3.csv("data/syria_data.csv", function(error, spendData) {
  if (error) throw error;
  //console.log(spendData); 

var ndx = crossfilter(spendData),
    Year1Dim  = ndx.dimension(function(d) {return d.year_num;}),
	ChildrenPerStatusDim = ndx.dimension(function(d) {return d.NumberOfchildren;}),
    YearDim  = ndx.dimension(function(d) {return d.Year;}),
	ConflictDim  = ndx.dimension(function(d) {return d.Conflict_incidences;}),
	StatusDim  = ndx.dimension(function(d) {return d.Status;}),
	ChildrenPerStatus = StatusDim.group().reduceSum(function(d) {return +d.NumberOfchildren;}),
	Conflictgroup = ChildrenPerStatusDim.group().reduceSum(function(d) {return d.Year_num;}),
	NumberPerYear = ConflictDim.group().reduceSum(function(d) {return +d.Year_num;});
   
  	
StatusRingChart
    .width(300)
    .height(300)
    .dimension(StatusDim)
	.group(ChildrenPerStatus)
    .innerRadius(50)
    .controlsUseVisibility(true);

PerYearRowChart
    .width(400)
    .height(300)
    .dimension(StatusDim)
    .group(Conflictgroup)
    .elasticX(true)
    .controlsUseVisibility(true);
dc.renderAll();	
	
 /*   Linechart
          .width(300)
          .height(300)
		  .x(d3.time.scale().domain([new Date(2011, 0, 1), new Date(2015, 11, 31)]))
		  .brushOn(false)
          .xAxisLabel('Year')
          .yAxisLabel('Conflict incidents')
          //.dimension(YearDim)
		  .dimension(ConflictDim)
		  //.group(ChildrenPerStatus); 
		  .group(NumberPerYear); 
    */	



});