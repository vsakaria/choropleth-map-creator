
var data = new MapData("data/testcsv.csv","data/testgeojson.json","ccg_code");
var choropleth;

data.mergeData(function(data) {
	 choropleth = new Choropleth(data)
			   .addLegend()
			   .addInfo();
});

// $(document).ready(function () {
  // $.when( data.mergeData() ).then(function (data) {

  //   console.log("Then called")
  //   // new Choropleth(data)
	 //   //      .addLegend()
	 //   //      .addInfo();


//THIS NEEDS TO LOOK INTO THE FUTURE!!!

	 // if(data.mergeData())
	 // 	console.log("Data recived")
	 // else
	 // 	console.log("Data NOT recived")

	 //buildingData.done( function() { console.log("Control.js called")})
	 // $.when( data.mergeData() ).then(function(){
	 // 	console.log("Then called")
	 // });
	 //onsole.log( d ) ;
  // // });

	// var mapData = data.mergeData();
	// console.log( "mapData" );
	// console.log( mapData );

// });
// cmap.buildCholorpleth( gj );
// map.build( data.mergeData() );
// var cmap = new Map();
