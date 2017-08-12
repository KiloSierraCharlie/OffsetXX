<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>VATSIM Online Airports</title>
    <link rel="stylesheet" href="assets/css/vatsim-map.css" type="text/css">
  </head>
  <body>
    <?php echo file_get_contents( "assets/menu.html" ); ?>
    <?php echo file_get_contents( "assets/sidebar.html" ); ?>
    <div id="PageContent">
      <table class="ONLAP-DATA">
        <thead>
          <tr>
            <th>ICAO</th>
            <th>ATIS</th>
            <th>DEL</th>
            <th>GND</th>
            <th>TWR</th>
            <th>DEP</th> 
            <th>APP</th>   
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/onlineAP.js"></script>
  </body>
</html>
