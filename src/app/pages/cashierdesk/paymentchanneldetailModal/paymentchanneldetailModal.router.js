'use strict';

var paymentchanneldetailModalRouter = {
    url: '/cashierdesk/paymentchanneldetailModal',
    template: require('./paymentchanneldetailModal.html'),
    controller: 'PaymentchanneldetailModalController',
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
        }, 'paymentchanneldetailModal');

        return deferred.promise;
    }]
};

module.exports = paymentchanneldetailModalRouter;
