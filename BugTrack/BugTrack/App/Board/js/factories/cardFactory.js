angular.module('app').factory('cardFactory', function ($http) {
    var service = {};

    cards = [];


    service.getCards = function (list) {
        return _.filter(cards, { list_id: list.id });
    };


    //работает
    service.createCard = function (list, cardTitle) {
        cards.push({
            id: _.uniqueId('card_'),
            title: cardTitle,
            list_id: list.id
        });

        var data = {
            Title: cardTitle,
            StatusId: 5,
            TaskTypeId: 1,
            ProjectId: 11,  //заглушка. позже надо сделать выбранный проект
            CreatedBy: "532bec7d-4eb9-4e53-bb3c-4379e03f5e23", //заглушка. $scope.UserId
            Description: "",
            //здесь надо сделать добавление в нужный список, если таск был добавлен в другой борд вручную.
        };

        ///creating task on the board
        $http.post('/api/ProjectTasks', data)
            .then(function (response) {
                console.log(response);
                console.warn("~~~~~created", data);
            }, function (response) {
                console.log(response)
            });
    };

    service.deleteCard = function (card) {
        return _.pull(cards, card);       
    };

    //function getProjectTaskById(id) {
    //    return $http.get('/api/ProjectTasks/' + id).then(function (response) {
    //        return response.data;
    //    });
    //}

    service.updateCard = function (updatingCard) {
        var card = _.findWhere(cards, { id: updatingCard.id });
        card.title = updatingCard.title;
        card.list_id = updatingCard.list_id;

        $http.get('/api/ProjectTasks/' + updatingCard.id).then(function (response) {
            //response.data.StatusId = 5;
            //response.data.TaskTypeId = 1;
            //response.data.id = card.id;
            //response.data.ProjectId = 10;
            response.data.Title = card.title;
            $http({
                method: 'PUT',
                url: '/api/ProjectTasks/' + card.id,
                data: response.data
            }).then(function successCallback(response) {
                console.log('response.data after updating', response.data);
                alert("Task Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        });

        ///updating task on the board

    };

    return service;
});