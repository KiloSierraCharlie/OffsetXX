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
    if( val["clienttype"] == "ATC" && parseInt( val["facilitytype"] ) > 0 ){
      var airspacetype = "";
      switch( val["callsign"].split("_")[ val["callsign"].split("_").length-1 ] ){
        case "DEL":
            airspacetype = "Departing Aircraft";
            break;
        case "GND":
            airspacetype = "Ground Manuvering Area";
            break;
        case "TWR":
            airspacetype = "Controlled Traffic Region";
            break;
        case "DEP":
            airspacetype = "Terminal Control/Manuevering Area";
            break;
        case "APP   ":
            airspacetype = "Terminal Control/Manuevering Area";
            break;
        case "CTR":
            airspacetype = "Air Route Traffic Control Center/Flight Information Region";
            break
        case "FSS":
            airspacetype = "Upper Information Region";
            break;
      }
      $(".ATC-DATA tbody").append("<tr>");
      $(".ATC-DATA tbody").append("<td>" + val["callsign"] + "</td>");
      $(".ATC-DATA tbody").append("<td>" + val["callsign"].split("_")[0] + " " + airspacetype + "</td>");
      $(".ATC-DATA tbody").append("<td>" + val["cid"] + "</td>");
      $(".ATC-DATA tbody").append("<td>" + val["realname"] + "</td>");
      $(".ATC-DATA tbody").append("<td>" + val["frequency"] + "</td>");
      $(".ATC-DATA tbody").append("<td>" + VATSIMRatings[ val["rating"] ] + "</td>");
      $(".ATC-DATA tbody").append("</tr>");
    }
  });
});