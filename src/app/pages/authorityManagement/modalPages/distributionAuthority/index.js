'use strict';

var distributionAuthorityController = require('./distributionAuthority.controller');
var distributionAuthorityHtml = require('./distributionAuthority.html');

require('./distributionAuthority.skin.styl');
require('./distributionAuthority.layout.styl');

var mod = angular.module('distributionAuthority', [])
    .controller('DistributionAuthorityController', distributionAuthorityController);

module.exports = {
    module: mod,
    html: distributionAuthorityHtml,
    controller: distributionAuthorityController
};
