console.log("THIS IS IT!");

var csv;
var geo_json;
var merged_data = {"type" : "FeatureCollection",
  "features" : undefined };

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    };



///////////////////////////////////////////////////////////////////////////////////
function mergeData( csvPath, geoJsonPath, join_field_key)
{
	streamFile( csvPath, geoJsonPath, join_field_key );
};

///////////////////////////////////////////////////////////////////////////////////
function streamFile( csvPath, geoJsonPath, join_field_key )
{
	var join_field_key = join_field_key;
	var join_field_object = {};merged

	var csvPath = csvPath;
	var geoJsonPath = geoJsonPath;

	d3.csv( csvPath, function(data){
		if(data)
		{
			csv = data

			$.get( geoJsonPath, function(data)
			{
				geo_json = data.features;

				$.each(geo_json, function(index, object)
				{
					join_field_object[join_field_key] = object.properties[join_field_key];
					var csv_data = _.findWhere(csv, join_field_object);
					$.extend(object.properties, csv_data);
				});

				merged_data.features = geo_json;
				console.log( "The MERGED DATA is foo" );
				console.log( merged_data );
			});
		}
		else
		{
			console.log("Error loading CSV data & did not load JSON data!");
		}
	});
};

mergeData( "data/testcsv.csv", "data/testgeojson.json", "ccg_code");

//Need to write error callbacks on the JQuery get request.


