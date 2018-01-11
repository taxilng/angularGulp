'use strict';

var walletCenterRouter = {
    url: '/wallet/walletCenter',
    template: require('./walletCenter.html'),
    controller: 'WalletCenterController',
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
        }, 'walletCenter');

        return deferred.promise;
    }]
};

module.exports = walletCenterRouter;
