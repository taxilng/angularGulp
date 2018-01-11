'use strict';

var createJobRouter = {
    url: '/batchManagement/createJob',
    template: require('./createJob.html'),
    controller: 'CreateJobController',
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
        }, 'createJob');

        return deferred.promise;
    }]
};

module.exports = createJobRouter;
