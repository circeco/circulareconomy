/*----------Mapbox code */

mapboxgl.accessToken = 'pk.eyJ1IjoiY2lyY2VjbyIsImEiOiJjazczN3docmowNjMwM2ZwZGFkand4YTUxIn0.0pNRz0t74QkAc6y5shG0BA';

// Define Constants 

const stockholm = [18.072, 59.325];
const home = stockholm;
const myLayers = ['apparel', 'home', 'cycling-sports', 'electronics-books-music']; 

let bounds = [
[15.072078, 58.247414], // Southwest coordinates
[19.180375, 60.008548] // Northeast coordinates
];


// Add the map to the page

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/circeco/ck5zjodry0ujw1ioaiqvk9kjs',
    center: [18.072, 59.325],
    zoom: 10,
    maxBounds: bounds   // Sets bounds as max
});


map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');   // Add zoom and rotation controls to the map


map.on('load', function () {        // Load the tilequery 

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

    map.addSource('home', {      // Add map layer 
        type: 'vector',
        url: 'mapbox://circeco.ck6utkdky0iro2ls4ea12cku4-9rs0u'
    });

    map.addLayer({              // define the style for display the data 
        id: 'home',
        type: 'circle',
        source: 'home',
        'source-layer': 'home',
        'layout': {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 5,
            "circle-color": [
                'match',
                ['get', 'STORE_TYPE'],
                'reuse', '#FF5252',
                'recycle', 'rgb(69, 129, 142)',
                'refuse', '#FF8C00',
                'rethink', '#9ACD32',
                'remake', '#008000',
                'repair', '#008000',
                'rgb(69, 129, 142)' // any other type
            ]
        },
    });


    map.addSource('apparel', {        // Add map layer 
        type: 'vector',
        url: 'mapbox://circeco.ck6tfz7pg09ir2llh3r0k51sw-7yihy',
    });

    map.addLayer({                  // define the style for display the data 
        id: 'apparel',
        type: 'circle',
        source: 'apparel',
        'source-layer': 'apparel',
        'layout': {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 5,
            "circle-color": [
                'match',
                ['get', 'STORE_TYPE'],
                'reuse', '#FF5252',
                'recycle', 'rgb(69, 129, 142)',
                'refuse', '#FF8C00',
                'rethink', '#9ACD32',
                'remake', '#008000',
                'repair', '#008000',
                'rgb(69, 129, 142)' // any other type
            ]
        },
    });

    map.addSource('electronics-books-music', {        // Add map layer 
        type: 'vector',
        url: 'mapbox://circeco.ck734j37i04g42kmu1h0oqvkd-7yswd',
    });

    map.addLayer({                  // define the style for display the data 
        id: 'electronics-books-music',
        type: 'circle',
        source: 'electronics-books-music',
        'source-layer': 'electronics-books-music',
        'layout': {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 5,
            "circle-color": [
                'match',
                ['get', 'STORE_TYPE'],
                'reuse', '#FF5252',
                'recycle', 'rgb(69, 129, 142)',
                'refuse', '#FF8C00',
                'rethink', '#9ACD32',
                'remake', '#008000',
                'repair', '#008000',
                'rgb(69, 129, 142)' // any other type
            ]
        },
    });

    map.addSource('cycling-sports', {        // Add map layer 
        type: 'vector',
        url: 'mapbox://circeco.ck7357fhw00cz2lphq8pl19l6-7kbhr',
    });

    map.addLayer({                  // define the style for display the data 
        id: 'cycling-sports',
        
        type: 'circle',
        source: 'cycling-sports',
        'source-layer': 'cycling-sports',
        'layout': {
            'visibility': 'visible'
        },
        paint: {
            'circle-radius': 5,
            "circle-color": [
                'match',
                ['get', 'STORE_TYPE'],
                'reuse', '#FF5252',
                'recycle', 'rgb(69, 129, 142)',
                'refuse', '#FF8C00',
                'rethink', '#9ACD32',
                'remake', '#008000',
                'repair', '#008000',
                'rgb(69, 129, 142)' // any other type
            ]
        },
    });

});


// Define pop up box for the map 

let allFeatures = [];

function popUp(e) {
    const currentFeature = e.features[0];
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const props = currentFeature.properties

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML('<h4>' + props['STORE_NAME'] + '</h4>' +
            '<p>' + props['STORE_TYPE'] + '</p>' +
            '<a target=”_blank” href="http://' + props['WEB'] + '">' + props.WEB + '</a>')
        .addTo(map)
};

// On page load 
/* using the idle event when the map is loading to set up features for the listing queryRenderedFeatures 
return features in one source layer in the vector source */

map.on('idle', function () {
    allFeatures = map.queryRenderedFeatures({ layers: myLayers });
    console.log("idle features: ", allFeatures);
    buildLocationList(allFeatures);

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties. Done with the loop. 

    for (let aLayer of myLayers){
        map.on ('click', aLayer, popUp); 

        map.on ('mouseenter', aLayer, function (){
           map.getCanvas().style.cursor = 'pointer'; 
        });     // Change the cursor to a pointer when the mouse is over the places layer.

        map.on('mouseleave', aLayer, function () {
        map.getCanvas().style.cursor = '';
        });     // Change it back to a pointer when it leaves.
    }
});


// Build listing

const listings = document.getElementById('listings');

function buildLocationList(features) { 

    console.log("buildLocationList ", features);

    listings.innerHTML = '';   /* listing only what can be seen in the map */

    features.forEach(function (feature, i) {

        var prop = feature.properties;

        /* Add a new listing section to the sidebar. */

        var listing = listings.appendChild(document.createElement('div'));
        /* Assign a unique `id` to the listing. */
        listing.id = "listing-" + i;
        /* Assign the `item` class to each listing for styling. */
        listing.className = 'item';

        /* Add the link to the individual listing created above. */
        var link = listing.appendChild(document.createElement('div'));
        link.href = '#';
        link.className = 'stockholmlist';
        link.id = "link-" + i;
        link.innerHTML = prop['STORE_NAME'];

        /* Add details to the individual listing. */
        var details = listing.appendChild(document.createElement('h6'));
        details.innerHTML = prop['ADDRESS_LINE1'];

        var details = listing.appendChild(document.createElement('p'));
        details.innerHTML = prop['DESCRIPTION'];
        
        /*add event listener for lisitng*/
        listing.addEventListener('click', function () {
            flyToStore(feature);
            createPopUp(feature);
        });
    });
}


// Search box that filter the results to display in the listing 
const filterBox = document.getElementById('feature-filter');

filterBox.addEventListener('keyup', function (event) {
    const typedValue = event.target.value.trim().toLowerCase();
    function searchBox(feature) {
        const descri = feature.properties['DESCRIPTION'].trim().toLowerCase();
        const storeName = feature.properties['STORE_NAME'].trim().toLowerCase();
        return descri.indexOf(typedValue) >= 0 || storeName.indexOf(typedValue) >= 0;
    }

    const filtered = allFeatures.filter(searchBox);

    buildLocationList(filtered);
});


//Fly to store effect 

function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 14
    });
}

// Create a pop up box for the listing 
function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h4>' + currentFeature.properties['STORE_NAME'] + '</h4>' +
            '<p>' + currentFeature.properties['STORE_TYPE'] + '<p>' +
            '<a target=”_blank” href="http://' + currentFeature.properties['WEB'] + '">' + currentFeature.properties.WEB + '</a>')
        .addTo(map);
}


// Toggleable hide and show layers 

var toggleableLayerIds = ['apparel', 'home', 'cycling-sports', 'electronics-books-music'];

for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('selectlayers');
    layers.appendChild(link);
}


