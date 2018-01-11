'use strict';

var configurationFileChannelRouter = {
    url: '/batchManagement/configurationFileChannel',
    template: require('./configurationFileChannel.html'),
    controller: 'ConfigurationFileChannelController',
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
        }, 'configurationFileChannel');

        return deferred.promise;
    }]
};

module.exports = configurationFileChannelRouter;
