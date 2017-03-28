angular.module('app').factory('cardFactory', function ($http) {
    var service = {};
    var projectBoardId = null;

    cards = [];

    var myParam = location.search.split('projectid=')[1]
    var alists = {};
    service.getCards = function (list) {
        return _.filter(cards, { list_id: list.id });
    };


    //работает
    service.createCard = function (list, cardTitle, isNeed) {
        cards.push({
            id: _.uniqueId('card_'),//сразу удалить не получится из-за ID
            title: cardTitle,
            list_id: list.id
        });

        var data = {
            ProjectTasks: {
                Title: cardTitle,
                StatusId: 5,
                TaskTypeId: 1,
                ProjectId: myParam,
                CreatedBy: "532bec7d-4eb9-4e53-bb3c-4379e03f5e23", //заглушка. $scope.UserId
                Description: "",
                projectBoardId: list.id 
            },
            IsWordNeed: isNeed
        };
        console.warn('~~~~~data', data);

        projectBoardId = list.id;

        

        //adding to ProjectTask table       
        $http({
            method: 'POST',
            url: '/api/ProjectTasks',
            data: data,
            contentType: "application/json"
        }).then(function successCallback(response) {
            //console.log(response);
            console.log("created task's Id",response.data.Id);
            dataBoard = {
                UserBoardId: list.id,
                TaskId : response.data.Id
            };
            console.log("dataBoard", dataBoard);
            //adding to UserBoards table
            $http({
                method: 'POST',
                url: '/api/UserBoards/AddProjectTaskToUserBoard?board=' + list.id,
                contentType: "application/json",
                data: dataBoard,
                success: function (result) {
                    alert(result.Result);
                }
            });
        }, function errorCallback(response) {
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

    };

    return service;
});