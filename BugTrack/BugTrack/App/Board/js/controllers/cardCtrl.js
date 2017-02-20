angular.module('app').controller('cardCtrl', function (cardFactory, $scope) {

    this.isEditing = false;
    this.editingCard = null;
    this.aisha = "Hello from Aisha";
    this.isShowing = false;
    this.selectedCard = null;

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
    };

    this.editCard = function (card) {
        this.isEditing = true;
        this.editingCard = angular.copy(card);
        console.log("Editing card", card.id);
        //card.title = "Hello!";
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


});