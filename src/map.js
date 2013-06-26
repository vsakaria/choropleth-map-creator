function Choropleth(data) {

    this.map = L.map('map').setView([51.505, -0.09], 6);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

    geojson = L.geoJson(data, {style: style, onEachFeature: onEachFeature}).addTo(this.map);

    return this;
}

Choropleth.prototype.addTitle = function (header) {
    var title = L.control({position: 'topleft'});

    title.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'title');
        if (header) {
            this._div.innerHTML = header;
        }
        return this._div;
    };

    title.addTo(this.map);
    this.title = title;
    return this;

    //Create a DOM Element
};


Choropleth.prototype.addInfo = function (callback) {
    var info = L.control();

    info.onAdd = function (map) {

        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        if (props) {
            this._div.innerHTML = callback(props);
        } else {
            this._div.innerHTML = "Hover over map";
        }
    };

    info.addTo(this.map);
    this.map.info = info;
    this.info = info;
    return this;
    //
    //console.log(callback(props));
    /* */
};
//////////////////////////////Top Right Info Box function defintion//////////////////////////////////////

Choropleth.prototype.addSimpleInfo = function (lines) {
    console.log(lines);
    var info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    // method that we will use to update the control based on feature properties passed
    info.update = function (props) {
        var remain_text = "";

        for (var i = 1; i < lines.length; i++) {

            if (props) {
                remain_text += ( replaceAll('_', ' ', capitaliseFirstLetter(lines[i])) + ": " + props[lines[i]] + '<br/>' );
            }
        }

        this._div.innerHTML = '<h3>' + lines[0] + '</h3>' + (props ? remain_text : 'Hover over a state');

        return this._div;
    };

    info.addTo(this.map);

    this.info = info;
    return this;
};


//////////////////////////////Bottom Right Ledgend Box function definitions /////////////////////////////////////

Choropleth.prototype.addLegend = function (gradesParam) {

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        this._div = L.DomUtil.create('div', 'info legend'),
            grades = gradesParam,
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            this._div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return this._div;
    };

    legend.addTo(this.map);

    return this;
};

//////////////////////////////Helper functions /////////////////////////////////////

function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getColor(d) {
    return  d > 35 ? '#800026' :
        d > 27 ? '#BD0026' :
            d > 25 ? '#E31A1C' :
                d > 24 ? '#FC4E2A' :
                    d > 23 ? '#FD8D3C' :
                        d > 21 ? '#FEB24C' :
                            d > 19 ? '#FED976' :
                                '#FFEDA0';
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

    e.target._map.info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    e.target._map.info.update();
}

function zoomToFeature(e) {
    e.target._map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}