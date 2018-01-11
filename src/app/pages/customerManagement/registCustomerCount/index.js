'use strict';

var registCustomerCountController = require('./registCustomerCount.controller');
var registCustomerCountHtml = require('./registCustomerCount.html');

require('./registCustomerCount.skin.styl');
require('./registCustomerCount.layout.styl');

var mod = angular.module('registCustomerCount', [])
    .controller('RegistCustomerCountController', [
        'RegistCustomerCountConstant','timeFormatFilterFilter','toastr','$ngBootbox','CustomerManagementService','CommonService','ValidationService',registCustomerCountController]);

module.exports = {
    module: mod,
    html: registCustomerCountHtml,
    controller: registCustomerCountController
};
