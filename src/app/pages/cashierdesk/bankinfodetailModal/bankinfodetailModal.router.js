'use strict';

var bankinfodetailModalRouter = {
    url: '/cashierdesk/bankinfodetailModal',
    template: require('./bankinfodetailModal.html'),
    controller: 'BankinfodetailModalController',
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
        }, 'bankinfodetailModal');

        return deferred.promise;
    }]
};

module.exports = bankinfodetailModalRouter;
