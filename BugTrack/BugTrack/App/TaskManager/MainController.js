var ctrl = (function () {

    function ctrl() {
    }

    return ctrl;
})();

app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    var self = this;
    this.statusId = null;
    this.StartedOn = null;
    this.taskTypeId = null;
    this.selectedNode = null;
    this.data2 = null;
    this.dataFlat = [];
    this.ParentTaskId = null;
    this.CorrespondingTasks = null;
    this.data3 = null;
    this.selectedTask = null;
    this.test = null;
    this.data4 = {};
    this.projectNotSelected = true;
    this.taskNotSelected = true;
    this.createParent = null;
    this.EndedOn = null;
    this.EstimatedEndsOn = null;
    this.CreatedOn = null;
    this.Description = null;

    this.flatList = null;

    this.CompletedPercent = null;
    this.AssignedUserId = null;

    //this.updatedData = null;


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



    $http({
        method: 'GET',
        url: '/api/Projects/?IsIncludeNodes=true'
    }).then(function successCallback(response) {
        //console.log("Projects: " + response);
        $scope.data = response.data;

        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an erroroccurs
        // or server returns response with an error status.
    });


    //this.showHide = function(element_id) {
    //    //Если элемент с id-шником element_id существует
    //    if (document.getElementById(element_id)) {
    //        //Записываем ссылку на элемент в переменную obj
    //        var obj = document.getElementById(element_id);
    //        //Если css-свойство display не block, то: 
    //        if (obj.style.display != "block") {
    //            obj.style.display = "block"; //Показываем элемент
    //        }
    //        else obj.style.display = "none"; //Скрываем элемент
    //    }
    //        //Если элемент с id-шником element_id не найден, то выводим сообщение
    //    else alert("Элемент с id: " + element_id + " не найден!");
    //};

    this.processData = function (data) {
        for (var i = 0; i < data.length; i++) {
            data[i].subTasks = [];
            if (data[i].ParentTaskId != null) {
                var index = -1;
                for (var j = 0; j < data.length; j++) {
                    if (data[j].Id == data[i].ParentTaskId) index = j;
                }
                if (index != -1) {
                    data[index].subTasks.push(data[i]);
                }
            }
        }
        var tmp = [];

        if (self.selectedNode != null) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].ParentTaskId == null) {
                    //console.log('data[i].ProjectId', data[i].ProjectId);
                    //console.log('self.selectedNode', self.selectedNode);

                    ////writes all tasks for the corresponding project 
                    if (data[i].ProjectId == self.selectedNode) {
                        tmp.push(data[i]);
                    }
                }
            }
        }

        //var numbers = [];
        //for (var i = 0; i < data.length; i++) {
        //    numbers.push(tmp[i].Id);
        //    console.log('tmp[i]', tmp);
        //}
        //console.log('aaaaaaaaaaa', numbers);

        console.log('test', tmp);
        return tmp;
    }

    //$http.get('/api/ProjectTasks')
    //        .then(function (response) {
    //            self.data2 = self.processData(response.data);
    //            console.log("data2: ", self.data2);

    //            //calling for all tasks in a list
    //            self.ParentTasks = [];
    //            self.ParaTasks = [];

    //            //for (var i = 0; i < response.data.length; i++) {
    //            //    self.ParentTasks.push({
    //            //        id: response.data[i].Id,
    //            //        title: response.data[i].Title
    //            //    });                    
    //            //}

    //            //$digest();
    //        }, function (response) {
    //            console.log(response)
    //        });



    $scope.$watch('abc.currentNode', function (newObj, oldObj) {
        if ($scope.abc && angular.isObject($scope.abc.currentNode)) {
            self.projectNotSelected = false;
            console.log('Node Selected!!');
            console.log($scope.abc.currentNode);
            $scope.selectedNode = $scope.abc.currentNode;
            self.selectedNode = $scope.selectedNode.Id;
            console.log('sel', self.selectedNode);
            $scope.loading = true;
            getUsers();






            /*$http({
                method: 'GET',
                url: '/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id
            }).then(function (response) {
                console.log("sooooop");
                console.log(response.data[0].Nodes);
                $scope.dataTasks = response.data[0].Nodes;
                console.log($scope.dataTasks)
                selectedNode = $scope.dataTasks[0].ProjectId;
                //    console.log("Selected node in the GET request: " + selectedNode);
            //    url: '/api/ProjectTasks/GetProjectTasksByProjectId?projectId=' + $scope.abc.currentNode.Id
            //}).then(function (response) {
            //    //console.log("sooooop");
            //    //console.log(response.data);
            //    $scope.dataTasks = response.data;
            //    //console.log($scope.dataTasks)

                //self.selectedNode = $scope.dataTasks.ProjectId;

                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            }).finally(function () {
                $scope.loading = false;
            });*/


            getList();

            //$http.get('/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id)
            //.then(function (response) {
            //    console.log("data2: " + response);
            //    self.data2 = self.processData(response.data)[0].Nodes;
            // }, function (response) {
            //    console.log(response)
            //});

            getDirectList();

        }
    }, false);



    $scope.cleanout = function () {
        $scope.Title = "";
        //$scope.AssignedUserId = "";
        self.StartedOn = "";
        self.EndedOn = "";
        self.EstimatedEndsOn = "";
        self.CompletedPercent = "";
        self.statusId = self.statuses[0];
        self.taskTypeId = self.types[0];
        self.ParentTaskId = self.ParentTasks[0];
        self.AssignedUserId = self.Users[0];
        self.Description = "";

        document.getElementById('StartedOn').value = null;
        document.getElementById('EndedOn').value = null;
        document.getElementById('EstimatedEndsOn').value = null;
    };



    $scope.create = function () {
        self.taskNotSelected = false;
        if (self.selectedTask != null) {
            $scope.cleanout();
            console.log("create is called and form cleaned");
            self.createParent = self.data3.Id;
            console.log("self.createParent", self.createParent);
            self.ParentTaskId = self.data3.Id;//ParentTask when create
            //self.statusId = self.statuses[4];
            //self.taskTypeId = self.types[0];
            self.ttboeno = self.statuses[4].text;
            self.taskFeature = self.types[0].text;
            self.selectedTask = null;
        }
    };



    $scope.addNew = function () {


    };

    $scope.save = function () {
        console.log('``````````selectedTask', self.selectedTask);
        if (self.selectedTask == null) {
            //CREATE()
            console.log('``````````create is called');

            alert("Add new called!");
            $scope.count++;
            //$scope.count++;

            console.log("Selected node in creation: " + self.selectedNode);
            var data = {
                Title: $scope.Title,
                StatusId: self.statusId,
                TaskTypeId: self.taskTypeId,
                StartedOn: self.StartedOn,
                EndedOn: self.EndedOn,
                EstimatedEndsOn: self.EstimatedEndsOn,
                ProjectId: self.selectedNode,
                ParentTaskId: self.ParentTaskId,
                //AssignedUserId: $scope.AssignedUserId
                AssignedUserId: self.AssignedUserId,
                UserId: $scope.UserId,
                CompletedPercent: self.CompletedPercent,
                Description: self.Description
            };


            console.log("addNew, data", data);

            $http.post('/api/ProjectTasks', data)
                .then(function (response) {
                    getList();
                    console.log(response)
                }, function (response) {
                    console.log(response)
                });
        }
        else {
            //UPDATE()
            console.log('``````````update is called');

            $scope.updateUser();
        }
    };


    function getUsers() {
        $http({
            method: 'GET',
            url: '/api/AspNetUsers'
        }).then(function successCallback(response) {
            console.log('users', response.data);
            self.Users = [];
            for (var i = 0; i < response.data.length; i++) {
                self.Users.push({
                    id: response.data[i].Id,
                    username: response.data[i].UserName
                });
            }
            console.log('Users', self.Users);
        }, function errorCallback(response) {
        });
    }

    function getList() {
        self.dataFlat = [];
        $http.get('/api/ProjectTasks/GetTasksHierarchyByProjectId?id=' + $scope.abc.currentNode.Id)
        .then(function (response) {
            //console.log("data2: " + response);
            self.data2 = null;
            self.data2 = self.processData(response.data)[0].Nodes;

            self.flatList = deepNodes(self.data2);
            console.log('flatList', self.flatList);

            //console.log("self.data2", self.data2);
            console.warn('~~~~~~~', deepNodes(self.data2));
            //for (let i = 0; i < self.data2.length; i++) {
            //    //console.warn('~~~~data: ', self.data2[i]);
            //    if (self.data2[i] != null) {
            //        self.dataFlat.push(self.data2[i].Title);
            //    }
            //    if (self.data2[i].Nodes != null) {
            //        for (let j = 0; j < self.data2[i].Nodes.length; j++) {
            //            if (self.data2[i].Nodes[j] != null)
            //             self.dataFlat.push(self.data2[i].Nodes[j].Title);
            //        }
            //    }
            //}


            // console.warn('~~~~~~~~~hey~~~: ', self.dataFlat);
        }, function (response) {
            console.log(response)
        });
    }

    function deepNodes(data) {
        let ldataFlat = [];
        //console.warn('````````', data);
        for (let i = 0; i < data.length; i++) {
            if (data[i] != null) {
                ldataFlat.push({
                    id: data[i].Id,
                    title: data[i].Title,
                    assigneduserid: data[i].AssignedUserId,
                    statusId: data[i].StatusId,
                    statusname: data[i].StatusName,
                    startedOn: data[i].StartedOn,
                    tasktypeid: data[i].TaskTypeId,
                    tasktypename: data[i].TaskTypeName
                });
            }

            if (data[i].Nodes != null) {
                for (let j = 0; j < data[i].Nodes.length; j++) {
                    ldataFlat.push({
                        id: data[i].Nodes[j].Id,
                        title: data[i].Nodes[j].Title,
                        assigneduserid: data[i].Nodes[j].AssignedUserId,
                        statusId: data[i].Nodes[j].StatusId,
                        statusname: data[i].Nodes[j].StatusName,
                        startedOn: data[i].Nodes[j].StartedOn,
                        tasktypeid: data[i].Nodes[j].TaskTypeId,
                        tasktypename: data[i].Nodes[j].TaskTypeName
                    });
                    if (data[i].Nodes[j].Nodes != null)
                        ldataFlat = ldataFlat.concat(deepNodes(data[i].Nodes[j].Nodes));
                }
            }
        }
        return ldataFlat;
    }


    function getDirectList() {
        $http.get('/api/ProjectTasks/GetProjectTasksByProjectId?projectId=' + $scope.abc.currentNode.Id)
    .then(function (response) {
        //calling for all tasks in select-option control
        self.ParentTasks = [];
        self.DirectTaskList = [];
        for (var i = 0; i < response.data.length; i++) {
            self.ParentTasks.push({
                id: response.data[i].Id,
                title: response.data[i].Title,
                statusid: response.data[i].StatusName,
                tasktypename: response.data[i].TaskTypeName,
                startedon: response.data[i].StartedOn,
                endedon: response.data[i].EndedOn,
                estimatedendson: response.data[i].EstimatedEndsOn,
                parenttaskid: response.data[i].ParentTaskId,
                completedpercent: response.data[i].CompletedPercent,
                description: response.data[i].Description,
                assigneduserid: response.data[i].AssignedUserId
            });
        }
        console.log('self.ParentTasks', self.ParentTasks);
        console.log('self.types', self.types);
        console.log('self.statuses', self.statuses);

        //console.log("my test log", self.data2);

        //for (var i = 0; i < response.data.length; i++) {
        //    self.DirectTaskList.push({
        //        id: response.data[i].Id,
        //        title: self.data2.Title,
        //        statusid: self.data2.StatusName,
        //        tasktypename: self.data2.TaskTypeName,
        //        startedon: self.data2.StartedOn,
        //        parenttaskid: self.data2.ParentTaskId
        //    });
        //}
        //console.log("self.DirectTaskList", self.DirectTaskList);

    }, function (response) {
        console.log(response)
    });
    }

    //watch for selected task
    $scope.$watch('def.currentNode', function (newObj, oldObj) {
        console.log('sel before task', self.selectedTask);
        //$scope.Title = '';
        //$scope.StartedOn = '';
        //$scope.StatusName = '';
        //$scope.TaskTypeName = '';
        if ($scope.def && angular.isObject($scope.def.currentNode)) {
            self.taskNotSelected = false;

            //console.log('Task Selected!!!', newObj);
            //console.log($scope.def.currentNode);
            $scope.selectedNode = $scope.def.currentNode;
            self.selectedTask = $scope.selectedNode.Id;
            self.CreatedOn = $scope.selectedNode.CreatedOn;
            console.log('$scope.selectedNode', $scope.selectedNode);
            $scope.readTask();
            $scope.loading = true;
        }
    }, false);


    //fill the form with data
    $scope.readTask = function () {
        console.log("Selected task to edit: " + self.selectedTask);

        $http.get('/api/ProjectTasks/' + $scope.def.currentNode.Id)
            .then(function (response) {
                self.data3 = response.data;
                self.startedon = self.data3.StartedOn;//"yyyy-MM-dd"
                self.endedon = self.data3.EndedOn;
                self.estimatedendson = self.data3.EstimatedEndsOn;
                self.completedpercent = self.data3.CompletedPercent;
                console.log('self.data3', self.data3);//2017-01-26T18:00:00\

                $scope.Title = self.data3.Title;
                //$scope.AssignedUserId = self.data3.AssignedUserName;
                self.AssignedUserId = self.data3.AssignedUserId;
                self.CompletedPercent = self.data3.CompletedPercent;
                self.Description = self.data3.Description;

                if (self.data3.StartedOn == null) {
                    self.startedon = '';
                    //console.log('Is empty');
                }
                if (self.data3.EndedOn == null) {
                    self.endedon = '';
                }
                if (self.data3.EstimatedEndsOn == null) {
                    self.estimatedendson = '';
                }


                if (self.data3.ParentTaskId != null) {
                    var parentid = self.data3.ParentTaskId;
                    console.log('parentid', parentid);
                    self.data4 = self.ParentTasks.filter(function (x) { return x.id == parentid; })[0];
                    console.log('selected object is: ', self.data4);
                    console.log('parent', self.data4);
                }
                else {
                    self.ParentTaskId = self.ParentTasks[0];
                }

                if (self.startedon != null) {
                    var date = self.startedon;
                    var day = date.substring(8, 10);
                    var month = date.substring(5, 7);
                    var year = date.substring(0, 4);
                    //console.log('day', day);
                    //console.log('month', month);
                    //console.log('year', year);
                    var today = year + "-" + month + "-" + day;

                    //self.StartedOn = new Date(year, month-1, day);//3.Date

                    document.getElementById('StartedOn').value = today;
                }
                if (self.endedon != null) {
                    var endeddate = self.endedon;
                    var day = endeddate.substring(8, 10);
                    var month = endeddate.substring(5, 7);
                    var year = endeddate.substring(0, 4);
                    var ended = year + "-" + month + "-" + day;

                    //self.StartedOn = new Date(year, month-1, day);//3.Date

                    document.getElementById('EndedOn').value = ended;
                }
                if (self.estimatedendson != null) {
                    var estimateddate = self.estimatedendson;
                    var day = estimateddate.substring(8, 10);
                    var month = estimateddate.substring(5, 7);
                    var year = estimateddate.substring(0, 4);
                    var estimated = year + "-" + month + "-" + day;

                    //self.StartedOn = new Date(year, month-1, day);//3.Date

                    document.getElementById('EstimatedEndsOn').value = estimated;
                }

                self.statusId = self.data3.StatusId;//4.Status 
                self.taskTypeId = self.data3.TaskTypeId;//5.Type

                self.ParentTaskId = self.data4.id;//6.ParentTask
                $scope.data3 = self.data3;
                console.log('selected task', self.data3);
            }, function (response) {
                console.log(response)
            });

    };


    $scope.updateUser = function (task) {
        console.log('Update is called');
        var task = {
            Id: self.selectedTask,
            Title: $scope.Title,
            StatusId: self.statusId,
            TaskTypeId: self.taskTypeId,
            StartedOn: self.StartedOn,
            EndedOn: self.EndedOn,
            EstimatedEndsOn: self.EstimatedEndsOn,
            ProjectId: self.selectedNode,
            ParentTaskId: self.ParentTaskId,
            //UserId: self.data3.UserId,
            UserId: $scope.UserId,
            AssignedUserId: self.AssignedUserId,
            CompletedPercent: self.CompletedPercent,
            CreatedOn: self.CreatedOn,
            Description: self.Description
        };

        console.log("self.CreatedOn", self.CreatedOn);
        console.log('updated task:', task);
        console.log('self.selectedTask', self.selectedTask);
        //$http.put('/api/ProjectTasks/' + self.selectedTask, task)
        //    .then(function (response) {
        //        console.log(response)
        //    }, function (response) {
        //        console.log(response);
        //        console.log("noooooot successfully");
        //    });


        if ($scope.Title != null) {// && $scope.TaskTypeName != null && $scope.StatusName != null
            $http({
                method: 'PUT',
                url: '/api/ProjectTasks/' + self.selectedTask,
                data: task
            }).then(function successCallback(response) {

                getList();

                alert("Task Updated Successfully !!!");
            }, function errorCallback(response) {
                alert("Error : " + response.data.ExceptionMessage);
            });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    };


    $scope.remove = function (Id) {
        // /api/ProjectTasks/170
        $http.delete('/api/ProjectTasks/' + Id)
       .then(
           function (response) {
               // success callback
               console.log("Deleted successfully!");
               getList();
               $scope.cleanout();
           },
           function (response) {
               // failure call back
           }
        );
    };



}]);






