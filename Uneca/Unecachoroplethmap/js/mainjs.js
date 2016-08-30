//United Nations Economic commission for Africa (UNECA) indicators 
//This code has been written by Marindi Joseph. HDX Data lab Nairobi

//All indicators to be shown on the map. These are the column lables on the uploaded csv
var keyArray = [
" -Select- ",
"Totalpops",
"pop_av_annual_g_rate",
"Activpops",
"Malepops",
"Femalepops",
"zero214yrspop",
"Fifteen264yrspop",
"Morethan65yrspop",
"pop_econ_activ_agric",
"pop_crude_birth_rate",
"pop_crude_death_rate",
"pop_total_fertility_rt",
"pop_proportion_urban",
"pop_life_exp_at_birth",
"pop_dependency_ratio",
"helt_u_five_mort_rt_all",
"helt_infant_mort_rt_all",
"helt_births_reg_per_1000",
"helt_deaths_reg_per_1000",
"helt_mort_rt_neonatal"
];
var expressed = keyArray[0];
var dropdownselectedIndicator = "";
var renamed_indicator = keyArray[0];
var mapclickedcountry = "";
var firstindicator = keyArray[0];
    
		
window.onload = initialize(); //start script once HTML is loaded

document.getElementById("indicator_shown").innerHTML = renamed_indicator;


function initialize(){ //the first function called once the html is loaded
	setMap();
};
 

function setMap(){ //set choropleth map parameters	
	//map frame dimensions
	var width = 500;
	var height = 490;
	var map = d3.select("body")
		.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "map");

	var projection = d3.geoAlbers()
	//var projection = d3.geoConicEqualArea()
		.center([1.104676, 5.8997])
		.rotate([-17, 2])
		.parallels([10, 20])
		.scale(400)
		.translate([width / 2, height / 2]);
	
	//create svg path generator using the projection
	var path = d3.geoPath()
		.projection(projection);

	var graticule = d3.geoGraticule()
		.step([10, 10]); //place graticule lines every 10 degrees of longitude and latitude
	
	//create graticule background
	var gratBackground = map.append("path")
		.datum(graticule.outline) //bind graticule background
		.attr("class", "gratBackground") //assign class for styling
		.attr("d", path) //project graticule
	
	//create graticule lines	
	var gratLines = map.selectAll(".gratLines") //select graticule elements that will be created
		.data(graticule.lines) //bind graticule lines to each element to be created
	  	.enter() //create an element for each datum
		.append("path") //append each element to the svg as a path element
		.attr("class", "gratLines") //assign class for styling
		.attr("d", path); //project graticule lines

	queue() //use queue.js to parallelize asynchronous data loading for cpu efficiency
		.defer(d3.csv, "data/unecaHundred.csv") //load attributes data from csv
		.defer(d3.json, "geo/Africa.json") //load geometry from countries topojson
		.await(callback);

	function callback(error, csvData, AfricaData){
		
		var recolorMap = colorScale(csvData); //retrieve color scale generator

		//variables for csv to json data transfer
		var jsonRegions = AfricaData.objects.Africa.geometries;
			
		//loop through csv data to assign each csv region's values to json region properties
		for (var i=0; i<csvData.length; i++) {		
			var csvRegion = csvData[i]; //the current region's attributes
			var csvAdm1 = csvRegion.myID; //adm1 code
			
			//loop through json regions to assign csv data to the right region
			for (var a=0; a<jsonRegions.length; a++){
				
				//where adm1 codes match, attach csv data to json object
				if (jsonRegions[a].properties.myID == csvAdm1){
					
					//one more for loop to assign all key/value pairs to json object
					for (var key in keyArray){
						var attr = keyArray[key];
						var val = parseFloat(csvRegion[attr]);
						jsonRegions[a].properties[attr] = val;
					};
					
					jsonRegions[a].properties.name = csvRegion.name; //set prop
					break; //stop looking through the json regions
				};
			};
		};
			
		
		
		
		//add regions to map as enumeration units colored by data
		var regions = map.selectAll(".regions")
			.data(topojson.feature(AfricaData, AfricaData.objects.Africa).features) //bind regions data to path element
			.enter() //create elements
			.append("path") //append elements to svg
			.attr("class", "regions") //assign class for additional styling
			.attr("id", function(d) { return d.properties.myID })
			.attr("d", path) //project data as geometry in svg
			.style("fill", function(d) { //color enumeration units
				return choropleth(d, recolorMap);
			})
			.on("mouseover", highlight)
			.on("mouseout", dehighlight)
			//.on("mousemove", moveLabel)
			.on("mouseclick",pickcountry)
			.append("desc") //append the current color
				.text(function(d) {
					return choropleth(d, recolorMap);
				});
		//}			
        //createMapTitle();
		createDropdown(csvData); //create the dropdown menu

	};
};


function createDropdown(csvData){
	//add a select element for the dropdown menu
	var dropdown = d3.select("body")
		.append("div")
		.attr("class","dropdown") //for positioning menu with css
		.html("<h4>Select Variable:</h4>")
		.append("select")
		.on("change", function(){ changeAttribute(this.value, csvData) } ); //changes expressed attribute
	
	//create each option element within the dropdown
	dropdown.selectAll("options")
		.data(keyArray)
		.enter()
		.append("option")
		.attr("value", function(d){ return d })
		.text(function(d) {
			d = d.substring();
			return d
			
		});
				
};


function colorScale(csvData){
	
		var color = d3.scaleQuantile() //designate quantile scale generator
		.range([
                      "#7DC1F7",
                      "#78B7F1",
                      "#73ADEB",
                      "#6EA4E6",
                      "#6A9AE0",
                      "#6591DB",
                      "#6087D5",
                      "#5C7ECF",
                      "#5774CA",
                      "#526BC4",
                      "#4E61BF",
                      "#4958B9",
                      "#444EB4",
                      "#4045AE",
                      "#3B3BA8",
                      "#3632A3",
                      "#32289D",
                      "#2D1F98",
                      "#281592"
		]);
		
//function colorScale(csvData){

//	var color = d3.scaleQuantile() //designate quantile scale generator
//		.range([
//                "#C1F9B4",
//                "#BCF3AF",
//                "#B7EDAA",
//                "#B2E8A6",
//                "#ADE2A1",
//                "#A8DD9D",
//                "#A3D798",
//                "#9ED294",
//                "#99CC8F",
//                "#94C78B",
//                "#8FC186",
//                "#8ABC82",
//                "#85B67D",
//                "#80B179",
//                "#7BAB74",
//                "#77A670",
//                "#72A06B",
//                "#6D9B67",
//                "#689562",
//                "#63905E",
//                "#5E8A59",
//                "#598555",
//                "#547F50",
//                "#4F7A4C",
//                "#4A7447",
//                "#456F43",
//                "#40693E",
//                "#3B643A",
//                "#365E35",
//                "#325931"
//       
//              
//		]);			
//
	//build array of all currently expressed values for input domain
	var domainArray = [];
	for (var i in csvData){
		domainArray.push(Number(csvData[i][expressed]));
	};
      
   	color.domain(domainArray);
	
	return color; //return the color scale generator
};

function choropleth(d, recolorMap){
	
	//get data value
	var value = d.properties[expressed];
	//if value exists, assign it a color; otherwise assign gray
	if (value) {
		return recolorMap(value); //recolorMap holds the colorScale generator
	} else {
		return "#ccc";
	};
};

function changeAttribute(attribute, csvData){
	//change the expressed attribute
	//d3.selectAll(".maptitle").remove();
	expressed = attribute;
	dropdownselectedIndicator = expressed;
	
	//recolor the map
	d3.selectAll(".regions") //select every region
		.style("fill", function(d) { //color enumeration units
			return choropleth(d, colorScale(csvData)); //->
		})
		.select("desc") //replace the color text in each region's desc element
			.text(function(d) {
				return choropleth(d, colorScale(csvData)); //->
			});
			//renameIndicator();
			//createMapTitle();
			renameIndicator();
};

function format(value){
	
	//format the value's display according to the attribute
	if (expressed != "Population"){
		value = "$"+roundRight(value);
	} else {
		value = roundRight(value);
	};
	
	return value;
};

function roundRight(number){
	
	if (number>=100){
		var num = Math.round(number);
		return num.toLocaleString();
	} else if (number<100 && number>=10){
		return number.toPrecision(4);
	} else if (number<10 && number>=1){
		return number.toPrecision(3);
	} else if (number<1){
		return number.toPrecision(2);
	};
};

function renameIndicator(){
	
	if (expressed == "pop_all_sexes"){
		renamed_indicator = "Total Population (Male and Female)";
	} else if (expressed == "pop_male"){
		renamed_indicator = "Total Male population";
	} else if (expressed == "Totalpops"){
		renamed_indicator = "Total Country population (Millions)";
	} else if (expressed == "Malepops"){
		renamed_indicator = "Total Male population (Millions)";
	} else if (expressed == "pop_female"){
		renamed_indicator = "Total female population(Millions)";
	} else if (expressed == "Femalepops"){
		renamed_indicator = "Total female population (Millions)";
	} else if (expressed == "pop_av_annual_g_rate"){
		renamed_indicator = "Annual population growth rate (Percentage)";
	} else if (expressed == "pop_active"){
		renamed_indicator = "Active Population(Millions)";
	} else if (expressed == "Activpops"){
		renamed_indicator = "Active Population (Millions)";
	} else if (expressed == "pop_0_14_years"){
		renamed_indicator = "Number of people between 0 and 14 years (Millions)";
	} else if (expressed == "zero214yrspop"){
		renamed_indicator = "Number of people between 0 and 14 years (Millions)";
	} else if (expressed == "pop_15_64_years"){
		renamed_indicator = "Number of people between 15 and 64 years";
	} else if (expressed == "Fifteen264yrspop"){
		renamed_indicator = "Number of people between 15 and 64 years (Millions)";
	} else if (expressed == "pop_65_more_years"){
		renamed_indicator = "Number of people above 65 years";
	} else if (expressed == "Morethan65yrspop"){
		renamed_indicator = "Number of people above 65 years (Millions)";
	} else if (expressed == "pop_econ_activ_agric"){
		renamed_indicator = "Population practising Agriculture as an economic activity(Millions)";
	} else if (expressed == "pop_crude_birth_rate"){
		renamed_indicator = "Crude Birth Rate (Percentage)";
	} else if (expressed == "pop_crude_death_rate"){
		renamed_indicator = "Crude Death rate(Percentage)";
	} else if (expressed == "pop_total_fertility_rt"){
		renamed_indicator = "Total population fertility rate (percentage)";
	} else if (expressed == "pop_proportion_urban"){
		renamed_indicator = "Percentage of urban population";
	} else if (expressed == "pop_life_exp_at_birth"){
		renamed_indicator = "Life Expectancy at Birth";
	} else if (expressed == "pop_dependency_ratio"){
		renamed_indicator = "Dependency ratio";
    } else if (expressed == "helt_u_five_mort_rt_all"){
		renamed_indicator = "Under five Mortality rate";
	} else if (expressed == "helt_infant_mort_rt_all"){
		renamed_indicator = "Infant Mortality rate";
	} else if (expressed == "helt_births_reg_per_1000"){
		renamed_indicator = "Births registered per 1000";
	} else if (expressed == "helt_deaths_reg_per_1000"){
		renamed_indicator = "Number of Deaths per 1000";
    } else if (expressed == "helt_mort_rt_neonatal"){
		renamed_indicator = "Neo Natal Mortality Rate";
	};
       document.getElementById("indicator_shown").innerHTML = renamed_indicator;
       document.getElementById("detail").innerHTML = "(Hover on the map to see detailed information by country)";
};

function highlight(data){
	
	var props = data.properties; //json properties
	var indic = "Indicator: ";
	var countryselec = "Country: ";
	var val = "Value: ";

	d3.select("#"+("props.myID")) //select the current region in the DOM
		.style("fill", "#000"); //set the enumeration unit fill to black

	//var labelAttribute = "<h1>"+props[expressed]+
	//	"</h1><br><b>"+expressed+"</b>"; //label content
	var labelAttribute = "<h1>"+props[expressed]+
		"</h1><br><b>"+expressed+"</b>"; //label content
	var labelName = props.NAME_ENGLI //html string for name to go in child div
		
	//var labelFeature = "<h4><b>"+indic+" " +renamed_indicator+"</b></h4><br><b>"+countryselec+""+labelName+"</b><br><b>"+val+""+props[expressed]+"</b><br>";
    var labelFeature = "<b>" +renamed_indicator+"</b><br><b>"+countryselec+""+labelName+"</b><br><b>"+val+""+props[expressed]+"</b><br>"; 
	//label content
	var TitleFeature = "<h4><b>" +expressed+"</b></h4>"; //Title content
			
	
	mapclickedcountry = labelName;

		
	//create info window div for broader explanation of selected variable
	var infowindow = d3.select("body")
		.append("div") //create the information div
		.attr("class", "infowindow")
		.attr("id", ("props.myID") +"label") //for styling label
		.html(labelFeature) //add text
		.append("div") //add child div for feature name
		.attr("class", "labeldesc") //for styling name		
};

function dehighlight(data){	
	var props = data.properties; //json properties
	var region = d3.select("#"+ ("props.myID")); //select the current region
	var fillcolor = region.select("desc");//.text(); //access original color from desc
	region.style("fill", fillcolor); //reset enumeration unit to orginal color
	
	d3.select("#"+("props.myID")+"label").remove(); //remove info label
	d3.selectAll(".infolabel").remove(); //clears the initially selected label ready for new label
	d3.selectAll(".infowindow").remove(); //clears the initially selected label ready for new label
	d3.selectAll(".titlebar").remove(); //clears the initially selected title
};

//************************************************************************
//Identiffy clicked country
function pickcountry(data){	
	var props = data.properties; //json properties
	var region = d3.select("#"+ ("props.myID")); //select the current region
	mapclickedcountry = region;
	region = "";
};

//************************************************************************

function moveLabel() {
	
	var x = d3.event.clientX + 10; //horizontal label coordinate based mouse position stored in d3.event
	var y = d3.event.clientY - 5; //vertical label coordinate
		//d3.select(".infolabel") //select the label div for moving
	d3.select(".infolabel") //select the label div for moving
		.style("margin-left", x +"px") //reposition label horizontal
		.style("margin-top", y +"px"); //reposition label vertical
};
