
var data = new MapData("data/testcsv.csv","data/testgeojson.json","ccg_code");


data.mergeData(function(mergeddata) {
			choropleth = new Choropleth(mergeddata)
			.addLegend([0, 19, 21, 23, 24, 25, 27, 38])
			.addInfo(function(props){
					var infoBox = '<H3> Proprietary Stains Prescribing </h3><br/>' + '<b>' + props.Description + '</b><br/>' + '<b>' + numeric.round( [props.ccg_problem ] ) + '</b>';
						return infoBox;
					});

});

//.addSimpleInfo(["Proprietary Statins Prescribing", "Description", "total_items_month", "pop_per_surgery", "ccg_problem"]);