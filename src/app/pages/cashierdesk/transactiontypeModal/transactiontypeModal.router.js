'use strict';

var transactiontypeModalRouter = {
    url: '/cashierdesk/transactiontypeModal',
    template: require('./transactiontypeModal.html'),
    controller: 'TransactiontypeModalController',
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
        }, 'transactiontypeModal');

        return deferred.promise;
    }]
};

module.exports = transactiontypeModalRouter;
