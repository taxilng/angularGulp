'use strict';

var productCenterRouter = {
    url: '/product/productCenter',
    template: require('./productCenter.html'),
    controller: 'ProductCenterController',
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
        }, 'productCenter');

        return deferred.promise;
    }]
};

module.exports = productCenterRouter;
