angular.module('app').controller('listCtrl', function (listFactory, cardFactory, $scope, $http) {
    //console.log('listCtrl');
    $scope.init = function (id) {
        getFromApi(id);
        console.log('list\'s id: ', id);
    };

    this.removeList = function (list) {
        listFactory.removeList(list);
    };
    //this.cards = cardFactory.getCards(cards);


    this.getCards = function (list) {
        return cardFactory.getCards(list);
    };

    this.createCard = function (list) {
        cardFactory.createCard(list, this.cardTitle);
        this.cardTitle = '';

    };

    var startedon = null;
    var endedon = null;
    var estimatedendson = null;
    var today = null;

    ///when loading gets tasks in boards
    function getFromApi(id) {
        $http({
            method: 'GET',
            url: '/api/UserBoards/' + id
        }).then(function successCallback(response) {

            console.log('tasks for the ' + id + ' board:', response.data.Tasks);
            myCards = response.data.Tasks;
            console.warn('response', response.data);
            



            for (var i = 0; i < response.data.Tasks.length; i++) {
                startedon = response.data.Tasks[i].ProjectTaskStartedOn;
                //console.log('startedon ' + startedon);
                //var startedon = response.data.StartedOn;//"yyyy-MM-dd"
                endedon = response.data.Tasks[i].ProjectTaskEndedOn;
                estimatedendson = response.data.Tasks[i].ProjectTaskEstimatedEndsOn;

                //if (response.data.Tasks[i].ProjectTaskStartedOn == null) {
                //    startedon = '';
                //    //console.log('Is empty');
                //}
                //if (response.data.EndedOn == null) {
                //    endedon = '';
                //}
                //if (response.data.EstimatedEndsOn == null) {
                //    estimatedendson = '';
                //}

                if (startedon != null) {
                    var date = startedon;
                    var day = date.substring(8, 10);
                    var month = date.substring(5, 7);
                    var year = date.substring(0, 4);
                    //console.log('day', day);
                    //console.log('month', month);
                    //console.log('year', year);
                    //today = day + "/" + month + "/" + year;//2017-01-26T18:00:00
                    //today = date;
                    //today = year + "-" + month + "-" + day;
                    today = day + "." + month + "." + year;
                    ////console.log('today', today);
                    //today = date.toISOString();
                    //console.log('today2 ', today.toISOString());

                    //self.StartedOn = new Date(year, month-1, day);//3.Date

                    //document.getElementById('StartedOn1').valueAsDate = today;
                }

                ////if (endedon != null) {
                ////    var endeddate = endedon;
                ////    var day = endeddate.substring(8, 10);
                ////    var month = endeddate.substring(5, 7);
                ////    var year = endeddate.substring(0, 4);
                ////    var ended = year + "-" + month + "-" + day;

                ////    //self.StartedOn = new Date(year, month-1, day);//3.Date

                ////    //document.getElementById('EndedOn').value = ended;
                ////}
                ////if (estimatedendson != null) {
                ////    var estimateddate = estimatedendson;
                ////    var day = estimateddate.substring(8, 10);
                ////    var month = estimateddate.substring(5, 7);
                ////    var year = estimateddate.substring(0, 4);
                ////    var estimated = year + "-" + month + "-" + day;

                ////    //self.StartedOn = new Date(year, month-1, day);//3.Date

                ////    //document.getElementById('EstimatedEndsOn').value = estimated;
                ////}

                cards.push({
                    id: response.data.Tasks[i].TaskId,
                    title: response.data.Tasks[i].ProjectTaskTitle,
                    list_id: id,
                    description: response.data.Tasks[i].ProjectTaskDescription,
                    statusname: response.data.Tasks[i].ProjectTaskStatusTitle,
                    tasktypename: response.data.Tasks[i].ProjectTaskTypesTitle,
                    assigneduserid: response.data.Tasks[i].ProjectTaskAssignedUserId,
                    completedPercent: response.data.Tasks[i].ProjectTaskCompletedPercent,
                    //отправляется 2017-02-12T18:00:00, нужно 2016-01-20T11:24:20.882Z
                    //startedon: today, //response.data.Tasks[i].ProjectTaskStartedOn
                    //estimatedendson: estimatedendson, //estimated,//response.data.Tasks[i].EstimatedEndsOn
                    //endedon: endedon
                });
                console.log('response cards', cards[i]);
                //console.log('startedon ' + startedon);
                //console.log('estimatedendson ' + estimatedendson);
                //console.log('endedon ' + endedon);
            }
            //console.log('allCards: ', cards);

        }, function errorCallback(response) {
        });
    }
    


});