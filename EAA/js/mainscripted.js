
var PercentageProjects = [];
var BudgetSpent = [];
var ProjectStatus = [];
var ReachedPerCluster = [];

var StatusRingChart = dc.pieChart("#Status-ring-chart"),
   	Linechart  = dc.lineChart("#chart-line-conflict")


d3.csv("data/syria_data.csv", function(error, spendData) {
  if (error) throw error;
  console.log(spendData);

var ndx = crossfilter(spendData),
    YearDim  = ndx.dimension(function(d) {return d.Year;}),
	ConflictDim  = ndx.dimension(function(d) {return d.Conflict_incidences;}),
	StatusDim  = ndx.dimension(function(d) {return d.Status;}),
	ChildrenPerStatus = StatusDim.group().reduceSum(function(d) {return +d.NumberOfchildren;}),
	NumberPerYear = ConflictDim.group().reduceSum(function(d) {return +d.Year;});
   
  
	
StatusRingChart
    .width(300)
    .height(300)
    .dimension(StatusDim)
	.group(ChildrenPerStatus)
    .innerRadius(50)
    .controlsUseVisibility(true);


Linechart
          .width(300)
          .height(300)
		  .x(d3.time.scale())
		  //.x(d3.scale.ordinal())
          //.xUnits(dc.units.ordinal)
          //.brushOn(false)
          .xAxisLabel('Year')
          .yAxisLabel('Conflict incidents')
          .dimension(YearDim)
		  .group(ChildrenPerStatus); 
    	

var Beneficiaries = ndx.groupAll().reduceSum(function(d) { return +d.Beneficiaries; });


dc.renderAll();

});