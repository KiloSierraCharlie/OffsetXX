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
      $wk = date( "W" );
      $yr = date( "Y" );
      if( ( $lstwk = $wk-1 ) == 0 ){
        $lstwk = 12;
        $lstyr -= 1;
      }
      if( ( $nxtwk = $wk+1 ) == 13 ){
        $nxtwk = 1;
        $nxtyr += 1;
      }
      ?>
      <a href="atcLeague?week=<?php echo $lstwk; ?>&year=<?php echo $lstyr; ?>" align="left" id="weekprevious">Previous Week</a><h2 id="title" align="center"></h2><a href="atcLeague?week=<?php echo $nxtwk; ?>&year=<?php echo $nxtyr; ?>" align="right" id="weekafter">Subsequent Week</a>
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