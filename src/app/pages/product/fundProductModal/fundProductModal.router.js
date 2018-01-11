'use strict';

var fundProductModalRouter = {
    url: '/product/fundProductModal',
    template: require('./fundProductModal.html'),
    controller: 'FundProductModalController',
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
        }, 'fundProductModal');

        return deferred.promise;
    }]
};

module.exports = fundProductModalRouter;
