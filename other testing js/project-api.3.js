/* global $ */

let map;
let infoWindow;
let request;
let service;
let markers = [];


////////////////////////////////////////////////////////////////////
/* global google */

// function initMap() 
//     {
//         let center = { lat: 1.3521, lng: 103.8198 };
//         map_options = {
//             zoom: 12,
//             mapTypeId: google.maps.MapTypeId.ROADMAP,
//             center: center,
//         };
    
        // request = 
        // {
        //     location : center,
        //     radius: 5000,
        //     types: ["cafe"]
        // };
    
        // map_document = document.getElementById('map');
        
        // map = new google.maps.Map(map_document, map_options);
        
        // // loadMarkers();
        
        // infoWindow = new google.maps.InfoWindow();
        // service = new google.maps.places.PlacesService(map);
        
        // service.nearbySearch(request, callback);
    
    
        
    

    
        // another listener for event right click
    //     google.maps.event.addListener(map, "rightclick", function(event)
    //     {
    //         map.setCenter(event.latLng);
    //         clearResults(markers);
            
    //         let request = 
    //         {
    //             location : event.latLng,
    //             radius: 5000,
    //             types: ["cafe"]
    //         };
            
    //         service.nearbySearch(request, callback);
    //     });
    
    // }







function callback(results, status)
{
    if (status === google.maps.places.PlacesServiceStatus.OK)
     {
       for (let i = 0; i < results.length; i++)
       {
         
         markers.push(createMarker(results[i]));
         
        //  initial just to fill in markers of nearby search of cafes as map loads
        //  createMarker(results[i]);
        //  console.log(results[i]);
       }

    //   map.setCenter(results[0].geometry.location);
     }
}




function createMarker(place)
{
    // let placeLoc = place.geometry.location;
    
    let marker = new google.maps.Marker(
        {
            map: map,
            position: place.geometry.location
        });
   
    google.maps.event.addListener(marker, 'click', function() 
    {
           infoWindow.setContent(place.name);
           infoWindow.open(map, this);
    });
    
    
    // when need to use the right click event, we need to return the marker
    return marker;
}





// now to clear markers when we do each right click, we need this function
function clearResults(markers)
{
    for (let i in markers)
    {
        markers[i].setMap(null);
    }
    markers = [];
}



// ONLY FOR WORKS FOR IFRAME WITH SRC
//Set initial map based on user geolocation or Singapore, SG
// let linkKey = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAvZ3qFO3yfx7B69UDRAQN2uPYzekDYZmw";
// let zoom = 11;
// let q = null;
// let defaultLoc = "Singapore, SG";

// let srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;

// $("#map").attr("src", srcContent);

//Change map based on user input in textbox and a click or enter key submission. 
// $(function() {
//     $('#submit').on('keypress click', function(event) {
//         if ($('#address').val().length === 0) {
//             q = defaultLoc;
//         }
//         else {
//             q = $('#address').val();
//             console.log(q)
//         }
//         srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;
//         if (event.which === 10 || event.type === 'click') {
//             $("#inner_map").attr("src", srcContent);
//         }

//         gestureHandling: "greedy";
//     });
// });


    
function search()
{
    bounds: map.getBounds(),
    service = new google.maps.places.PlacesService(map);
    service.textSearch(request, callback);  
}
    







// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 1.3521, lng: 103.8198},
  zoom: 13
});
var card = document.getElementById('pac-card');
var input = document.getElementById('pac-input');
var types = document.getElementById('type-selector');
var strictBounds = document.getElementById('strict-bounds-selector');

map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

var autocomplete = new google.maps.places.Autocomplete(input);

// Bind the map's bounds (viewport) property to the autocomplete object,
// so that the autocomplete requests use the current map bounds for the
// bounds option in the request.
autocomplete.bindTo('bounds', map);

// Set the data fields to return when the user selects a place.
autocomplete.setFields(
    ['address_components', 'geometry', 'icon', 'name']);

var infowindow = new google.maps.InfoWindow();
var infowindowContent = document.getElementById('infowindow-content');
infowindow.setContent(infowindowContent);
var marker = new google.maps.Marker({
  map: map,
  anchorPoint: new google.maps.Point(0, -29)
});

autocomplete.addListener('place_changed', function() {
  infowindow.close();
  marker.setVisible(false);
  var place = autocomplete.getPlace();
  if (!place.geometry) {
    // User entered the name of a Place that was not suggested and
    // pressed the Enter key, or the Place Details request failed.
    window.alert("No details available for input: '" + place.name + "'");
    return;
  }

  // If the place has a geometry, then present it on a map.
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);  // Why 17? Because it looks good.
  }
  marker.setPosition(place.geometry.location);
  marker.setVisible(true);

  var address = '';
  if (place.address_components) {
    address = [
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
    ].join(' ');
  }

  infowindowContent.children['place-icon'].src = place.icon;
  infowindowContent.children['place-name'].textContent = place.name;
  infowindowContent.children['place-address'].textContent = address;
  infowindow.open(map, marker);
});

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
function setupClickListener(id, types) {
  var radioButton = document.getElementById(id);
  radioButton.addEventListener('click', function() {
    autocomplete.setTypes(types);
  });
}

setupClickListener('changetype-all', []);
setupClickListener('changetype-address', ['address']);
setupClickListener('changetype-establishment', ['establishment']);
setupClickListener('changetype-geocode', ['geocode']);

document.getElementById('use-strict-bounds')
    .addEventListener('click', function() {
      console.log('Checkbox clicked! New state=' + this.checked);
      autocomplete.setOptions({strictBounds: this.checked});
    });
}



// google.maps.event.addDomListener(window, 'load', initMap);