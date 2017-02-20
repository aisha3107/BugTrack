angular.module('app').controller('modalCtrl', function (cardFactory, $scope) {

    this.isEditing = false;
    this.editingCard = null;

    this.deleteCard = function (card) {
        cardFactory.deleteCard(card);
    };

    this.editCard = function (card) {
        this.isEditing = true;
        this.editingCard = angular.copy(card);
        console.log("Editing card", card.id);
    };

    this.updateCard = function () {
        cardFactory.updateCard(this.editingCard);
        this.editingCard = null;
        this.isEditing = false;
    };
    
});