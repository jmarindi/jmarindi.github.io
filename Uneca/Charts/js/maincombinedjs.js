    var numberFormat = d3.format(".2f");
  	var poptotalchart = dc.rowChart("#chart-row-poptotal");
	var popmalechart = dc.rowChart("#chart-row-popmale");
	var popfemchart = dc.rowChart("#chart-row-popfem");
	var popfertilitychart = dc.rowChart("#chart-row-popfertility");
	var popgratechart = dc.rowChart("#chart-row-popgrate");
	var popcbrchart = dc.barChart("#chart-bar-popcbr");
	var popcdrchart = dc.rowChart("#chart-row-popcdr");	
	var Activepopchart = dc.rowChart("#chart-row-activpop");
	var zero214chart = dc.rowChart("#chart-row-zero214");
	var fifteen264chart = dc.rowChart("#chart-row-fifteen264");	
	var under5mortchart = dc.rowChart("#chart-row-u5mort");
	var infantmortchart = dc.rowChart("#chart-row-infantmort");
	var neonatalchart = dc.rowChart("#chart-row-neonatal");
	var birthsper1000chart = dc.rowChart("#chart-row-birthsper1000");
	  
  	
    d3.csv("data/unecaHundred.csv", function (csv) {
		 var data = crossfilter(csv),
		 //=====Dimensions======
         country = data.dimension(function (d) {return d["Country"];}),
	     Totalpop = data.dimension(function (d){return d["Totalpops"];}),		
		 male = data.dimension(function (d) { return +d["Malepops"];}),		
		 female = data.dimension(function (d) {return +d["Femalepops"]; }),		
		 FertilityRate = data.dimension(function (d) {return +d["pop_total_fertility_rt"];}),		
		 DeathRate = data.dimension(function (d) {return +d["pop_crude_death_rate"]; }),		
		 Birth_rate = data.dimension(function (d) { return +d["pop_crude_birth_rate"]; }),		
		 GrowthRate = data.dimension(function (d) { return +d["pop_av_annual_g_rate"]; }),	
		 Activedim = data.dimension(function (d) { return +d["Activpops"]; }),
		 Zero214dim = data.dimension(function (d) { return +d["zero214yrspop"]; }),
		 Fifteen264dim = data.dimension(function (d) { return +d["Fifteen264yrspop"]; }),
		 
		 under5mortdim = data.dimension(function (d) { return +d["helt_u_five_mort_rt_all"]; }),	
		 infantmortdim = data.dimension(function (d) { return +d["helt_infant_mort_rt_all"]; }),
		 neonataldim = data.dimension(function (d) { return +d["helt_mort_rt_neonatal"]; }),
		 birthsper1000dim = data.dimension(function (d) { return +d["helt_births_reg_per_1000"]; }),
		 
		 
		 //===GROUPS========
	     poptotal = country.group().reduceSum(function (d) {return +d["Totalpops"];}),	   
	     popmale = country.group().reduceSum(function (d) {return +d["Malepops"]; }),
	     popfmale = country.group().reduceSum(function (d) {return +d["Femalepops"];}),
		 //Fertility = FertilityRate.group().reduceSum(function (d) {return +d["pop_total_fertility_rt"];}),	
         Fertility = country.group().reduceSum(function (d) {return +d["pop_total_fertility_rt"];}),		 
		 Birth = Birth_rate.group().reduceSum(function (d) {return +d["pop_crude_birth_rate"];}),			
		 Death = country.group().reduceSum(function (d) {return +d["pop_crude_death_rate"];}),		
		 Growth = country.group().reduceSum(function (d) {return +d["pop_av_annual_g_rate"]; });		 
		 Activegrp = country.group().reduceSum(function (d) {return +d["Activpops"];}),
		 Zero214grp = country.group().reduceSum(function (d) {return +d["zero214yrspop"];}),		
		 Fifteen264grp = country.group().reduceSum(function (d) {return +d["Fifteen264yrspop"]; }),		 
		 under5mortgrp = country.group().reduceSum(function (d) {return +d["helt_u_five_mort_rt_all"];}),
		 infantmortgrp = country.group().reduceSum(function (d) {return +d["helt_infant_mort_rt_all"]; });
		 neonatalgrp = country.group().reduceSum(function (d) {return +d["helt_mort_rt_neonatal"];}),
		 birthsper1000grp = country.group().reduceSum(function (d) {return +d["helt_births_reg_per_1000"];});
		 
	 		//=====THE CHARTS SECTION ======								
				
	         popcbrchart //Crude Birth rate chart - Bar chart used as a filter
                .dimension(Birth_rate)
                .group(Birth)
				.colors("#00134d")
				.x(d3.scale.linear().domain([0,200]))
				.xAxisLabel("Birth Rate")
				//.yAxisLabel("Crude Birth Rate") // Y-Axis label
				.elasticX(true)
                .controlsUseVisibility(true);				
	             popcbrchart.xAxis().tickFormat(function(d) {return d});
                 popcbrchart.yAxis().ticks(5);
		
		
		    popgratechart // Annual population Growth rate
                .dimension(GrowthRate)
                .group(Growth)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
							})
                .elasticX(true)
				.controlsUseVisibility(true);		
				
			
			poptotalchart //Total population chart
                   .dimension(Totalpop)
                   .group(poptotal)
				   .colors("#00134d")
				   .data(function(group) {
								return group.top(10);
								})
				   .elasticX(true)
				   .controlsUseVisibility(true);

            popmalechart //Total male population chart
                .dimension(male)
                .group(popmale)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			popfemchart //Total Female population chart
                .dimension(female)
                .group(popfmale)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
					
			popfertilitychart //Population fertility rate
                .dimension(FertilityRate)
                .group(Fertility)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
							
			popcdrchart // Crude death rate chart
                .dimension(DeathRate)
                .group(Death)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
		
			Activepopchart // Crude death rate chart
                .dimension(Activedim)
                .group(Activegrp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			zero214chart // Crude death rate chart
                .dimension(Zero214dim)
                .group(Zero214grp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);

			fifteen264chart // Crude death rate chart
                .dimension(Fifteen264grp)
                .group(Fifteen264grp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);	
//===Health indicator charts

        	under5mortchart // under 5 mortality rate
                .dimension(under5mortgrp)
                .group(under5mortgrp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			infantmortchart // Infant mortality rate chart
                .dimension(infantmortgrp)
                .group(infantmortgrp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);	

			neonatalchart // Neo natal Mortality rate chart
                .dimension(neonatalgrp)
                .group(neonatalgrp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);	

			birthsper1000chart // Live births per 1000 chart
                .dimension(birthsper1000grp)
                .group(birthsper1000grp)
				.colors("#00134d")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);					
		 dc.renderAll();
        
    });

