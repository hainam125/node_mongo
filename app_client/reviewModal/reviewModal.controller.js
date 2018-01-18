(function () {
  angular
    .module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$modalInstance', 'locationData', 'loc8rData'];
  function reviewModalCtrl($modalInstance, locationData, loc8rData) {
    var vm = this;
    vm.locationData = locationData;
    vm.modal = {
      close: function (result) {
        $modalInstance.close(result);
      },
      cancel: function () {
        $modalInstance.dismiss('cancel');
      }
    };
    vm.doAddReview = function (locationid, formData) {
      loc8rData.addReviewById(locationid, {
        rating: formData.rating,
        reviewText: formData.reviewText
      }).success(function (data) {
        vm.modal.close(data)
      }).error(function (e) {
        vm.formError = 'Not saved'
      });
      return false;
    }
    vm.onSubmit = function () {
      vm.formError="";
      if(!vm.formData.rating || !vm.formData.reviewText) {
        vm.formError = "Require all fields";
        return false;
      }
      else {
        vm.doAddReview(vm.locationData.locationid, vm.formData);
      }
    }
  }
})();