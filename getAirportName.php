<?php

$Airports = array();

foreach( explode( "\n", file_get_contents( "data/ICAO_Airports.txt") ) as $id=>$line ){
  if( $line[0] == ";" ){ continue; }
  if(1 === preg_match('~[0-9]~', $line)){ continue; }
  $line = trim(str_replace( "/", " ", $line ));
  $lineparts = explode( "  ", $line );
  $apname = "";
  foreach( $lineparts as $i=>$p ){
    if( $i == 0 ){ continue; }
    if( strtoupper($p) == $p ){
      $apname .= ucfirst( strtolower( $p ) ) . " ";
    }
  }
  echo $apname . "$id<br>";
  $Airports[ $lineparts[0] ] = trim( $apname );
  
}
file_put_contents( "data/airports.json", json_encode( $Airports ) );