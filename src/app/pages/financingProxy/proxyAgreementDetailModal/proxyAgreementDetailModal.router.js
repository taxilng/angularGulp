'use strict';

var proxyAgreementDetailModalRouter = {
    url: '/financingProxy/proxyAgreementDetailModal',
    template: require('./proxyAgreementDetailModal.html'),
    controller: 'ProxyAgreementDetailModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'proxyAgreementDetailModal');

        return deferred.promise;
    }]
};

module.exports = proxyAgreementDetailModalRouter;
