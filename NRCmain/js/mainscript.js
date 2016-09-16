
var CountryRingChart = dc.pieChart("#Country-ring-chart"),
    GenderRingChart = dc.pieChart("#Gender-ring-chart"),
    ReachedRowChart = dc.rowChart("#chart-row-reached")
	targetedRowChart = dc.rowChart("#chart-row-targeted");


d3.csv("data/nrcdata.csv", function(error, spendData) {
  if (error) throw error;
  console.log(spendData);

var ndx = crossfilter(spendData),
    CountryDim  = ndx.dimension(function(d) {return d.country;}),
	GenderDim  = ndx.dimension(function(d) {return d.Gender;}),
	ReachedDim  = ndx.dimension(function(d) {return d.Reached;}),
	TargetedDim  = ndx.dimension(function(d) {return d.Targeted;}),
	ClusterDim  = ndx.dimension(function(d) {return d.cluster;}),
    ReachedPerCountry = CountryDim.group().reduceSum(function(d) {return +d.Reached;}),
	ReachedPerGender = GenderDim.group().reduceSum(function(d) {return +d.Reached;}),
	ReachedPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Reached;}),
	TargetedPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Targeted;});

  CountryRingChart
    .width(300)
    .height(300)
    .dimension(CountryDim)
    .group(ReachedPerCountry)
    .innerRadius(50)
    .controlsUseVisibility(true);
	
GenderRingChart
    .width(300)
    .height(300)
    .dimension(GenderDim)
    .group(ReachedPerGender)
    .innerRadius(50)
    .controlsUseVisibility(true);

ReachedRowChart
    .dimension(ReachedDim)
    .group(ReachedPerCluster)
    .elasticX(true)
    .controlsUseVisibility(true);
	
targetedRowChart
    .dimension(TargetedDim)
    .group(TargetedPerCluster)
    .elasticX(true)
    .controlsUseVisibility(true);

var reached = ndx.groupAll().reduceSum(function(d) { return +d.reached; });


dc.renderAll();

});