'use strict';

var cashierdeskCenterRouter = {
    url: '/cashierdesk/cashierdeskCenter',
    template: require('./cashierdeskCenter.html'),
    controller: 'CashierdeskCenterController',
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
        }, 'cashierdeskCenter');

        return deferred.promise;
    }]
};

module.exports = cashierdeskCenterRouter;
