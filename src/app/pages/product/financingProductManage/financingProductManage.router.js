'use strict';

var financingProductManageRouter = {
    url: '/product/financingProductManage',
    template: require('./financingProductManage.html'),
    controller: 'FinancingProductManageController',
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
        }, 'financingProductManage');

        return deferred.promise;
    }]
};

module.exports = financingProductManageRouter;
