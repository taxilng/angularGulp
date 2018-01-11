'use strict';

var paymentchannelModalRouter = {
    url: '/cashierdesk/paymentchannelModal',
    template: require('./paymentchannelModal.html'),
    controller: 'PaymentchannelModalController',
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
        }, 'paymentchannelModal');

        return deferred.promise;
    }]
};

module.exports = paymentchannelModalRouter;
