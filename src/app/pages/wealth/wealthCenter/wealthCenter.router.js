'use strict';

var wealthCenterRouter = {
    url: '/wealth/wealthCenter',
    template: require('./wealthCenter.html'),
    controller: 'WealthCenterController',
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
        }, 'wealthCenter');

        return deferred.promise;
    }]
};

module.exports = wealthCenterRouter;
