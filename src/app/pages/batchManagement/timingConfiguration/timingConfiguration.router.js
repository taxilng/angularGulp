'use strict';

var timingConfigurationRouter = {
    url: '/batchManagement/timingConfiguration',
    template: require('./timingConfiguration.html'),
    controller: 'TimingConfigurationController',
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
        }, 'timingConfiguration');

        return deferred.promise;
    }]
};

module.exports = timingConfigurationRouter;
