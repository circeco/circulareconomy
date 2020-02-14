mapboxgl.accessToken = 'pk.eyJ1IjoiY2lyY2VjbyIsImEiOiJjazZhcW9mdm0wN3ZsM29wOXF6bXRwaDhxIn0.iz4i_eSrghnGX02vj7ATDg';

// Define Constants 

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

    map.addSource('museums', {      // Add map airport layer 
        type: 'vector',
        url: 'mapbox://circeco.ck69km0681xb02to3wcdvvbss-0mo1s'
    });

    map.addLayer({              // define the style for display the data 
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


    map.addSource('shops', {        // Add map shop layer 
        type: 'vector',
        url: 'mapbox://circeco.ck69ksutg08g02imwptgjxa6d-19vzm',
    });

    map.addLayer({                  // define the style for display the data 
        id: 'shops',
        type: 'circle',
        source: 'shops',
        'source-layer': 'food_stores',
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

});


// Add list of shops next to the map 
/* using the idle event when the map is loading to set up features for the listing queryRenderedFeatures 
return features in one source layer in the vector source */

let allFeatures = [];

map.on('idle', function () {
    allFeatures = map.queryRenderedFeatures({ layers: ['shops'] });
    console.log("idle features: ", allFeatures);
    buildLocationList(allFeatures);

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on('click', 'shops', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML('<h4>' + currentFeature.properties['STORE_NAME'] + '</h4>' +
                    '<h3>' + currentFeature.properties['ADDRESS_LINE1'] + '</h3>')
            .addTo(map);

        new mapboxgl.Popup()
            .setLngLat(geometry.coordinates)
            .setHTML('<h4>' + properties['STORE_NAME'] + '</h4>' +
                '<h3>' + properties['ADDRESS_LINE1'] + '</h3>')
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'shops', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'shops', function () {
        map.getCanvas().style.cursor = '';
    });

});

const listings = document.getElementById('listings');

function buildLocationList(features) {          // Build listing

    console.log("buildLocationList ", features);

    listings.innerHTML = ''; /* listing only what can be seen in the map */

    features.forEach(function (feature, i) {

        /**
         * Create a shortcut for `shop.properties`,
         * which will be used several times below.
         **/
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
        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = prop['ADDRESS_LINE1'];

        listing.addEventListener('click', function () {
            flyToStore(feature);
            createPopUp(feature);
        });
    });
}


const filterBox = document.getElementById('feature-filter');

filterBox.addEventListener('keyup', function (event) {
    const typedValue = event.target.value.trim().toLowerCase();
    console.log("Field is now: ", typedValue);
    console.log("allFeatures: ", allFeatures);
    const filtered = allFeatures.filter(function (feature) {
        const storeName = feature.properties['STORE_NAME'].trim().toLowerCase();
        return storeName.indexOf(typedValue) >= 0
    });

    console.log("Filtered: ", filtered);
    buildLocationList(filtered);
});



/**
 * Use Mapbox GL JS's `flyTo` to move the camera smoothly
 * a given center point.
 **/
function flyToStore(currentFeature) {
    map.flyTo({
        center: currentFeature.geometry.coordinates,
        zoom: 15
    });
}

/**
 * Create a Mapbox GL JS `Popup`.
 **/
function createPopUp(currentFeature) {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var popup = new mapboxgl.Popup({ closeOnClick: true })
        .setLngLat(currentFeature.geometry.coordinates)
        .setHTML('<h4>' + currentFeature.properties['STORE_NAME'] + '</h4>' +
            '<h3>' + currentFeature.properties['ADDRESS_LINE1'] + '</h3>')
        .addTo(map);
}




// Toggleable hide and show layers 

var toggleableLayerIds = ['shops', 'museums'];

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


