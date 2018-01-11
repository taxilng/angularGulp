'use strict';

var {name}Router = {
    url: '/{business}/{name}',
    template: require('./{name}.html'),
    controller: '{Name}Controller',
    controllerAs: 'vm',
    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
        var deferred = $q.defer();

        require.ensure([], function(require) {
            var mod = require('./index');

            $ocLazyLoad.load({
                name: mod.module.name
            });

            deferred.resolve(mod.controller);
        }, '{name}');

        return deferred.promise;
    }]
};

module.exports = {name}Router;
