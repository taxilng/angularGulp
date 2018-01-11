'use strict';

var salesSumAnalyRouter = {
    url: '/wallet/salesSumAnaly',
    template: require('./salesSumAnaly.html'),
    controller: 'SalesSumAnalyController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'salesSumAnaly');

        return deferred.promise;
    }]
};

module.exports = salesSumAnalyRouter;
