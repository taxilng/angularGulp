'use strict';

var fundManagerModalRouter = {
    url: '/product/fundManagerModal',
    template: require('./fundManagerModal.html'),
    controller: 'FundManagerModalController',
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
        }, 'fundManagerModal');

        return deferred.promise;
    }]
};

module.exports = fundManagerModalRouter;
