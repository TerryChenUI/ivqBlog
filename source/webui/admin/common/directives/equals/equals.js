'use strict';
angular.module('common.directives').directive('equals', () => {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: (scope, elem, attrs, ngModel) => {
            if (!ngModel) return;
            scope.$watch(attrs.ngModel, () => {
                validate();
            });

            attrs.$observe('equals', (val) => {
                validate();
            });

            let validate = () => {
                let val1 = ngModel.$viewValue;
                let val2 = attrs.equals;

                ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
            };
        }
    }
});