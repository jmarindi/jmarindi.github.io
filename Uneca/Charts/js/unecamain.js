    var numberFormat = d3.format(".2f");
   	var AfriChart = dc.geoChoroplethChart("#afri-chart");	    
	var poptotalchart = dc.rowChart("#chart-row-poptotal");
	var popmalechart = dc.rowChart("#chart-row-popmale");
	var popfemchart = dc.rowChart("#chart-row-popfem");
	var popfertilitychart = dc.rowChart("#chart-row-popfertility");
	var popgratechart = dc.rowChart("#chart-row-popgrate");
	var popcbrchart = dc.rowChart("#chart-row-popcbr");
	var popcdrchart = dc.rowChart("#chart-row-popcdr");
   
  	
    d3.csv("data/uneca.csv", function (csv) {
        var data = crossfilter(csv);

        var country = data.dimension(function (d) {
            return d["Country"];
        });
	    //var Totalpop = data.dimension(function (d) {
           // return d["Country"] +' ' + '(' +  +d["pop_all_sexes"] + ')';
       // });
		
	   var Totalpop = data.dimension(function (d) {
            return d["Country"];
        });
		
		var male = data.dimension(function (d) {
            return +d["pop_male"];
        });
		
		var female = data.dimension(function (d) {
            return +d["pop_female"];
        });
		
		var FertilityRate = data.dimension(function (d) {
            return +d["pop_total_fertility_rt"];
        });
		
		var DeathRate = data.dimension(function (d) {
            return +d["pop_crude_death_rate"];
        });
		
		var Birth_rate = data.dimension(function (d) {
            return +d["pop_crude_birth_rate"];
        });
		
		var GrowthRate = data.dimension(function (d) {
            return +d["pop_av_annual_g_rate"];
        });
		
    //    var poptotal = Totalpop.group().reduceSum(function (d) {
    //        return +d["pop_all_sexes"];
    //   });
	   var poptotal = Totalpop.group().reduceSum(function (d) {
            return +d["pop_all_sexes"];
       });
	   
	   var popmale = country.group().reduceSum(function (d) {
            return +d["pop_male"];
        });
	   var popfmale = country.group().reduceSum(function (d) {
            return +d["pop_female"];
        });
		var Fertility = country.group().reduceSum(function (d) {
            return +d["pop_total_fertility_rt"];
		});
				
		var Birth = country.group().reduceSum(function (d) {
            return +d["pop_crude_birth_rate"];
		});
			
		var Death = country.group().reduceSum(function (d) {
            return +d["pop_crude_death_rate"];
			
		});
		
		var Growth = country.group().reduceSum(function (d) {
            return +d["pop_av_annual_g_rate"];
		
		});
	 //d3.json("geojson/africa.geojson", function (AfricaJson) {
		d3.json("geo/africa.json", function (AfricaJson) {
            AfriChart.width(990)
                    .height(500)
                    .dimension(country)
                    .group(poptotal)
                    .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
                    .colorDomain([0, 20000])
                    .colorCalculator(function (d) { return d ? AfriChart.colors()(d) : '#ccc'; })
                    .overlayGeoJson(AfricaJson.features, "Country", function (d) {
                        return d.properties.Country;
                    })
                    .title(function (d) {
                        return "Country: " + d.key + "\nTotal Population: " + numberFormat(d.value ? d.value : 0) + "M";
                    });
		
										
		    poptotalchart
                   .dimension(Totalpop)
                   .group(poptotal)
				   .colors("#3182bd")
				   .data(function(group) {
								return group.top(10);
								})
				   .elasticX(true)
				   .controlsUseVisibility(true);

            popmalechart
                .dimension(male)
                .group(popmale)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			popfemchart
                .dimension(female)
                .group(popfmale)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
					
			popfertilitychart
                .dimension(FertilityRate)
                .group(Fertility)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			popgratechart
                .dimension(GrowthRate)
                .group(Growth)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			popcbrchart
                .dimension(Birth_rate)
                .group(Birth)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
				
			popcdrchart
                .dimension(DeathRate)
                .group(Death)
				.colors("#3182bd")
				.data(function(group) {
								return group.top(10);
								})
                .elasticX(true)
                .controlsUseVisibility(true);
            
            dc.renderAll();
        });
    });
