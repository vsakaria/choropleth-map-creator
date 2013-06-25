function MapData(csvPath, geoJsonPath, join_field_key) {
    this.csvPath = csvPath;
    this.geoJsonPath = geoJsonPath;
    this.join_field_key = join_field_key;

    return this;
}

MapData.prototype.mergeData = function(callback)
{
	var csv;
	var geo_json;
	var merged_data = {"type" : "FeatureCollection", "features" : undefined };
	var join_field_object = {};
	var join_field_key = this.join_field_key;

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
					geo_json = data.features;

					$.each(geo_json, function(index, object)
					{

						join_field_object[join_field_key] = object.properties[join_field_key];

						var csv_data = _.findWhere(csv, join_field_object);
						$.extend(object.properties, csv_data);
					});

					merged_data.features = geo_json;
					console.log(merged_data);
					buildingData.resolve(merged_data);

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

	buildingData.done(function(d) {
		callback(d);
	});
};



