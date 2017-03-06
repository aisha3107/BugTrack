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

            //console.log('tasks for the ' + id + ' board:', response.data.Tasks);
            myCards = response.data.Tasks;
            //console.warn('response', response.data);
            

            for (var i = 0; i < response.data.Tasks.length; i++) {
                startedon = response.data.Tasks[i].ProjectTaskStartedOn;
                endedon = response.data.Tasks[i].ProjectTaskEndedOn;
                estimatedendson = response.data.Tasks[i].ProjectTaskEstimatedEndsOn;
                
                if (startedon == null) {
                    startedon = '';
                }
                if (endedon == null) {
                    endedon = '';
                }
                if (estimatedendson == null) {
                    estimatedendson = '';
                }

                if (startedon != null) {
                    var date = startedon;
                    var day = date.substring(8, 10);
                    var month = date.substring(5, 7);
                    var year = date.substring(0, 4);
                    today = year + "-" + month + "-" + day;
                }

                if (endedon != null) {
                    var endeddate = endedon;
                    var day = endeddate.substring(8, 10);
                    var month = endeddate.substring(5, 7);
                    var year = endeddate.substring(0, 4);
                    var ended = year + "-" + month + "-" + day;
                }
                if (estimatedendson != null) {
                    var estimateddate = estimatedendson;
                    var day = estimateddate.substring(8, 10);
                    var month = estimateddate.substring(5, 7);
                    var year = estimateddate.substring(0, 4);
                    var estimated = year + "-" + month + "-" + day;
                }

                cards.push({
                    id: response.data.Tasks[i].TaskId,
                    title: response.data.Tasks[i].ProjectTaskTitle,
                    list_id: id,
                    description: response.data.Tasks[i].ProjectTaskDescription,
                    statusid: response.data.Tasks[i].ProjectTaskStatusId,
                    statusname: response.data.Tasks[i].ProjectTaskStatusTitle,
                    tasktypeid: response.data.Tasks[i].ProjectTaskTypesId,
                    tasktypename: response.data.Tasks[i].ProjectTaskTypesTitle,
                    assigneduserid: response.data.Tasks[i].ProjectTaskAssignedUserId,
                    completedPercent: response.data.Tasks[i].ProjectTaskCompletedPercent,
                    startedon: new Date(today),
                    estimatedendson: new Date(estimated), 
                    endedon: new Date(ended),
                    //StartedOn: response.data.Tasks[i].ProjectTaskStartedOn,
                    //EstimatedEndsOn: response.data.Tasks[i].ProjectTaskEstimatedEndsOn,
                    //EndedOn: response.data.Tasks[i].ProjectTaskEndedOn,
                    createdon: response.data.Tasks[i].ProjectTaskCreatedOn,
                    projectid: response.data.Tasks[i].ProjectId

                });
                //console.log('response cards', cards[i]);
                //console.log('startedon ' + startedon);
                //console.log('estimatedendson ' + estimatedendson);
                //console.log('endedon ' + endedon);
                
            }
            //console.log('allCards: ', cards);

        }, function errorCallback(response) {
        });
    }

    
    
    //window.onload = addListeners();

    //function addListeners(){
    //    document.getElementById('dxy').addEventListener('mousedown', mouseDown, false);
    //    window.addEventListener('mouseup', mouseUp, false);
    //}

    //function mouseUp()
    //{
    //    window.removeEventListener('mousemove', divMove, true);
    //}

    //function mouseDown(e){
    //    window.addEventListener('mousemove', divMove, true);
    //    console.log('task selected');
    //}

    //function divMove(e) {
    //    var div = document.getElementById('dxy');
    //    div.style.position = 'absolute';
    //    div.style.top = e.clientY + 'px';
    //    div.style.left = e.clientX + 'px';
    //    console.log('Position X = ' + e.clientX + ', Y = ' + e.clientY);
    //}









    //var selected = null, // Object of the element to be moved
    //x_pos = 0, y_pos = 0, // Stores x & y coordinates of the mouse pointer
    //x_elem = 0, y_elem = 0; // Stores top, left values (edge) of the element

    //// Will be called when user starts dragging an element
    //function _drag_init(elem) {
    //    // Store the object of the element which needs to be moved
    //    selected = elem;
    //    x_elem = x_pos - selected.offsetLeft;
    //    y_elem = y_pos - selected.offsetTop;
    //}

    //// Will be called when user dragging an element
    //function _move_elem(e) {
    //    x_pos = document.all ? window.event.clientX : e.pageX;
    //    y_pos = document.all ? window.event.clientY : e.pageY;
    //    if (selected !== null) {
    //        selected.style.left = (x_pos - x_elem) + 'px';
    //        selected.style.top = (y_pos - y_elem) + 'px';
    //    }
    //}

    //// Destroy the object when we are done
    //function _destroy() {
    //    selected = null;
    //}

    //// Bind the functions...
    //document.getElementById('firstcard').onmousedown = function () {
    //    _drag_init(this);
    //    return false;
    //};

    //document.onmousemove = _move_elem;
    //document.onmouseup = _destroy;



});