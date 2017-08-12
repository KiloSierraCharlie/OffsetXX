$.getJSON( "/getPrefiled.php", function( data ) {
  $.each( data, function( key, val ) {
    $(".PREFILED-DATA tbody").append("<tr>");
    $(".PREFILED-DATA tbody").append("<td>" + val["callsign"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["cid"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["realname"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_depairport"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_destairport"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_altairport"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_route"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_tascruise"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_altitude"] + "</td>");
    $(".PREFILED-DATA tbody").append("<td>" + val["planned_deptime"] + "</td>");
    $(".PREFILED-DATA tbody").append("</tr>");
  });
});
