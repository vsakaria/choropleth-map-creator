var mapData = new MapData();
var cmap = new Map();

mapData.mergeData( "data/testcsv.csv", "data/testgeojson.json", "ccg_code" );

console.log("Control");
console.log(gj);

cmap.buildCholorpleth( gj );

map.build( data.mergeData() );

