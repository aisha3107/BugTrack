angular.module('app')
       .component('myModal', {
           //controller: function (cardFactory, $scope) {
           //    this.show = function () {
           //        console.log('china', this.task);
           //    }
           //},
           controller: (function(){
               function ctrl() {

               }

               //ctrl.prototype.$onInit() = function () {
               //    console.log('12');
               //}

               ctrl.prototype.show = function () {
                   console.log('selected task', this);
               }

               return ctrl;
           })(),
           template: '<a href="#openModal">edit</a>' +
                     '<div id="openModal" class="modalDialog" item="$ctrl.editCard(data)"><div>' +
                     '<a href="#close" title="Close" class="close">X</a>' +
                     '<h2>Modal Box</h2>' +
                     '<table id="taskForm">' +
                     '<tr><td>Задание:</td>' +
                     '<td><input type="text" name="Title" style="width:240px" class="form-control" ng-model="$ctrl.task.title" required /></td></tr>' +
                     '<tr><td>Описание:</td>' +
                     '<td><textarea rows="2" cols="36" name="Description" ng-model="$ctrl.task.description" style="width:240px"></textarea></td></tr>' +
                     '<tr><td>Выполнит:</td><td>' +
                     '<select name="AssignedUserId" id="AssignedUserId" ng-model="$ctrl.task.assigneduserid" style="width:240px"' +
                     'class="form-control" ng-options="item.id as item.username for item in $ctrl.Users" ng-value="data3.AssignedUserName">' +
                     '<option value="">Выберите пользователя...</option></select></td></tr>' +
                     '<tr><td>Старт:</td><td>' +
                     '<input type="date" id="StartedOn1" name="StartedOn" style="width:240px" class="form-control" ng-model="$ctrl.task.startedon" value="" />' +
                     '<tr><td>Планируемое окончание:</td><td>' +
                     '<input type="date" id="EstimatedEndsOn1" name="EstimatedEndsOn" style="width:240px" class="form-control" ng-model="$ctrl.task.estimatedendson" value="" />' +
                     '</td></tr><tr><td>Окончание:</td><td>' +
                     '<input type="date" id="EndedOn1" name="EndedOn" style="width:240px" class="form-control" ng-model="$ctrltask.endedon" value="" />' +
                     '</td></tr><tr><td>Прогресс:</td><td>' +
                     '<input type="text" name="CompletedPercent" style="width:240px" class="form-control" ng-model="$ctrl.task.completedPercent" value="" pattern="^[0-9]{1,2}$" />' +
                     '</td></tr><tr><td>Статус:</td><td>' +
                     '<select name="StatusName" id="StatusName" ng-model="$ctrl.task.statusname" class="form-control" style="width:240px"' +
                     'ng-options="item.id as item.text for item in $ctrl.statuses" ng-value="data3.StatusName" required>' +
                     '<option value>{{$ctrl.ttboeno}}</option></select></td></tr>' +
                     '</table>' +
                     '<input type="button" value="Save" ng-click="$ctrl.show()" style="height:40px; width=200px; align:right"/>' +
                     '<input type="button" value="Cancel" style="height:40px; width=200px; align:right"/>' +
                     '</div></div>',
           bindings: {
               task: '<'
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