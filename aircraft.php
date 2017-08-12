<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>VATSIM Aircraft</title>
    <link rel="stylesheet" href="assets/css/vatsim-map.css" type="text/css">
  </head>
  <body>
    <?php echo file_get_contents( "assets/menu.html" ); ?>
    <?php echo file_get_contents( "assets/sidebar.html" ); ?>
    <div id="PageContent">
      <table class="PILOT-DATA">
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Certificate</th>
            <th>Real Name</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Alternate</th>
            <th>Filed Speed</th>
            <th>Filed Altitude</th>
            <th>Actual Altitude</th>
            <th>Actual Speed</th>
            <th>Transponder</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/pilotData.js"></script>
  </body>
</html>