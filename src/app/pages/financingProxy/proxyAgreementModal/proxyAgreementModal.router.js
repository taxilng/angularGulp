'use strict';

var proxyAgreementModalRouter = {
    url: '/financingProxy/proxyAgreementModal',
    template: require('./proxyAgreementModal.html'),
    controller: 'ProxyAgreementModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'proxyAgreementModal');

        return deferred.promise;
    }]
};

module.exports = proxyAgreementModalRouter;
