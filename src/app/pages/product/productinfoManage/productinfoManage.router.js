'use strict';

var productinfoManageRouter = {
    url: '/cashierdesk/productinfoManage',
    template: require('./productinfoManage.html'),
    controller: 'ProductinfoManageController',
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
        }, 'productinfoManage');

        return deferred.promise;
    }]
};

module.exports = productinfoManageRouter;
