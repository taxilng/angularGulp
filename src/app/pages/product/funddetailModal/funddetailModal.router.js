'use strict';

var funddetailModalRouter = {
    url: '/product/funddetailModal',
    template: require('./funddetailModal.html'),
    controller: 'FunddetailModalController',
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
        }, 'funddetailModal');

        return deferred.promise;
    }]
};

module.exports = funddetailModalRouter;
