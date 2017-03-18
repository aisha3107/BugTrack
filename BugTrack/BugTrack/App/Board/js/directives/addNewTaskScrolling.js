//angular.module('app').directive('addNewTaskScrolling', function () {
//    var KEYS = {
//        ENTER: 13
//    };

//    return {
//        scope: {
//            createCard: '='
//        },
//        link: function (scope, element, attrs) {
//            console.log('LINK', scope.createCard);
//            element.on('keyup', function (e) {
//                if (_.isEqual(e.keyCode, KEYS.ENTER)) {
//                    //ScrollBottom();
//                    window.scrollTo(0, document.body.scrollHeight);
//                    //scrollWin(0, 1000);
//                    //scope.isEditing = false;
//                    //scope.$apply();
//                }                
//            });
//        }
//    };
//});