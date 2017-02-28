angular.module('app').controller('cardCtrl', function (cardFactory, $scope, $http) {

    this.isEditing = false;
    this.editingCard = null;
    this.aisha = "Hello from Aisha";
    this.isShowing = false;
    this.selectedCard = null;
    this.Users = [];
    var self = this;

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
    };

    this.editCard = function (card) {
        this.isEditing = true;
        this.editingCard = angular.copy(card);
        console.log("Editing card", card.id);
        console.log("Editing card detailed", card);
        getUsers();
    };

    this.updateCard = function () {
        cardFactory.updateCard(this.editingCard);
        this.editingCard = null;
        this.isEditing = false;
    };

    this.hello = function (card) {
        alert("card was clicked twice! TaskId = " + card.id);
        //this.selectedCard = card;
        //console.log("cards", card.id);
    };

    function getUsers() {
        $http({
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


    
});