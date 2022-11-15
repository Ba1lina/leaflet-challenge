function createMap(bikeStations) {

    // Create the tile layer that will be the background of our map.
    let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMaps = {
      "Street Map": streetmap
    };
  
    // Create an overlayMaps object to hold the bikeStations layer.
    let overlayMaps = {
      "Significant Earthquakes": eventMarkers
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 3,
      layers: [streetmap, eventMarkers]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
  }
  
  function createMarkers(response) {
  
    // Pull the "stations" property from response.data.
    let events = response.metadata.feature;
  
    // Initialize an array to hold bike markers.
    let eventMarkers = [];
  
    // Loop through the stations array.
    for (let index = 1; 10; index++) {
      let event = events[index];
  
      // For each station, create a marker, and bind a popup with the station's name.
      let eventMarker = L.marker(feature.geometry.coordinates[2])
        .bindPopup("<h3>Alert: " + event + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      eventMarkers.push(eventMarker);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(eventMarkers));
  }
  
  
  // Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(createMarkers);
  