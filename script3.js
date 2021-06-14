mapboxgl.accessToken = 'pk.eyJ1IjoidG9ueTEyMzQ0Njc0IiwiYSI6ImNrcHN3dmhvYzBhcWgydWxpNHVndmxyNDQifQ.ki2eqvrz66H1lqsUdYXSUQ';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/tony12344674/ckpw5aawl31cz17orzht1129q'
});

map.on('load', function () {

    alert("This page is a work in progress. The final version would have travel data for every country but the limited time did not allow us to complete this goal. We only have travel data for the U.S and the U.K for now.");
    
    
    });


map.on('mousemove', function(e) {
    var states = map.queryRenderedFeatures(e.point, {
      layers: ['global']
    });
  
    if (states.length > 0) {
      document.getElementById('pd').innerHTML = '<h3><strong>' + states[0].properties.name + '</strong></h3><p><strong><em>' + states[0].properties.cases + '</strong> COVID-19 Cases Per 100,000 Tests</em></p>' + '<strong>Travelling from Canada to Desination:</strong></p>' + states[0].properties.in + '</p><strong>Returning to Canada from destination:</strong></p>' + states[0].properties.out + '</p><strong>Travel advisory in effect, non-essential travel is strongly discouraged</strong>' ;
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over a region!</p>';
    }
  });