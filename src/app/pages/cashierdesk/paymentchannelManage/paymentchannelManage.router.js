'use strict';

var paymentchannelManageRouter = {
    url: '/cashierdesk/paymentchannelManage',
    template: require('./paymentchannelManage.html'),
    controller: 'PaymentchannelManageController',
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
        }, 'paymentchannelManage');

        return deferred.promise;
    }]
};

module.exports = paymentchannelManageRouter;
