'use strict';

var transactiontypeManageRouter = {
    url: '/cashierdesk/transactiontypeManage',
    template: require('./transactiontypeManage.html'),
    controller: 'TransactiontypeManageController',
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
        }, 'transactiontypeManage');

        return deferred.promise;
    }]
};

module.exports = transactiontypeManageRouter;
