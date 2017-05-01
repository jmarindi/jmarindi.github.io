var yearRingChart   = dc.pieChart("#chart-ring-year"),
    spenderRowChart = dc.rowChart("#chart-row-spenders");
var data1 = [
    {Name: 'Mr A', Spent: 40, Year: 2011},
    {Name: 'Mr B', Spent: 10, Year: 2011},
    {Name: 'Mr C', Spent: 40, Year: 2011},
    {Name: 'Mr A', Spent: 70, Year: 2012},
    {Name: 'Mr B', Spent: 20, Year: 2012},
    {Name: 'Mr B', Spent: 50, Year: 2013},
    {Name: 'Mr C', Spent: 30, Year: 2013}
];

function resetData(ndx, dimensions) {
    var yearChartFilters = yearRingChart.filters();
    var spenderChartFilters = spenderRowChart.filters();
    yearRingChart.filter(null);
    spenderRowChart.filter(null);
    ndx.remove();
    yearRingChart.filter([yearChartFilters]);
    spenderRowChart.filter([spenderChartFilters]);
    console.log(spenderRowChart.filters());
}
// set crossfilter with first dataset
var ndx = crossfilter(data1),
    yearDim  = ndx.dimension(function(d) {return +d.Year;}),
    spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),
    nameDim  = ndx.dimension(function(d) {return d.Name;}),
    spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendHist    = spendDim.group().reduceCount();
function render_plots(){
    yearRingChart
        .width(200).height(200)
        .dimension(yearDim)
        .group(spendPerYear)
        .innerRadius(50);
    spenderRowChart
        .width(250).height(200)
        .dimension(nameDim)
        .group(spendPerName)
        .elasticX(true);
    dc.renderAll();
}
render_plots();