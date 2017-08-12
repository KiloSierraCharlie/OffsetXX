var airports = {}

var regex = /.*?(ATIS|DEL|GND|TWR|DEP|APP)/;
var usatis_regex = /K.{3}_(ATIS)/;
var ausatis_regex = /Y.{3}_(ATIS)/;

$.getJSON( "/getConnected.php", function( data ) {
  $.each( data, function( key, val ) {
    if( val["clienttype"] == "ATC" && ( regex.test( val["callsign"] ) | usatis_regex.test( val["callsign"] ) ) ){
        var icao;
        if( usatis_regex.test( val["callsign"] ) ){
          icao = val["callsign"].split("_")[0].substr( 1 );
        }else if( ausatis_regex.test( val["callsign"] ) ){
          icao = val["callsign"].split("_")[0].substr( 2 );
        }else{
          icao = val["callsign"].split("_")[0];
        }
        if( airports[ icao ] == undefined ){ 
            airports[ icao ] = {
                ATIS: "<font color='red'>\u2718</font>",
                DEL:  "<font color='red'>\u2718</font>",
                GND:  "<font color='red'>\u2718</font>",
                TWR:  "<font color='red'>\u2718</font>",
                DEP:  "<font color='red'>\u2718</font>",
                APP:  "<font color='red'>\u2718</font>"
            };
        }
        airports[ icao ][ val["callsign"].split("_")[ val["callsign"].split("_").length-1 ] ] = "<font color='green'>\u2714</font>";
    }
  });
  $.each( airports, function( key, val ) {
    $(".ONLAP-DATA tbody").append("<tr>");
    $(".ONLAP-DATA tbody").append("<td>" + key + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["ATIS"] + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["DEL"] + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["GND"] + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["TWR"] + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["DEP"] + "</td>");
    $(".ONLAP-DATA tbody").append("<td>" + val["APP"] + "</td>");
    $(".ONLAP-DATA tbody").append("</tr>");
  });
});
