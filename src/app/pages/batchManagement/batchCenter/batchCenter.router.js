'use strict';

var batchCenterRouter = {
    url: '/batchManagement/batchCenter',
    template: require('./batchCenter.html'),
    controller: 'BatchCenterController',
    controllerAs: 'vm',
    loginState: false,
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'batchCenter');

        return deferred.promise;
    }]
};

module.exports = batchCenterRouter;
