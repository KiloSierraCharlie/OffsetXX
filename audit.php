<?php

$CurLog = json_decode( file_get_contents( "data/member-data-" . date( "W-Y" ) . ".json" ), TRUE );
foreach( $CurLog as $cid=>$data ){
  
  $CurLog[$cid]["total"] = 0;
  
  foreach( $data["atc"] as $position=>$connections ){
    
    foreach( $connections as $conn ){
      
      if( $conn["logged_off"] === FALSE ){
        
        $CurLog[$cid]["total"] += time() - $conn["logged_on"];
        
      }else{
        
        $CurLog[$cid]["total"] += $conn["logged_off"] - $conn["logged_on"];
      
      }
      
    }
    
  }
  
}

file_put_contents( "data/member-data-" . date( "W-Y" ) . ".json", json_encode( $CurLog ) );