 var width = 510,
  height = 800;
  
    // Setting color domains(intervals of values) for our map

  var color_domain = [0, 1, 5000, 10000, 15000, 20000, 25000]
  var ext_color_domain = [0, 1, 5000, 10000, 15000, 20000, 25000]
  var legend_labels = ["No Projects","< 5,000", "5,000+", "10,000+", "15,000+", "20,000+", "> 25,000"]              
  var color = d3.scale.threshold()
  .domain(color_domain)
  .range(["#C0C0C0","#C0C0C0","#ddff66", "#ccd652", "#8ca338", "#4d701f", "#0d3d05", "#003300"]);
   
  
   var div = d3.select("body").append("div")   
  .attr("class", "tooltip")               
  .style("opacity", 0);

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("margin", "10px auto");
  

   // map projection
var projection = d3.geo.patterson()
	.center([88,29])
    .scale(2200)
	//.translate([width / 2, height / 2])
    .translate([0,0])
    .precision(.1);

// path generator
var path = d3.geo.path()
	.projection(projection);

  var path = d3.geo.path().projection(projection);

  //Reading map file and data

  queue()
  .defer(d3.json, "geo/myanmar_good.json")
  .defer(d3.csv, "data/myanmarcashdata.csv")
  .await(ready);
  

  //Start of Choropleth drawing

  function ready(error, map, data) {
	//  console.log(data);
   var rateById = {};
   var nameById = {};
   var beneficiariespertown = {};
   var amountpertown = {};

   data.forEach(function(d) {
    
	rateById[d.TS_PCODE] = d.Total_Beneficiaries;
	amountpertown[d.TS_PCODE] = d.Total_amount;
    nameById[d.TS_PCODE] = d.TS;
	//amountpertown = d.Total_amount;
  });

  //Drawing Choropleth

  svg.append("g")
  
  .attr("class", "TS_PCODE")
  .selectAll("path")
  .data(topojson.object(map, map.objects.myanmar).geometries)
  .enter().append("path")
  .attr("d", path)
  .style("fill", function(d) {
    return color(rateById[d.properties.TS_PCODE]); 
  })
  .style("opacity", 1.1)

  //Adding mouseevents
  .on("mouseover", function(d) {
    d3.select(this).transition().duration(300).style("opacity", 1);
    div.transition().duration(300)
    .style("opacity", 1)
     div.text(nameById[d.properties.TS_PCODE] + " :"+'Total_Beneficiaries:' +" " + rateById[d.properties.TS_PCODE] +" "+'Total cash Disbursed (USD):' +" " +amountpertown[d.properties.TS_PCODE])
	  .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY -30) + "px");
  })
 .on("mouseout", function() {
    d3.select(this)
    .transition().duration(300)
    .style("opacity", 0.8);
    div.transition().duration(300)
    .style("opacity", 0);
  })
  
     
  }; // <-- End of Choropleth drawing
 
  //Adding legend for our Choropleth

  var legend = svg.selectAll("g.legend")
  .data(ext_color_domain)
  .enter().append("g")
  .attr("class", "legend");

  var ls_w = 30, ls_h = 30;

  legend.append("rect")
  .attr("x", 20)
  .attr("y", function(d, i){ return height - (i*ls_h) - 2*ls_h;})
  .attr("width", ls_w)
  .attr("height", ls_h)
  .style("fill", function(d, i) { return color(d); })
  .style("opacity", 0.8);

  legend.append("text")
  .attr("x", 50)
  .attr("y", function(d, i){ return height - (i*ls_h) - ls_h - 4;})
  .text(function(d, i){ return legend_labels[i]; });
