'use strict';

var _ = require('lodash');

module.exports = function CircularListService() {
    var service = {
        create: create
    };

    return service;

    function create(capacity) {
        var index, list, id;

        list = [];
        index = 0;
        id = -1;
        return {
            add: function(obj) {
                id = _.findIndex(list, function(item) {
                    return item.channel == obj.channel && item.name == obj.name;
                });

                if(id === -1) {
                    index = (index + 1) % capacity;
                }

                list[index] = obj;

                return index;
            },
            get: function(obj) {
                id = _.findIndex(list, function(item) {
                    return item.channel == obj.channel && item.name == obj.name;
                });

                return id;
            },
            getAll: function() {
                var l, _ref, _ref1;

                l = list.slice(index);
                [].splice.apply(l, [(_ref = l.length), 9e9].concat(_ref1 = list.slice(0, index))), _ref1;
                return l;
            },
            removeAll: function() {
                list = [];
                index = 0;
                return list;
            }
        };
    }
};
