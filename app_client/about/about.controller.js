(function () {
  angular
    .module('loc8rApp')
    .controller('aboutCtrl', aboutCtrl);

  function aboutCtrl() {
    var vm = this;
    vm.header = {
      title: 'About Loc8r'
    };
    vm.main = {
      content: "Loc8r was created to help people find places to sit down and get bit of work done.\n\nLoren ipsum dolor sit amet, consectetur adispcing elit. Numc sed lorem ac nisi dignia acsasna."
    };
  };
})();