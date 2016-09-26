
var PercentageProjects = [];
var BudgetSpent = [];
var ProjectStatus = [];
var ReachedPerCluster = [];

var CountryRingChart = dc.pieChart("#Country-ring-chart"),
    StatusRingChart = dc.pieChart("#Status-ring-chart"),
    BeneficiariesRowChart = dc.rowChart("#Beneficiaries-row-chart")
	BudgetRowChart = dc.rowChart("#Budget-row-chart");


d3.csv("data/Integrity_action.csv", function(error, spendData) {
  if (error) throw error;
  console.log(spendData);

var ndx = crossfilter(spendData),
    CountryDim  = ndx.dimension(function(d) {return d.Country;}),
	projectCountDim  = ndx.dimension(function(d) {return d.projectcount;}),
	StatusDim  = ndx.dimension(function(d) {return d.Status;}),
	//BeneficiariesDim  = ndx.dimension(function(d) {return +d.Beneficiaries;}),
	BeneficiariesDim  = ndx.dimension(function(d) {return +d.Beneficiaries2;}),
	//BudgetDim  = ndx.dimension(function(d) {return +d.Budget;}),
	BudgetDim  = ndx.dimension(function(d) {return +d.Budget2;}),
	ClusterDim  = ndx.dimension(function(d) {return d.Cluster;}),
  //  BeneficiariesPerCountry = CountryDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BeneficiariesPerCountry = CountryDim.group().reduceSum(function(d) {return +d.Beneficiaries2;}),
	ProjectsPerCountry = CountryDim.group().reduceSum(function(d) {return +d.projectcount;}),
//	BeneficiariesPerStatus = StatusDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BeneficiariesPerStatus = StatusDim.group().reduceSum(function(d) {return +d.Beneficiaries2;}),
	//BeneficiariesPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Beneficiaries;}),
	BeneficiariesPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Beneficiaries2;}),
	//BudgetPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Budget;});
	BudgetPerCluster = ClusterDim.group().reduceSum(function(d) {return +d.Budget2;});
	
   PercentageProjects = [CountryDim];
   BudgetSpent = [BudgetPerCluster];
   ProjectStatus = [BeneficiariesPerStatus];
   ReachedPerCluster = [BeneficiariesPerCluster];
   
   
  CountryRingChart
    .width(300)
    .height(300)
    .dimension(CountryDim)
    //.group(BeneficiariesPerCountry)
	.group(ProjectsPerCountry)
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

var Beneficiaries = ndx.groupAll().reduceSum(function(d) { return +d.Beneficiaries; });


dc.renderAll();

});