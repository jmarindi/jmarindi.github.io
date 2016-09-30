
//***************************************************************************************************************
// Loading multiple csv's checked here
//***************************************************************************************************************
function multiplecsvload(){
	 chart2data = [];
	 TotPercluster = [];
	 chart5data =[];
	//-----------------------------------------------------------------------------------------------
 queue()
  .defer(d3.csv, "data/projpercountrydt.csv")
  .defer(d3.csv, "data/TotalPercluster.csv")
  //.defer(d3.csv, "data/Chart4.csv")
//.defer(d3.csv, "data/Chart5.csv")
  .await(analyze);

function analyze(error, projpercountrydt, TotalPercluster) {
	 chart2data = projpercountrydt;
	 TotPercluster = TotalPercluster;
	 //chart5data = Chart5;
  if(error) { console.log(error); }

  console.log(projpercountrydt[0]);
  console.log(TotPercluster[0]);
 // console.log(Chart5[0]);
  
	//-----------------------------------------------------------------------------------------------
		
var chart = new CanvasJS.Chart("chartContainer1",
    {
        animationEnabled: true,
        title: {
            text: "Number of projects per country",
        },
        data: [
        {
            type: "pie",
           // showInLegend: true,
			dataPoints:chart2data
          
        },
        ]
    });
chart.render();


var chart = new CanvasJS.Chart("chartContainer2",
    {
      			title:{
				text:"People reached per cluster(Thousands)"				

			},
                        animationEnabled: true,
			axisX:{
				interval: 1,
				gridThickness: 0,
				labelFontSize: 10,
				labelFontStyle: "normal",
				labelFontWeight: "normal",
				labelFontFamily: "Lucida Sans Unicode"

			},
			axisY2:{
				interlacedColor: "rgba(1,77,101,.2)",
				gridColor: "rgba(1,77,101,.1)"

			},

			data: [
			{     
				type: "bar",
                name: "companies",
				axisYType: "secondary",
				color: "#014D65",	
               // dataPoints: chart5data				
			//dataPoints: TotPercluster //TotalPercluster
			dataPoints: [
			{y: 1.3,	  label: "Women Empowerment"},
            {y: 11.1,	  label: "Environment"      },
            {y: 128.964,  label: "Education"        },
            {y: 129.426,  label: "Health"           },
            {y: 134.732,  label: "Housing"          },
            {y: 135.87,	  label: "Governance"       },
            {y: 429.456,  label: "Energy"           },
            {y: 435,	  label: "Culture"          },
            {y: 750.701,  label: "WASH"             },
            {y: 964.956,  label: "Agriculture"      },
            {y: 6902.537, label: "Roads"            }
			]
			}
			
			]
		});

chart.render();
}
}
multiplecsvload();

//************************************************************************************************************************************

//======================================================================================================================

var chart = new CanvasJS.Chart("chartContainer3",
    {
        //animationEnabled: true,
       title:{
			text:"Amount spent per cluster per country (In Thousands*)"
		},
                animationEnabled: true,
		axisX:{
			interval: 1,
			labelFontSize: 10,
			lineThickness: 0
		},
		axisY2:{
			valueFormatString: "$ 0",
			lineThickness: 0				
		},
		toolTip: {
			shared: true
		},
		legend:{
			verticalAlign: "top",
			horizontalAlign: "center"
		},

		data: [
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Roads",
			axisYType: "secondary",
			color: "#23320C",
			dataPoints: [
				{y: 17968.9, label: "DR Congo"},
                {y: 123.02, label: "Kenya"},
                {y: 41.98,	label: "Kyrgyzstan"},
                {y: 49707.99, label: "Nepal"},
                {y: 1463.06, label: "Palestine"},
                {y: 32278.21, label: "Timor Leste"},
                {y: 0, label: "Liberia"},
                {y: 47446.14, label: "Ivory coast"},
                {y: 0, label: "Sierre Leone"},
                {y: 0, label: "South Sudan"},
                {y: 32278.21, label: "Afghanistan"}

			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Education",
			axisYType: "secondary",
			color: "#E5E500",
			dataPoints: [
				{y:	0	,	    label: "DR Congo"},
                {y:	471.98	,	label: "Kenya"},
                {y:	29.78	,	label: "Kyrgyzstan"},
                {y:	22.06	,	label: "Nepal"},
                {y:	1829.22	,	label: "Palestine"},
                {y:	967.02	,	label: "Timor Leste"},
                {y:	2427.18	,	label: "Liberia"},
                {y:	230.33	,	label: "Ivory coast"},
                {y:	0.35	,	label: "Sierre Leone"},
                {y:	26.73	,	label: "South Sudan"},
                {y:	6126.96	,	label: "Afghanistan"}

			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "WASH",
			axisYType: "secondary",
			color: "#4C2888",
			dataPoints: [
				{y:	0	,	   label:  "DR Congo"},
                {y:	155.83,	   label:  "Kenya"},
                {y:	4498.71,   label:  "Kyrgyzstan"},
                {y:	258.11,	   label:  "Nepal"},
                {y:	258.11,	   label:  "Palestine"},
                {y:	303.45,	   label:  "Timor Leste"},
                {y:	12.58,	   label:  "Liberia"},
                {y:	0	,      label:  "Ivory coast"},
                {y:	61000,	   label:  "Sierre Leone"},
                {y:	0	,      label:  "South Sudan"},
                {y:	0	,      label:  "Afghanistan"}

			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Culture",
			axisYType: "secondary",
			color: "#54834C",
			dataPoints: [
				{y:	76.9,	label: "DR Congo"},
                {y:	0,	    label: "Kenya"},
                {y:	27093.25,	label: "Kyrgyzstan"},
                {y:	5.08,	label: "Nepal"},
                {y:	0,	label: "Palestine"},
                {y:	43.6,	label: "Timor Leste"},
                {y:	613.48,	label: "Liberia"},
                {y:	164.14,	label: "Ivory coast"},
                {y:	0,	label: "Sierre Leone"},
                {y:	0,	label: "South Sudan"},
                {y:	0,	label: "Afghanistan"}


			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Health",
			axisYType: "secondary",
			color: "#55C7BC",
			dataPoints: [
				{y:	0,	label: "DR Congo"},
                {y:	80.91,	label: "Kenya"},
                {y:	0,	label: "Kyrgyzstan"},
                {y:	22.22,	label: "Nepal"},
                {y:	377.32,	label: "Palestine"},
                {y:	33,	label: "Timor Leste"},
                {y:	302.47,	label: "Liberia"},
                {y:	28.92,	label: "Ivory coast"},
                {y:	0,	label: "Sierre Leone"},
                {y:	71.84,	label: "South Sudan"},
                {y:	4051.34,	label: "Afghanistan"}


			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Governance",
			axisYType: "secondary",
			color: "#FF5733",
			dataPoints: [
				{y:	0,	label: "DR Congo"},
                {y:	38.59,	label: "Kenya"},
                {y:	7,	label: "Kyrgyzstan"},
                {y:	50.46,	label: "Nepal"},
                {y:	802.65,	label: "Palestine"},
                {y:	0,	label: "Timor Leste"},
                {y:	0,	label: "Liberia"},
                {y:	0,	label: "Ivory coast"},
                {y:	0,	label: "Sierre Leone"},
                {y:	3.45,	label: "South Sudan"},
                {y:	0,	label: "Afghanistan"}


			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Agriculture",
			axisYType: "secondary",
			color: "#44616D",
			dataPoints: [
				{y:	40	, label:  "DR Congo"},
                {y:	13.06, label: "Kenya"},
                {y:	84.6, label:  "Kyrgyzstan"},
                {y:	8.47, label: "Nepal"},
                {y:	60,	label:  "Palestine"},
                {y:	40,	label:  "Timor Leste"},
                {y:	0,	label:  "Liberia"},
                {y:	0,	label:  "Ivory coast"},
                {y:	0,	label:  "Sierre Leone"},
                {y:	0,	label:  "South Sudan"},
                {y:	0,	label:  "Afghanistan"}


			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Energy (millions)",
			axisYType: "secondary",
			color: "#BA6A0B",
			dataPoints: [
				{y:	0	,	label: "DR Congo"},
                {y:	0	,	label: "Kenya"},
                {y:	0	,	label: "Kyrgyzstan"},
                {y:	244	,	label: "Nepal"},
                {y:	0.29243	,	label: "Palestine"},
                {y:	0	,	label: "Timor Leste"},
                {y:	0	,	label: "Liberia"},
                {y:	0.02451	,	label: "Ivory coast"},
                {y:	0	,	label: "Sierre Leone"},
                {y:	0	,	label: "South Sudan"},
                {y:	0	,	label: "Afghanistan"}


			]
		},
		{     
			type: "stackedBar",
			showInLegend: true,
			name: "Environment",
			axisYType: "secondary",
			color: "#44616D",
			dataPoints: [
				{y:	0	,	label: "DR Congo"},
                {y:	44.71,	label: "Kenya"},
                {y:	0	,	label: "Kyrgyzstan"},
                {y:	4.1	,	label: "Nepal"},
                {y:	0	,	label: "Palestine"},
                {y:	0	,	label: "Timor Leste"},
                {y:	0	,	label: "Liberia"},
                {y:	0	,	label: "Ivory coast"},
                {y:	0	,	label: "Sierre Leone"},
                {y:	0	,	label: "South Sudan"},
                {y:	0	,	label: "Afghanistan"}


			]
		}
		
     	]
		});
	chart.render();
	
 //======================================================================================================================