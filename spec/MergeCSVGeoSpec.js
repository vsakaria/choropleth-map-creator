describe("MapData", function () {

    describe("mergeData", function () {
        it("Joins small set of CSV data with small set of GeoJson data.", function () {
            result = processData(csvDataSmall, geoDataSmall, "ccg_code");
            expect(result[0].properties.region).toEqual("London");

        });
        it("Joins large set of CSV data with small set of GeoJson data.", function () {
            result = processData(csvDataLarge, geoDataSmall, "ccg_code");
            expect(result[0].properties.no_of_practices).toEqual(42);
        });
        it("Enriches GeoJson even if CSV is larger than GeoJSon", function () {
            result = processData(csvDataLarge, geoDataSmall, "ccg_code");
            console.log(result);
            expect(result[0].properties.region).toEqual("London");
        });
        it("Enriches GeoJson even if CSV is smaller than GeoJSon", function () {
            result = processData(csvDataSmall, geoDataLarge, "ccg_code");
            console.log(result);
            expect(result[1].properties.population).toEqual(372200);
        });
    });
});