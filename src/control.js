var mapData = new MapData();
var cmap = new Map();

mapData.mergeData( "data/testcsv.csv", "data/testgeojson.json", "ccg_code", function (data){

	cmap.buildCholorpleth(data);
});



// cmap.buildCholorpleth( gj );
// map.build( data.mergeData() );
// var cmap = new Map();
