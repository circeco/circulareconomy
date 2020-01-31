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

map.on('load', function (e) {
    /* Add the data to your map as a layer */
  map.addLayer({
    "id": "locations",
    "type": "symbol",
    /* Add a GeoJSON source containing place coordinates and information. */
    "source": {
      "type": "geojson",
      "data": initiative
    },
    "layout": {
      "icon-image": "za-national-2",
      "icon-allow-overlap": true,
    }
        });

        /**
         * Add all the things to the page:
         * - The location listings on the side of the page
         * - The markers onto the map
        */
        buildLocationList(initiative);
        addMarkers();
      });

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
  });
}