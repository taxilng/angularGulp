'use strict';

var investPlanConfigRouter = {
    url: '/wealth/investPlanConfig',
    template: require('./investPlanConfig.html'),
    controller: 'InvestPlanConfigController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'investPlanConfig');

        return deferred.promise;
    }]
};

module.exports = investPlanConfigRouter;
