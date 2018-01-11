'use strict';

var {name}Controller = require('./{name}.controller');
var {name}Html = require('./{name}.html');

require('./{name}.skin.styl');
require('./{name}.layout.styl');

var mod = angular.module('{name}', [])
    .controller('{Name}Controller', {name}Controller);

module.exports = {
    module: mod,
    html: {name}Html,
    controller: {name}Controller
};
