angular.module('app').factory('listFactory', function ($http) {
    var service = {};

    lists = [];
    arr = [];
    var myParam = location.search.split('projectid=')[1]
    
    console.log("`````myParam", myParam);
    service.getLists = function () {
        return lists;
    };

    //UserId = listsCtrl.UserIdCommon;
    //console.log("UserID", UserId);

    //добавляет, но возникает проблема подгрузки данных, так как сразу пытается достать таски
    service.addList = function (listName) {
        lists.push({
            //Id: _.uniqueId('list_'), 
            listName: listName, //title
            ProjectId: myParam,
            IsArchived: 0, 
            order: 1, 
            //userid? not required
        });

        console.warn("lists", lists);
        var data = {
            //Id: lists.Id,
            Title: listName,
            ProjectId: myParam,
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
        alert("task will be deleted!");
        //var txt;
        //var r = confirm("Task will be deleted!\nPress a button!\nEither OK or Cancel.");
        //if (r == true) {
        //    txt = "You pressed OK!";
            $http.delete('/api/UserBoards/' + list.id)
               .then(
                   function (response) {
                       // success callback
                       console.log("List deleted successfully!");
                   },
                   function (response) {
                       // failure call back
                   }
                );
        //} else {
        //    txt = "You pressed Cancel!";
        //}
        //document.getElementById("demo").innerHTML = txt;


        
    };

    return service;
});