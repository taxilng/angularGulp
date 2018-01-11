'use strict';

var requestCheckingViewRouter = {
    url: '/uniformMayment/reconciliation/requestCheckingView',
    template: require('./requestCheckingView.html'),
    controller: 'RequestCheckingViewController',
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
        }, 'requestCheckingView');

        return deferred.promise;
    }]
};

module.exports = requestCheckingViewRouter;
