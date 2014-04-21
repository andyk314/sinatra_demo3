var rendererOptions = {
  draggable: false
};

var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map, pos, myLatlng, geocoder, input, current_address;

function initialize() {
        
  // Create an array of styles
  var style_array_from_above_here = [
    {
        "featureType": "water",
        "stylers": [
            {
                "color": "#19a0d8"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "weight": 6
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#e85113"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -40
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon"
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "color": "#efe9e4"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": -100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "hue": "#11ff00"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "lightness": 100
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#4cff00"
            },
            {
                "saturation": 58
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f0e4d3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#efe9e4"
            },
            {
                "lightness": -10
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    }
] // End of style array

 

  // Map Settings
  myLatlng = new google.maps.LatLng(33.6753069, -117.80);
  myLatlng = new google.maps.LatLng(33.6753069, -117.80);
  var mapOptions = {
    center: myLatlng,
    zoom: 9,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: style_array_from_above_here
  };


  // Geolocation
  geocoder = new google.maps.Geocoder();
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude);
      codeLatLng(pos);
      console.log("Current Location: " + pos);
    });
  }

  // Map creation
  map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

  // Show Text Directions on Side Panel
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('directionsPanel'));

  // Info Window content
  var contentString = '<div id="content">' + 'My House' + '</div>';

  // Info Window
  var infowindow = new google.maps.InfoWindow({
  content: contentString
  });

} // End of Initializer function

// Load google maps on window load
google.maps.event.addDomListener(window, 'load', initialize);

// Reverse Geocoder to convert current location coordinates to string location
function codeLatLng(current_location) {
  input = current_location;
  var lat = parseFloat(input['k']);
  var lng = parseFloat(input['A']);
  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        current_address = results[0].formatted_address;
        console.log("Current Address: " + current_address);
    } else {
      alert('Geocoder failed due to: ' + status);
    }calcRoute(current_address);
  });
}

// Calculate Route from Current Location to Santa Monica
function calcRoute(address) {
  var request = {
    origin: address,
    destination: '1520 2nd Street Santa Monica, CA 90401',
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);


