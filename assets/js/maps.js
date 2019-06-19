  // GOOGLE MAP API STEP 2 - create function
    function initMap()
    {
       // GOOGLE MAP API STEP 3 - create varaible to store coordinates
     let map = new google.maps.Map(document.getElementById("map"),
     {
      zoom : 11,
      center: 
      {
        lat: 1.3521, 
        lng: 103.8198
      }
     }); 
    
    
    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    let locations =
    [
      {lat: 40.785091, lng: -73.968285},
      {lat: 4.5353, lng: 114.7277},
      {lat: 15.8700, lng: 100.9925}
    ];
    
    let markers = locations.map(function(location, i)
    {
      return new google.maps.Marker
      ({
        position: locations,
        label: labels[i % labels.length]
      });
    });
    
    var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
}