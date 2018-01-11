'use strict';

var fundManagerManageRouter = {
    url: '/product/fundManagerManage',
    template: require('./fundManagerManage.html'),
    controller: 'FundManagerManageController',
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
        }, 'fundManagerManage');

        return deferred.promise;
    }]
};

module.exports = fundManagerManageRouter;
