'use strict';

var configurationModalRouter = {
    url: '/batchManagement/modalPages/configurationModal',
    template: require('./configurationModal.html'),
    controller: 'ConfigurationModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'configurationModal');

        return deferred.promise;
    }]
};

module.exports = configurationModalRouter;
