angular.module('app')
       .component('myModal', {
           //controller: function (cardFactory, $scope) {
           //    this.show = function () {
           //    }
           //},
           controller: (function () {
               //var self;
               cards = [];////
               function ctrl($http, $scope) {
                   self = this;
                   this.$http = $http;
                   this.$scope = $scope;
               }

               //ctrl.prototype.init = function (id) {////
               //    updateTask(updatingCard);
               //    //console.log('list\'s id: ', id);
               //};

               ctrl.prototype.$onInit = function () {
                   //console.warn(self);
               }

               ctrl.prototype.show = function () {
                   console.log('selected task', this);
               }

               ctrl.prototype.getUsers = function () {
                   var self = this;
                   console.log('called getUsers', self);
                   self.$http({
                       method: 'GET',
                       url: '/api/AspNetUsers'
                   }).then(function successCallback(response) {
                       //console.log('users', response.data);
                       self.Users = [];
                       for (var i = 0; i < response.data.length; i++) {
                           self.Users.push({
                               id: response.data[i].Id,
                               username: response.data[i].UserName
                           });
                           //console.log('User ' + i, self.Users[i].username);
                       }
                       //console.log('Users', self.Users);
                   }, function errorCallback(response) {
                   });
               }

               ctrl.prototype.updateTask = function (task) {
                   var self = this;
                   //var card = _.findWhere(cards, { id: updatingCard.id });
                   //UpdateTask = function();

                   console.log(self.task);
                   var card = {
                       title: self.task.title,
                       list_id: self.task.list_id,
                       Id: self.task.id,
                       StatusId: self.task.statusid,
                       TaskTypeId: self.task.tasktypeid,
                       StartedOn: self.task.startedon,
                       EndedOn: self.task.endedon,
                       EstimatedEndsOn: self.task.estimatedendson,
                       //StartedOn: self.task.StartedOn,
                       //EndedOn: self.task.EndedOn,
                       //EstimatedEndsOn: self.task.EstimatedEndsOn,
                       ProjectId: self.task.projectid,
                       //ParentTaskId: self.task.ParentTaskId,
                       //CreatedBy: self.task.CreatedBy,
                       AssignedUserId: self.task.assigneduserid,
                       CompletedPercent: self.task.completedPercent,
                       Description: self.task.description,
                       CreatedOn: self.task.createdon
                   };
                   console.warn('~~~current card~~~', card);

                   ////this.$http.get('/api/ProjectTasks/' + card.Id).then(function (response) {
                       
                       this.$http({
                           method: 'PUT',
                           url: '/api/ProjectTasks/' + card.Id,
                           data: card
                       }).then(function successCallback(response) {
                           console.log('CARD after updating', card);
                           alert("Task Updated Successfully !!!");
                       }, function errorCallback(response) {
                           alert("Error : " + response.data.ExceptionMessage);
                       });
                   //});

               }

               ctrl.prototype.statuses = [
                    { id: 1, text: 'В работе' },
                    { id: 2, text: 'На тестировании у аналитика' },
                    { id: 3, text: 'Протестировано' },
                    { id: 4, text: 'Принято заказчиком' },
                    { id: 5, text: 'Запланировано' }
               ];

               ctrl.prototype.types = [
                   { id: 1, text: 'Feature' },
                   { id: 2, text: 'Bug' }
               ];

               return ctrl;
           })(),
           templateUrl: 'Modal.html',
           bindings: {
               task: '<',
               users: '<',
           }
       });

//data-id="' + card.id + '"


//var doButtonPress = function () {
//    alert($(this).data('id'));
//}

//$(".edit").click(doButtonPress);



//'<tr><td>Тип:</td><td>' +
//                 '<select name="TaskTypeName" id="TaskTypeName" style="width:240px" class="form-control" ng-model="$ctrl.taskTypeId"' +
//                 'ng-options="item.id as item.text for item in $ctrl.types" ng-value="data3.TaskTypeName" required>' +
//                 '<option value="">{{$ctrl.taskFeature}}</option></select></td></tr>' +
//                 '<tr><td>ParentTask: </td><td>' +
//                 '<select name="ParentTaskName" id="ParentTaskName" ng-model="$ctrl.ParentTaskId"' +
//                 'class="form-control" ng-options="item.id as item.title for item in $ctrl.ParentTasks"ng-value="$ctrl.data4.id" required>' +
//                 '<option value="">Выберите родительское задание...</option></select></td></tr>





//modal taked from http://jsfiddle.net/kumarmuthaliar/GG9Sa/1/







//'<table id="taskForm" style="line-height:40px">' +
//             '<tr><td>Задание:</td>' +
//             '<td><input type="text" name="Title" style="width:240px" class="form-control" ng-model="Title" required /></td></tr>' +
//             '<tr><td>Описание:</td>' +
//             '<td><textarea rows="2" cols="36" name="Description" ng-model="$ctrl.Description"></textarea>' +
//'</td></tr></table>',