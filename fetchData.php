<?php
function curl_get_contents( $url ){
  
  $CH = curl_init();
    curl_setopt( $CH, CURLOPT_URL, $url );
    curl_setopt( $CH, CURLOPT_RETURNTRANSFER, true );
    curl_setopt( $CH, CURLOPT_HEADER, false );
    $data = curl_exec( $CH );
    if( $data == false ){
        die("<br><br>Something went wrong!\n" . curl_error( $CH ) );
    }
  curl_close( $CH );
  
  return $data;
}

$ShouldUPDATE = TRUE;

$CurrentData = file_get_contents("data/vatsim-data.txt");
foreach( explode( "\n", $CurrentData ) as $line ){

    if( !preg_match('/UPDATE = /', $line ) ){ continue; }
    $line = explode( "UPDATE = ", $line );
    $date = $line[1];
    $y = substr( $date, 0, 4 );
    $mo = substr( $date, 4, 2 );
    $d = substr( $date, 6, 2 );
    $h = substr( $date, 8, 2 );
    $mi = substr( $date, 10, 2 );
    $s = substr( $date, 12, 2 );
    
    if( time() - mktime( $h, $mi, $s, $mo, $d, $y ) < 120 ){
    
        $ShouldUPDATE = FALSE;
    
    }else if( time() - mktime( $h, $mi, $s, $mo, $d, $y ) < 30 ){
    
        $ShouldUPDATE = TRUE;
        sleep( time() - mktime( $h, $mi, $s, $mo, $d, $y ) );
    
    }
    
}

if( $ShouldUPDATE ){
  echo "Data Expired, fetching from: ";
  if( filemtime( "data/status.txt" ) + ( 60*60*12 ) < time() ){
    $VATSIMStatus = curl_get_contents( "https://status.vatsim.net/status.txt" );
    file_put_contents( "data/status.txt", $VATSIMStatus );
    $VATSIMStatus = explode( "\n", $VATSIMStatus );
  }else{
    $VATSIMStatus = explode( "\n", file_get_contents( "data/status.txt" ) );
  }
  $DATAServers = array();
  foreach( $VATSIMStatus as $VS ){ if( preg_match('/url0=/', $VS ) ){ array_push( $DATAServers, explode( "url0=", $VS )[1] ); } }
  echo $DATAServers[ array_rand( $DATAServers ) ];
  file_put_contents( "data/vatsim-data.txt", curl_get_contents( trim( $DATAServers[ array_rand( $DATAServers ) ] ) ), LOCK_EX );
  include( "doTime.php" );
}else{
  echo "Data has not expired, not re-fetching!";
}
