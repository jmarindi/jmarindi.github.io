 /*MAIN JS;
 
		 */
		 var Deaths_dataPoints = [

                   { x: new Date(1980, 0), y:	0.068},
                   { x: new Date(1981, 0), y:	0.053},
                   { x: new Date(1982, 0), y:	0.086},
                   { x: new Date(1983, 0), y:	0.045},
                   { x: new Date(1984, 0), y:	0.079},
                   { x: new Date(1985, 0), y:	0.146},
                   { x: new Date(1986, 0), y:	0.158},
                   { x: new Date(1987, 0), y:	0.025},
                   { x: new Date(1988, 0), y:	0.052},
                   { x: new Date(1989, 0), y:	0.259},
                   { x: new Date(1990, 0), y:	0.062},
                   { x: new Date(1991, 0), y:	0.091},
                   { x: new Date(1992, 0), y:	0.216},
                   { x: new Date(1993, 0), y:	0.079},
                   { x: new Date(1994, 0), y:	0.126},
                   { x: new Date(1995, 0), y:	0.785},
                   { x: new Date(1996, 0), y:	0.414},
                   { x: new Date(1997, 0), y:	0.295},
                   { x: new Date(1998, 0), y:	0.137},
                   { x: new Date(1999, 0), y:	0.372},
                   { x: new Date(2000, 0), y:	0.852},
                   { x: new Date(2001, 0), y:	1.273},
                   { x: new Date(2002, 0), y:	3.296},
                   { x: new Date(2003, 0), y:	2.011},
                   { x: new Date(2004, 0), y:	28.31},
                   { x: new Date(2005, 0), y:	0.53},
                   { x: new Date(2006, 0), y:	0.904},
                   { x: new Date(2007, 0), y:	0.73},
                   { x: new Date(2008, 0), y:	1.009},
                   { x: new Date(2009, 0), y:	1.603},
                   { x: new Date(2010, 0), y:	1.604},
                   { x: new Date(2011, 0), y:	1.714},
                   { x: new Date(2012, 0), y:	1.404},
                   { x: new Date(2013, 0), y:	1.805},
                   { x: new Date(2014, 0), y:	1.122},
                   { x: new Date(2015, 0), y:	1.055},
                   { x: new Date(2016, 0), y:	0.295},
					
					];
					
		 var Injured_dataPoints = [

                    { x: new Date(1980, 0), y:	0.478},
                    { x: new Date(1981, 0), y:	0.576},
                    { x: new Date(1982, 0), y:	0.499},
                    { x: new Date(1983, 0), y:	0.296},
                    { x: new Date(1984, 0), y:	0.328},
                    { x: new Date(1985, 0), y:	24.806},
                    { x: new Date(1986, 0), y:	0.23},
                    { x: new Date(1987, 0), y:	0.731},
                    { x: new Date(1988, 0), y:	0.511},
                    { x: new Date(1989, 0), y:	0.179},
                    { x: new Date(1990, 0), y:	0.238},
                    { x: new Date(1991, 0), y:	0.213},
                    { x: new Date(1992, 0), y:	0.19},
                    { x: new Date(1993, 0), y:	0.437},
                    { x: new Date(1994, 0), y:	1.732},
                    { x: new Date(1995, 0), y:	6.324},
                    { x: new Date(1996, 0), y:	1.063},
                    { x: new Date(1997, 0), y:	1.114},
                    { x: new Date(1998, 0), y:	1.49},
                    { x: new Date(1999, 0), y:	3.075},
                    { x: new Date(2000, 0), y:	1.831},
                    { x: new Date(2001, 0), y:	1.269},
                    { x: new Date(2002, 0), y:	1.796},
                    { x: new Date(2003, 0), y:	0.428},
                    { x: new Date(2004, 0), y:	21.21},
                    { x: new Date(2005, 0), y:	2.234},
                    { x: new Date(2006, 0), y:	1.274},
                    { x: new Date(2007, 0), y:	1.303},
                    { x: new Date(2008, 0), y:	1.92},
                    { x: new Date(2009, 0), y:	1.482},
                    { x: new Date(2010, 0), y:	2.714},
                    { x: new Date(2011, 0), y:	2.359},
                    { x: new Date(2012, 0), y:	1.519},
                    { x: new Date(2013, 0), y:	1.5	},
                    { x: new Date(2014, 0), y:	1.322},
                    { x: new Date(2015, 0), y:	1.177},
                    { x: new Date(2016, 0), y:	0.402}
					];

 var Missing_dataPoints = [

           { x: new Date(1980, 0), y:	3.653	},
           { x: new Date(1981, 0), y:	1.408	},
           { x: new Date(1982, 0), y:	1.706	},
           { x: new Date(1983, 0), y:	0.429	},
           { x: new Date(1984, 0), y:	1.604	},
           { x: new Date(1985, 0), y:	5.705	},
           { x: new Date(1986, 0), y:	0.824	},
           { x: new Date(1987, 0), y:	0.494	},
           { x: new Date(1988, 0), y:	0.193	},
           { x: new Date(1989, 0), y:	0.472	},
           { x: new Date(1990, 0), y:	0.203	},
           { x: new Date(1991, 0), y:	0.261	},
           { x: new Date(1992, 0), y:	0.465	},
           { x: new Date(1993, 0), y:	1.08	},
           { x: new Date(1994, 0), y:	2.521	},
           { x: new Date(1995, 0), y:	1.587	},
           { x: new Date(1996, 0), y:	3.114	},
           { x: new Date(1997, 0), y:	0.342	},
           { x: new Date(1998, 0), y:	0.463	},
           { x: new Date(1999, 0), y:	0.943	},
           { x: new Date(2000, 0), y:	27.736	},
           { x: new Date(2001, 0), y:	2.022	},
           { x: new Date(2002, 0), y:	1.793	},
           { x: new Date(2003, 0), y:	0.36	},
           { x: new Date(2004, 0), y:	2.204	},
           { x: new Date(2005, 0), y:	1.009	},
           { x: new Date(2006, 0), y:	0.321	},
           { x: new Date(2007, 0), y:	0.652	},
           { x: new Date(2008, 0), y:	0.765	},
           { x: new Date(2009, 0), y:	0.292	},
           { x: new Date(2010, 0), y:	0.631	},
           { x: new Date(2011, 0), y:	0.601	},
           { x: new Date(2012, 0), y:	0.704	},
           { x: new Date(2013, 0), y:	1.414	},
           { x: new Date(2014, 0), y:	0.056	},
           { x: new Date(2015, 0), y:	0.013	},
           { x: new Date(2016, 0), y:	0.009	}
           ];	

var Evacuated_dataPoints = [   
		 
          { x: new Date(1980, 0), y:	0.457},
          { x: new Date(1981, 0), y:	0.069},
          { x: new Date(1982, 0), y:	0.201},
          { x: new Date(1983, 0), y:	2.35},
          { x: new Date(1984, 0), y:	0.21},
          { x: new Date(1985, 0), y:	0.543},
          { x: new Date(1986, 0), y:	0.84},
          { x: new Date(1987, 0), y:	0.765},
          { x: new Date(1988, 0), y:	7.789},
          { x: new Date(1989, 0), y:	0.139},
          { x: new Date(1990, 0), y:	0.746},
          { x: new Date(1991, 0), y:	1.472},
          { x: new Date(1992, 0), y:	1.933},
          { x: new Date(1993, 0), y:	0.88},
          { x: new Date(1994, 0), y:	0.318},
          { x: new Date(1995, 0), y:	6.232},
          { x: new Date(1996, 0), y:	10.384},
          { x: new Date(1997, 0), y:	1.303},
          { x: new Date(1998, 0), y:	9.043},
          { x: new Date(1999, 0), y:	13.504},
          { x: new Date(2000, 0), y:	88.222},
          { x: new Date(2001, 0), y:	18.778},
          { x: new Date(2002, 0), y:	111.046},
          { x: new Date(2003, 0), y:	4.917},
          { x: new Date(2004, 0), y:	7.14},
          { x: new Date(2005, 0), y:	17.436},
          { x: new Date(2006, 0), y:	18.562},
          { x: new Date(2007, 0), y:	11.727},
          { x: new Date(2008, 0), y:	13.231},
          { x: new Date(2009, 0), y:	51.733},
          { x: new Date(2010, 0), y:	35.284},
          { x: new Date(2011, 0), y:	171.618},
          { x: new Date(2012, 0), y:	7.764},
          { x: new Date(2013, 0), y:	183.243},
          { x: new Date(2014, 0), y:	36.721},
          { x: new Date(2015, 0), y:	0.589},
          { x: new Date(2016, 0), y:	0.166}
		  ]; 
		 //Relocated (Tens of Thousands)
var Relocated_dataPoints = [

               { x: new Date(1980, 0), y:	0.6048	},
               { x: new Date(1981, 0), y:	30.4468	},
               { x: new Date(1982, 0), y:	1.7941	},
               { x: new Date(1983, 0), y:	5.3256	},
               { x: new Date(1984, 0), y:	35.7428	},
               { x: new Date(1985, 0), y:	31.4849	},
               { x: new Date(1986, 0), y:	40.3321	},
               { x: new Date(1987, 0), y:	97.924	},
               { x: new Date(1988, 0), y:	82.4253	},
               { x: new Date(1989, 0), y:	7.9202	},
               { x: new Date(1990, 0), y:	49.6965	},
               { x: new Date(1991, 0), y:	33.002	},
               { x: new Date(1992, 0), y:	9.8205	},
               { x: new Date(1993, 0), y:	63.45	},
               { x: new Date(1994, 0), y:	96.1285	},
               { x: new Date(1995, 0), y:	23.558	},
               { x: new Date(1996, 0), y:	136.2793	},
               { x: new Date(1997, 0), y:	71.32	},
               { x: new Date(1998, 0), y:	127.9869	},
               { x: new Date(1999, 0), y:	187.5748	},
               { x: new Date(2000, 0), y:	82.6407	},
               { x: new Date(2001, 0), y:	37.6827	},
               { x: new Date(2002, 0), y:	50.0446	},
               { x: new Date(2003, 0), y:	43.6827	},
               { x: new Date(2004, 0), y:	87.6395	},
               { x: new Date(2005, 0), y:	119.6976	},
               { x: new Date(2006, 0), y:	69.545	},
               { x: new Date(2007, 0), y:	166.3764	},
               { x: new Date(2008, 0), y:	208.7544	},
               { x: new Date(2009, 0), y:	48.342	},
               { x: new Date(2010, 0), y:	285.2745	},
               { x: new Date(2011, 0), y:	217.394	},
               { x: new Date(2012, 0), y:	97.2932	},
               { x: new Date(2013, 0), y:	63.6343	},
               { x: new Date(2014, 0), y:	0.0184	},
               { x: new Date(2015, 0), y:	7.907	},
               { x: new Date(2016, 0), y:	0.0044	}
               ];

//Victims (Tens of Thousands)
var Victims_dataPoints = [

                  { x: new Date(1980, 0), y:	0.0851	},
                  { x: new Date(1981, 0), y:	0.3327	},
                  { x: new Date(1982, 0), y:	0.1584	},
                  { x: new Date(1983, 0), y:	21.595	},
                  { x: new Date(1984, 0), y:	55.7572	},
                  { x: new Date(1985, 0), y:	6.6589	},
                  { x: new Date(1986, 0), y:	48.5369	},
                  { x: new Date(1987, 0), y:	49.9676	},
                  { x: new Date(1988, 0), y:	2.8099	},
                  { x: new Date(1989, 0), y:	28.3392	},
                  { x: new Date(1990, 0), y:	34.8482	},
                  { x: new Date(1991, 0), y:	10.4757	},
                  { x: new Date(1992, 0), y:	1.3127	},
                  { x: new Date(1993, 0), y:	66.5591	},
                  { x: new Date(1994, 0), y:	2.8812	},
                  { x: new Date(1995, 0), y:	7.0897	},
                  { x: new Date(1996, 0), y:	156.9799	},
                  { x: new Date(1997, 0), y:	57.9812	},
                  { x: new Date(1998, 0), y:	60.2534	},
                  { x: new Date(1999, 0), y:	50.2022	},
                  { x: new Date(2000, 0), y:	387.804	},
                  { x: new Date(2001, 0), y:	75.5476	},
                  { x: new Date(2002, 0), y:	199.0398	},
                  { x: new Date(2003, 0), y:	24.5055	},
                  { x: new Date(2004, 0), y:	208.3504	},
                  { x: new Date(2005, 0), y:	181.5597	},
                  { x: new Date(2006, 0), y:	130.9177	},
                  { x: new Date(2007, 0), y:	104.1432	},
                  { x: new Date(2008, 0), y:	87.1253	},
                  { x: new Date(2009, 0), y:	174.0038	},
                  { x: new Date(2010, 0), y:	198.7368	},
                  { x: new Date(2011, 0), y:	469.9631	},
                  { x: new Date(2012, 0), y:	168.0469	},
                  { x: new Date(2013, 0), y:	327.9679	},
                  { x: new Date(2014, 0), y:	39.5878	},
                  { x: new Date(2015, 0), y:	30.1899	},
                  { x: new Date(2016, 0), y:	16.5993	}
                  ];

//Affected (Tens of Thousands)
var Affected_dataPoints = [
                  
                   { x: new Date(1980, 0), y:	0.6089	},
                   { x: new Date(1981, 0), y:	19.6609	},
                   { x: new Date(1982, 0), y:	75.9594	},
                   { x: new Date(1983, 0), y:	54.6297	},
                   { x: new Date(1984, 0), y:	46.9791	},
                   { x: new Date(1985, 0), y:	98.653	},
                   { x: new Date(1986, 0), y:	113.9846},
                   { x: new Date(1987, 0), y:	20.3049	},
                   { x: new Date(1988, 0), y:	237.6532},
                   { x: new Date(1989, 0), y:	58.4903	},
                   { x: new Date(1990, 0), y:	100.449	},
                   { x: new Date(1991, 0), y:	23.681	},
                   { x: new Date(1992, 0), y:	106.8837},
                   { x: new Date(1993, 0), y:	78.0323	},
                   { x: new Date(1994, 0), y:	96.1189	},
                   { x: new Date(1995, 0), y:	65.7198	},
                   { x: new Date(1996, 0), y:	72.1718	},
                   { x: new Date(1997, 0), y:	94.8244	},
                   { x: new Date(1998, 0), y:	25.8735	},
                   { x: new Date(1999, 0), y:	80.8924	},
                   { x: new Date(2000, 0), y:	141.091	},
                   { x: new Date(2001, 0), y:	335.7072},
                   { x: new Date(2002, 0), y:	52.6114	},
                   { x: new Date(2003, 0), y:	188.4218},
                   { x: new Date(2004, 0), y:	457.6594},
                   { x: new Date(2005, 0), y:	86.0726	},
                   { x: new Date(2006, 0), y:	88.2455	},
                   { x: new Date(2007, 0), y:	92.4118	},
                   { x: new Date(2008, 0), y:	249.5249},
                   { x: new Date(2009, 0), y:	487.6526},
                   { x: new Date(2010, 0), y:	207.4081},
                   { x: new Date(2011, 0), y:	603.2779},
                   { x: new Date(2012, 0), y:	189.6453},
                   { x: new Date(2013, 0), y:	75.0859	},
                   { x: new Date(2014, 0), y:	167.5191},
                   { x: new Date(2015, 0), y:	30.101	},
                   { x: new Date(2016, 0), y:	17.4752	}
                   ];
		 
		 

		function chartdrawer(){
			var chart = new CanvasJS.Chart("chart1_main", {	
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Human Impact  ('Thousands')"
				},
				axisY2: {
					valueFormatString: "0.0 ",

					maximum: 30,
					interval: 5,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
				},
				theme: "theme2",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [						
				
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Missing",
					axisYType: "secondary",
					dataPoints: Missing_dataPoints
										
				},
				{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "Deaths",
					dataPoints:Deaths_dataPoints
				
				},
				
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Injured",
					axisYType: "secondary",
					dataPoints:Injured_dataPoints
					
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			
			var chart = new CanvasJS.Chart("chart2", {	
				zoomEnabled: false,
				animationEnabled: true,
				title: {
					text: "Human Impact  ('Ten Thousands')"
				},
				axisY2: {
					valueFormatString: "0.0 ",

					maximum: 600,
					interval: 100,
					interlacedColor: "#F5F5F5",
					gridColor: "#D7D7D7",
					tickColor: "#D7D7D7"
				},
				theme: "theme2",
				toolTip: {
					shared: true
				},
				legend: {
					verticalAlign: "bottom",
					horizontalAlign: "center",
					fontSize: 15,
					fontFamily: "Lucida Sans Unicode"
				},
				data: [						
				{
					type: "line",
					lineThickness: 3,
					axisYType: "secondary",
					showInLegend: true,
					name: "Relocated",
					dataPoints:Relocated_dataPoints
				
				},
				
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Evacuated",
					axisYType: "secondary",
					dataPoints: Evacuated_dataPoints
										
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Victims",
					axisYType: "secondary",
					dataPoints:Victims_dataPoints
					
				},
				{
					type: "line",
					lineThickness: 3,
					showInLegend: true,
					name: "Affected",
					axisYType: "secondary",
					dataPoints:Affected_dataPoints
					
				}
				],
				legend: {
					cursor: "pointer",
					itemclick: function (e) {
						if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						}
						else {
							e.dataSeries.visible = true;
						}
						chart.render();
					}
				}
			});

			chart.render();
			
var chart = new CanvasJS.Chart("chart3",
    {
      title:{
        text: "Per country breakdown (1980 - 2016)"
      },
      animationEnabled: true,
      legend: {
        cursor:"pointer",
        itemclick : function(e) {
          if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
          }
          else {
              e.dataSeries.visible = true;
          }
          chart.render();
        }
      },
      axisY: {
           },
      toolTip: {
        shared: true,  
        content: function(e){
          var str = '';
          var total = 0 ;
          var str3;
          var str2 ;
          for (var i = 0; i < e.entries.length; i++){
            var  str1 = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong> <br/>" ; 
            total = e.entries[i].dataPoint.y + total;
            str = str.concat(str1);
          }
          str2 = "<span style = 'color:DodgerBlue; '><strong>"+e.entries[0].dataPoint.label + "</strong></span><br/>";
          str3 = "<span style = 'color:Tomato '>Total: </span><strong>" + total + "</strong><br/>";
          
          return (str2.concat(str)).concat(str3);
        }

      },
      data: [
      {        
        type: "bar",
        showInLegend: true,
        name: "injured",
        color: "olive",
        dataPoints: [
           { y: 325, label: "Costa Rica"},
           { y: 557, label: "Niger"},
           { y: 1762, label: "Cambodia"},
           { y: 2128, label: "Kenya"},
           { y: 3000, label: "Madagascar"},
           { y: 8557, label: "Senegal"},
           { y: 22284, label: "Sri Lanka"},
           { y: 35697, label: "Colombia"},
           { y: 35940, label: "Albania"}



        ]
      },
      {        
        type: "bar",
        showInLegend: true,
        name: "Deaths",
        color: "red",          
        dataPoints: [
           { y: 627, label: "Costa Rica"},
           { y: 10624, label: "Niger"},
           { y: 2262, label: "Cambodia"},
           { y: 2067, label: "Kenya"},
           { y: 2044, label: "Madagascar"},
           { y: 4303, label: "Senegal"},
           { y: 34207, label: "Sri Lanka"},
           { y: 0, label: "Colombia"},
           { y: 529, label: "Albania"}

      


        ]
      },
      {        
        type: "bar",
        showInLegend: true,
        name: "Missing",
        color: "blue",
        dataPoints: [
              { y: 75, label: "Costa Rica"},
              { y:0, label: "Niger"},
              { y: 2, label: "Cambodia"},
              { y: 20, label: "Kenya"},
              { y: 851, label: "Madagascar"},
              { y: 242, label: "Senegal"},
              { y: 2042, label: "Sri Lanka"},
              { y: 64789, label: "Colombia"},
              { y: 28, label: "Albania"}
        ]
      }

      ]
    });

chart.render();
}	
			
		
	
  queue()
     .defer(d3.json, "KenyaCounties.json")
	 .defer(d3.csv, "Kenya_indicators.csv")
     .defer(d3.csv, "Kenya_all.csv")
     //.await(ready);
	
	

  //Start of Choropleth drawing


window.onload = function () {

chartdrawer();
}

//Dropdown 

// The csv data upload chart rendered here
  var dataPoints = [];
	 
        function getDataPointsFromCSV(csv) {
            var dataPoints = csvLines = points = [];
            csvLines = csv.split(/[\r?\n|\r|\n]+/);         
		        
            for (var i = 0; i < csvLines.length; i++)
                if (csvLines[i].length > 0) {
                    points = csvLines[i].split(",");
                    dataPoints.push({ 
                        x: parseFloat(points[0]), 
                        y: parseFloat(points[1]) 		
                    });
                }
            return dataPoints;
			console.log(dataPoints);
        }
	