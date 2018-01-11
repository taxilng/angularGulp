'use strict';

var registCustomerCountRouter = {
    url: '/customerManagement/registCustomerCount',
    template: require('./registCustomerCount.html'),
    controller: 'RegistCustomerCountController',
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
        }, 'registCustomerCount');

        return deferred.promise;
    }]
};

module.exports = registCustomerCountRouter;
