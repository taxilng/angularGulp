'use strict';

var aaaRouter = {
    url: '/cashierdesk/aaa',
    template: require('./aaa.html'),
    controller: 'AaaController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'aaa');

        return deferred.promise;
    }]
};

module.exports = aaaRouter;
