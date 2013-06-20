function MapData() {

};


MapData.prototype.mergeData = function(csvPath, geoJsonPath, join_field_key, callback)
{
	var csv;
	var geo_json;
	var merged_data = {"type" : "FeatureCollection",
  		"features" : undefined };

	var join_field_key = join_field_key;
	var join_field_object = {};

	var csvPath = csvPath;
	var geoJsonPath = geoJsonPath;

	d3.csv( csvPath, function(data)
	{
		if(data)
		{
			csv = data
			$.ajax(
			{
				url: geoJsonPath,
				async: false,
				data: 'json',

				success: function (data)
				{
					geo_json = data.features;

					$.each(geo_json, function(index, object)
					{
						join_field_object[join_field_key] = object.properties[join_field_key];
						var csv_data = _.findWhere(csv, join_field_object);
						$.extend(object.properties, csv_data);
					});

					merged_data.features = geo_json;

					callback(merged_data);

				},
				error: function (xhr, ajaxOptions, thrownError)
				{
					console.log( xhr.status + "  " + thrownError );
				}
			});

		}
		else
		{
			console.log("Error loading CSV data");
		}


	});
};



//Need to write error callbacks on the JQuery get request.


