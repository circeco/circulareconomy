
// This will let you use the .remove() function later on

if (!('remove' in Element.prototype)) {
Element.prototype.remove = function() {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
    }
};
}


mapboxgl.accessToken = 'pk.eyJ1IjoiY2lyY2VjbyIsImEiOiJjazRmZnBqbDAwbHpmM3RvMjhvOTdlbGJlIn0.fb-zFM7RFrt7rCUzE-TsyA';


/*------------add the map to the page*/

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/circeco/ck5zjodry0ujw1ioaiqvk9kjs',
  center: [18.072, 59.325],
  zoom: 11
});


/*------------add the data*/

var initiative = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                18.068,
                59.327
              ]
            },
            "properties": {
              "CircAction": "Refuse",
              "Name": "Refuse Shop",
              "address": "Slottskajen 2",
              "place": "Gamla Stan",
              "country": "Sweden",
              "city": "Stockholm",
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                18.073,
                59.322
              ]
            },
            "properties": {
              "CircAction": "Reuse",
              "Name": "SecondHand Shop",
              "address": "Slussplan 5",
              "place": "Gamla Stan",
              "country": "Sweden",
              "city": "Stockholm",
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                18.079,
                59.336
              ]
            },
            "properties": {
              "CircAction": "Recycle",
              "Name": "Re-Cycle Shop",
              "address": "Nybrogatan 28",
              "place": "Östermalm",
              "country": "Sweden",
              "city": "Stockholm",
            }
          },
        ]
      };

/*---------------Assign to each initiative an id*/

initiative.features.forEach(function(initiative, i){
initiative.properties.id = i;
});

      /**
       * Wait until the map loads to make changes to the map.
      */
      map.on('load', function (e) {
        /** 
         * This is where your '.addLayer()' used to be, instead
         * add only the source without styling a layer
        */
        map.addSource("places", {
          "type": "geojson",
          "data": stores
        });

        /**
         * Add all the things to the page:
         * - The location listings on the side of the page
         * - The markers onto the map
        */
        buildLocationList(initiative);
        addMarkers();
    });

      /**
       * Add a marker to the map for every store listing.
      **/
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        stores.features.forEach(function(marker) {
          /* Create a div element for the marker. */
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = "marker-" + marker.properties.id;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';
          
          /**
           * Create a marker using the div element
           * defined above and add it to the map.
          **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked store
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          el.addEventListener('click', function(e){
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            var activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById('listing-' + marker.properties.id);
            listing.classList.add('active');
          });
        });
      }

function buildLocationList(data) {
  data.features.forEach(function(initiative, i){
    /**
     * Create a shortcut for `initiative.properties`,
     * which will be used several times below.
    **/
    var prop = initiative.properties;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = "listing-" + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';

    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'stockholmlist';
    link.id = "link-" + prop.id;
    link.innerHTML = prop.address;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;
    if (prop.phone) {
      details.innerHTML += ' · ' + prop.phoneFormatted;
    }

        /**
         * Listen to the element and when it is clicked, do four things:
         * 1. Update the `currentFeature` to the store associated with the clicked link
         * 2. Fly to the point
         * 3. Close all other popups and display popup for clicked store
         * 4. Highlight listing in sidebar (and remove highlight for all other listings)
         **/
        link.addEventListener('click', function(e){
        for (var i=0; i < data.features.length; i++) {
            if (this.id === "link-" + data.features[i].properties.id) {
            var clickedListing = data.features[i];
            flyToStore(clickedListing);
            createPopUp(clickedListing);
            }
        }
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
            activeItem[0].classList.remove('active');
        }
        this.parentNode.classList.add('active');
        });
    });
}

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
var popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat(currentFeature.geometry.coordinates)
    .setHTML('<h3>Sweetgreen</h3>' +
    '<h4>' + currentFeature.properties.address + '</h4>')
    .addTo(map);
}