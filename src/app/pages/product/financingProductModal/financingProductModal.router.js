'use strict';

var financingProductModalRouter = {
    url: '/product/financingProductModal',
    template: require('./financingProductModal.html'),
    controller: 'FinancingProductModalController',
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
        }, 'financingProductModal');

        return deferred.promise;
    }]
};

module.exports = financingProductModalRouter;
