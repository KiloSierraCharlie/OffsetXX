<?php

$VATSIMData = explode( "\n", file_get_contents( "data/vatsim-data.txt" ) );

$Connected = array();
$ConnectedFormatting = array();

$GotClients = FALSE;

foreach( $VATSIMData as $rownum=>$line ){
  if( !$GotClients ){
    if( preg_match('/!CLIENTS section/', $line ) ){
      foreach( explode( ":", $line ) as $heading ){
        if( preg_match('/!CLIENTS section/', $heading ) ){ array_push( $ConnectedFormatting, explode( "         ", $heading )[1] ); continue; }
        if( $heading == "\r" ){ continue; }
        array_push( $ConnectedFormatting, $heading );
      }
    }
    if( preg_match('/!CLIENTS:/', $line ) ){ $GotClients = TRUE; continue; }
  }else{
    if( $line == ";" and $VATSIMData[ $rownum+1 ] == ";" ){ break; }
    $curline = explode( ":", $line );
    $data = array();
    foreach( $ConnectedFormatting as $headingnum=>$heading ){
      
      $data[ $heading ] = $curline[ $headingnum ];
      
    }
    array_push( $Connected, $data );
  }
}

if( !file_exists( "data/member-data-" . date( "W-Y" ) . ".json" ) ){
  file_put_contents( "data/member-data-" . date( "W-Y" ) . ".json", "[]" );
}
$CurLog = json_decode( file_get_contents( "data/member-data-" . date( "W-Y" ) . ".json" ), TRUE );
$onlineCIDs = array();
foreach( $Connected as $client ){
  if( !preg_match( "/.*?_(DEL|GND|TWR|DEP|APP|CTR|FSS)/", $client["callsign"] ) ){continue;}
  if( !$client["clienttype"] == "ATC" ){continue;}
  array_push( $onlineCIDs, $client["cid"] );
  
  $y = substr( $client[ "time_logon" ], 0, 4 );
  $mo = substr( $client[ "time_logon" ], 4, 2 );
  $day = substr( $client[ "time_logon" ], 6, 2 );
  $h = substr( $client[ "time_logon" ], 8, 2 );
  $mi = substr( $client[ "time_logon" ], 10, 2 );
  $s = substr( $client[ "time_logon" ], 12, 2 );
  
  if( !isset( $CurLog[ $client["cid"] ] ) ){
    $CurLog[ $client["cid"] ] = array( 
      "name" => $client["realname"],
      "total" => 0,
      "atc" => array(),
      "currentlyOnline" => TRUE
    );
  }
  
  $CurLog[ $client["cid"] ][ "currentlyOnline" ] = TRUE;
  if( !isset( $CurLog[ $client["cid"] ]["atc"][$client["callsign"]] ) ){
    $CurLog[ $client["cid"] ]["atc"][$client["callsign"]] = array(
    array(
      "logged_on" => mktime( $h, $mi, $s, $mo, $day, $y ),
      "logged_off" => FALSE,
    ));
    $callindex = 0;
    $CurLog[ $client["cid"] ]["total"] += ( time() - mktime( $h, $mi, $s, $mo, $day, $y ) );
  }else{
    $callindex = count( $CurLog[ $client["cid"] ]["atc"][$client["callsign"]] ) - 1;
    $CurLog[ $client["cid"] ]["total"] += 120;
  }
  
  if( !$CurLog[ $client["cid"] ]["atc"][$client["callsign"]][$callindex]["logged_off"] === FALSE ){
    array_push( $CurLog[ $client["cid"] ]["atc"][$client["callsign"]], array(
      "logged_on" => mktime( $h, $mi, $s, $mo, $day, $y ),
      "logged_off" => FALSE,
    ));
    $callindex += 1;
    $CurLog[ $client["cid"] ]["total"] += time() - mktime( $h, $mi, $s, $mo, $day, $y );
  }
  
  foreach( $CurLog[ $client["cid"] ]["atc"] as $pos => $dta  ){
    foreach( $dta as $d ){
      if( $d["logged_off"] === FALSE and $pos != $client["callsign"] ){
        $d["logged_off"] = mktime( $h, $mi, $s, $mo, $day, $y );
      }
    }    
  }
  
}

foreach( $CurLog as $cid=>$data ){

  if( !in_array( $cid, $onlineCIDs ) ){
    
    foreach( $data["atc"] as $call=>$posdata ){
      $callindex = count( $posdata ) - 1;
      if( $posdata[$callindex]["logged_off"] == FALSE && $data["currentlyOnline"] ){
        
        $CurLog[ $cid ]["currentlyOnline"] = FALSE;
        $CurLog[ $cid ]["atc"][$call][$callindex]["logged_off"] = time();
        $CurLog[ $cid ]["total"] += 120;
        
      }
      
    }
    
  }
  
}

file_put_contents( "data/member-data-" . date( "W-Y" ) . ".json", json_encode( $CurLog ) );