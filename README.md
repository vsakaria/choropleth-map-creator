A JS library to create a Choropleth on a map using GeoJson Data!

MERGING CSV GEOJSON DATA

The mergecsvgeo.js file allows you to merge a CSV and GeoJson file together by passing in two paths and a key to link the two files together.

The library using two Async calls using D3.js and Jquery. A JQuery deferred promise is used to trigger a callback so the merged data can be passed back to the function call.

Pivitol Labs Jasmine BDD is used to test the processData function using edge cases.

MAPPING THE DATA INTO A CHOROPLETH.

Map.js allows you to create a map by passing in the data into the constructor. You can then addInfo box using a callback containing HTML code and addLegend with an array of numbers.

See Control.js for implementation example and index for live example. 
