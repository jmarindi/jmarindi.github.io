 
    //dc-leaflet-choro.js    

    dc.leafletChart = function(_chart) {
    _chart = dc.baseChart(_chart);

    var _map;
    var _mapOptions = false;
    var _defaultCenter = false;
    var _defaultZoom = false;

    // http://leafletjs.com/examples/choropleth.html
    //--------------------------------------------------------------------
    var _info = L.control();
    _info.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    _info.update = function(props) {
      this._div.innerHTML = '<h4>Extreme Events</h4>' + (props ?       
        '<b>' + props.key + '</b><br />' + 'Event probability: ' + 
        Math.round(100 * props.value.count / (timeAggCount)) + '%' : 'Hover over a map region');
    };

    //-------------------------------------------------------------------
    //######################
    var _legend = L.control({
      position: 'bottomleft'
    });
    var numCharts = 0;

    _legend.onAdd = function(map) {
      this._div = L.DomUtil.create('div', 'info legend');
      this.update();
      return this._div;
    };

    _legend.update = function() {

      //**Dirty hack** Display legend only when all dc charts are cycled through
      //numCharts++;

      //if (numCharts == 2) {
        minValue = choroChart.colorDomain()[0];
        maxValue = choroChart.colorDomain()[1];
        palette = choroChart.colors().range();
        colorLength = choroChart.colors().range().length;
        delta = (maxValue - minValue) / colorLength;

        //define grades for legend colours
        grades = [];
        grades[0] = Math.round(minValue);
        for (var i = 1; i < colorLength; i++) {
          grades[i] = Math.round((0.5 + (i - 1)) * delta + minValue);
        }

        var div = L.DomUtil.create('div', 'info legend');          

        // loop through our density intervals and generate a label with a colored square for each interval
        this._div.innerHTML = ""; //reset so that legend is not plotted multiple times
        for (var i = 0; i < grades.length; i++) {
          this._div.innerHTML +=
            '<i style="background:' + palette[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
      //}
    };
    //###################################

    var _tiles = function(map) {
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      //  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
    }

    _chart.doRender = function() {
      _map = L.map(_chart.root().node(), _mapOptions);
      if (_defaultCenter && _defaultZoom)
        _map.setView(_chart.toLocArray(_defaultCenter), _defaultZoom);

      _chart.tiles()(_map);
      _chart.info().addTo(_map);
      _chart.legend().addTo(_map);

      _chart._postRender();

      return _chart.doRedraw();
    }

    _chart.info = function(_) {
      if (!arguments.length) return _info;
      _info = _;
      return _chart;
    }

    _chart.legend = function(_) {
      if (!arguments.length) return _legend;
      _legend = _;
      return _chart;
    }

    _chart._postRender = function() {
      //abstract
    }

    _chart.mapOptions = function(_) {
      if (!arguments.length) return _mapOptions;
      _mapOptions = _;
      return _chart;
    }

    _chart.center = function(_) {
      if (!arguments.length) return _defaultCenter;
      _defaultCenter = _;
      return _chart;
    }

    _chart.zoom = function(_) {
      if (!arguments.length) return _defaultZoom;
      _defaultZoom = _;
      return _chart;
    }

    _chart.colorDomain = function(_) {
      if (!arguments.length) return _colorDomain;
      _colorDomain = _;
      return _chart;
    }

    _chart.tiles = function(_) {
      if (!arguments.length) return _tiles;
      _tiles = _;
      return _chart;
    }

    _chart.map = function() {
      return _map;
    }

    _chart.toLocArray = function(value) {
      if (typeof value == "string") {
        // expects '11.111,1.111'
        value = value.split(",");
      }
      // else expects [11.111,1.111] 
      return value;
    }

    return _chart;
  }


  /***************************
            choropleth
  ***************************/

  //dc-leaflet-choro.js
  dc.leafletChoroplethChart = function(parent, chartGroup) {
    var _chart = dc.colorChart(dc.leafletChart({}));

    var _geojsonLayer = false;
    var _dataMap = [];

    var _geojson = false;
    var _renderPopup = true;
    var _brushOn = true;
    var _featureOptions = {
      'fillColor': 'black',
      'color': 'gray',
      'opacity': 0.4,
      'fillOpacity': 0.6,
      'weight': 1
    };
    //
    var _renderTitle = true;

    var _featureKey = function(feature) {
      return feature.key;
    }

    var _featureStyle = function(feature) {
      var options = _chart.featureOptions();
      if (options instanceof Function)
        options = options(feature);
      options = JSON.parse(JSON.stringify(options));
      var v = _dataMap[_chart.featureKeyAccessor()(feature)];
      if (v && v.d) {
        options.fillColor = _chart.getColor(v.d, v.i);
        if (_chart.filters().indexOf(v.d.key) != -1) {
          options.opacity = 0.8;
          options.color = "#725848";
          options.weight = 2.5;
        }
      }
      return options;
    };

    var _popup = function(d, feature) {
      return _chart.title()(d);
    }

    _chart._postRender = function() {
      _geojsonLayer = L.geoJson(_chart.geojson(), {
        style: _chart.featureStyle(),
        onEachFeature: processFeatures
      });
      _chart.map().addLayer(_geojsonLayer);
    }

    _chart.doRedraw = function() {
      _geojsonLayer.clearLayers();
      _dataMap = [];
      _chart.computeOrderedGroups().forEach(function(d, i) {
        _dataMap[_chart.keyAccessor()(d)] = {
          'd': d,
          'i': i
        };
      });
      _geojsonLayer.addData(_chart.geojson());

      _chart.legend().update();
    }

    _chart.geojson = function(_) {
      if (!arguments.length) return _geojson;
      _geojson = _;
      return _chart;
    }

    _chart.featureOptions = function(_) {
      if (!arguments.length) return _featureOptions;
      _featureOptions = _;
      return _chart;
    }

    _chart.featureKeyAccessor = function(_) {
      if (!arguments.length) return _featureKey;
      _featureKey = _;
      return _chart;
    }

    _chart.featureStyle = function(_) {
      if (!arguments.length) return _featureStyle;
      _featureStyle = _;
      return _chart;
    }

    _chart.popup = function(_) {
      if (!arguments.length) return _popup;
      _popup = _;
      return _chart;
    }

    _chart.renderPopup = function(_) {
      if (!arguments.length) return _renderPopup;
      _renderPopup = _;
      return _chart;
    }

    _chart.brushOn = function(_) {
      if (!arguments.length) return _brushOn;
      _brushOn = _;
      return _chart;
    }

    var processFeatures = function(feature, layer) {
      var v = _dataMap[_chart.featureKeyAccessor()(feature)];
      if (v && v.d) {
        layer.key = v.d.key;
        if (_chart.renderPopup())
          layer.bindPopup(_chart.popup()(v.d, feature));

        //Define mouse events        
        layer.on({
          "mouseover": function(e) {
            //gis.stackexchange.com/questions/31951/how-to-show-a-popup-on-mouse-over-not-on-click
            //this.openPopup(); //built-in leaflet popup window

            //Custom Control with Leaflet
            //http://leafletjs.com/examples/choropleth.html
            //highlight region borders
            var layer = e.target;

            layer.setStyle({
              weight: 3,
              color: "#422703",
              //dashArray: '',
              //fillOpacity: 0.7 //changes colour upon hover
            });

            if (!L.Browser.ie && !L.Browser.opera) {
              layer.bringToFront();
            }

            //apply border highlight
            _chart.info().update(v.d);
          },

          //reset borders on mouseout
          "mouseout": function(e) {
            _geojsonLayer.resetStyle(e.target);
          }
        });


        if (_chart.brushOn()) {
          layer.on("click", selectFilter);
        }
      }
    }

    var selectFilter = function(e) {
      if (!e.target) return;
      var filter = e.target.key;
      dc.events.trigger(function() {
        _chart.filter(filter);
        dc.redrawAll(_chart.chartGroup());
      });
    }


    return _chart.anchor(parent, chartGroup);
  }
  //end dc-leaflet-choro.js

  var region_dict = [];
  var legend = [];
  var region_id = [1, 2, 3, 4, 5, 6, 7, 11, 13, 14, 15, 16, 17];

  //for avgs
  var avgRegionGroup, avgEventsBySeason;

  //for map click
  var choroChart;

  //to be defined in each chart:
  var regionCount, yearCount;

  var chart;

  choroChart = dc.leafletChoroplethChart("#choro-map .map");
  yearChart = dc.barChart("#chart-year");
  timeAggregateChart = dc.rowChart("#chart-seasons");

  d3.csv("data/data.csv", function(csv) {
/*
    regions = {
      1: "Alsace, Champagne-Ardenne et Lorraine",
      2: "Aquitaine, Limousin et Poitou-Charentes",
      3: "Auvergne et Rhône-Alpes",
      4: "Bourgogne et Franche-Comté",
      5: "Bretagne",
      6: "Centre-Val de Loire",
      7: "Corse",
      11: "Languedoc-Roussillon et Midi-Pyrénées",
      13: "Nord-Pas-de-Calais et Picardie",
      14: "Normandie",
      15: "Pays de la Loire",
      16: "Provence-Alpes-Côte d'Azur",
      17: "Île-de-France"
    }; */
	  regions = {
      1: "Awdal",
      2: "Bakool",
      3: "Banadir",
      4: "Bari",
      5: "Bay",
      6: "Galgaduud",
      7: "Gedo",
      11: "Hiraan",
      13: "Middle Juba",
      14: "Lower Juba",
      15: "Mudug",
      16: "Nugaal",
      17: "Sanaag"
    };

    models = {
      1: "MetEir-ECEARTH_RACMO22E"
    };

    indices = {
      "TG": "Mean daily temp (degC)"
    };


    seasons = {
      "1": "Armed Conflict",
      "2": "Terrorism",
      "3": "Crime",
      "4": "Civil Unrest",
      "5": "Year"
    };

    var filter = crossfilter(csv);

    var yearDimension = filter.dimension(function(d) {
        return +d.Year;
      }),
      regionDimension = filter.dimension(function(d, i) {
        return regions[d.Region];
      }),
      seasonDimension = filter.dimension(function(d) {
        return seasons[d.TimeAggregate];
      });

    // ==========================================================
    var numTimeAgg = 5; //number of time aggregates (4 seasons + year)
    var numRegions = Object.keys(regions).length;
    var modelRange = 2100 - 1972;
    var ymin = 0;
    var ymax = 100; //min and max for y-axes of year bar chart
    colorbrewer = ["#ffffcc","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8",
                   "#0c2c84"]; //colorbrewer.js YlGnBu[7]

    avgRegionGroup = regionDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial);
    avgSeasonGroup = seasonDimension.group().reduce(reduceAdd, reduceRemove, reduceInitial);

    //Fns to count data for all datasets except the OBS data (id=100).
    function reduceAdd(p, v) {
      ++p.count;
      return p;
    }

    function reduceRemove(p, v) {
      --p.count;
      return p;
    }

    function reduceInitial() {
      return {
        count: 0
      };
    }

    //Special fns for time aggregates
    //https://github.com/dc-js/dc.js/issues/21        
    avgEventsBySeason = yearDimension.group().reduce(
      // add
      function(p, v) {

        if (v.TimeAggregate == "1") ++p.season0Count;
        if (v.TimeAggregate == "2") ++p.season1Count;
        if (v.TimeAggregate == "3") ++p.season2Count;
        if (v.TimeAggregate == "4") ++p.season3Count;
        if (v.TimeAggregate == "5") ++p.yrAggCount;

        return p;
      },
      // remove
      function(p, v) {

        if (v.TimeAggregate == "1") --p.season0Count;
        if (v.TimeAggregate == "2") --p.season1Count;
        if (v.TimeAggregate == "3") --p.season2Count;
        if (v.TimeAggregate == "4") --p.season3Count;
        if (v.TimeAggregate == "5") --p.yrAggCount;

        return p;
      },
      // init
      function() {
        return {
          season0Count: 0,
          season1Count: 0,
          season2Count: 0,
          season3Count: 0,
          yrAggCount: 0
        };
      }
    );
    //end fn for time aggregates

    //===========================================================
    minYear = parseInt(yearDimension.bottom(1)[0].Year) - 5;
    maxYear = parseInt(yearDimension.top(1)[0].Year) + 5;

    // ==========================================================
    //  READ IN GEOJSON
    // ==========================================================       
    //d3.json("geo/FRA_admin13.json", function(statesJson) {
   d3.json("geo/SomaliaAdmin1Geo.json", function(statesJson) {

      //region name dictionary
      statesJson.features.forEach(function(d, idx) {
        region_dict.push({
          key: d.properties.admin1Name,
          value: region_id[idx]
        });
        legend[idx] = d.properties.admin1Name;
      });


      choroChart
        .dimension(regionDimension)
        .group(avgRegionGroup)
        .width(400)
        .height(170)
        //.center([47.00, 2.00])
		.center([6.24, 44.67])
        .zoom(5)
        .geojson(statesJson)
        .valueAccessor(function(d) {

          yearCount = yearChart.filters().length ? (parseInt(yearChart.filters()[0][1]) - parseInt(yearChart.filters()[0][0])) : modelRange;
          timeAgg_clicked = timeAggregateChart.filters().length ? timeAggregateChart.filters().length : numTimeAgg;
          timeAggCount = timeAgg_clicked * yearCount;

          return 100 * d.value.count / (timeAggCount);
        })
        .colors(colorbrewer)
        .colorAccessor(function(d, i) {

          yearCount = yearChart.filters().length ? (parseInt(yearChart.filters()[0][1]) - parseInt(yearChart.filters()[0][0])) : modelRange;
          timeAgg_clicked = timeAggregateChart.filters().length ? timeAggregateChart.filters().length : numTimeAgg;
          timeAggCount = timeAgg_clicked * yearCount;

          return 100 * d.value.count / (timeAggCount);
        })
        .featureKeyAccessor(function(feature) {
          return feature.properties.admin1Name;
        });

      choroChart.on("preRender", function(chart) {
      	chart.colorDomain(d3.extent(chart.group().all(),
                                    chart.valueAccessor()));
      });

      choroChart.on("preRedraw", function(chart) {
        //save initial eventRange upon page load

        eventRange = d3.extent(chart.group().all(), chart.valueAccessor());
        eventRange[0] = 0; //make min always 0 
        eventRange[1] = 70; //manually set max         

        chart.colorDomain(eventRange);

      });

      // =================
      timeAggregateChart
        .width(225).height(150)
        .colors(["#888888"])
        .dimension(seasonDimension)
        .group(avgSeasonGroup)
        .gap(2)
        .valueAccessor(function(d) {

          regionCount = choroChart.filters().length ? choroChart.filters().length : numRegions;

          yearCount = yearChart.filters().length ? (parseInt(yearChart.filters()[0][1]) - parseInt(yearChart.filters()[0][0])) : modelRange;

          return 100 * d.value.count / (regionCount * yearCount);

        })
        .title(function(d) {
          return Math.round(100 * d.value.count / (regionCount * yearCount)) + "%";
        });

      timeAggregateChart
        .x(d3.scale.linear().range([0, (timeAggregateChart.width() - 50)]).domain([0, 100]));
      timeAggregateChart
        .xAxis().scale(timeAggregateChart.x()).tickValues([0, 20, 40, 60, 80, 100]);


      // =================
      yearChart
        .width(350).height(200)
        .dimension(yearDimension)
        .group(avgEventsBySeason)
        .valueAccessor(function(d) {

          //add time aggregates and normalized by num aggregates selected
          timeAgg_clicked = timeAggregateChart.filters().length ? timeAggregateChart.filters().length : numTimeAgg;
          normSeasons = (d.value.season0Count + d.value.season1Count + d.value.season2Count + d.value.season3Count + d.value.yrAggCount) / timeAgg_clicked;

          regionCount = choroChart.filters().length ? choroChart.filters().length : numRegions;

          return Math.round(100 * normSeasons / (regionCount));

        })
        //.filter([2001, 2030])
        .gap(0)
        .centerBar(true)
        .renderHorizontalGridLines(true)
        .x(d3.scale.linear().domain([1972, 2100]))
        .y(d3.scale.linear().domain([ymin, ymax]))
        .xAxisLabel("Year")
        .yAxisLabel("Probability (%)");

      yearChart
        .xAxis().ticks(2).tickFormat(d3.format("d"))
        .tickValues([1975, 1995, 2015, 2035, 2055, 2075, 2095]);
      yearChart
        .yAxis().tickValues([25, 50, 75, 100]);

      // =================
      dc.renderAll();

      //http://stackoverflow.com/questions/21114336/how-to-add-axis-labels-for-row-chart-using-dc-js-or-d3-js
      function AddXAxis(chartToUpdate, displayText) {
        chartToUpdate.svg()
          .append("text")
          .attr("class", "x-axis-label")
          .attr("text-anchor", "middle")
          .attr("x", chartToUpdate.width() / 2)
          .attr("y", chartToUpdate.height() + 2)
          .text(displayText);
      }
      AddXAxis(timeAggregateChart, "Probability (%)");

    }); //end geojson
  }); //end csv
