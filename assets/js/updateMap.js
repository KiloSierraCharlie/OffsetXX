var map;
var infowindow;
var aircraft = {};
var ATC = {};
var infowindowHover = false;
var validsuffixes = /.*?(DEL|GND|TWR|DEP|APP|CTR)/;
var VATSIMRatings = [
  "Inactive",
  "Pilot/Observer",
  "Student",
  "Student 2",
  "Senior Student",
  "Controller",
  "Controller 2",
  "Senior Controller",
  "Instructor",
  "Instructor 2",
  "Senior Instructor",
  "Supervisor",
  "Administrator",
]
function initMap() {
  map = new google.maps.Map(document.getElementById('VATSIM-MAP'), {
    zoom: 4,
    center: {lat: 14.8178, lng: 77.8407}
  });
  infowindow = new google.maps.InfoWindow({
    content: "This is a VATSIM pilot, currently connected to the network."
  });
  drawAllAircraft();
  setInterval(drawAllAircraft, 120 * 1000);
}
function drawAllAircraft(){
  $.getJSON( "/getConnected.php", function( data ) {
    var oldAircraft = [];
    var oldATC = [];
    $.each( aircraft, function( key, val ) {
      oldAircraft.push( key );
    });
    $.each( ATC, function( key, val ) {
      oldATC.push( key );
    });

    data.sort(function(a, b){
      var positions = ["DEL", "GND", "TWR", "DEP", "APP", "CTR"];
      a = a["callsign"].split("_")[a["callsign"].split("_").length-1]; 
      b = b["callsign"].split("_")[b["callsign"].split("_").length-1]; 
      if( validsuffixes.test(a) && validsuffixes.test(b) ){
        return positions.indexOf( a ) - positions.indexOf( b );
      }else if( validsuffixes.test(a) ){
        return 1;
      }else{
        return -1;
      }
      
      return ;
    });
    $.each( data, function( key, val ) {
      if( val["clienttype"] == "PILOT" && parseFloat( val["groundspeed"] ) > 50 && parseFloat( val["altitude"] ) > 500 ){
         var Symbol = {
          path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
          scale: 0.0333, 
          strokeOpacity: 1,
          color: 'black',
          strokeWeight: 1,
          rotation: parseFloat(val["heading"]),
          labelOrigin: new google.maps.Point(30,40)
         };
        if( aircraft[ val["callsign"] ] == undefined ){
          aircraft[ val["callsign"] ] = new google.maps.Marker({
            position: {lat: parseFloat( val["latitude"] ), lng: parseFloat( val["longitude"] )},
            map: map,
            icon: Symbol,
            label: {
              text: val["callsign"],
              color: "#000000",
              fontSize: "12px",
              labelStyle: {opacity: 0.75},
              labelStyle: {opacity: 0.75},
            }
          });
          aircraft[ val["callsign"] ].addListener('mouseover', function(event){
            if( !infowindowHover ){
              infowindowHover = true;
              var newContent  = "<center><b>        " + val["callsign"] + "</b></center>";
              infowindow.setContent( newContent );
              infowindow.setPosition(aircraft[ val["callsign"] ].getPosition());
              infowindow.open( map, aircraft[ val["callsign"] ] );
            }
          });
          aircraft[ val["callsign"] ].addListener('mouseout', function(){
            if( infowindowHover ){
              infowindow.close();
              infowindowHover = false;
            }
          });
          aircraft[ val["callsign"] ].addListener('click', function() {
            infowindowHover = false;
            map.setCenter( aircraft[ val["callsign"] ].getPosition() );
            var newContent  = "<center><b>        " + val["callsign"] + "</b></center><br>";
            newContent     += "<table>";
            newContent     += "<tr><td>Pilot:</td><td>" + val["realname"] + " (" + val["cid"] + ")</td></tr>";
            newContent     += "<tr><td>Origin:</td><td>" + val["planned_depairport"] + "</td></tr>";
            newContent     += "<tr><td>Destination:</td><td>" + val["planned_destairport"] + "</td></tr>";
            newContent     += "<tr><td>Altitude:</td><td>" + val["altitude"] + "ft Planned: " + val["planned_altitude"] + "ft</td></tr>";
            newContent     += "<tr><td>Speed:</td><td>" + val["groundspeed"] + "kts Planned: " + val["planned_tascruise"] + "kts</td></tr>";
            newContent     += "<tr><td>Route:</td><td>" + val["planned_route"] + "</td></tr>";
            newContent     += "</table>";
            
            infowindow.setContent( newContent );
            infowindow.open( map, aircraft[ val["callsign"] ] );
          });
        }else{
          var newPos = new google.maps.LatLng( parseFloat( val["latitude"] ), parseFloat( val["longitude"] ) );
          aircraft[ val["callsign"] ].setPosition( newPos );
          aircraft[ val["callsign"] ].setIcon( Symbol );
          oldAircraft.splice( oldAircraft.indexOf( val["callsign"] ), 1 );
        }
      }else if( val["clienttype"] == "ATC" && parseFloat( val["facilitytype"] ) > 0 ){
        if( ATC[ val["callsign"] ] == undefined ){
          switch( val["callsign"].split("_")[val["callsign"].split("_").length-1] ){
            case "DEL":
            case "GND":
              ATC[ val["callsign"] ] = new google.maps.Circle({
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0000FF',
                fillOpacity: 0.35,
                map: map,
                center: {lat: parseFloat(val["latitude"]), lng: parseFloat(val["longitude"])},
                radius: 2.5 * 1852
              });
              ATC[ val["callsign"] ].addListener('mouseover', function(){
                if( !infowindowHover ){
                  infowindowHover = true;
                  var newContent  = "<center><b>        " + val["callsign"] + "</b></center>";
                  infowindow.setContent( newContent );
                  infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                  infowindow.open( map, ATC[ val["callsign"] ] );
                }
              });
              ATC[ val["callsign"] ].addListener('mouseout', function(){
                if( infowindowHover ){
                  infowindow.close();
                  infowindowHover = false;
                }
              });
              ATC[ val["callsign"] ].addListener('click', function() {
                infowindowHover = false;
                map.setCenter( new google.maps.LatLng( ATC[ val["callsign"] ].getCenter().lat(), ATC[ val["callsign"] ].getCenter().lng()) );
                var newContent  = "<center><b>        " + val["callsign"] + "</b></center><br>";
                newContent     += "<table>";
                newContent     += "<tr><td>Controller:</td><td>" + val["realname"] + " (" + val["cid"] + ")</td></tr>";
                newContent     += "<tr><td>Frequency:</td><td>" + val["frequency"] + "</td></tr>";
                newContent     += "<tr><td>Rating:</td><td>" + VATSIMRatings[ val["rating"] ] + "</td></tr>";
                newContent     += "</table>";
                
                infowindow.setContent( newContent );
                infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                infowindow.open( map, ATC[ val["callsign"] ] );
              });
              oldATC.splice( oldATC.indexOf( val["callsign"] ), 1 );
              break;
            case "TWR":
              ATC[ val["callsign"] ] = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: {lat: parseFloat(val["latitude"]), lng: parseFloat(val["longitude"])},
                radius: 7 * 1852
              });
              ATC[ val["callsign"] ].addListener('mouseover', function(){
                if( !infowindowHover ){
                  infowindowHover = true;
                  var newContent  = "<center><b>        " + val["callsign"] + "</b></center>";
                  infowindow.setContent( newContent );
                  infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                  infowindow.open( map, ATC[ val["callsign"] ] );
                }
              });
              ATC[ val["callsign"] ].addListener('mouseout', function(){
                if( infowindowHover ){
                  infowindow.close();
                  infowindowHover = false;
                }
              });
              ATC[ val["callsign"] ].addListener('click', function() {
                infowindowHover = false;
                map.setCenter( new google.maps.LatLng( ATC[ val["callsign"] ].getCenter().lat(), ATC[ val["callsign"] ].getCenter().lng()) );
                var newContent  = "<center><b>        " + val["callsign"] + "</b></center><br>";
                newContent     += "<table>";
                newContent     += "<tr><td>Controller:</td><td>" + val["realname"] + " (" + val["cid"] + ")</td></tr>";
                newContent     += "<tr><td>Frequency:</td><td>" + val["frequency"] + "</td></tr>";
                newContent     += "<tr><td>Rating:</td><td>" + VATSIMRatings[ val["rating"] ] + "</td></tr>";
                newContent     += "</table>";
                
                infowindow.setContent( newContent );
                infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                infowindow.open( map, ATC[ val["callsign"] ] );
              });
              oldATC.splice( oldATC.indexOf( val["callsign"] ), 1 );
              break;
            case "APP":
            case "DEP":
              ATC[ val["callsign"] ] = new google.maps.Circle({
                strokeColor: '#FFF000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FFF000',
                fillOpacity: 0.35,
                map: map,
                center: {lat: parseFloat(val["latitude"]), lng: parseFloat(val["longitude"])},
                radius: 25 * 1852
              });
              ATC[ val["callsign"] ].addListener('mouseover', function(){
                if( !infowindowHover ){
                  infowindowHover = true;
                  var newContent  = "<center><b>        " + val["callsign"] + "</b></center>";
                  infowindow.setContent( newContent );
                  infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                  infowindow.open( map, ATC[ val["callsign"] ] );
                }
              });
              ATC[ val["callsign"] ].addListener('mouseout', function(){
                if( infowindowHover ){
                  infowindow.close();
                  infowindowHover = false;
                }
              });
              ATC[ val["callsign"] ].addListener('click', function() {
                infowindowHover = false;
                map.setCenter( new google.maps.LatLng( ATC[ val["callsign"] ].getCenter().lat(), ATC[ val["callsign"] ].getCenter().lng()) );
                var newContent  = "<center><b>        " + val["callsign"] + "</b></center><br>";
                newContent     += "<table>";
                newContent     += "<tr><td>Controller:</td><td>" + val["realname"] + " (" + val["cid"] + ")</td></tr>";
                newContent     += "<tr><td>Frequency:</td><td>" + val["frequency"] + "</td></tr>";
                newContent     += "<tr><td>Rating:</td><td>" + VATSIMRatings[ val["rating"] ] + "</td></tr>";
                newContent     += "</table>";
                
                infowindow.setContent( newContent );
                infowindow.setPosition(ATC[ val["callsign"] ].getCenter());
                infowindow.open( map, ATC[ val["callsign"] ] );
              });
              oldATC.splice( oldATC.indexOf( val["callsign"] ), 1 );
              break;
            case "CTR":
              $.getJSON( "/getBoundaries.php?callsign=" + val["callsign"], function( data ) {
                var sectorCoords = [];
                $.each( data["points"], function( key, val ) {
                  sectorCoords.push( new google.maps.LatLng( parseFloat( val[0] ), parseFloat( val[1] ) ) );
                })
                ATC[ val["callsign"] ] = new google.maps.Polygon({
                  paths: sectorCoords,
                  strokeColor: '#FF0000',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#FF0000',
                  fillOpacity: 0.35
                });
                ATC[ val["callsign"] ].addListener('mouseover', function(event){
                  if( !infowindowHover ){
                    infowindowHover = true;
                    var newContent  = "<center><b>        " + val["callsign"] + "</b></center>";
                    infowindow.setContent( newContent );
                    infowindow.setPosition(event.latLng);
                    infowindow.open( map, ATC[ val["callsign"] ] );
                  }
                });
                ATC[ val["callsign"] ].addListener('mouseout', function(){
                  if( infowindowHover ){
                    infowindow.close();
                    infowindowHover = false;
                  }
                });
                ATC[ val["callsign"] ].setMap(map);
                ATC[ val["callsign"] ].addListener('click', function(event) {
                  infowindowHover = false;
                  map.setCenter( event.latLng );
                  var newContent  = "<center><b>        " + val["callsign"] + "</b></center><br>";
                  newContent     += "<table>";
                  newContent     += "<tr><td>Controller:</td><td>" + val["realname"] + " (" + val["cid"] + ")</td></tr>";
                  newContent     += "<tr><td>Frequency:</td><td>" + val["frequency"] + "</td></tr>";
                  newContent     += "<tr><td>Rating:</td><td>" + VATSIMRatings[ val["rating"] ] + "</td></tr>";
                  newContent     += "</table>";
                  
                  infowindow.setContent( newContent );
                  infowindow.setPosition( event.latLng );
                  infowindow.open( map, ATC[ val["callsign"] ] );
                });
                oldATC.splice( oldATC.indexOf( val["callsign"] ), 1 );
              });

          }
        }else{
          oldATC.splice( oldATC.indexOf( val["callsign"] ), 1 );
        }
      }
    });
    $.each( oldAircraft, function( key, val ) {
      console.log( val + " has disconnected, landed or crashed, removing!" );
      aircraft[val].setMap( null );
      delete aircraft[val];
    });
    $.each( oldATC, function( key, val ) {
      console.log( val + " has disconnected, removing!" );
      ATC[val].setMap( null );
      delete ATC[val];
    });
  });
}