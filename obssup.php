<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>VATSIM Observers and Supervisors</title>
    <link rel="stylesheet" href="assets/css/vatsim-map.css" type="text/css">
  </head>
  <body>
    <?php echo file_get_contents( "assets/menu.html" ); ?>
    <?php echo file_get_contents( "assets/sidebar.html" ); ?>
    <div id="PageContent">
      <table class="OBSSUP-DATA">
        <thead>
          <tr>
            <th>Callsign</th>
            <th>Certificate</th>
            <th>Real Name</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/obsSup.js"></script>
  </body>
</html>