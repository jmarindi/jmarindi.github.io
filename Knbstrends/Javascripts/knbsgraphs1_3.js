
var selectedRegion = '';
var dataSet;
var selectedPoint;
var mapChart, HumanImpactChart,FinancialImpactChart, splinechart,clickedpoint;

anychart.onDocumentReady(function() {

    var drawMapChart = function () {
        var map = anychart.map();
        map.geoData(anychart.maps["kenya"]);
        map.title().enabled(true).useHtml(true).text('<span style="color: #212121;">population per county in kenya</span>').fontSize(18).padding([15,0,15,0]);

        var cr = map.colorRange();
        cr.enabled(true).colorLineSize(10).padding([15,0,0,0]);
        cr.marker().size(7);
        cr.ticks().enabled(true).position('right').length(10).stroke('2 #fff');
        cr.labels().textFormatter(function(){
            var range = this.colorRange;
            var name;
            if (isFinite(range.start + range.end)) {
              name = range.start.toLocaleString()  + ' - ' + range.end.toLocaleString();
            } else if (isFinite(range.start)) {
              name = '> ' + range.start.toLocaleString();
            } else {
              name = '< ' + range.end.toLocaleString();
            }
            return name
        });
        cr.listen('mousedown', function(e){e.preventDefault(); e.stopPropagation()});

        var s1 = map.choropleth();
        //s1.geoIdField('id');
		s1.geoIdField('id');
		clickedpoint = s1.geoIdField('id');
		console.log(clickedpoint);
        s1.labels(null);
        var ocs = anychart.scales.ordinalColor([{less: 350000},
            {from: 350000, to: 400000},
            {from: 400000, to: 450000},
            {from: 450000, to: 500000},
            {from: 500000, to: 550000},
            {greater: 550000}]);
        ocs.colors(['#ffd54f', '#FDC543', '#F9B033', '#F7A028', '#F28110', '#ef6c00']);
        s1.colorScale(ocs);
        s1.hoverFill('#1976d2 0.6');
        s1.selectFill('#1976d2');
        s1.tooltip().title().fontSize(16);
        s1.tooltip().titleFormatter(function(){
                return this.name;
        });
        s1.tooltip().useHtml(true).textFormatter(function(){
            return '<span style="color:#d9d9d9">Year 2018 Total population:</span> ' + '' + parseInt(this.value).toLocaleString();
        });
        map.padding(0, 5, 5, 0).margin(0);
        map.getSeries(0).data(regions_data);
        map.listen(anychart.enums.EventType.POINTS_SELECT, function(e) {
		selectedRegion = "";
		  selectedPoint = e.currentPoint;
            if (selectedPoint) {
                changeContents(selectedPoint.index);
				//console.log(selectedPoint);
            }
			
          });
        return map
    };

    var drawHumanImpactChart = function () {
       // var chart = anychart.column();
		var chart = anychart.column();
        var s1 = anychart.scales.linear();
        var s2 = anychart.scales.linear();
		//chart.padding([40,0,0,0]);
        chart.padding([10,2,0,0]);
        chart.title().enabled(true).useHtml(true).padding([0,0,15,0]);
        chart.yAxis().scale(s1);
        chart.yAxis().scale().minimum(0);
        chart.yAxis(1).scale(s2);
        chart.yAxis(1).scale().minimum(0);
        var series = chart.column();
		series.yScale(s1);
        series.name('PeopleImpact');
        series.tooltip().title().fontSize(16);
        series.tooltip().titleFormatter(function(){
                return this.x;
        });
        series.tooltip().useHtml(true).textFormatter(function(){
            return '<span style="color:#d9d9d9">Deaths:</span> ' + parseInt(this.getDataValue('value_2')).toLocaleString()
                    + '<br/>' +'<span style="color:#d9d9d9">PeopleImpact:</span> ' + '' + parseInt(this.value).toLocaleString();
        });
      //  var series2 = chart.line();
		var series2 = chart.spline();
        series2.yScale(s2);
        series2.name('Deaths');
        series2.tooltip().title().fontSize(16);
        series2.tooltip().titleFormatter(function(){
                return this.x;
        });
        series2.tooltip().useHtml(true).textFormatter(function(){
            return '<span style="color:#d9d9d9">Deaths:</span> ' + parseInt(this.value).toLocaleString()
                    + '<br/>' +'<span style="color:#d9d9d9">PeopleImpact:</span> ' + '' + parseInt(this.getDataValue('value_2')).toLocaleString();
        });
		
		   	
        chart.interactivity("byX");
        chart.yAxis().orientation('left').title(null);
        chart.yAxis(1).orientation('right').title(null);
        chart.xAxis().title(null);
        chart.yAxis().labels().fontSize(11).textFormatter(function () {
            return '' + Math.abs(parseInt(this.value)).toLocaleString();
        });
        chart.yAxis(1).labels().padding(0, 0, 0, 5).fontSize(11);
        chart.xAxis().labels().padding(5, 1, 0, 3).fontSize(11);
        chart.legend().position('bottom').enabled(true).tooltip(false).align('center').padding(10, 0, 0, 0);
        chart.interactivity().selectionMode("none");
        return chart;
    };
	
	/*============================================================================================================*/
	 var drawFinancialImpactChart = function () {
       // var chart = anychart.column();
		var chart = anychart.column();
        var s1 = anychart.scales.linear();
        var s2 = anychart.scales.linear();
        chart.padding([10,0,0,0]);
        chart.title().enabled(true).useHtml(true).padding([0,0,15,0]);
        chart.yAxis().scale(s1);
        chart.yAxis().scale().minimum(0);
        chart.yAxis(1).scale(s2);
        chart.yAxis(1).scale().minimum(0);
        var series = chart.column();
		//var series = chart.spline();
        series.yScale(s1);
        series.name('Losses (local)');
        series.tooltip().title().fontSize(16);
        series.tooltip().titleFormatter(function(){
                return this.x;
        });
        series.tooltip().useHtml(true).textFormatter(function(){
            return '<span style="color:#d9d9d9">losses (local):</span> ' + parseInt(this.getDataValue('value_2')).toLocaleString()
                    + '<br/>' +'<span style="color:#d9d9d9">Losses (USD):</span> ' + '' + parseInt(this.value).toLocaleString();
        });
       var series2 = chart.line();
		//var series2 = chart.column();
        series2.yScale(s2);
        series2.name('Losses (USD)');
        series2.tooltip().title().fontSize(16);
        series2.tooltip().titleFormatter(function(){
                return this.x;
        });
        series2.tooltip().useHtml(true).textFormatter(function(){
            return '<span style="color:#d9d9d9">losses (local):</span> ' + parseInt(this.value).toLocaleString()
                    + '<br/>' +'<span style="color:#d9d9d9">Losses (usd):</span> ' + '' + parseInt(this.getDataValue('value_2')).toLocaleString();
        });
        chart.interactivity("byX");
        chart.yAxis().orientation('left').title(null);
        chart.yAxis(1).orientation('right').title(null);
        chart.xAxis().title(null);
        chart.yAxis().labels().fontSize(11).textFormatter(function () {
            return '' + Math.abs(parseInt(this.value)).toLocaleString();
        });
        chart.yAxis(1).labels().padding(0, 0, 0, 5).fontSize(11);
        chart.xAxis().labels().padding(5, 1, 0, 3).fontSize(11);
        chart.legend().position('bottom').enabled(true).tooltip(false).align('center').padding(10, 0, 0, 0);
        chart.interactivity().selectionMode("none");
        return chart;
    };
	
	/*=================================================================================*/
		
	
    var general_data_set = anychart.data.set();
    var general_data_set_map1 = general_data_set.mapAs({value: [1], x: [0], value_2: [2]});
    var general_data_set_map2 = general_data_set.mapAs({value: [2], x: [0], value_2: [1]});
	
	//var general_data_set_map3 = general_data_set.mapAs({value: [3], x: [0], value_3: [9]});
	var general_data_set_map3 = general_data_set.mapAs({value: [3], x: [0], value_2: [9]});
    var general_data_set_map4 = general_data_set.mapAs({value: [4], x: [0], value_2: [10]});
	
	//var general_data_set_map1 = general_data_set.mapAs({value: [1], x: [0], value_2: [2]});
    //var general_data_set_map2 = general_data_set.mapAs({value: [2], x: [0], value_2: [1]});


    var changeContents = function(index){
		regionClicked = 
   	    selectedRegion = "";
	    selectedRegion = regions_data[index].x;
		regionClicked = selectedRegion;
		//console.log(regionClicked);		
		dataSet = regions_data[index].x +'_dataset';
		//selectedRegion = regions_data[index].x;
		//console.log(selectedRegion);
		//console.log(dataSet);
		regionClickedDataset = dataSet;
		//console.log(regionClickedDataset);
		localStorage.setItem("clickedreg", regionClickedDataset);
        general_data_set.data(regions_data[index].vis_data);
        HumanImpactChart.getSeries(0).data(general_data_set_map1);
        HumanImpactChart.getSeries(1).data(general_data_set_map2);
        HumanImpactChart.title().text('Human impact in <span style="color: #212121; text-decoration: underline">' + regions_data[index].x + ' (raw figures) </span>');
		FinancialImpactChart.getSeries(0).data(general_data_set_map3);
        FinancialImpactChart.getSeries(1).data(general_data_set_map4);
        FinancialImpactChart.title().text('Financial impact in <span style="color: #212121; text-decoration: underline">' + regions_data[index].x + ' (Thousands)</span>');

		//pick_region_data();
		//createspline();
    };
	
		
	/*========================================================================*/
    mapChart = drawMapChart();
    HumanImpactChart = drawHumanImpactChart();
	FinancialImpactChart = drawFinancialImpactChart();
	
   function fillInMainTable(flag) {
        if (flag == 'wide') {
            layoutTable.contents([
                [mapChart, HumanImpactChart,FinancialImpactChart, null]
				
            ], true);
            layoutTable.getCell(0,1).colSpan(1);
			//layoutTable.getCell(0,1).colSpan(2);
            layoutTable.getCell(0,0).rowSpan(2);
			//layoutTable.getCell(0,0).rowSpan(3);
            layoutTable.getCol(0).width('35%');
			layoutTable.getCol(1).width('40%');
			layoutTable.getCol(2).width('25%');
            layoutTable.getRow(0).height('100%');
			//layoutTable.getRow(0).height(null);
        } else {
            layoutTable.contents([
                [mapChart, null],
                [HumanImpactChart, null]
				[FinancialImpactChart, null]
				 // [totalShareChart, marketShareChart]
            ], true);
            layoutTable.getCell(0,0).colSpan(2);
			//layoutTable.getCell(0,0).colSpan(2);
            layoutTable.getCell(1,0).colSpan(2);
			//layoutTable.getCell(1,0).colSpan(2);
            layoutTable.getCol(0).width(null);
            layoutTable.getRow(0).height(300);
			//layoutTable.getRow(0).height(400);
        }
        layoutTable.draw();
    }

    // Setting layout table
    layoutTable = anychart.standalones.table();
    layoutTable.cellBorder(null);
    layoutTable.container('container');

    if (window.innerWidth > 768)
        fillInMainTable('wide');
    else {
        fillInMainTable('slim');
    }

    mapChart.getSeries(0).select(5);
    changeContents(5);
    // On resize changing layout to mobile version or conversely
    window.onresize = function () {
        if (layoutTable.colsCount() == 2 && window.innerWidth > 767) {
            fillInMainTable('wide');
        } else if (layoutTable.colsCount() == 3 && window.innerWidth <= 767) {
            fillInMainTable('slim');
        }
    };
 
}); 

 
