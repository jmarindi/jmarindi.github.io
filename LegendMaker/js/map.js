// We define a variable holding the current key to visualize on the map.
var currentKey = d3.select("#Indicator_list").node().value; 
//var currentKey = '2018_Population';
var currentID = 24;
var loadtime = 0;
var HoveredCountry = '';
var selecteddropdownval = '';
// Listen to changes of the dropdown on filter by report to select the key to visualize on
// the map.
d3.select('#Indicator_list').on('change', function(a) {
  // Change the current key and call the function to update the colors.
  currentKey = d3.select(this).property('value');
  updateMapColors();
  });
/*
d3.select("#Indicator_list").on("change", change)
  function change() {
    selecteddropdownval = this.options[this.selectedIndex].value
    console.log(selecteddropdownval);
   // updateMapColors();
   updateLegend();
  } */

// We add a listener to the browser window, calling updateLegend when
// the window is resized.
window.onresize = updateLegend;
//window.onload = updateLegend();


// We specify the dimensions for the map container. We use the same
// width and height as specified in the CSS above.
	var width = 700,
      height = 750;

// We define a variable to later hold the data of the CSV.
var mapData;

// We get and prepare the Mustache template, parsing it speeds up future uses
var template = d3.select('#template').html();
Mustache.parse(template);

// We create a SVG element in the map container and give it some
// dimensions. We can use a viewbox and preserve the aspect ratio. This
// also allows a responsive map which rescales and looks good even on
// different screen sizes
var svg = d3.select('#map').append('svg')
  .attr("preserveAspectRatio", "xMidYMid")
  .attr("viewBox", "0 0 " + width + " " + height);

// We add a <g> element to the SVG element and give it a class to
// style. We also add a class name for Colorbrewer.
var mapFeatures = svg.append('g')
  .attr('class', 'features YlGnBu');

// We add a <div> container for the tooltip, which is hidden by default.
var tooltip = d3.select("#map")
  .append("div")
  .attr("class", "tooltip hidden");
  

// Define the zoom and attach it to the map
var zoom = d3.behavior.zoom()
  .scaleExtent([1, 10])
  .on('zoom', doZoom);
svg.call(zoom);

// We define a geographical projection
// and set some dummy initial scale. The correct scale, center and
// translate parameters will be set once the features are loaded.
var projection = d3.geo.mercator()
  .scale(1);

// We prepare a path object and apply the projection to it.
var path = d3.geo.path()
  .projection(projection);

// We prepare an object to later have easier access to the data.
var dataById = d3.map();

// We prepare a quantize scale to categorize the values in 9 groups.
// The scale returns text values which can be used for the color CSS
// classes (q0-9, q1-9 ... q8-9). The domain will be defined once the
// values are known.
var quantize = d3.scale.quantize()
  .range(d3.range(9).map(function(i) { return 'q' + i + '-9'; }));
 
// We prepare a number format which will always return 2 decimal places.
var formatNumber = d3.format('.2f');

//Format population numbers as displayed to include commas as 1000 separators
var formatComma = d3.format(",");

// For the legend, we prepare a very simple linear scale. Domain and
// range will be set later as they depend on the data currently shown.
var legendX = d3.scale.linear();

// We use the scale to define an axis. The tickvalues will be set later
// as they also depend on the data.
var legendXAxis = d3.svg.axis()
  .scale(legendX)
  //.orient("top")
  .orient("bottom")
  .tickSize(13)
  .tickFormat(function(d) {
    return formatNumber(d);
  });

// We create an SVG element in the legend container and give it some
// dimensions.
var legendSvg = d3.select('#legend').append('svg')
  .attr('width', '100%')
  .attr('height', '90');

// To this SVG element, we add a <g> element which will hold all of our
// legend entries.
var g = legendSvg.append('g')
    .attr("class", "legend-key YlGnBu")
    .attr("transform", "translate(" + 20 + "," + 20 + ")");

// We add a <rect> element for each quantize category. The width and
// color of the rectangles will be set later.
g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
  .enter().append("rect");

// We add a <text> element acting as the caption of the legend. The text
// will be set later.
g.append("text")
    .attr("class", "caption")
    .attr("y", -6)

/**
 * Function to update the legend.

 */
function updateLegend() {

  // We determine the width of the legend. It is based on the width of
  // the map minus some spacing left and right.
  var legendWidth = d3.select('#map').node().getBoundingClientRect().width - 50;

  // We determine the domain of the quantize scale which will be used as
  // tick values. We cannot directly use the scale via quantize.scale()
  // as this returns only the minimum and maximum values but we need all
  // the steps of the scale. The range() function returns all categories
  // and we need to map the category values (q0-9, ..., q8-9) to the
  // number values. To do this, we can use invertExtent().
  var legendDomain = quantize.range().map(function(d) {
    var r = quantize.invertExtent(d);
    return r[1];
  });
  // Since we always only took the upper limit of the category, we also
  // need to add the lower limit of the very first category to the top
  // of the domain.
  legendDomain.unshift(quantize.domain()[0]);

  // On smaller screens, there is not enough room to show all 10
  // category values. In this case, we add a filter leaving only every
  // third value of the domain.
  if (legendWidth < 600) {
    legendDomain = legendDomain.filter(function(d, i) {
      return i % 3 == 0;
    });
  }

  // We set the domain and range for the x scale of the legend. The
  // domain is the same as for the quantize scale and the range takes up
  // all the space available to draw the legend.
  legendX
    .domain(quantize.domain())
    .range([0, legendWidth]);

  // We update the rectangles by (re)defining their position and width
  // (both based on the legend scale) and setting the correct class.
  g.selectAll("rect")
    .data(quantize.range().map(function(d) {
      return quantize.invertExtent(d);
    }))
    .attr("height", 8)
    .attr("x", function(d) { return legendX(d[0]); })
    .attr("width", function(d) { return legendX(d[1]) - legendX(d[0]); })
    .attr('class', function(d, i) {
      return quantize.range()[i];
    });

  // We update the legend caption. To do this, we take the text of the
  // currently selected dropdown option.
   var keyDropdown = d3.select('#Indicator_list').node();
   var selectedOption = keyDropdown.options[keyDropdown.selectedIndex];
   g.selectAll('text.caption')
    .text(selectedOption.text);

  // We set the calculated domain as tickValues for the legend axis.
  legendXAxis
    .tickValues(legendDomain)

  // We call the axis to draw the axis.
  g.call(legendXAxis);
}

// Load the features from the GeoJSON.
	
d3.json('geo/Af0.geojson', function(error, features) {

  // Get the scale and center parameters from the features.
  var scaleCenter = calculateScaleCenter(features);

  // Apply scale, center and translate parameters.
  projection.scale(scaleCenter.scale)
    .center(scaleCenter.center)
    .translate([width/2, height/2]);

  // Read the data for the choropleth map
 d3.csv('data/Aucdata.csv', function(data) {
  data.forEach(function(d) {
    d.Population2018  = formatComma(d.Population2018); 
    d.Population2063  = formatComma(d.Population2063);
  });
    // We store the data object in the variable which is accessible from
    // outside of this function.
    mapData = data;
   
    // This maps the data of the CSV so it can be easily accessed by
    // the ID of the admin unit,
    dataById = d3.nest()
      .key(function(d) { return d.myID; })
      .rollup(function(d) { return d[0]; })
      .map(data);
   showDetails();
    // We add the features to the <g> element created before.
    // D3 wants us to select the (non-existing) path objects first ...
    mapFeatures.selectAll('path')
        // ... and then enter the data. For each feature, a <path>
        // element is added.
      .data(features.features)
      .enter().append('path')
        // As "d" attribute, we set the path of the feature.
        .attr('d', path)
        // When the mouse moves over a feature, show the tooltip.
        .on('mousemove', showTooltip)
        // When the mouse moves out of a feature, hide the tooltip.
		.on('mouseout', hideTooltip)
        // When a feature is clicked, show the details of it.
        .on('click', showDetails);

    // Call the function to update the map colors.
    updateMapColors();
    
  });

});

/**
 * Update the colors of the features on the map. Each feature is given a
 * CSS class based on its value.
 */
function updateMapColors() {
  // Set the domain of the values (the minimum and maximum values of
  // all values of the current key) to the quantize scale.
  quantize.domain([
    d3.min(mapData, function(d) { return getValueOfData(d); }),
    d3.max(mapData, function(d) { return getValueOfData(d); })
  ]);
  // Update the class (determining the color) of the features.
  mapFeatures.selectAll('path')
    .attr('class', function(f) {
      // Use the quantized value for the class
      return quantize(getValueOfData(dataById[getIdOfFeature(f)]));
    });
  // We call the function to update the legend.
  updateLegend();
}

/**
 * Show the details of a feature in the details <div> container.
 * The content is rendered with a Mustache template.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showDetails(f) {
  var d = dataById[id];
  if(loadtime < 1)
  {
    var id = currentID;
    loadtime = loadtime + 1;
    updateLegend();
  }
  else
  {
  // Get the ID of the feature.
  var id = getIdOfFeature(f);
  loadtime = loadtime + 1;
  // Use the ID to get the data entry.
  //var d = dataById[id];
  }
   d = dataById[id];
    // Render the Mustache template with the data object and put the
  // resulting HTML output in the details container.
  var detailsHtml = Mustache.render(template, d);

  // Hide the initial container.
  d3.select('#initial').classed("hidden", true);

  // Put the HTML output in the details container and show (unhide) it.
  d3.select('#details').html(detailsHtml);
  d3.select('#details').classed("hidden", false);
}

/**
 * Hide the details <div> container and show the initial content instead.
 */
function hideDetails() {
  // Hide the details
  d3.select('#details').classed("hidden", true);
  // Show the initial content
  d3.select('#initial').classed("hidden", false);
}

/**
 * Show a tooltip with the name of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function showTooltip(f) {
  // Get the ID of the feature.
  var id = getIdOfFeature(f);
  // Use the ID to get the data entry.
  //var d = dataById[myID_1];
   var d = dataById[id];
   //var d = dataById[Country];
  console.log(d);
  console.log(id);
  // Get the current mouse position (as integer)
  var mouse = d3.mouse(d3.select('#map').node()).map(
    function(d) { return parseInt(d); }

  );

  // Calculate the absolute left and top offsets of the tooltip. If the
  // mouse is close to the right border of the map, show the tooltip on
  // the left.
  var left = Math.min(width - 4 * d.Country.length, mouse[0] + 5);
  //var left = Math.min(width - 4 * d.name.length, mouse[0] + 5);
  var top = mouse[1] + 25;
    
  //var left = Math.min(width - 70 * d.name.length, mouse[0] + 5);
  //var top = mouse[1] + 40;

  // Show the tooltip (unhide it) and set the name of the data entry.
  // Set the position as calculated before.
  tooltip.classed('hidden', false)
    .attr("style", "left:" + left + "px; top:" + top + "px")
    //.html(d.name);
	.html(d.Country);
  console.log(d.Country);
  HoveredCountry = d.Country;
  console.log(HoveredCountry);
}

/**
 * Hide the tooltip.
 */
function hideTooltip() {
  tooltip.classed('hidden', true);
}

/**
 * Zoom the features on the map. This rescales the features on the map.
 * Keep the stroke width proportional when zooming in.
 */
function doZoom() {
  mapFeatures.attr("transform",
    "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")")
    // Keep the stroke width proportional. The initial stroke width
    // (0.5) must match the one set in the CSS.
    .style("stroke-width", 0.5 / d3.event.scale + "px");
}

/**
 * Calculate the scale factor and the center coordinates of a GeoJSON
 * FeatureCollection. For the calculation, the height and width of the
 * map container is needed.
 *

 */
function calculateScaleCenter(features) {
  // Get the bounding box of the paths (in pixels!) and calculate a
  // scale factor based on the size of the bounding box and the map
  // size.
  var bbox_path = path.bounds(features),
      scale = 0.95 / Math.max(
        (bbox_path[1][0] - bbox_path[0][0]) / width,
        (bbox_path[1][1] - bbox_path[0][1]) / height
      );

  // Get the bounding box of the features (in map units!) and use it
  // to calculate the center of the features.
  var bbox_feature = d3.geo.bounds(features),
      center = [
        (bbox_feature[1][0] + bbox_feature[0][0]) / 2,
        (bbox_feature[1][1] + bbox_feature[0][1]) / 2];

  return {
    'scale': scale,
    'center': center
  };
}

/**
 * Helper function to access the (current) value of a data object.
 *
 * @param {object} d - A data object representing an entry (one line) of
 * the data CSV.
 */
function getValueOfData(d) {
 // return +d[currentKey];
  return +d[currentKey];
  
}

/**
 * Helper function to retrieve the ID of a feature. The ID is found in
 * the properties of the feature.
 *
 * @param {object} f - A GeoJSON Feature object.
 */
function getIdOfFeature(f) {
  //return f.properties.myID_1;
  return f.properties.myID;
  console.log(f.properties.myID);
}
