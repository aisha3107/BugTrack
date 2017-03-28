//var angular = require('angular');
//var angularDragula = require('angularjs-dragula');

angular.module('app', [])

/**
 * Init default templates
 */
/**
  * Нашему всплывающему окну нужен какой-то шаблон.
  * По умолчанию диалог скрыт, поэтому добавляем класс ng-hide
  * Так же помним про стандартную директиву ng-show
  * и заставляем ее показывать наше окно по флагу visible
  * Далее добавляем тело нашего окна, тут и начинается темная магия.
  * ng-include позволит включить любой шаблон Angular или автоматически подгрузит
  * его по ссылке. Т.е. по сути эта директива сделает за нас всю работу.
  * Атрибут onload позволит показывать окно когда контент полностью загружен.
  * ng-init пригодится для отображения индикатора загрузки, об этом чуть позже.
  */

    .run(['$templateCache', 'idialogWindowTpl', function ($templateCache, idialogWindowTpl) {
        $templateCache
            .put(idialogWindowTpl, '<div class="idialog animated ng-hide" ng-show="visible">'
                + '<div class="close-btn" ng-click="hide()"></div>'
                + '<div class="w" ng-init="startLoading()"></div>'
                + '</div>');
    }])

/**
 * iDialog window template path
 */
/**
  * Здесь определяем имя шаблона диалога на случай, если нам вдруг захочется его поменять.
  */
    .value('idialogWindowTpl', 'idialogWindowTpl')

/**
 * $idialog service
 */
/**
  * Сервис вызова всплывающих окон. Нужен чтобы была возможность вызывать любые всплывающие окна прямо из JS кода.
  * В наш сервис нужно будет передать имя шаблона окна, либо ссылку на него.
  */
    .service('$idialog', ['$compile', '$timeout', '$rootScope', function ($compile, $timeout, $rootScope) {
        return function (template, options) {
            options = options || {};

        /**
         * Для каждого нового окна создаем новый элемент,
         * который содержит нужную нам директиву описанную ниже
         */
            var $dialog = angular.element('<div idialog-window="' + template + '" class="' + (options['class'] || '') + '"></div>');
            angular.element(document.body).append($dialog);

       /**
         * Показывать диалог нужно в другом потоке. Это связано с работой директивы ng-include.
         * Хотя тут я могу ошибаться и, возможно, все это исправили в новых версиях AngularJS
         */
            $timeout(function () {
                // Для каждого окна создаем новый $scope, чтобы ничего не пересекалось

                var newScope = $rootScope.$new(true);

                newScope.dialogId = options.dialogId || false;

                $compile($dialog)(newScope);
            });
        };
    }])

/**
 * Button-directive to show dialog
 */

/**
  * Директива кнопки для вызова всплывающих окон.
  * По сути кнопка просто будет вызывать вышеописанный сервис и ничего более
  */
    .directive('idialog', ['$idialog', function ($idialog) {
        return {
            restrict: 'A',

            link: function ($scope, $element, attrs) {
                $element.on('click', function (e) {
                    e.preventDefault();

                    if (!attrs.idialog) {
                        console.error('Try to show an empty idialog');
                        return;
                    }

                    $idialog(attrs.idialog, {
                        'class': attrs.idialogClass,
                        dialogId: attrs.idialogId
                    });
                });
            }
        }
    }])

/**
 * iDialog window
 */

/**
  * И наконец директива самого всплывающего окна.
  * Как видим, мы заставляем ангуляр заменить весь шаблон
  * на указанный нами ранее, это позволит средствами фрейморка
  * подгрузить и скомпилировать весь контент всплывающего окна.
  */
    .directive('idialogWindow', ['$templateCache', '$timeout', '$compile', '$http', 'idialogWindowTpl', function ($templateCache, $timeout, $compile, $http, idialogWindowTpl) {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: idialogWindowTpl,
            replace: true,

            link: function ($scope, $element, $attrs) {
                // Видимость нашего окна
                $scope.visible = false;
                // Окно в данный момент еще загружается?
                $scope.loading = false;
                // Шаблон контента нашего окна
                $scope.closed = false;
                $scope.scopeEventsEnabled = !!$scope.dialogId;

                // Набор событий для пере-позиционирования нашего окна
                angular.element(document).on('ready', $scope.relocate);
                angular.element(window).on('load', $scope.relocate);
                angular.element(window).on('resize', $scope.relocate);

                $timeout($scope.relocate, 100);

                // Шаблон темной подложки для перекрытия всего
                // остального контента помимо всплывающего окна
                $scope.$overlay = angular.element('<div class="idialog-overlay ng-hide" ng-show="visible || loading" ng-click="hide()"><s class="l idialog-animation ng-hide" ng-show="loading"></s></div>');
                angular.element(document.body).append($scope.$overlay);
                $compile($scope.$overlay)($scope);

                var dialogTemplate = $attrs.idialogWindow;
                var dialogContent = $templateCache.get(dialogTemplate);
                var applyTemplate = function () {
                    var $w = $element.children('.w');
                    $w.append(dialogContent);
                    $compile($w)($scope);
                    $scope.show();
                };

                if (!dialogContent) {
                    $http({
                        method: 'GET',
                        url: dialogTemplate
                    }).success(function (response) {
                        dialogContent = response;
                        $templateCache.put(dialogTemplate, dialogContent);
                        applyTemplate();
                    }).error(function (response, code) {
                        if (code > 0) {
                            console.error('Error while loading idialog template: ' + dialogTemplate);
                        }
                    });
                } else {
                    applyTemplate();
                }
            },

            controller: ['$scope', '$element', '$rootScope', function ($scope, $element, $rootScope) {
                /**
                 * Update dialog position to center or to a window's top
                 */
             /**
              * Функция для позиционирования нашего окна.
              * Не вдаюсь в подробности как это работает, скажу только,
              * что она позволяет показывать окно по центру экрана либо же
              * скроллить его на узких экранах.
              */
                $scope.relocate = function () {
                    if (document.body.clientHeight < $element[0].clientHeight) {
                        var doc = document.documentElement, body = document.body;
                        var top = (doc && doc.scrollTop || body && body.scrollTop || 0) + 15;
                        top = parseInt(top, 10) + 'px';

                        var left = document.body.clientWidth > 1000 ? -$element[0].clientWidth / 2 : -$element[0].clientWidth / 2 + 25;
                        left = parseInt(left, 10) + 'px';

                        $element.css({
                            position: 'absolute',
                            marginLeft: left,
                            marginTop: '0px',
                            top: top
                        });
                    } else {
                        var left = document.body.clientWidth > 1000 ? -$element[0].clientWidth / 2 : -$element[0].clientWidth / 2 + 25;
                        left = parseInt(left, 10) + 'px';

                        var top = -$element[0].clientHeight / 2;
                        top = parseInt(top, 10) + 'px';

                        $element.css({
                            position: 'fixed',
                            marginLeft: left,
                            marginTop: top
                        });
                    }
                };

                /**
                 * Show idialog window
                 */
              /**
               * Функция показа нашего окна
               * На самом деле вы только лишь переставляем флаги.
               * Ничего сложного, правда?
               */
                $scope.show = function () {
                    $scope.visible = true;
                    $scope.loading = false;
                    $scope.relocate();
                    $timeout($scope.relocate);
                    $timeout($scope.relocate, 100);

                    if ($scope.scopeEventsEnabled) {
                        $rootScope.$broadcast('iDialogShow', $scope.dialogId);
                    }
                };

                /**
                 * Hide idialog window
                 */
                $scope.hide = function () {
                    $scope.visible = false;
                    $scope.loading = false;
                    $timeout(function () {
                        $scope.$overlay.remove();
                        $element.remove();
                    }, 3000);

                    if ($scope.scopeEventsEnabled) {
                        $rootScope.$broadcast('iDialogHide', $scope.dialogId);
                    }
                };

                /**
                 * Delayed loading
                 */

          /**
           * Отложенный показ индикатора загрузки
           */
                $scope.startLoading = function () {
                    $timeout(function () {
                        if (!$scope.visible && !$scope.closed) {
                            $scope.loading = true;
                        }
                    }, 300);
                }
            }]
        }
    }])
;