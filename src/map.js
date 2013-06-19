
var info = L.control();

var map = L.map('map').setView([51.505, -0.09], 6);

function buildCholorpleth( data )
{

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
	{
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	geojson = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(map);
}

function getColor(d) {
    return  d > 35 ? '#800026' :
          	d > 35 ? '#BD0026' :
          	d > 27 ? '#E31A1C' :
          	d > 25 ? '#FC4E2A' :
          	d > 24 ? '#FD8D3C' :
          	d > 23 ? '#FEB24C' :
          	d > 21 ? '#FED976' :
          	d > 19 ? '#FFEDA0':
                     '#FFFFCC';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.ccg_problem),
        weight: 2,
        opacity: 0,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.8
    };
}


///////////////////////////////////////////////////////////////////////////////////////////
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
        '<b>' + props.Name + '</b><br />' + props.region + ' people / mi<sup>2</sup>'
        : 'Hover over a state');
};

info.addTo(map);

//////////////////////////Event Listeners/////////////////////////////////
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.4
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    info.update( layer.feature.properties )
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
};

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
};

//Add the merged_data var within the streamFile closure and pass it around to addChoropleth
//Also implement the mergecsvgeo to allow a function as a argument which can be used to call the addChloropleth
