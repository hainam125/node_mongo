angular
  .module('loc8rApp')
  .filter('formatDistance', formatDistance);

var _isNumeric = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function formatDistance() {
  return function (distance) {
    var numDistance, unit;
    if(distance && _isNumeric(distance)) {
      if(distance > 6371000) {
        numDistance = parseFloat(distance/6371000).toFixed(1);
        unit = 'km';
      }
      else {
        numDistance = parseInt(distance/6371, 10);
        unit = 'm';
      }
      return numDistance + unit;
    }
    else {
      return "?";
    }
  }
}