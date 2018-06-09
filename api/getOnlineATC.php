<?php
require( __DIR__ . "/../assets/lib/DataHandler/DataHandler.php" );
require( __DIR__ . "/../assets/lib/PointInPolygon/PointInPolygon.php" );

$vDH = new \VATSIM\DataHandler( __DIR__ . "/../assets/data/" );
$pL = new \Coordinate\pointLocation();

header( "Content-Type: application/json" );

if( isset( $_GET[ "ne" ] ) && isset( $_GET[ "sw" ] ) ){
    
    $ne = array( "x" => json_decode( $_GET[ "ne" ], true )[ "lat" ], "y" => json_decode( $_GET[ "ne" ], true )[ "lng" ] );
    $nw = array( "x" => json_decode( $_GET[ "ne" ], true )[ "lat" ], "y" => json_decode( $_GET[ "sw" ], true )[ "lng" ] );
    $sw = array( "x" => json_decode( $_GET[ "sw" ], true )[ "lat" ], "y" => json_decode( $_GET[ "sw" ], true )[ "lng" ] );
    $se = array( "x" => json_decode( $_GET[ "sw" ], true )[ "lat" ], "y" => json_decode( $_GET[ "ne" ], true )[ "lng" ] );
    
    $localATC = array();
    foreach( $vDH->getAirTraffic() as $ATC ){
        
        if( $pL->pointInPolygon( array( "x" => $ATC->latitude, "y" => $ATC->longitude ), array( $ne, $nw, $sw, $se ) ) != "outside" ){
        
            array_push( $localATC, $ATC );
        
        }
        
    }
    
    echo json_encode( $localATC );
    
}else{

    echo json_encode( $vDH->getAirTraffic() );
    
}
?>