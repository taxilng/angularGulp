'use strict';

var configurationJobRouter = {
    url: '/batchManagement/configurationJob',
    template: require('./configurationJob.html'),
    controller: 'ConfigurationJobController',
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
        }, 'configurationJob');

        return deferred.promise;
    }]
};

module.exports = configurationJobRouter;
