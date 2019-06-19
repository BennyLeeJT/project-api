/* global $ */

let map;
let infoWindow;
let request;
let service;
let markers = [];



// start out with filter features set to false, so no filtering happens by default
var filters = { shower: false, vault: false, flush: false }

$(function() {
    $('input[name=filter]').change(function(e) {
        map_filter(this.id);
        filter_markers()
    });


})

var get_set_options = function() {
    ret_array = []
    for (option in filters) {
        if (filters[option]) {
            ret_array.push(option)
        }
    }
    return ret_array;
}

var filter_markers = function() {
    set_filters = get_set_options()

    // for each marker, check to see if all required options are set
    for (i = 0; i < markers.length; i++) {
        marker = markers[i];

        // start the filter check assuming the marker will be displayed
        // if any of the required features are missing, set 'keep' to false
        // to discard this marker
        keep = true
        for (opt = 0; opt < set_filters.length; opt++) {
            if (!marker.properties[set_filters[opt]]) {
                keep = false;
            }
        }
        marker.setVisible(keep)
    }
}

var map_filter = function(id_val) {
    if (filters[id_val])
        filters[id_val] = false
    else
        filters[id_val] = true
}


// after the geojson is loaded, iterate through the map data to create markers
// and add the pop up (info) windows
function loadMarkers() {
    console.log('creating markers')
    var infoWindow = new google.maps.InfoWindow()
    geojson_url = 'https://raw.githubusercontent.com/gizm00/blog_code/master/appendto/python_maps_2/collection.geojson'
    $.getJSON(geojson_url, function(result) {
        // Post select to url.
        data = result['features']
        $.each(data, function(key, val) {
            var point = new google.maps.LatLng(
                parseFloat(val['geometry']['coordinates'][1]),
                parseFloat(val['geometry']['coordinates'][0]));
            var titleText = val['properties']['title']
            var descriptionText = val['properties']['description']
            var marker = new google.maps.Marker({
                position: point,
                title: titleText,
                map: map,
                properties: val['properties']
            });

            var markerInfo = "<div><h3>" + titleText + "</h3>Amenities: " + descriptionText + "</div>"


            marker.addListener('click', function() {
                $('#campground_info').html(markerInfo);
            });
            markers.push(marker);

        });
    });
}

////////////////////////////////////////////////////////////////////
/* global google */
function initMap() 
    {
        let center = { lat: 1.3521, lng: 103.8198 };
        map_options = {
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: center,
        };
    
        request = 
        {
            location : center,
            radius: 5000,
            types: ["cafe"]
        };
    
    map_document = document.getElementById('map');
    
    map = new google.maps.Map(map_document, map_options);
    
    // loadMarkers();
    
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    
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
            types: ["cafe"]
        };
        
        service.nearbySearch(request, callback);
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
 
google.maps.event.addDomListener(window, 'load', initMap);
