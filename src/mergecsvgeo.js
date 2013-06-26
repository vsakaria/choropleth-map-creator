function MapData(csvPath, geoJsonPath, joinFieldKey) {
    this.csvPath = csvPath;
    this.geoJsonPath = geoJsonPath;
    this.join_field_key = joinFieldKey;

    return this;
}

MapData.prototype.mergeData = function (callback) {
    var joinFieldKey = this.join_field_key;

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

                        features = data.features;
                        data.features = processData(csv, features, joinFieldKey);
                        buildingData.resolve(data);

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

function processData(csvData, features, joinKey) {

    var joinFieldObject = {};

    $.each(features, function (index, object) {

        joinFieldObject[joinKey] = object.properties[joinKey];

        var csv_data = _.findWhere(csvData, joinFieldObject);
        $.extend(object.properties, csv_data);
    });

    return features;
}




