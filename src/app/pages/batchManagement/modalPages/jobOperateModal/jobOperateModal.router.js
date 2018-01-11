'use strict';

var jobOperateModalRouter = {
    url: '/batchManagement/modalPages/jobOperateModal',
    template: require('./jobOperateModal.html'),
    controller: 'JobOperateModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'jobOperateModal');

        return deferred.promise;
    }]
};

module.exports = jobOperateModalRouter;
