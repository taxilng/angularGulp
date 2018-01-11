'use strict';

var fundProductManageRouter = {
    url: '/product/fundProductManage',
    template: require('./fundProductManage.html'),
    controller: 'FundProductManageController',
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
        }, 'fundProductManage');

        return deferred.promise;
    }]
};

module.exports = fundProductManageRouter;
