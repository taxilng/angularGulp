'use strict';

var queryCheckingGroupViewRouter = {
    url: '/uniformMayment/reconciliation/queryCheckingGroupView',
    template: require('./queryCheckingGroupView.html'),
    controller: 'QueryCheckingGroupViewController',
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
        }, 'queryCheckingGroupView');

        return deferred.promise;
    }]
};

module.exports = queryCheckingGroupViewRouter;
