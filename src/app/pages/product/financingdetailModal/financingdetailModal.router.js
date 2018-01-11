'use strict';

var financingdetailModalRouter = {
    url: '/product/financingdetailModal',
    template: require('./financingdetailModal.html'),
    controller: 'FinancingdetailModalController',
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
        }, 'financingdetailModal');

        return deferred.promise;
    }]
};

module.exports = financingdetailModalRouter;
