'use strict';

var investPlanConfigDetailModalRouter = {
    url: '/financingProxy/investPlanConfigDetailModal',
    template: require('./investPlanConfigDetailModal.html'),
    controller: 'InvestPlanConfigDetailModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'investPlanConfigDetailModal');

        return deferred.promise;
    }]
};

module.exports = investPlanConfigDetailModalRouter;
