var numberFormat = d3.format(".2f");
   // var usChart = dc.geoChoroplethChart("#us-chart");
	var AfriChart = dc.geoChoroplethChart("#afri-chart");	    
	var poptotalchart = dc.rowChart("#chart-row-poptotal");
	var popmalechart = dc.rowChart("#chart-row-popmale");

	d3.csv("data/cashdata_sumd.csv", function (csv) {
        var data = crossfilter(csv);

        var township = data.dimension(function (d) {
            return d["TS"];
        });
	    		
	   var Totalpop = data.dimension(function (d) {
            return d["TS"];
        });
		
		var male = data.dimension(function (d) {
            return +d["Total_Beneficiaries"];
        });
	var popmale = township.group().reduceSum(function (d) {
            return +d["Total_Beneficiaries"];
        });
		
	var poptotal = Totalpop.group().reduceSum(function (d) {
            return +d["Total_Beneficiaries"];
     
        }); 
		
		
		d3.json("geo/myanmar_good.json", function (AfricaJson) {
           AfriChart.width(500)
                    .height(500)
                   .dimension(township)
                 .group(poptotal)
                 .colors(d3.scale.quantize().range(["#E2F2FF", "#C4E4FF", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
                 .colorDomain([0, 200])
                 .colorCalculator(function (d) { return d ? AfriChart.colors()(d) : '#ccc'; })
                 .overlayGeoJson(AfricaJson.features, "TS", function (d) {
                     return d.properties.TS;
                 })
				 .controlsUseVisibility(true)					
                   .title(function (d) {
                       return "TS: " + d.key + "\nTotal population: " + numberFormat(+d.value ? +d.value : 0) + "M"; 
					
                    }); 
					
		   poptotalchart
                   .dimension(Totalpop)
                   .group(poptotal)
				   //.colors("#3182bd")
				  // .colors("#3182bd", "#81C5FF", "#6BBAFF", "#51AEFF")
				  //.colors(d3.scale.quantize().range(["#E2F2FF", "#3182bd", "#9ED2FF", "#81C5FF", "#6BBAFF", "#51AEFF", "#36A2FF", "#1E96FF", "#0089FF", "#0061B5"]))
				   .data(function(group) {
								return group.top(10);
								})
				   .elasticX(true)
				  //.title(function(group){return d.data.value + "\people: " + d.data.value;})
                   .controlsUseVisibility(true); 
					   
	
            popmalechart
                .dimension(male)
                .group(popmale)
				.colors(d3.scale.category10())
				.data(function(group) {
								return group.top(10);
								})
              //  .elasticX(true)
                .controlsUseVisibility(true);
				
			//==========================================================	
            
            dc.renderAll();
        });
    }); 