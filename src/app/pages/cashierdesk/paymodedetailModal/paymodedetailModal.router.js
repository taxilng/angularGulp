'use strict';

var paymodedetailModalRouter = {
    url: '/cashierdesk/paymodedetailModal',
    template: require('./paymodedetailModal.html'),
    controller: 'PaymodedetailModalController',
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
        }, 'paymodedetailModal');

        return deferred.promise;
    }]
};

module.exports = paymodedetailModalRouter;
