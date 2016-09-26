
var CountryRingChart = dc.pieChart("#Country-ring-chart"),
    StatusRingChart = dc.pieChart("#Status-ring-chart"),
    BeneficiariesRowChart = dc.rowChart("#Beneficiaries-row-chart")
	BudgetRowChart = dc.rowChart("#Budget-row-chart");


d3.csv("data/IntegrityAction.csv", function(error, spendData) {
  if (error) throw error;
  console.log(spendData);

var ndx = crossfilter(spendData),
    CountryDim  = ndx.dimension(function(d) {return d.Country;}),
	StatusDim  = ndx.dimension(function(d) {return d.Status;}),
	BeneficiariesDim  = ndx.dimension(function(d) {return +d.Beneficiaries;}),
	BudgetDim  = ndx.dimension(function(d) {return +d.Budget;}),
	ClusterDim  = ndx.dimension(function(d) {return d.Cluster;}),
    BeneficiariesPerCountry = CountryDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BeneficiariesPerStatus = StatusDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BeneficiariesPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BudgetPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Budget;});

  CountryRingChart
    .width(300)
    .height(300)
    .dimension(CountryDim)
    .group(BeneficiariesPerCountry)
    .innerRadius(50)
    .controlsUseVisibility(true);
	
StatusRingChart
    .width(300)
    .height(300)
    .dimension(StatusDim)
    .group(BeneficiariesPerStatus)
    .innerRadius(50)
    .controlsUseVisibility(true);

BeneficiariesRowChart
    .dimension(BeneficiariesDim)
    .group(BeneficiariesPerCluster)
    .elasticX(true)
    .controlsUseVisibility(true);
	
BudgetRowChart
    .dimension(BudgetDim)
    .group(BudgetPerCluster)
    .elasticX(true)
    .controlsUseVisibility(true);

//var reached = ndx.groupAll().reduceSum(function(d) { return +d.reached; });


dc.renderAll();

});