'use strict';

var investPlanConfigModalRouter = {
    url: '/wealth/investPlanConfigModal',
    template: require('./investPlanConfigModal.html'),
    controller: 'InvestPlanConfigModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'investPlanConfigModal');

        return deferred.promise;
    }]
};

module.exports = investPlanConfigModalRouter;
