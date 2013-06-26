function mergeDataLocal(csvData, geo_data, join_key) {
    var geo_json;
    var merged_data = {"type": "FeatureCollection", "features": undefined };
    var join_field_object = {};
    var join_field_key = join_key;

    geoJsonPath = this.geoJsonPath;


    geo_json = geo_data;

    $.each(geo_json, function (index, object) {

        join_field_object[join_field_key] = object.properties[join_field_key];

        var csv_data = _.findWhere(csvData, join_field_object);
        $.extend(object.properties, csv_data);
    });

    merged_data.features = geo_json;

    return merged_data;
}