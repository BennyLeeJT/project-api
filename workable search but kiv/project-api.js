// sanity check, all good
// alert("JS working");

/* global google */
/* global infoWindow */
/* global navigator */
/* global $ */


let infoWindow = null;
let linkKey = "https://www.google.com/maps/embed/v1/search?key=AIzaSyAvZ3qFO3yfx7B69UDRAQN2uPYzekDYZmw";
let zoom = 12;
let q = null;
let defaultLoc = "Singapore, SG";
let request;
let markers = [];

// GOOGLE MAP API STEP 5 - map id spotted in step 4 without declaration
// create in global scope, and remember to declare id in html element after this
let map = null;

// GOOGLE MAP API STEP 10 - create empty service variable in global scope
let service = null;


// GOOGLE MAP API STEP 2 - create function
// used in the callback under script src in html
function initMap() 
{
    // GOOGLE MAP API STEP 3 - create varaible to store coordinates
    let center = { lat: 1.3521, lng: 103.8198 };

    map_options = 
    {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center,
    };

    // request = 
    // {
    //     location: center,
    //     radius: 5000,
    //     types: ["cafe"]
    // };


    // let variableLocation = new google.maps.LatLng(1.3521, 103.8198);

    // GOOGLE MAP API STEP 4 - create the map itself
    //   map = new google.maps.Map(
    //   document.getElementById('map'), {center: variableLocation, zoom: 12});

    map_document = document.getElementById('map');
    
    map = new google.maps.Map(map_document, map_options);

    // loadMarkers();

    // for displaying user location saying location found if user deveice enable google to track location
    infoWindow = new google.maps.InfoWindow();



    // for finding and displaying user location saying location found if user deveice enable google to track location
    if (navigator.geolocation) 
    {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Current location found');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    }
    else 
    {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    
    
    

    // GOOGLE MAP API STEP 8 - create a variable for request
    // let request = 
    // {
    //  query: "woodlands mrt",
    //  fields: ["name", "geometry"],
    // };

    // GOOGLE MAP API STEP 9 - create a search service. we see service variable here, so next will have to create the service varaible
    // service = new google.maps.places.PlacesService(map);




    service.nearbySearch(request, callback);
    
    
    // another listener for event right click
    google.maps.event.addListener(map, "rightclick", function(event)
    {
        map.setCenter(event.latLng);
        clearResults(markers);
        
        let request = 
        {
            location : event.latLng,
            radius: 5000,
            types: ["restaurant"]
        };
        
        // service.nearbySearch(request, callback);
    });
        
        
        
    // GOOGLE MAP API STEP 11 - these are google default terms and names, to copy paste and use them. we see createMarker function here. next will have to create this function, outside of the initMap function
    service.findPlaceFromQuery(request, function(results, status)
    {
      if (status === google.maps.places.PlacesServiceStatus.OK)
      {
        for (let i = 0; i < results.length; i++)
        {
          createMarker(results[i]);
          console.log(results[i]);
        }

        map.setCenter(results[0].geometry.location);
      }
    });


}




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




// GOOGLE MAP API STEP 12 - create the function and marker variable
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











function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}



//Get users geolocation
if (navigator.geolocation) {
    q = navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);

    function handleGetCurrentPosition(location) {
        location.coords.latitude;
        location.coords.longitude;
    }

    function onError() {
        q = defaultLoc;
    }
}


//Set initial map based on user geolocation or Singapore, SG
let srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;
$("#map").attr("src", srcContent);

//Change map based on user input in textbox and a click or enter key submission. 
$(function() {
    $('#submit').on('keypress click', function(e) {
        if ($('#address').val().length === 0) {
            q = defaultLoc;
        }
        else {
            q = $('#address').val();
        }
        srcContent = linkKey + "&q=" + q + "&zoom=" + zoom;
        if (e.which === 10 || e.type === 'click') {
            $("#map").attr("src", srcContent);
        }

        gestureHandling: "greedy";
    });
});



google.maps.event.addDomListener(window, 'load', initMap);



// function change_div() {
//     if (document.getElementByClass("map_class_div")) 
//     {
//         document.getElementByClass("map_class_div").id = "map";
//         document.getElementByClass("map_class_id").id = "";
//     } 
    
//     else 
//     {
//         document.getElementByClass("map_class_id").id = "map";
//         document.getElementByClass("map_class_div").id = "";
//     }
// }