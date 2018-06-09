var map;
var infowindow;

var drawnAircraft = {};

function initMap() {
    map = new google.maps.Map(document.getElementById('VATSIM-MAP'), {
        zoom: 6,
        center: {lat: 39.2108, lng: 35.2661}
    });
    google.maps.event.addListenerOnce( map, "idle", function(){
        map.addListener( "dragend", function(){
            drawLocalAircraft();
            drawLocalAirTraffic();
        });
        map.addListener( "zoom_changed", function(){
            drawLocalAircraft();
            drawLocalAirTraffic();
        });
        setInterval(drawLocalAircraft, 60 * 1000);
        setInterval(drawLocalAirTraffic, 60 * 1000);
        drawLocalAircraft();
        drawLocalAirTraffic();
    });
}

function drawLocalAircraft(){
    
    var bounds = map.getBounds();
    var currentAircraft = [];
    $.getJSON( "/API/getOnlineAircraft.php?ne=" + JSON.stringify( bounds.getNorthEast() ) + "&sw=" + JSON.stringify( bounds.getSouthWest() ), function( data ) {
        $.each( data, function( key, val ){
            
            if( val["groundspeed"] < 100  || val["altitude"] < 3000 ){ return true; }
            
            var Symbol = {
                path: 'M362.985,430.724l-10.248,51.234l62.332,57.969l-3.293,26.145 l-71.345-23.599l-2.001,13.069l-2.057-13.529l-71.278,22.928l-5.762-23.984l64.097-59.271l-8.913-51.359l0.858-114.43 l-21.945-11.338l-189.358,88.76l-1.18-32.262l213.344-180.08l0.875-107.436l7.973-32.005l7.642-12.054l7.377-3.958l9.238,3.65 l6.367,14.925l7.369,30.363v106.375l211.592,182.082l-1.496,32.247l-188.479-90.61l-21.616,10.087l-0.094,115.684',
                scale: 0.04, 
                strokeOpacity: 1,
                color: 'black',
                strokeWeight: 1,
                rotation: parseFloat( val["heading"] ),
            };
            
            if( drawnAircraft[ val["callsign"] ] == undefined ){
            
                drawnAircraft[ val["callsign"] ] = new google.maps.Marker({
                    position: {lat: parseFloat( val["latitude"] ), lng: parseFloat( val["longitude"] )},
                    map: map,
                    icon: Symbol,
                });
                
            }else{
                
                var newPos = new google.maps.LatLng( parseFloat( val["latitude"] ), parseFloat( val["longitude"] ) );
                drawnAircraft[ val["callsign"] ].setPosition( newPos );
                drawnAircraft[ val["callsign"] ].setIcon( Symbol );

            }
            currentAircraft.push( val["callsign"] );
        });
        $.each( data, function( key, val ) {
            if( val["groundspeed"] < 100  || val["altitude"] < 3000 ){ 
                if( !drawnAircraft[ val[ "callsign" ] ] == undefined ){
                    drawnAircraft[ val[ "callsign" ] ].setMap( null );
                    delete drawnAircraft[ val[ "callsign" ] ];
                }
            }
        });
        $.each( drawnAircraft, function( key, val ) {
            if( currentAircraft.indexOf( key ) == -1 ){
                console.log( key );
                drawnAircraft[ key ].setMap( null );
                delete drawnAircraft[ key ];
            }
        });
        
        
    });
    
    
    
}

function drawLocalAirTraffic(){
  
  
  
}