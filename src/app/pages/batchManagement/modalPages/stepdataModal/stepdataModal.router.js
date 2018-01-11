'use strict';

var stepdataModalRouter = {
    url: '/batchManagement/modalPages/stepdataModal',
    template: require('./stepdataModal.html'),
    controller: 'StepdataModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'stepdataModal');

        return deferred.promise;
    }]
};

module.exports = stepdataModalRouter;
