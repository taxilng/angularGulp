'use strict';

var cashierdeskModalRouter = {
    url: '/cashierdesk/cashierdeskModal',
    template: require('./cashierdeskModal.html'),
    controller: 'CashierdeskModalController',
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
        }, 'cashierdeskModal');

        return deferred.promise;
    }]
};

module.exports = cashierdeskModalRouter;
