angular.module('app').directive('closeEditing', function () {
    var KEYS = {
        ESCAPE: 27
    };

    return {
        scope: {
            isEditing: '='
        },
        link: function (scope, element, attrs) {
            //console.log('LINK', scope.isEditing);
            element.on('keyup', function (e) {
                if (_.isEqual(e.keyCode, KEYS.ESCAPE)) {
                    scope.isEditing = false;
                    scope.$apply();
                }
            });
        }
    };
});