/* global $ */
/* global google */
/* global initialize */
/* global infowindow */
/* global marker */

let map;
let infoWindow;

let request;
let service;
let markers = [];
let currentSelectedMode;

google.maps.event.addDomListener(window, 'load', initMap);

function initMap() {
    let singapore = { lat: 1.3521, lng: 103.8198 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: singapore,
    });
    
    function supermarket() {
        infowindow.open(map, marker);
    }
    $('#button1').click(function(load) {

        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Supermarkets",
            request = {
                location: singapore,
                radius: 5000,
                types: ['supermarket']
            };

        clearResults(markers);

        currentSelectedMode = 'supermarket';
        service.nearbySearch(request, callback);


    });

    $('#button2').click(function(load) {
        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Meal Deliveries",
            request = {
                location: singapore,
                radius: 5000,
                types: ['meal_delivery']
            };
        clearResults(markers);

        currentSelectedMode = 'meal_delivery';
        service.nearbySearch(request, callback);

    });

    $('#button3').click(function(load) {
        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Meal Takeaways",
            request = {
                location: singapore,
                radius: 5000,
                types: ['meal_takeaway']
            };
        clearResults(markers);

        currentSelectedMode = 'meal_takeaway';
        service.nearbySearch(request, callback);

    });

    $('#button6').click(function(load) {
        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Shopping Malls",
            request = {
                location: singapore,
                radius: 5000,
                types: ['shopping_mall']
            };
        clearResults(markers);

        currentSelectedMode = 'mall';
        service.nearbySearch(request, callback);

    });

    $('#button4').click(function(load) {
        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Cafes",
            request = {
                location: singapore,
                radius: 5000,
                types: ['cafe']
            };
        clearResults(markers);

        currentSelectedMode = 'cafe';
        service.nearbySearch(request, callback);

    });

    $('#button5').click(function(load) {
        document.getElementById('display_filter_selection_id').innerHTML = "You have selected : Restaurants",
            request = {
                location: singapore,
                radius: 5000,
                types: ['restaurant']
            };
        clearResults(markers);

        currentSelectedMode = 'restaurant';
        service.nearbySearch(request, callback);

    });


    infoWindow = new google.maps.InfoWindow();

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);



    google.maps.event.addListener(map, 'rightclick', function(event) {
        // console.log(event);
        map.setCenter(event.latLng);
        clearResults(markers);

        if (currentSelectedMode == 'supermarket') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['supermarket'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }

        if (currentSelectedMode == 'meal_delivery') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['meal_delivery'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }


        if (currentSelectedMode == 'meal_takeaway') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['meal_takeaway'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }


        if (currentSelectedMode == 'mall') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['mall'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }

        if (currentSelectedMode == 'cafe') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['cafe'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }

        if (currentSelectedMode == 'restaurant') {
            let request = {
                location: event.latLng,
                radius: 5000,
                types: ['restaurant'],
                fields: ['basic', 'contact', 'atmosphere']
            };
            service.nearbySearch(request, callback);
        }
    })








    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                markers.push(createMarker(results[i]));
            }
        }
    }

    function createMarker(place) {
        // console.log(place);
        let placeLoc = place.geometry.location;
        let marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            fields: ['basic', 'contact', 'atmosphere']
        });

        google.maps.event.addListener(marker, 'click', function() {
            console.log(place);


            let display = {};
            
            display.name = place.name;
            
            if (place.rating === undefined) {
                display.rating = 'No Available Ratings';
            }
            else {
                display.rating = place.rating;
            }



            if (place.price_level === undefined) {
                display.price_level = 'No Available Pricing';
            }
            else {
                display.price_level = place.price_level;
            }


            
            if (place.vicinity === undefined) {
                display.vicinity = 'No Available Address';
            }
            else {
                display.vicinity = place.vicinity;
                console.log(display.vicinity)
            }
            
            
            
            // if (place.photos === undefined) {
            //     display.photo = 'Not Available';

            // }
            // else {
            //     display.photo = place.photos[0].getUrl()
            // }            
            
            
            

            let content = `<h3>${display.name}</h3>
            <p>Address: ${display.vicinity}</p>
            <p>Rating: ${display.rating}</p>
            <p>Price Level: ${display.price_level}</p>`;

            // removed from content
            // <p><img id="img" src="${display.photo}"></p>

            infoWindow.setContent(place.name);
            infoWindow.setContent(place.place_id);
            infoWindow.setContent(content);
            infoWindow.open(map, this);

        });



        return marker;


    }


    function clearResults(markers) {
        for (let m in markers) {
            markers[m].setMap(null);
        }
        markers = [];

    }
    
// can't use two call backs, the latter one will overwrite the former function. separately initAutocomplete can work on its own here.
// initAutocomplete() 


}



// function initAutocomplete() {
//         let map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 1.3521, lng: 103.8198},
//           zoom: 11,
//           mapTypeId: 'roadmap'
//         });

//         // Create the search box and link it to the UI element.
//         let input = document.getElementById('pac-input');
//         let searchBox = new google.maps.places.SearchBox(input);
//         map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//         // Bias the SearchBox results towards current map's viewport.
//         map.addListener('bounds_changed', function() {
//           searchBox.setBounds(map.getBounds());
//         });

//         let markers = [];
//         // Listen for the event fired when the user selects a prediction and retrieve
//         // more details for that place.
//         searchBox.addListener('places_changed', function() {
//           let places = searchBox.getPlaces();

//           if (places.length == 0) {
//             return;
//           }

//           // Clear out the old markers.
//           markers.forEach(function(marker) {
//             marker.setMap(null);
//           });
//           markers = [];

//           // For each place, get the icon, name and location.
//           let bounds = new google.maps.LatLngBounds();
//           places.forEach(function(place) {
//             if (!place.geometry) {
//               console.log("Returned place contains no geometry");
//               return;
//             }
//             let icon = {
//               url: place.icon,
//               size: new google.maps.Size(71, 71),
//               origin: new google.maps.Point(0, 0),
//               anchor: new google.maps.Point(17, 34),
//               scaledSize: new google.maps.Size(25, 25)
//             };

//             // Create a marker for each place.
//             markers.push(new google.maps.Marker({
//               map: map,
//               icon: icon,
//               title: place.name,
//               position: place.geometry.location
//             }));

//             if (place.geometry.viewport) {
//               // Only geocodes have viewport.
//               bounds.union(place.geometry.viewport);
//             } else {
//               bounds.extend(place.geometry.location);
//             }
//           });
//           map.fitBounds(bounds);
//         });
//       }