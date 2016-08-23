
var  spendHistChart  = dc.barChart("#chart-hist-spend"),
     spenderRowChart = dc.rowChart("#chart-row-spenders");
	 spenderRowChart2 = dc.rowChart("#chart-row-spenders2");


// use static or load via d3.csv("spendData.csv", function(error, spendData) {/* do stuff */});
var spendData = [
    {Name: 'Mr A', Spent: '$40', Year: 2011},
    {Name: 'Mr B', Spent: '$10', Year: 2011},
    {Name: 'Mr C', Spent: '$40', Year: 2011},
    {Name: 'Mr A', Spent: '$70', Year: 2012},
    {Name: 'Mr B', Spent: '$20', Year: 2012},
    {Name: 'Mr B', Spent: '$50', Year: 2013},
    {Name: 'Mr C', Spent: '$30', Year: 2013}
];

// normalize/parse data
//spendData.forEach(function(d) {
//    d.Spent = d.Spent.match(/\d+/)[0];
//});

// set crossfilter
var ndx = crossfilter(spendData),
    yearDim  = ndx.dimension(function(d) {return +d.Year;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendHist    = spendDim.group().reduceCount();

 
  spendHistChart
    .dimension(spendDim)
    .group(spendHist)
    .x(d3.scale.linear().domain([0,10]))
    .elasticY(true)
    .controlsUseVisibility(true);

spendHistChart.xAxis().tickFormat(function(d) {return d*10}); // convert back to base unit
spendHistChart.yAxis().ticks(2);

spenderRowChart
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
    .controlsUseVisibility(true);
	
spenderRowChart2
    .dimension(nameDim)
    .group(spendPerName)
    .elasticX(true)
    .controlsUseVisibility(true);


var allDollars = ndx.groupAll().reduceSum(function(d) { return +d.Spent; });


dc.renderAll();