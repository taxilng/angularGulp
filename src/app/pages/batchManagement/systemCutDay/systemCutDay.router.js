'use strict';

var systemCutDayRouter = {
    url: '/batchManagement/systemCutDay',
    template: require('./systemCutDay.html'),
    controller: 'SystemCutDayController',
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
        }, 'systemCutDay');

        return deferred.promise;
    }]
};

module.exports = systemCutDayRouter;
