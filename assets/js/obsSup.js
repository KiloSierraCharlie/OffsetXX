var VATSIMRatings = [
  "Inactive",
  "Pilot/Observer",
  "Student",
  "Student 2",
  "Senior Student",
  "Controller",
  "Controller 2",
  "Senior Controller",
  "Instructor",
  "Instructor 2",
  "Senior Instructor",
  "Supervisor",
  "Administrator",
]
$.getJSON( "/getConnected.php", function( data ) {
  $.each( data, function( key, val ) {
    if( val["clienttype"] == "ATC" && parseInt( val["facilitytype"] ) == 0 ){
      $(".OBSSUP-DATA tbody").append("<tr>");
      $(".OBSSUP-DATA tbody").append("<td>" + val["callsign"] + "</td>");
      $(".OBSSUP-DATA tbody").append("<td>" + val["cid"] + "</td>");
      $(".OBSSUP-DATA tbody").append("<td>" + val["realname"] + "</td>");
      $(".OBSSUP-DATA tbody").append("<td>" + VATSIMRatings[ val["rating"] ] + "</td>");
      $(".OBSSUP-DATA tbody").append("</tr>");
    }
  });
});
