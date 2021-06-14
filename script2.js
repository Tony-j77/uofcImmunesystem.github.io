mapboxgl.accessToken = 'pk.eyJ1IjoidG9ueTEyMzQ0Njc0IiwiYSI6ImNrcHN3dmhvYzBhcWgydWxpNHVndmxyNDQifQ.ki2eqvrz66H1lqsUdYXSUQ';

var places = {
'type': 'FeatureCollection',
'features': [
{
'type': 'Feature',
'properties': {
'icon': 'music'
},
'geometry': {
'type': 'Point',
'coordinates': [-114.070535, 51.055161]
}
},
{
'type': 'Feature',
'properties': {
'icon': 'bar'
},
'geometry': {
'type': 'Point',
'coordinates': [-114.045827, 51.045071]
}
},


]
};

var geojson = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.070535, 51.055161]
      },
      properties: {
        title: 'Skywalker Music Festival',
        Attendance: "Estimated 600 people from organizers",
        vaccine: 'Vaccine Requirement:',
        mask: 'Mask Requirement:',
        Website: 'www.skywalker.com'
      },
    },  
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-114.045827, 51.045071]
      },
      properties: {
        title: "Darla's bar",
        Attendance: "20 people capacity",
        vaccine: 'Vaccine Requirement:',
        mask: "Mask Requirement:",
        Website: 'www.bar.com'
      },
    },
  
  ]
  };
 
var filterGroup = document.getElementById('filter-group');
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/tony12344674/ckpvhz3275brw17p7s6943f5j',
center: [-114.0719, 51.0447],
zoom: 10
});
 
map.on('load', function () {

map.addSource('places', {
'type': 'geojson',
'data': places
});
 
places.features.forEach(function (feature) {
var symbol = feature.properties['icon'];
var layerID = 'poi-' + symbol;
 

if (!map.getLayer(layerID)) {
map.addLayer({
'id': layerID,
'type': 'symbol',
'source': 'places',
'layout': {

'icon-image': symbol + '-15',
'icon-allow-overlap': true
},
'filter': ['==', 'icon', symbol]
});
 

var input = document.createElement('input');
input.type = 'checkbox';
input.id = layerID;
input.checked = true;
filterGroup.appendChild(input);
 
var label = document.createElement('label');
label.setAttribute('for', layerID);
label.textContent = symbol;
filterGroup.appendChild(label);
 

input.addEventListener('change', function (e) {
map.setLayoutProperty(
layerID,
'visibility',
e.target.checked ? 'visible' : 'none'
);
});
}
});
});

map.on('mousemove', function(e) {
    var states = map.queryRenderedFeatures(e.point, {
      layers: ['vaccine']
    });
  
    if (states.length > 0) {
      document.getElementById('pd1').innerHTML = '<h3><strong>' + states[0].properties.regionname + '</strong></h3><p><strong><em>' + states[0].properties.vaccine + '</strong>% of people vaccinated (with atleast one dose)</em></p>';
    } else {
      document.getElementById('pd1').innerHTML = '<p>Hover over a region!</p>';
    }
  });
  
  map.on('mousemove', function(e) {
    var states = map.queryRenderedFeatures(e.point, {
      layers: ['cases']
    });
  
    if (states.length > 0) {
      document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.regionname + '</strong></h3><p><strong><em>' + states[0].properties.cases + '</strong> Active Cases</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over a region!</p>';
    }
  });
  
  function setMapCases() {
    map.setStyle('mapbox://styles/tony12344674/ckpvfmf0708s517llmkvv4f82');
    document.getElementById('features').style.visibility = "visible";
    document.getElementById('features1').style.visibility = "hidden";
  }
  
  function setMapVaccines() {
    map.setStyle('mapbox://styles/tony12344674/ckpvgkxfr2rbi17nx9hsebglu');
    document.getElementById('features1').style.visibility = "visible";
    document.getElementById('features').style.visibility = "hidden";
  }
  
  function setMapInternational() {
  
  }
  
  function filtervisible() {
    document.getElementById('filter-group').style.visibility = "visible";
  }

  geojson.features.forEach(function(marker) {

    
    var el = document.createElement('div');
    el.className = 'marker';
  

    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.Attendance + '</p></p>' + marker.properties.vaccine + '</p><img src="img/slash.svg" alt="b" id="img3"></p>' + marker.properties.mask + '</p><img src="img/check.svg" alt="b" id="img3"></p>' + marker.properties.Website + '</p>')) // add popups
      .addTo(map);
  });
  var geocoder = new MapboxGeocoder({
    // Initialize the geocoder
    accessToken: mapboxgl.accessToken, 
    mapboxgl: mapboxgl, 
    marker: true, 
    placeholder: 'Search for Local Businesses', 
    bbox: [-114.246184, 50.859237,-113.880238 ,51.190994  ], 
    proximity: {
    longitude: -114.060528,
    latitude: 51.036379
    } 
    });
  map.addControl(geocoder);
  