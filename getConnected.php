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
function array_utf8_encode($dat){
  if (is_string($dat))
    return utf8_encode($dat);
  if (!is_array($dat))
    return $dat;
  $ret = array();
  foreach ($dat as $i => $d)
    $ret[$i] = array_utf8_encode($d);
  return $ret;
}
header('Content-Type: application/json');
echo json_encode( array_utf8_encode( $Connected ), JSON_PRETTY_PRINT );