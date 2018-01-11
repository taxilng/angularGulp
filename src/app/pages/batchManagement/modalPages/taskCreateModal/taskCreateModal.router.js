'use strict';

var taskCreateModalRouter = {
    url: '/batchManagement/modalPages/taskCreateModal',
    template: require('./taskCreateModal.html'),
    controller: 'TaskCreateModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'taskCreateModal');

        return deferred.promise;
    }]
};

module.exports = taskCreateModalRouter;
