function MapData(csvPath, geoJsonPath, join_field_key) {
    this.csvPath = csvPath;
    this.geoJsonPath = geoJsonPath;
    this.join_field_key;
    return this;
};


MapData.prototype.mergeData = function(callback)
{

	var csv;
	var geo_json;
	var merged_data = {"type" : "FeatureCollection",
                 	   "features" : undefined };

	var join_field_object = {};

    geoJsonPath = this.geoJsonPath;

	var buildingData = $.Deferred();

	d3.csv(this.csvPath, function(csv)
	{
		if(csv)
		{
			$.ajax(
			{
				url: geoJsonPath,
				async: false,
				data: 'json',

				success: function (data)
				{

					console.log("CSV called");

					geo_json = data.features;

					$.each(geo_json, function(index, object)
					{
						join_field_object[this.join_field_key] = object.properties[this.join_field_key];
						var csv_data = _.findWhere(csv, join_field_object);
						$.extend(object.properties, csv_data);
					});

					merged_data.features = geo_json;

					console.log( buildingData.state() );

					buildingData.resolve(merged_data);

					console.log( buildingData.state() );

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
	}); //d3 call

	a = buildingData.done(function(d) {
		callback(d);
	});

		// fileStream.then(function(){
		// 		console.log("fileStream done");
		// 	}, function(){
		// 		console.log("Error in fileStream")
		// 	}, function(){
		// 		console.log("Loading")
		// });

};



//Need to write error callbacks on the JQuery get request.


