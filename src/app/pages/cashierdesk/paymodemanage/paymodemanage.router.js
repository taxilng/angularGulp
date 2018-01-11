'use strict';

var paymodemanageRouter = {
    url: '/cashierdesk/paymodemanage',
    template: require('./paymodemanage.html'),
    controller: 'PaymodemanageController',
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
        }, 'paymodemanage');

        return deferred.promise;
    }]
};

module.exports = paymodemanageRouter;
