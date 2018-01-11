'use strict';

var viewTaskRouter = {
    url: '/batchManagement/viewTask',
    template: require('./viewTask.html'),
    controller: 'ViewTaskController',
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
        }, 'viewTask');

        return deferred.promise;
    }]
};

module.exports = viewTaskRouter;
