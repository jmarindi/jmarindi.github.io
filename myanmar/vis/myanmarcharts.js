var TargetPopRingChart   = dc.pieChart("#chart-ring-TargetPop"),
    SectorRowChart = dc.rowChart("#chart-row-Sector");
/*var data1 = [
    {Name: 'Mr A', Spent: 40, Year: 2011},
    {Name: 'Mr B', Spent: 10, Year: 2011},
    {Name: 'Mr C', Spent: 40, Year: 2011},
    {Name: 'Mr A', Spent: 70, Year: 2012},
    {Name: 'Mr B', Spent: 20, Year: 2012},
    {Name: 'Mr B', Spent: 50, Year: 2013},
    {Name: 'Mr C', Spent: 30, Year: 2013}
];*/

function resetData(ndx, dimensions) {
    var TargetPopChartFilters = TargetPopRingChart.filters();
    var SectorChartFilters = SectorRowChart.filters();
    TargetPopRingChart.filter(null);
    SectorRowChart.filter(null);
    ndx.remove();
    TargetPopRingChart.filter([TargetPopChartFilters]);
    SectorRowChart.filter([SectorChartFilters]);
    console.log(SectorRowChart.filters());
}
// set crossfilter with first dataset
var ndx = crossfilter(maindata),
    TargetPopDim  = ndx.dimension(function(d) {return d.Target_Population;}),
	TotalUSDDim = ndx.dimension(function(d) {return Math.floor(d.Total_transfered_amount_USD/10);}),
    //spendDim = ndx.dimension(function(d) {return Math.floor(d.Spent/10);}),
    //TargetPopDim  = ndx.dimension(function(d) {return d.TargetPop;}),
	SectorDim  = ndx.dimension(function(d) {return d.Sector;}),
   // spendPerYear = yearDim.group().reduceSum(function(d) {return +d.Spent;}),
	TargetPerSector = SectorDimDim.group().reduceSum(function(d) {return +d.Total_number_of_people;}),
	TotalSpentPerSector = TargetPopDim.group().reduceSum(function(d) {return +d.Total_transfered_amount_USD;}),
   // spendPerName = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
	spendPerSector = nameDim.group().reduceSum(function(d) {return +d.Spent;}),
    spendHist    = spendDim.group().reduceCount();
function render_plots(){
    TargetPopRingChart
        .width(200).height(200)
        .dimension(TargetPopDim)
        .group(TotalUSDDim)
        .innerRadius(50);
    SectorRowChart
        .width(250).height(200)
        .dimension(SectorDim)
        .group(TotalSpentPerSector)
        .elasticX(true);
    dc.renderAll();
}
render_plots();