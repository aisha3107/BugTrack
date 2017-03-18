var demoController = function () {

    var ctrl = this;

    this.pageData = {};

    this.pageData.allItems = [
      {
          itemId: 6,
          itemText: "Six",
          listIndex: 0,
          status: 0
      }, {
          itemId: 17,
          itemText: "Seventeen",
          listIndex: 1,
          status: 0
      }, {
          itemId: 18,
          itemText: "Eighteen",
          listIndex: 2,
          status: 0
      }, {
          itemId: 7,
          itemText: "Seven",
          listIndex: 0,
          status: 1
      }, {
          itemId: 44,
          itemText: "Forty Four",
          listIndex: 1,
          status: 1
      }, {
          itemId: 4,
          itemText: "Four",
          listIndex: 2,
          status: 1
      }, {
          itemId: 41,
          itemText: "Forty One",
          listIndex: 3,
          status: 0
      }, {
          itemId: 2,
          itemText: "Two",
          listIndex: 1,
          status: 2
      }, {
          itemId: 16,
          itemText: "Sixteen",
          listIndex: 2,
          status: 2
      }
    ];

    this.distributeItems = function () {

        this.pageData.redItems = this.pageData.allItems.filter(function (p) {
            return p.status === 0;
        });

        this.pageData.amberItems = this.pageData.allItems.filter(function (p) {
            return p.status === 1;
        });

        this.pageData.greenItems = this.pageData.allItems.filter(function (p) {
            return p.status === 2;
        });

    };

    this.updateStatus = function (id, status) {
        var item = this.pageData.allItems.filter(function (p) {
            return p.itemId === +id;
        })[0];
        item.status = status;
    };

    this.updateIndexes = function () {

        function getIndex(el) {
            for (var i = 0; el = el.previousElementSibling; i++);
            return i;
        }

        for (var i = 0; i < this.pageData.allItems.length; i++) {
            var id = this.pageData.allItems[i].itemId;
            var index = getIndex(document.getElementById(id));
            this.pageData.allItems[i].listIndex = index;
        }
    };

    this.logging = function () {
        console.log('All Items:');
        console.log(this.pageData.allItems);
        console.log('Reds:');
        console.log(this.pageData.redItems);
        console.log('Ambers:');
        console.log(this.pageData.amberItems);
        console.log('Greens:');
        console.log(this.pageData.greenItems);
    };

    this.distributeItems();

    var drake = dragula({
        containers: [document.querySelector('#red'), document.querySelector('#amber'), document.querySelector('#green')],
        revertOnSpill: true,
        mirrorContainer: document.body,
        ignoreInputTextSelection: true
    });

    drake.on('over', function (el, container, source) {
        if (container.id === 'green' && container.children.length > 2 && source.id !== 'green') {
            document.querySelector('.gu-mirror').className += ' no-drop';
        }
    });

    //function updateMyObject(elementId, listId) {
    //    // update the object here, for example:
    //    if (listId === 'firstList') {
    //        // use the element id to find the item in your object and update it
    //        myDataObject.filter(function (x) {
    //            return x.id === elementId;
    //        })[0].propertyToUpdate = listId;
    //    }
    //}

    drake.on('out', function (el, container, source) {
        document.querySelector('.gu-mirror').className = 'gu-mirror';
    });

    drake.on('drop', function (el, target, source, sibling) {

        if (target.id === 'green' && target.children.length > 3) {
            drake.cancel();
        }

        function newStatus(target) {
            switch (target.id) {
                case 'red': return 0;
                case 'amber': return 1;
                case 'green': return 2;
            }
        }

        ctrl.updateStatus(el.id, newStatus(target));
        ctrl.updateIndexes();
        ctrl.distributeItems();
        ctrl.logging();

    });

    //drake.on('drop', function (el, target, source, sibling) {
    //    var elementId = el.id;
    //    updateMyObject(el.id, target.id);
    //});

};

angular
  .module('app', [])
  .controller('demoController', demoController);