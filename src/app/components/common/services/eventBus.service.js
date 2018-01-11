'use strict';

module.exports = function EventBusService($rootScope, CircularListService) {
    var events, subs, _maxEvents;

    events = CircularListService.create(_maxEvents);
    subs = {};
    _maxEvents = 10;

    var service = {
        setEvent: setEvent,                 // 设置事件
        getEvent: getEvent,                 // 获取事件
        publish: publish,                   // 发布事件
        subscribe: subscribe,               // 订阅事件
        unsubscribe: unsubscribe,           // 取消订阅事件
        getAll: getAll,                     // 获取时间列表中事件
        removeAll: removeAll                // 删除时间列表中事件
    };

    return service;

    function setEvent(channel, name, args) {
        events.add({
            channel: channel,
            name: name,
            args: args
        });
    }

    function getEvent(channel, name) {
        var index = events.get({
            channel: channel,
            name: name
        });

        if(index === -1) {
            return index;
        }

        var eventList = events.getAll();

        return eventList[index];
    }

    function publish(channel, name, args) {
        events.add({
            channel: channel,
            name: name,
            args: args
        });

        var eventName = channel + '.' + name;

        $rootScope.$broadcast(eventName, args);
    }

    function subscribe(channel, name, callback) {
        var sub, eventName;

        sub = subs[channel] || {};
        eventName = channel + '.' + name;

        // unregister the event
        if (typeof sub[eventName] === 'function') {
            sub[eventName]();
        }

        sub[eventName] = $rootScope.$on(eventName, callback);
        subs[channel] = sub;

        return subs;
    }

    function unsubscribe(channel, name) {
        var eventName;
        eventName = channel + '.' + name;

        if (subs[channel] && subs[channel][eventName]) {
            subs[channel][eventName]();             // unregister the event
            delete subs[channel][eventName];        // delete subs[channel] attribute eventName
        }

        if (subs[channel] === {}) {
            return delete subs[channel];            // delete subs[channel]
        }

    }

    function getAll() {
        return events.getAll();
    }

    function removeAll() {
        return events.removeAll();
    }
};
