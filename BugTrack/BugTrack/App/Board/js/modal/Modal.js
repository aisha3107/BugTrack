angular.module('app')
       .component('myModal', {
           //controller: function (cardFactory, $scope) {
           //    this.show = function () {
           //        console.log('china', this.task);
           //    }
           //},
           controller: (function () {
               var self;
               function ctrl($http) {
                   self = this;
                   this.$http = $http;
               }



               ctrl.prototype.$onInit = function () {
                   console.warn(self);
               }

               ctrl.prototype.show = function () {
                   console.log('selected task', this);
               }

               ctrl.prototype.getUsers = function () {
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

               //ctrl.prototype.updateTask = function (updatingCard) {
               //    var card = _.findWhere(cards, { id: updatingCard.id });

               //    card = {
               //        title: updatingCard.title,
               //        list_id: updatingCard.list_id,
               //        Id: updatingCard.id,
               //        StatusId: updatingCard.StatusId,
               //        TaskTypeId: updatingCard.TaskTypeId,
               //        StartedOn: updatingCard.StartedOn,
               //        EndedOn: updatingCard.EndedOn,
               //        EstimatedEndsOn: updatingCard.EstimatedEndsOn,
               //        ProjectId: updatingCard.ProjectId,
               //        ParentTaskId: updatingCard.ParentTaskId,
               //        CreatedBy: updatingCard.CreatedBy,
               //        AssignedUserId: updatingCard.AssignedUserId,
               //        CompetedPercent: updatingCard.CompetedPercent,
               //        CreatedOn: updatingCard.CreatedOn,
               //        Description: updatingCard.Description,
               //    };
               //    console.warn('~~~current card~~~', card);
               //}

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