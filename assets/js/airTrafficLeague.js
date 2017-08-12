function secondsToHms(d) {
    d = Number(d);
    var h = ("0" + Math.floor(d / 3600)).slice(-2);
    var m = ("0" + Math.floor(d % 3600 / 60)).slice(-2);
    var s = ("0" + Math.floor(d % 3600 % 60)).slice(-2);
    return h + ":" + m + ":" + s; 
}
$.urlParam = function(name){
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null){
     return null;
  }
  else{
     return decodeURI(results[1]) || 0;
  }
}
var year;
var week;
if( (week = $.urlParam( "week" )) == null ){
  week = new Date().format('W');
}
if( (year = $.urlParam( "year" )) == null || ){
  year = new Date().format('Y');
}

$("#title").append("Week " + week + " ATC statistics");
$.getJSON( "/data/member-data-" + week + "-" + year + ".json", function( data ) {
  var sorted = Object.keys( data ).sort(function(a,b){
    return data[ b ]["total"]-data[ a ]["total"]
  })
  $.each( sorted, function( key, val ) {
    var totalConnections = 0;
    var largest = ["", 0];
    var stations = 0;
    $.each( data[val]["atc"], function( k, v ) {
      stations += 1;
      totalConnections += v.length
      if( v.length > largest[1] ){
        largest[0] = k;
        largest[1] = v.length;
      }
    });
    $(".ATCLeague-DATA tbody").append("<tr>");
    $(".ATCLeague-DATA tbody").append("<td>" + val + "</td>");
    $(".ATCLeague-DATA tbody").append("<td>" + data[val]["name"] + "</td>");
    $(".ATCLeague-DATA tbody").append("<td>" + totalConnections + "</td>");
    $(".ATCLeague-DATA tbody").append("<td>" + largest[0] + " (" + largest[1] + ")</td>");
    $(".ATCLeague-DATA tbody").append("<td>" + stations + "</td>");
    $(".ATCLeague-DATA tbody").append("<td>" + secondsToHms(data[val]["total"]) + "</td>");
    $(".ATCLeague-DATA tbody").append("</tr>");
  });
}).fail(function(jqXHR, textStatus, errorThrown) { 
  alert('The requested data is not available.');
  location.href = "/atcLeague";
});
