
var data = new MapData("data/testcsv.csv","data/testgeojson.json","ccg_code");
var choropleth;

data.mergeData(function(data) {
	 		choropleth = new Choropleth(data)
			 .addLegend([0, 19, 21, 23, 24, 25, 27, 36])
			 .addInfo();
});

