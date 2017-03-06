angular.module('app').factory('listFactory', function ($http) {
    var service = {};

    lists = [];
    arr = [];

    service.getLists = function () {
        return lists;
    };

    //добавляет, но возникает проблема подгрузки данных, так как сразу пытается достать таски
    service.addList = function (listName) {
        lists.push({
            //Id: _.uniqueId('list_'), 
            listName: listName, //title
            ProjectId: 11, //заглушка
            IsArchived: 0, 
            order: 1, 
            //userid? not required
        });

        console.warn("lists", lists);
        var data = {
            //Id: lists.Id,
            Title: listName,
            ProjectId: 11,  //заглушка. позже надо сделать выбранный проект
            UserId: "532bec7d-4eb9-4e53-bb3c-4379e03f5e23", //заглушка. $scope.UserId
            IsArchived: 0,
            Order: 1
        };

        ///creating task on the board
        $http.post('/api/UserBoards', data)
            .then(function (response) {
                console.log(response);
                console.warn("~~~~~created", data);
            }, function (response) {
                console.log(response)
            });

    };

    //работает
    service.removeList = function (list) {
        _.pull(lists, list);
        console.log("list object", list);
        $http.delete('/api/UserBoards/' + list.id)//какой Id взять?
       .then(
           function (response) {
               // success callback
               console.log("List deleted successfully!");
           },
           function (response) {
               // failure call back
           }
        );
    };

    return service;
});