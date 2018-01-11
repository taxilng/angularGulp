'use strict';

var customerCenterRouter = {
    url: '/customerManagement/customerCenter',
    template: require('./customerCenter.html'),
    controller: 'CustomerCenterController',
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
        }, 'customerCenter');

        return deferred.promise;
    }]
};

module.exports = customerCenterRouter;
