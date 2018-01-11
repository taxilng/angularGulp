'use strict';

var {name}Directive = require('./{name}.directive');
require('./{name}.layout.styl');
require('./{name}.skin.styl');

var {name} = angular.module('{name}', [])
    .directive('{name}', {name}Directive);

module.exports = {name};
