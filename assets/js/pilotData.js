$.getJSON( "/getConnected.php", function( data ) {
  $.each( data, function( key, val ) {
    if( val["clienttype"] == "PILOT" ){
      $(".PILOT-DATA tbody").append("<tr>");
      $(".PILOT-DATA tbody").append("<td>" + val["callsign"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["cid"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["realname"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["planned_depairport"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["planned_destairport"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["planned_altairport"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["planned_tascruise"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["planned_altitude"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["altitude"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["groundspeed"] + "</td>");
      $(".PILOT-DATA tbody").append("<td>" + val["transponder"] + "</td>");
      $(".PILOT-DATA tbody").append("</tr>");
    }
  });
});
