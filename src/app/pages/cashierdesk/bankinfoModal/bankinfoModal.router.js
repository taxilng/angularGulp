'use strict';

var bankinfoManageRouter = {
    url: '/cashierdesk/bankinfoModal',
    template: require('./bankinfoModal.html'),
    controller: 'BankinfoModalController',
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
        }, 'bankinfoManage');

        return deferred.promise;
    }]
};

module.exports = bankinfoModalRouter;
