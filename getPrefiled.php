<?php

$VATSIMData = explode( "\n", file_get_contents( "data/vatsim-data.txt" ) );

$Prefiled = array();
$PrefileFormatting = array();

$GotClients = FALSE;

foreach( $VATSIMData as $rownum=>$line ){
  if( !$GotClients ){
    if( preg_match('/!PREFILE section/', $line ) ){
      foreach( explode( ":", $line ) as $heading ){
        if( preg_match('/!PREFILE section/', $heading ) ){ array_push( $PrefileFormatting, explode( "         ", $heading )[1] ); continue; }
        if( $heading == "\r" ){ continue; }
        array_push( $PrefileFormatting, $heading );
      }
    }
    if( preg_match('/!PREFILE:/', $line ) ){ $GotClients = TRUE; continue; }
  }else{
    if( $line == ";\r" and preg_match('/;/', $VATSIMData[ $rownum ] ) ){ break; }
    $curline = explode( ":", $line );
    $data = array();
    foreach( $PrefileFormatting as $headingnum=>$heading ){
      
      $data[ $heading ] = $curline[ $headingnum ];
      
    }
    array_push( $Prefiled, $data );
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
echo json_encode( array_utf8_encode( $Prefiled ), JSON_PRETTY_PRINT );