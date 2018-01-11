'use strict';

var productinfoModalRouter = {
    url: '/product/productinfoModal',
    template: require('./productinfoModal.html'),
    controller: 'ProductinfoModalController',
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
        }, 'productinfoModal');

        return deferred.promise;
    }]
};

module.exports = productinfoModalRouter;
