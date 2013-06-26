
describe("MapData", function(){


	beforeEach(function (){
	});

	describe("mergeData", function (){
		it("It merges CSV and GeoJson files based on a join field. Testing presence of CSV data.", function(){
			result = mergeDataLocal(csvData, geoData,"ccg_code");
			expect(result.features[0].properties.region).toEqual("London");

		});
		it("It merges CSV and GeoJson files based on a join field. Testing presence of GeoJson data.", function(){
			result = mergeDataLocal(csvData2, geoData,"ccg_code");
			expect(result.features[0].properties.no_of_practices).toEqual(42);
		});
		it("Enriches GeoJson even if CSV is larger than GeoJSon", function(){
			result = mergeDataLocal(csvData2, geoData,"ccg_code");
			console.log( result);
			expect(result.features[0].properties.region).toEqual("London");
		});
		it("Enriches GeoJson even if CSV is smaller than GeoJSon", function(){
			result = mergeDataLocal(csvData, geoData2,"ccg_code");
			console.log( result);
			expect(result.features[1].properties.population).toEqual(372200);
		});
	});

});