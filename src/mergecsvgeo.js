function MapData(csvPath, geoJsonPath, join_field_key) {
    this.csvPath = csvPath;
    this.geoJsonPath = geoJsonPath;
    this.join_field_key = join_field_key;

    return this;
}

MapData.prototype.mergeData = function (callback) {
    var geo_json;
    var merged_data = {"type": "FeatureCollection", "features": undefined };
    var join_field_key = this.join_field_key;

    geoJsonPath = this.geoJsonPath;

    var buildingData = $.Deferred();

    d3.csv(this.csvPath, function (csv) {

        if (csv) {
            console.log(csv);

            $.ajax(
                {
                    url: geoJsonPath,
                    async: false,
                    data: 'json',

                    success: function (data) {

                        geo_json = data.features;
                        merged_data = processData(csv, geo_json, join_field_key);
                        buildingData.resolve(merged_data);

                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        console.log(xhr.status + " - " + thrownError);
                    }
                });
        }
        else {
            console.log("Error loading CSV data");
        }
    });

    buildingData.done(function (d) {
        callback(d);
    });
};

function processData(csvData, geoData, joinKey) {

    var join_field_object = {};
    var merged_data = {"type": "FeatureCollection", "features": undefined };

    $.each(geoData, function (index, object) {

        join_field_object[joinKey] = object.properties[joinKey];

        var csv_data = _.findWhere(csvData, join_field_object);
        $.extend(object.properties, csv_data);
    });

    merged_data.features = geoData;

    return merged_data;
}




