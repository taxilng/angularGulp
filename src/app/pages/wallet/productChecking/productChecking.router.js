'use strict';

var productCheckingRouter = {
    url: '/wallet/productChecking',
    template: require('./productChecking.html'),
    controller: 'ProductCheckingController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'productChecking');

        return deferred.promise;
    }]
};

module.exports = productCheckingRouter;
