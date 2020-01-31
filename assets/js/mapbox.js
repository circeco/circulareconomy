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
});