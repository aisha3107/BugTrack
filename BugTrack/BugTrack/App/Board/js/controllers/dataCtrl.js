angular.module('app').controller('dataCtrl', function () {
    this.statuses = [
        { id: 1, text: 'В работе' },
        { id: 2, text: 'На тестировании у аналитика' },
        { id: 3, text: 'Протестировано' },
        { id: 4, text: 'Принято заказчиком' },
        { id: 5, text: 'Запланировано' }
    ];

    this.types = [
        { id: 1, text: 'Feature' },
        { id: 2, text: 'Bug' }
    ];
});


