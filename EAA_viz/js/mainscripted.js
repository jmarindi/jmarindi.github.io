
var StatusRingChart = dc.pieChart("#Status-ring-chart"),
   PerYearRowChart = dc.rowChart("#chart-row-peryear");
	

d3.csv("data/syria_data_m1.csv", function(error, spendData) {
  if (error) throw error;
  
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
	
 
});
