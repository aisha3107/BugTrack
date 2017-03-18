angular.module('app').factory('cardFactory', function ($http) {
    var service = {};
    var projectBoardId = null;

    cards = [];

    var myParam = location.search.split('projectid=')[1]

    service.getCards = function (list) {
        return _.filter(cards, { list_id: list.id });
        
    };


    //работает
    service.createCard = function (list, cardTitle) {
        cards.push({
            id: _.uniqueId('card_'),//сразу удалить не получится из-за ID
            title: cardTitle,
            list_id: list.id
        });

        var data = {
            Title: cardTitle,
            StatusId: 5,
            TaskTypeId: 1,
            ProjectId: myParam, 
            CreatedBy: "532bec7d-4eb9-4e53-bb3c-4379e03f5e23", //заглушка. $scope.UserId
            Description: "",
            projectBoardId: list.id //здесь надо сделать добавление в нужный список, если таск был добавлен в другой борд вручную.
        };
        console.warn('~~~~~data', data);

        projectBoardId = list.id;

        data2 = {
            UserBoardId: list.id
        }

        $http({
            method: 'POST',
            url: '/api/ProjectTasks',
            contentType: "application/json",
            data: data,

            //    JSON.stringify({
            //    projectTasks: data1,
            //    projectBoardId: projectBoardId
            //}),
            success: function (result) {
                alert(result.Result);
            }
        });

        //$.ajax({ //not correct 
        //    url: '/api/ProjectTasks',
        //    type: 'POST',
        //    data: { projectTasks: data,
        //            projectBoardId: projectBoardId
        //    },
        //    dataType: 'json',
        //    success: function (data) {
        //        alert(data);
        //    }
        //});

        //vm = {
        //    projectTasks: projectTasks,
        //    projectBoardId: projectBoardId
        //}
        
        //$http({
        //    url: '/api/ProjectTasks?projectBoardId=' + projectBoardId,
        //    method: 'POST',
        //    data: JSON.stringify(projectTasks),
        //    dataType: 'json',
        //    success: function (vm) {
        //        alert(vm);
        //    }
        //});


        ////AddProjectTaskToUserBoard
        //$http({
        //    method: 'POST',
        //    url: '/api/UserBoards/AddProjectTaskToUserBoard',
        //    contentType: "application/json",
        //    data: data2,
        //    success: function (result) {
        //        alert(result.Result);
        //    }
        //});



        ///creating task on the board
        //$http.post('/api/ProjectTasks', { projectTasks: data, projectBoardId: projectBoardId })
        //    .then(function (response) {
        //        console.log(response);
        //        console.warn("~~~~~created", data);
        //    }, function (response) {
        //        console.log(response)
        //    });
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