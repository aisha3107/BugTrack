﻿angular.module('app').factory('listFactory', function () {
    var service = {};

    lists = [];
    arr = [];

    service.getLists = function () {
        return lists;
    };

    service.addList = function (listName) {
        lists.push({
            id: _.uniqueId('list_'),
            listName: listName
        });
    };

    service.removeList = function (list) {
        _.pull(lists, list);
    };

    return service;
});