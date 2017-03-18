angular.module('app').controller('listsCtrl', function (listFactory, $scope, $http) {
    ////console.log('listsCtrl');
    this.lists = listFactory.getLists();
    //currentUserId = null;
    this.addList = function () {
        listFactory.addList(this.listName);
        this.listName = '';
    };
    //this.UserIdCommon = null;

    var myParam = location.search.split('projectid=')[1]

    var projectId = myParam; 

    


    ////gets all boards of current project
    $http({
        method: 'GET',
        url: '/api/UserBoards/GetProjectBoardsByProjectId?projectId=' + projectId
    }).then(function successCallback(response) {
        //console.log('response.data: ', response.data);
        if (response.data[0].UserId != null) {
            console.log('UserId', response.data[0].UserId);
        }
        //currentUserId = response.data[0].UserId;
        boardId = response.data[0].Id;
        //console.log('boardId', boardId);
        UserIdCommon = response.data[0].UserId;

        for (var i = 0; i < response.data.length; i++) {
            this.lists.push({
                id: response.data[i].Id,
                listName: response.data[i].Title,
                tasks: response.data[i].Tasks
            });

            ////list of BoardId in array
            this.arr.push({
                boardId: response.data[i].Id
            });
        }

        console.log('lists', this.lists);
        //console.log('lists by id one by one', this.lists[0].id);
        //console.log('lists by id one by one', this.lists[1].id);
    }, function errorCallback(response) {
    });



    //$scope.$on('iDialogShow', function (e, dialogId) {
    //    console.log('Show: ', dialogId);
    //});

    //$scope.$on('iDialogHide', function (e, dialogId) {
    //    console.log('Hide: ', dialogId);
    //});

});