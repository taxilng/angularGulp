'use strict';

var userUpdateRouter = {
    url: '/authorityManagement/modalPages/userUpdate',
    template: require('./userUpdate.html'),
    controller: 'UserUpdateController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'userUpdate');

        return deferred.promise;
    }]
};

module.exports = userUpdateRouter;
