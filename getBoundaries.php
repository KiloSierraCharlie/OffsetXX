<?php
  if( !isset( $_GET["callsign"] ) ){ die(); }
  $Boundries = json_decode( file_get_contents( "data/fir-boundaries.json" ), TRUE );
  
  function search( $searchFor ){
    global $Boundries;
    foreach ($Boundries as $k => $v) {
      if ( $v['icao'] === $searchFor ) {
        header('Content-Type: application/json');
        echo json_encode( $v );
        die();
      }
    }
  }
  
  $Nicknames = array(
    "NY" => "KZNY",
    "ATL" => "KZTL",
    "DEN" => "KZDV",
    "LON" => "EGTT",
    "SJU" => "TJZS",
    "TOR" => "CZYZ",
    "HKG" => "VHHK",
    "MSP" => "KZMP",
    "CHI" => "KZAU",
    "JAX" => "KZJX",
    "FTW" => "KZEW",
    "ANC" => "PAZA",
    "HOU" => "KZHU",
    "OAK" => "KZOA"
  );
  
  search( explode( "_", $_GET["callsign"] )[0] . "-" . explode( "_", $_GET["callsign"] )[1] );
  search( explode( "_", $_GET["callsign"] )[0] . "_" . explode( "_", $_GET["callsign"] )[1] );
  search( explode( "_", $_GET["callsign"] )[0] );
  
  if( isset( $Nicknames[explode( "_", $_GET["callsign"] )[0]] ) ){
    search( $Nicknames[explode( "_", $_GET["callsign"] )[0]] . "-" . explode( "_", $_GET["callsign"] )[1] );
    search( $Nicknames[explode( "_", $_GET["callsign"] )[0]] . "_" . explode( "_", $_GET["callsign"] )[1] );
    search( $Nicknames[explode( "_", $_GET["callsign"] )[0]] );
  }
  
  header('Content-Type: application/json');
  echo json_encode( array( "icao"=>"", "isOceanic"=>0, "isExtension"=>0, "points"=>array() ) );