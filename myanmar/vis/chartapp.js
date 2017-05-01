var TargetPopRingChart   = dc.pieChart("#chart-ring-TargetPop"),
    sectorRowChart = dc.rowChart("#chart-row-sectors");

function resetData(ndx, dimensions) {
    var TargetPopRingChartFilters = TargetPopRingChart.filters();
    var sectorRowChartFilters = sectorRowChart.filters();
    TargetPopRingChart.filter(null);
    sectorRowChart.filter(null);
    ndx.remove();
    TargetPopRingChart.filter([TargetPopRingChartFilters]);
    sectorRowChart.filter([sectorRowChartFilters]);
    console.log(sectorRowChart.filters());
}
// set crossfilter with first dataset
var ndx = crossfilter(data1),
    SectorDim  = ndx.dimension(function(d) {return d.Sector;}),
    TotalPersectorDim = ndx.dimension(function(d) {return Math.floor(+d.Total_transfered_amount_USD/100000);}),
    TargetPopDim  = ndx.dimension(function(d) {return d.Target_Population;}),
    spendPerSector = SectorDim.group().reduceSum(function(d) {return +d.Total_transfered_amount_USD/100000;}),
    spendPerTargetPop = TargetPopDim.group().reduceSum(function(d) {return +d.Total_transfered_amount_USD/100000;});
  
function render_plots(){
    TargetPopRingChart
        .width(350).height(350)
        .dimension(TargetPopDim)
        .group(spendPerTargetPop)
        .innerRadius(50)
		.externalRadiusPadding(60)
		.externalLabels(20)
		.drawPaths(true);
    sectorRowChart
        .width(550).height(300)
        .dimension(SectorDim)
        .group(spendPerSector)
        .elasticX(true);
    dc.renderAll();
}
render_plots();
