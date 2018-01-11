'use strict';

var proxyAgreementRouter = {
    url: '/financingProxy/proxyAgreement',
    template: require('./proxyAgreement.html'),
    controller: 'ProxyAgreementController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'proxyAgreement');

        return deferred.promise;
    }]
};

module.exports = proxyAgreementRouter;
