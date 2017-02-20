//взято из index.html модалки на ng-template

<script type="text/ng-template" id="Editor">
                            <!--Content of the modal window-->
                            <div id="EditModal"><!--ng-controller="modalCtrl as modalCtrl"-->
                                <form class="form-horizontal" role="form" ng-submit="addNew()" name="TaskForm">
                                    <table id="taskForm" style="line-height:40px">

                                        <tr>
                                            <td>Задание:</td>
                                            <td>
                                                <input type="text" name="Title" style="width:323px"
                                                       class="form-control" close-editing required
is-editing='cardCtrl.isEditing'
ng-model="cardCtrl.aisha" /><!--cardCtrl.editingCard.title-->
</td>
</tr>

<tr>
<td>Описание:</td>
<td>
    <textarea rows="2" cols="36" name="Description"
ng-model="$ctrl.Description"></textarea>
</td>
</tr>

<!--<tr>
<td>Выполнит:</td>
<td>
    <select name="AssignedUserId"
id="AssignedUserId"
ng-model="$ctrl.AssignedUserId"
                                                        class="form-control"
                                                        ng-options="item.id as item.username for item in $ctrl.Users"
ng-value="data3.AssignedUserName">
<option value="">Выберите пользователя...</option>
</select>
</td>
</tr>

<tr>
<td>Старт:</td>
<td>
    <input type="date" id="StartedOn" name="StartedOn" style="width:240px"
                                                       class="form-control" ng-model="$ctrl.StartedOn" value="" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Планируемое окончание:</td>
                                            <td>
                                                <input type="date" id="EstimatedEndsOn" name="EstimatedEndsOn" style="width:240px"
                                                       class="form-control" ng-model="$ctrl.EstimatedEndsOn" value="" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Окончание:</td>
                                            <td>
                                                <input type="date" id="EndedOn" name="EndedOn" style="width:240px"
                                                       class="form-control" ng-model="$ctrl.EndedOn" value="" />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Прогресс:</td>
                                            <td>
                                                <input type="text" name="CompletedPercent" style="width:240px"
                                                       class="form-control" ng-model="$ctrl.CompletedPercent"
value="" pattern="^[0-9]{1,2}$" />
</td>
</tr>

<tr>
<td>Статус:</td>
<td>
    <select name="StatusName"
id="StatusName"
ng-model="$ctrl.statusId"
                                                        class="form-control"
                                                        ng-options="item.id as item.text for item in $ctrl.statuses"
ng-value="data3.StatusName" required>
<option value>{{$ctrl.ttboeno}}</option>
</select>
</td>
</tr>

<tr>
<td>Тип:</td>
<td>
    <select name="TaskTypeName"
id="TaskTypeName"
style="width:240px"
                                                        class="form-control"
                                                        ng-model="$ctrl.taskTypeId"
ng-options="item.id as item.text for item in $ctrl.types"
ng-value="data3.TaskTypeName" required>
<option value="">{{$ctrl.taskFeature}}</option>
</select>
</td>
</tr>

<tr>
<td>ParentTask: </td>
<td>
    <select name="ParentTaskName"
id="ParentTaskName"
ng-model="$ctrl.ParentTaskId"
                                                        class="form-control"
                                                        ng-options="item.id as item.title for item in $ctrl.ParentTasks"
ng-value="$ctrl.data4.id" required>
<option value="">Выберите родительское задание...</option>
</select>
</td>
</tr>-->
</table>
<br />
<div id="footerForm">
    <div class="inline">
        <input id="btnSave" type="button" value="Save" class="btn btn-primary" ng-click="save()" />
    </div>
    <div class="inline">
        <input id="btnCancel" type="button" value="Cancel" class="btn btn-primary" />  <!--ng-click="cancel()"-->
    </div>
</div>
</form>
</div>
</script>