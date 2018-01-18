(function(){
  angular
    .module('loc8rApp')
    .directive('ratingStars', ratingStars);

  function ratingStars() {
    return {
      restrict: 'EA',
      scope: {
        thisRating: '= rating1'
      },
      templateUrl: '/common/directives/ratingStars/ratingStars.template.html'
    }
  }
})();