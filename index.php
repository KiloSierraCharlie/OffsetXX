<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>VATSIM Map</title>
    <link rel="stylesheet" href="assets/css/vatsim-map.css" type="text/css">
  </head>
  <body>
    <?php echo file_get_contents( "assets/menu.html" ); ?>
    <?php echo file_get_contents( "assets/sidebar.html" ); ?>
    <div id="VATSIM-MAP"></div>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/updateMap.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBD6zvrrjC0W0epeL36qmz_Cahmo8PsWbY&callback=initMap"></script>
  </body>
</html>