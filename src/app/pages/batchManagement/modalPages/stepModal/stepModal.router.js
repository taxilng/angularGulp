'use strict';

var stepModalRouter = {
    url: '/batchManagement/modalPages/stepModal',
    template: require('./stepModal.html'),
    controller: 'StepModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'stepModal');

        return deferred.promise;
    }]
};

module.exports = stepModalRouter;
