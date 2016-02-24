angular.module('walletApp').directive('watchOnlyAddress', (Wallet, $translate, Confirm) => {
  return {
    restrict: "A",
    replace: true,
    scope: {
      address: '=watchOnlyAddress',
      searchText: '='
    },
    templateUrl: (elem, attrs) => 'templates/watch-only-address.jade',
    link: (scope, elem, attrs, ctrl) => {
      scope.errors = {label: null};
      scope.status = {edit: false};

      scope.changeLabel = (label, successCallback, errorCallback) => {
        scope.errors.label = null;

        const success = () => {
          scope.status.edit = false;
          successCallback();
        };

        const error = (error) => {
          $translate("INVALID_CHARACTERS_FOR_LABEL").then((translation) => {
            scope.errors.label = translation;
          });
          errorCallback();
        };

        Wallet.changeLegacyAddressLabel(scope.address, label, success, error);
      };

      scope.cancelEdit = () => {
        scope.status.edit = false;
      };

      scope.delete = () => {
        $translate("CONFIRM_DELETE_WATCH_ONLY_ADDRESS").then((translation) => {
          Confirm.open(translation).result.then(() => { Wallet.deleteLegacyAddress(scope.address); })
        });
      };

    }
  };
});
