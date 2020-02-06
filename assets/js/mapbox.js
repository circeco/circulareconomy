
mapboxgl.accessToken = 'pk.eyJ1IjoiY2lyY2VjbyIsImEiOiJjazZhcW9mdm0wN3ZsM29wOXF6bXRwaDhxIn0.iz4i_eSrghnGX02vj7ATDg';

// Add Constant 

const stockholm = [18.072, 59.325];
const denver = [-105.0178157, 39.737925];
const home = denver;

// Add the map to the page 

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/circeco/ck5zjodry0ujw1ioaiqvk9kjs',
    center: [-105.0178157, 39.737925],
    zoom: 13
});

// Load the tilequery 

map.on('load', function () {
    console.log("Map loading...");

    map.addSource('tilequery', {
        type: "geojson",
        data: {
            "type": "FeatureCollection",
            "features": []
        },
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50   // Radius of each cluster when clustering points (defaults to 50)

    });

    // Add map layer 

		map.addSource('museums', {
			type: 'vector',
			url: 'mapbox://circeco.ck69km0681xb02to3wcdvvbss-0mo1s'
			});

        console.log("Map sourching...");
		map.addLayer({
			'id': 'museums',
			'type': 'circle',
			'source': 'museums',
			'layout': {
			'visibility': 'visible'
			},
			'paint': {
			'circle-radius': 8,
			'circle-color': 'rgba(55,148,179,1)'
			},
			'source-layer': 'airports'
			});
        console.log("Map layering ...");
    // define the style for display the data 

    map.addLayer({
        id: "tilequery-points",
        type: "circle",
        source: "tilequery",
        paint: {
            "circle-stroke-color": "white",
            "circle-stroke-width": {
                stops: [
                    [0, 0.1],
                    [18, 3]
                ],
                base: 5
            },
            "circle-radius": {
                stops: [
                    [12, 7],
                    [22, 180]
                ],
                base: 5
            },
            "circle-color": [
                'match',
                ['get', 'STORE_TYPE'],
                'Convenience Store', '#FF8C00',
                'Convenience Store With Gas', '#FF8C00',
                'Pharmacy', '#FF8C00',
                'Specialty Food Store', '#9ACD32',
                'Small Grocery Store', '#008000',
                'Supercenter', '#008000',
                'Superette', '#008000',
                'Supermarket', '#008000',
                'Warehouse Club Store', '#008000',
                '#FF0000' // any other store type
            ]
        }
    });

    // parameters to define for displaying the data

    const radius = 100000;
    var point = home;
    var tileset = 'circeco.ck69ksutg08g02imwptgjxa6d-19vzm';
    var query = 'https://api.mapbox.com/v4/' + tileset + '/tilequery/' + point[0] + ',' + point[1] +
        '.json?radius=' + radius + '&limit=50&access_token=' + mapboxgl.accessToken;

    // fetching the data using ajax method 

    $.ajax({
        method: 'GET',
        url: query,
    }).done(function (data0) {
        map.getSource('tilequery').setData(data0);
    })
});



// Geocoder 

map.on('load', function () {
    var geocoder = new MapboxGeocoder({ // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        zoom: 13, // Set the zoom level for geocoding results
        placeholder: "Enter an address or place name", // This placeholder text will display in the search bar
        bbox: [-105.116, 39.679, -104.898, 39.837] // Set a bounding box
    });
    // Add the geocoder to the map
    map.addControl(geocoder, 'top-left'); // Add the search box to the top left
});

map.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
);

