	
	$(document).ready(function(){
	// INITIAL VARIABLE
    		var thedata,
    			theDataTableInit = 0,
    			human_number = d3.format(",d"),
    			SelectedState = 'LGA',
    			statesData = 0,
    			locationCount = [],
    			reportingperiod = [],
    			organisationCount = [],
    			statusCount = [],
    			sectorCount = [],
    			orgtotal = 0,
    			periodselect = 0,
    			zero = 0;
    			Stateselect = 0;


			var geojson;
			var map = L.map('States_div', { //map is a global variable
			 	//center: [10.349389, 13.273319], ---worked
				center: [10.013979, 13.042606], 
			   zoom: 6.5,
			    zoomDelta: 0.5,
		            zoomSnap: 0,
			    zoomControl: false,
			    layerControl:false,
			    attributionControl: true,
			    minZoom: 6.5,
			    maxZoom: 7,
			});
			var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

			});

			CartoDB_Positron.addTo(map);


			function drawboundaries(){
						d3.json('geo/Admin0_NGA.geojson',function(jso){	
					
	    			function style(feature) {
						return {
							weight: 1,
							opacity: 1,
							color: 'grey',
							fillColor: 'transparent',
							className: 'countriesboundaries'
						};
					}
					var geojson;
					geojson = L.geoJson(jso, {
						style: style,
					}).addTo(map);
	    		})
			}			

    		// function to draw the map
    		function drawStatediv(){
    			
    			// control that shows state info on hover
				var info = L.control();

				info.onAdd = function (map) {
					this._div = L.DomUtil.create('div', 'info');
					this.update();
					return this._div;
				};

				info.update = function (props) {
					// if(props){
					// 	console.log(locationCount,props.LGA);
					// }					
					//this._div.innerHTML = '<h6><align = Left><b>Organisation Activities per locality<b></h6>' +  (props ?
					this._div.innerHTML = '<h6><align = Left><b><b></h6>' +  (props ?
						'<b>' + props.LGA + '</b><br />' + locationCount[props.LGA.toUpperCase()] + ' Activities'
						: 'Hover over a locality');
				};

				info.addTo(map);

				// get color depending on population density value
				function getColor(d) {
					return 	d > 50  ? '#157A72' :
							d > 20  ? '#1B9D93' :
							d > 10  ? '#20BFB3' :
							d > 5   ? '#48CAC0' :
							d > 1   ? '#85DCD5' :
										'transparent';
				}

				function style(feature) {
					return {
						weight: 0.7,
						opacity: 1,
						color: 'white',
						dashArray: '1',
						fillOpacity: 0.7,
						fillColor: getColor(locationCount[feature.properties.LGA.toUpperCase()]) 
					};
				}

				function highlightFeature(e) {
					var layer = e.target;

					layer.setStyle({
						weight: 5,
						color: '#666',
						dashArray: '',
						fillOpacity: 0.7
					});

					if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
						// layer.bringToFront();
					}

					info.update(layer.feature.properties);
				}


				function resetHighlight(e) {
					geojson.resetStyle(e.target);
					info.update();
				}

				function zoomToFeature(e) {
					// map.fitBounds(e.target.getBounds());
					let kec = e.target.feature.properties.LGA;
					let select = kec.replace(' ','-');
					$('#Stateselect option').removeAttr('selected').filter('[value=' + select + ']').attr('selected', true);
					redrawvis(kec);
				}

				function onEachFeature(feature, layer) {
					layer.on({
						mouseover: highlightFeature,
						mouseout: resetHighlight,
						click: zoomToFeature
					});
				}

				geojson = L.geoJson(statesData, {
					style: style,
					onEachFeature: onEachFeature
				}).addTo(map);

				//LEGEND
				//=======================
				var legend = L.control({position: 'bottomright'});

				legend.onAdd = function (map) {

					var div = L.DomUtil.create('div', 'info legend'),
						grades = [1, 5, 10, 20, 50],
						labels = [],
						from, to;

					for (var i = 0; i < grades.length; i++) {
						from = grades[i];
						to = grades[i + 1];

						labels.push(
							'<i style="background:' + getColor(from + 1) + '"></i> ' +
							from + (to ? '&ndash;' + to : '+'));
					}

					div.innerHTML = labels.join('<br>');
					return div;
				};

				legend.addTo(map);
	    	}

	    	function f_drawPieOrg(){
	    		var thedata = [['Type Org', 'Total']];
	    		for(x in organisationCount){
	    			thedata.push([x,organisationCount[x]])
	    		}

	    		// Load google charts
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChart);

				// Draw the chart and set the chart values
				function drawChart() {
				  var data = google.visualization.arrayToDataTable(thedata);

				  // Optional; add a title and set the width and height of the chart
				  var options = {
				  	//legend: 'none',
					//legend:{position: 'top', textStyle: {color: 'blue', fontSize: 16}},
                   legend: {
                        "position": "labeled"
                         },					
				  	padding:'15px',
			       pieSliceText: 'none',
					//pieSliceText: 'percentage',
			        pieStartAngle: 100,
			        colors: ['#157A72', '#1B9D93', '#20BFB3', '#48CAC0', '#85DCD5'],
			        chartArea:{
			        	left:'15%',
			        	top:10,
			        	bottom:10,
			        	width:'70%',
			        	height:'60%'
			        }
			      };

				  // Display the chart inside the <div> element with id="piechart"
				  var chart = new google.visualization.PieChart(document.getElementById('pieOrg'));
				  chart.draw(data, options);
				  google.visualization.events.addListener(chart, 'select', function() {
					  var sel = chart.getSelection()[0].row;
					  redrawbaseorg(thedata[sel+1][0]);
				  });
				}
	    	}
				
				/*PROJECT STATUS */
				/* ==========================================================================================*/
				
			function f_drawPieStat(){
	    		var thedata = [['Project Status', 'Total']];
	    		for(x in statusCount){
	    			thedata.push([x,statusCount[x]])
	    		} 

	    		// Load google charts
				google.charts.load('current', {'packages':['corechart']});
				google.charts.setOnLoadCallback(drawChart);

				// Draw the chart and set the chart values
				function drawChart() {
				  var data = google.visualization.arrayToDataTable(thedata);

				  // Optional; add a title and set the width and height of the chart
				  var options = {
				  	legend: 'none',
			        pieSliceText: 'label',
			        pieStartAngle: 100,
			        colors: ['#20BFB3', '#1B9D93', '#85DCD5'],
			        chartArea:{
			        	left:"15%",
			        	top:10,
			        	bottom:10,
			        	width:'70%',
			        	height:'70%'
			        },
			      };

				  // Display the chart inside the <div> element with id="piechart"
				  var chart = new google.visualization.PieChart(document.getElementById('pieStat'));
				  chart.draw(data, options);
				  google.visualization.events.addListener(chart, 'select', function() {
					  var sel = chart.getSelection()[0].row;
					  redrawbasestat(thedata[sel+1][0]);
				  });
				}
	    	}		
			
			
							/*PROJECT STATUS END*/
				/* ==========================================================================================*/


	    	function f_drawBarSect(){
	    		var head = ['Sector', 'Total',{type: 'string', role: 'annotation'}];
	    		var thedata = [];
	    		for(x in sectorCount){
	    			thedata.push([x,sectorCount[x],sectorCount[x]])
	    		}
	    		thedata.sort(sortFunction);

				function sortFunction(a, b) {
				    if (a[1] === b[1]) {
				        return 0;
				    }
				    else {
				        return (a[1] > b[1]) ? -1 : 1;
				    }
				}
				thedata.unshift(head);

	    		google.charts.load('current', {packages: ['corechart', 'bar']});
				google.charts.setOnLoadCallback(drawBasic);

				function drawBasic() {

				      var data = google.visualization.arrayToDataTable(thedata);

				      var options = {
				      	colors:['#20bfb3'],
				      	height:350,
				        chartArea: {width: '70%',top:5,right:3 ,bottom:40},
				        legend: 'none',
				        
				        hAxis: {
				          title: 'Total Activities',
				          minValue: 0
				        },
				        vAxis: {
				          // title: 'Sectors'
				          textStyle:{
				          	fontSize:10
				          }
				        },
				        annotations: {
				          alwaysOutside: true,
				          textStyle: {
				            fontSize: 12,
				            auraColor: 'none',
				            color: '#555'
				          },
				          boxStyle: {
				            stroke: '#ccc',
				            strokeWidth: 1,
				            gradient: {
				              color1: '#f3e5f5',
				              color2: '#f3e5f5',
				              x1: '0%', y1: '0%',
				              x2: '100%', y2: '100%'
				            }
				          }
				        },
				        animation:{
					        duration: 1000,
					        easing: 'out',
					        startup: true
					    },
				      };

				      var chart = new google.visualization.BarChart(document.getElementById('barSect'));

				      chart.draw(data, options);
				      google.visualization.events.addListener(chart, 'select', function() {
						  var sel = chart.getSelection()[0].row;
						  redrawbasesector(thedata[sel+1][0]);
					  });
				    }
	    	}	


	    	// function to draw the data table
	    	function f_drawDataTable(data){
	    		if(theDataTableInit){
	    			theDataTableInit.destroy();
	    		}

	    		var thedatasource = [];
	    		$.each(data,function(i,z){

	    			newdata = [	z['Organization'],
	    						z['Organization Type'],
	    						z['Sector'],
	    						z['State'],
	    						z['LGA'],
	    					    z['Project Status'],
	    					 // z['Total Beneficiaries'],
	    					];
	    			
    				thedatasource.push(newdata);
    			});


	    		theDataTableInit = $('#datatable').DataTable( {
	    			data: thedatasource,
			        columns: [
			            { title: "Organization" },
			            { title: "Organization Type"},
			            { title: "Sector" },
			            { title: "State" },
			            { title: "Locality" },
			            { title: "Project Status" },
			            //{ title: "Total Beneficiaries" },
			        ],
			        responsive: true,	        
				    
			    } );
	    	}

	    	$('#Stateselect').on('change',function(){
	    		var val = $(this).val();
	    		let select = val.replace('-',' ');
	    		Stateselect = select;
	    		$('#loadinggif').show();
	    		setTimeout(function(){
	    			if(val == 0){
		    			redrawvis(val);
		    		}else{
		    			redrawvis(select);

		    		}
	    			$('#loadinggif').hide();
	    		},500)
	    	})

	    	$('#periodselect').on('change',function(){
	    		$('#loadinggif').show();
	    		var val = $(this).val();
	    		periodselect = val;
	    		setTimeout(function(){
	    			redrawvisbasedonperiod(periodselect);
	    			$('#loadinggif').hide();
	    		},500)
	    	})

	    	$('#resetall').on('click',function(){
	    		$('#loadinggif').show();
	    		setTimeout(function(){
	    			redrawvisbasedonperiod(0)
	    			$('#loadinggif').hide();
	    		},500)
	    	})

	    	function redrawvisbasedonperiod(theperiod){
	    		map.removeLayer(geojson);
	    		$('.info').remove();
	    		var therepper = 0;
    			organisationCount = [];
    			statusCount = [];
    			sectorCount = [];
    			locationCount=[];
    			datatblnew = [];
    			orgtotal=[];
    			$('#Stateselect').html('');
    			$('#Stateselect').append('<option value="0">ALL LGA</option>');

    			if(theperiod == 0){
    				reportingperiod = [];
    				$('#periodselect').html('');
	    			thedata.forEach(function(d){
	    				let repper = d['Reporting period'];
		    			if(!reportingperiod[repper]){
		    				reportingperiod[repper] = repper;
		    				therepper = repper;
		    				$('#periodselect').append('<option class="periodselect" selected="true" value="'+repper+'">'+repper+'</option>');
		    				$('#periodselect option[value="'+repper+'"]').prop("selected",true);
		    			}
		    			theperiod = therepper;
		    		});
    			}
    			
	    		thedata.forEach(function(d){
	    			if(d['Reporting period'] == theperiod){
	    				datatblnew.push(d);
	    				let tempat = d['LGA'].toUpperCase();
		    			if(locationCount[tempat]){
		    				locationCount[tempat] += 1;
		    			}else{
		    				locationCount[tempat] = 1;
		    				let select = tempat.replace(' ','-');
		    				$('#Stateselect').append('<option value="'+select+'">'+tempat+'</option>');
		    			}
		    			let orgtype = d['Organization Type'].toUpperCase();
		    			if(organisationCount[orgtype]){
		    				organisationCount[orgtype] += 1;
		    			}else{
		    				organisationCount[orgtype] = 1;
		    			}
               /*PROJECT STATUS*/
		    			let stattype = d['Project Status'].toUpperCase();
		    			if(stattype!=''){
		    				if(statusCount[stattype]){
			    				statusCount[stattype] += 1;
			    			}else{
			    				statusCount[stattype] = 1;
			    			}
		    			}
						/*PROJECT STATUS END*/

		    			let sectortype = d['Sector'].toUpperCase();
		    			if(sectorCount[sectortype]){
		    				sectorCount[sectortype] += 1;
		    			}else{
		    				sectorCount[sectortype] = 1;
		    			}

		    			let org=d['Organization'];
		    			let cek = $.inArray( org, orgtotal ); 
		    			if(cek == -1){
		    				orgtotal.push(org);
		    			}
		    		}
	    			
	    		})
	    		periodselect = theperiod;

	    		drawStatediv();
	    		f_drawPieOrg();
	    		//f_drawPieStat(); PROJECT STATUS
				f_drawPieStat();
	    		f_drawBarSect();
	    		f_drawDataTable(datatblnew);

	    		let val3 = 0;
	    		let val2 = 0;
	    		for(x in locationCount){
	    			val3++;
	    			val2+=locationCount[x];
	    		}
	    		$('#val3').html(val3);
	    		$('#val2').html(val2);
	    		$('#val1').html(orgtotal.length);
	    	}

	    	function redrawvis(namaLGA){
	    		$('#loadinggif').show();
	    		map.removeLayer(geojson);
	    		$('.info').remove();

    			organisationCount = [];
    			//statusCount = []; PROJECT STATUS
				statusCount = [];
    			sectorCount = [];
    			locationCount=[];
    			datatblnew = [];
    			orgtotal=[];

	    		thedata.forEach(function(d){
	    			if(namaLGA == '0' && periodselect == d['Reporting period'] ){
	    				datatblnew.push(d);
	    				let tempat = d['LGA'].toUpperCase();
		    			if(locationCount[tempat]){
		    				locationCount[tempat] += 1;
		    			}else{
		    				locationCount[tempat] = 1;
		    			}

		    			let orgtype = d['Organization Type'].toUpperCase();
		    			if(organisationCount[orgtype]){
		    				organisationCount[orgtype] += 1;
		    			}else{
		    				organisationCount[orgtype] = 1;
		    			}
				/*PROJECT STATUS */
				/* ===================*/

		    			let stattype = d['Project Status'].toUpperCase();
		    			if(stattype!=''){
		    				if(statusCount[stattype]){
			    				statusCount[stattype] += 1;
			    			}else{
			    				statusCount[stattype] = 1;
			    			}
		    			}
						
				/*PROJECT STATUS */
				/* ===================*/

		    			let sectortype = d['Sector'].toUpperCase();
		    			if(sectorCount[sectortype]){
		    				sectorCount[sectortype] += 1;
		    			}else{
		    				sectorCount[sectortype] = 1;
		    			}

		    			let org=d['Organization'];
		    			let cek = $.inArray( org, orgtotal ); 
		    			if(cek == -1){
		    				orgtotal.push(org);
		    			}
	    			}
	    			else if(d['LGA'].toUpperCase() == namaLGA.toUpperCase() && periodselect == d['Reporting period']){
	    				datatblnew.push(d);
	    				let tempat = d['LGA'].toUpperCase();
		    			if(locationCount[tempat]){
		    				locationCount[tempat] += 1;
		    			}else{
		    				locationCount[tempat] = 1;
		    				}
		    			let orgtype = d['Organization Type'].toUpperCase();
		    			if(organisationCount[orgtype]){
		    				organisationCount[orgtype] += 1;
		    			}else{
		    				organisationCount[orgtype] = 1;
		    			}
				/*PROJECT STATUS */
				/* ===================*/

		    			let stattype = d['Project Status'].toUpperCase();
		    			if(stattype!=''){
		    				if(statusCount[stattype]){
			    				statusCount[stattype] += 1;
			    			}else{
			    				statusCount[stattype] = 1;
			    			}
		    			}
				/*PROJECT STATUS */
				/* ===================*/

		    			let sectortype = d['Sector'].toUpperCase();
		    			if(sectorCount[sectortype]){
		    				sectorCount[sectortype] += 1;
		    			}else{
		    				sectorCount[sectortype] = 1;
		    			}

		    			let org=d['Organization'];
		    			let cek = $.inArray( org, orgtotal ); 
		    			if(cek == -1){
		    				orgtotal.push(org);
		    			}
		    		}
	    			
	    		})

	    		drawStatediv();
	    		f_drawPieOrg();
	    		f_drawPieStat();
	    		f_drawBarSect();
	    		f_drawDataTable(datatblnew);

	    		let val3 = 0;
	    		let val2 = 0;
	    		for(x in locationCount){
	    			val3++;
	    			val2+=locationCount[x];
	    		}
	    		$('#val3').html(val3);
	    		$('#val2').html(val2);
	    		$('#val1').html(orgtotal.length);
	    		$('#loadinggif').hide();
	    	}

	    	function redrawbasestat(stat){
	    		$('#loadinggif').show();
	    		setTimeout(function(){
	    			run();
	    			$('#loadinggif').hide();
	    		},500)

	    		function run(){
	    			map.removeLayer(geojson);
		    		$('.info').remove();
		    		
		    		organisationCount = [];
	    			datatblnew = [];
	    			locationCount = [];
	    			orgtotal=[];
	    			sectorCount=[];

	    			console.log(periodselect);
	    			console.log(Stateselect);

		    		thedata.forEach(function(d){
		    			if( d['LGA'].toUpperCase() == Stateselect){
		    				console.log(d['LGA'].toUpperCase())
		    			}
		    	if(d['Project Status'].toUpperCase() == stat && d['Reporting period'] == periodselect && (Stateselect == 0 || Stateselect == d['LGA'].toUpperCase())){
				//if(d['Reporting period'] == periodselect && (Stateselect == 0 || Stateselect == d['LGA'].toUpperCase())){
		    				datatblnew.push(d);
		    				let tempat = d['LGA'].toUpperCase();
			    			if(locationCount[tempat]){
			    				locationCount[tempat] += 1;
			    			}
			    			else{
			    				locationCount[tempat] = 1;
			    				let select = tempat.replace(' ','-');
			    				$('#Stateselect').append('<option value="'+select+'">'+tempat+'</option>');
			    			}

			    			let orgtype = d['Organization Type'].toUpperCase();
			    			if(organisationCount[orgtype]){
			    				organisationCount[orgtype] += 1;
			    			}else{
			    				organisationCount[orgtype] = 1;
			    			}

			    			let org=d['Organization'];
			    			let cek = $.inArray( org, orgtotal ); 
			    			if(cek == -1){
			    				orgtotal.push(org);
			    			}

			    			let sectortype = d['Sector'].toUpperCase();
			    			if(sectorCount[sectortype]){
			    				sectorCount[sectortype] += 1;
			    			}else{
			    				sectorCount[sectortype] = 1;
			    			}
		    			}
		    		})

		    		drawStatediv();
		    		f_drawPieOrg();
		    		f_drawDataTable(datatblnew);
		    		f_drawBarSect();
		    		let val3 = 0;
		    		let val2 = 0;
		    		for(x in locationCount){
		    			val3++;
		    			val2+=locationCount[x];
		    		}
		    		$('#val3').html(val3);
		    		$('#val2').html(val2);
		    		$('#val1').html(orgtotal.length);
	    		}
	    	}

	    	function redrawbaseorg(org){
	    		$('#loadinggif').show();
	    		setTimeout(function(){
	    			run();
	    			$('#loadinggif').hide();
	    		},500)
	    		function run(){
	    			map.removeLayer(geojson);
		    		$('.info').remove();
		    		
	    			datatblnew = [];
	    			locationCount = [];
	    			orgtotal=[];
	    			sectorCount=[];
	    			statusCount = [];

		    		thedata.forEach(function(d){
		    			if(d['Organization Type'].toUpperCase() == org && d['Reporting period'] == periodselect && (Stateselect == 0 || Stateselect == d['LGA'].toUpperCase())){
		    				datatblnew.push(d);
		    				let tempat = d['LGA'].toUpperCase();
			    			if(locationCount[tempat]){
			    				locationCount[tempat] += 1;
			    			}else{
			    				locationCount[tempat] = 1;
			    				let select = tempat.replace(' ','-');
			    				$('#Stateselect').append('<option value="'+select+'">'+tempat+'</option>');
			    			}

			    			let org=d['Organization'];
			    			let cek = $.inArray( org, orgtotal ); 
			    			if(cek == -1){
			    				orgtotal.push(org);
			    			}

			    			let sectortype = d['Sector'].toUpperCase();
			    			if(sectorCount[sectortype]){
			    				sectorCount[sectortype] += 1;
			    			}else{
			    				sectorCount[sectortype] = 1;
			    			}

			    		/*PROJECT STATUS*/
						let stattype = d['Project Status'].toUpperCase();
			    			if(stattype!=''){
			    				if(statusCount[stattype]){
				    				statusCount[stattype] += 1;
				    			}else{
				    				statusCount[stattype] = 1;
				    			}
			    			} 
							
							/*PROJECT STATUS*/
		    			}
		    		})

		    		drawStatediv();
		    		f_drawDataTable(datatblnew);
		    		f_drawBarSect();
		    		f_drawPieStat();

		    		let val3 = 0;
		    		let val2 = 0;
		    		for(x in locationCount){
		    			val3++;
		    			val2+=locationCount[x];
		    		}
		    		$('#val3').html(val3);
		    		$('#val2').html(val2);
		    		$('#val1').html(orgtotal.length);
	    		}
	    	}

	    	function redrawbasesector(sector){
	    		$('#loadinggif').show();
	    		setTimeout(function(){
	    			run();
	    			$('#loadinggif').hide();
	    		},500)
	    		function run(){
	    			map.removeLayer(geojson);
		    		$('.info').remove();
		    		
		    		organisationCount = [];
	    			statusCount = [];
	    			datatblnew = [];
	    			locationCount = [];
	    			orgtotal=[];

		    		thedata.forEach(function(d){
		    			if(d['Sector'].toUpperCase() == sector && d['Reporting period'] == periodselect && (Stateselect == 0 || Stateselect == d['LGA'].toUpperCase())){
		    				datatblnew.push(d);
		    				let tempat = d['LGA'].toUpperCase();
			    			if(locationCount[tempat]){
			    				locationCount[tempat] += 1;
			    			}else{
			    				locationCount[tempat] = 1;
			    				let select = tempat.replace(' ','-');
			    				$('#Stateselect').append('<option value="'+select+'">'+tempat+'</option>');
			    			}


			    			let orgtype = d['Organization Type'].toUpperCase();
			    			if(organisationCount[orgtype]){
			    				organisationCount[orgtype] += 1;
			    			}else{
			    				organisationCount[orgtype] = 1;
			    			}

			    		/*	PROJECT STATUS*/
						let stattype = d['Project Status'].toUpperCase();
			    			if(stattype!=''){
			    				if(statusCount[stattype]){
				    				statusCount[stattype] += 1;
				    			}else{
				    				statusCount[stattype] = 1;
				    			}
			    			} 
							/*	PROJECT STATUS*/

			    			let org=d['Organization'];
			    			let cek = $.inArray( org, orgtotal ); 
			    			if(cek == -1){
			    				orgtotal.push(org);
			    			}
		    			}
		    		})

		    		drawStatediv();
		    		f_drawPieOrg();
		    		f_drawPieStat();
		    		f_drawDataTable(datatblnew);

		    		let val3 = 0;
		    		let val2 = 0;
		    		for(x in locationCount){
		    			val3++;
		    			val2+=locationCount[x];
		    		}
		    		$('#val3').html(val3);
		    		$('#val2').html(val2);
		    		$('#val1').html(orgtotal.length);
	    		}
	    	}

	    	function drawinit(){
	    		orgtotal=[];
	    		var therepper = 0;
	    		thedata.forEach(function(d){
		    			let tempat = d['LGA'].toUpperCase();
		    			if(locationCount[tempat]){
		    				locationCount[tempat] += 1;
		    			}else{
		    				locationCount[tempat] = 1;
		    				let select = tempat.replace(' ','-');
		    				$('#Stateselect').append('<option value="'+select+'">'+tempat+'</option>');
		    			}

		    			let repper = d['Reporting period'];
		    			if(!reportingperiod[repper]){
		    				reportingperiod[repper] = repper;
		    				therepper = repper;
		    				$('#periodselect').append('<option class="periodselect" selected="true" value="'+repper+'">'+repper+'</option>');
		    				$('#periodselect option[value="'+repper+'"]').prop("selected",true);
		    			}

		    			let orgtype = d['Organization Type'].toUpperCase();
		    			if(organisationCount[orgtype]){
		    				organisationCount[orgtype] += 1;
		    			}else{
		    				organisationCount[orgtype] = 1;
		    			}
/*PROJECT STATUS */
		    			let stattype = d['Project Status'].toUpperCase();
		    			if(stattype!=''){
		    				if(statusCount[stattype]){
			    				statusCount[stattype] += 1;
			    			}else{
			    				statusCount[stattype] = 1;
			    			}
						}
/*PROJECT STATUS END*/
		    			let sectortype = d['Sector'].toUpperCase();
		    			if(sectorCount[sectortype]){
		    				sectorCount[sectortype] += 1;
		    			}else{
		    				sectorCount[sectortype] = 1;
		    			}
		    					    			
		    			let org=d['Organization'];
		    			let cek = $.inArray( org, orgtotal ); 
		    			if(cek == -1){
		    				orgtotal.push(org);
		    			}
		    	//});  where error is ')'
				});


		    		drawStatediv();
		    		periodselect = therepper;
		    		redrawvisbasedonperiod(therepper)

		    		let val3 = 0;
		    		let val2 = 0;
		    		for(x in locationCount){
		    			val3++;
		    			val2+=locationCount[x];
		    		}
		    		$('#val3').html(val3);
		    		$('#val2').html(val2);
		    		$('#val1').html(orgtotal.length);

		    		drawboundaries();
	    	}

	    	$('#loadinggif').show();
		  	d3.json('geo/Nigeria2Geojson.geojson',function(jso){	
	    	statesData = jso;
			console.log(statesData);
	    		//call the original data
	  d3.csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vRRdzUkWp3mX7ZtbIbDijKHnhS4ppOATR0duEun7aFqPGU2c6iWgnOZ_y1bCCQ3Rna690keS7U4Shq0/pub?output=csv',
					
				function(data){
		    		//set the data called to variable thedata
		    		thedata = data;

		    		drawinit();
		    		$('#loadinggif').hide();
		    	})	    	


	    	})


    	})
    	
