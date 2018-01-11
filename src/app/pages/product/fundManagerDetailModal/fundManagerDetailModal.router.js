'use strict';

var fundManagerDetailModalRouter = {
    url: '/product/fundManagerDetailModal',
    template: require('./fundManagerDetailModal.html'),
    controller: 'FundManagerDetailModalController',
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
        }, 'fundManagerDetailModal');

        return deferred.promise;
    }]
};

module.exports = fundManagerDetailModalRouter;
