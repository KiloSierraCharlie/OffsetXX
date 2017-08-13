<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>VATSIM Air Traffic Control League</title>
    <link rel="stylesheet" href="assets/css/vatsim-map.css" type="text/css">
  </head>
  <body>
    <?php echo file_get_contents( "assets/menu.html" ); ?>
    <?php echo file_get_contents( "assets/sidebar.html" ); ?>
    <div id="PageContent">
      <?php
      if( isset( $_GET["week"] ) ){ $wk = (int)$_GET["week"]; }else{ $wk = date( "W" ); }
      if( isset( $_GET["year"] ) ){ $yr = (int)$_GET["year"]; }else{ $yr = date( "Y" ); }
      
      $lstyr = $yr;
      $nxtyr = $yr;
      
      if( ( $lstwk = $wk-1 ) == 0 ){
        $lstwk = 12;
        $lstyr -= 1;
      }
      if( ( $nxtwk = $wk+1 ) == 13 ){
        $nxtwk = 1;
        $nxtyr += 1;
      }
      ?>
      <h2 id="title" align="center"></h2>
      <h3><a href="atcLeague?week=<?php echo $lstwk; ?>&year=<?php echo $lstyr; ?>" style="position:absolute;left:10%;" id="weekprevious">Previous Week (<?php echo $lstwk . ", " . $lstyr; ?>)</a> <a href="atcLeague?week=<?php echo $nxtwk; ?>&year=<?php echo $nxtyr; ?>" style="position:absolute;right:10%;" id="weekafter">Subsequent Week (<?php echo $nxtwk . ", " . $nxtyr; ?>)</a></h3>
      <br>
      <br>
      <table class="ATCLeague-DATA">
        <thead>
          <tr>
            <th>Cerficiate</th>
            <th>Real Name</th>
            <th>Total Connections</th>
            <th>Favorite Station</th>
            <th>Total Stations</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/date.format.min.js"></script>
    <script src="assets/js/airTrafficLeague.js"></script>
  </body>
</html>