'use strict';

var detailModalRouter = {
    url: '/modalPages/detailModal',
    template: require('./detailModal.html'),
    controller: 'DetailModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'detailModal');

        return deferred.promise;
    }]
};

module.exports = detailModalRouter;
