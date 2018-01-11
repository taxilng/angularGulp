'use strict';

var comboAddModalRouter = {
    url: '/modalPages/comboAddModal',
    template: require('./comboAddModal.html'),
    controller: 'ComboAddModalController',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, 'comboAddModal');

        return deferred.promise;
    }]
};

module.exports = comboAddModalRouter;
