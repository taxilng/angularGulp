'use strict';

var trsanctiondetailModalRouter = {
    url: '/cashierdesk/trsanctiondetailModal',
    template: require('./trsanctiondetailModal.html'),
    controller: 'TrsanctiondetailModalController',
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
        }, 'trsanctiondetailModal');

        return deferred.promise;
    }]
};

module.exports = trsanctiondetailModalRouter;
