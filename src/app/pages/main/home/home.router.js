'use strict';

var homeRouter = {
    url: '/main/home',
    template: require('./home.html'),
    controller: 'HomeController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'home');

        return deferred.promise;
    }]
};

module.exports = homeRouter;
