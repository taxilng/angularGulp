'use strict';

var salesDetailAnalyRouter = {
    url: '/wallet/salesDetailAnaly',
    template: require('./salesDetailAnaly.html'),
    controller: 'SalesDetailAnalyController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'salesDetailAnaly');

        return deferred.promise;
    }]
};

module.exports = salesDetailAnalyRouter;
