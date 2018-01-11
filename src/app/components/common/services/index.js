'use strict';

// var ErrorService = require('./error.service');
// var HttpIntercepterService = require('./http-intercepter.service');
// var LoggerService = require('./logger.service');
// var RouterHelperProvider = require('./router-helper.provider');
var ModalService = require('./modal.service');
var HttpService = require('./http.service');
var GirdService = require('./gird.service');
var CircularListService = require('./circularList.service');
var EventBusService = require('./eventBus.service');
var HttpInterceptor = require('./httpInterceptor.service');
var ValidationService = require('./validation.service');
var fileReader = require('./fileReader.service');
// var organizationTreeService = require('../../biz/customer/organizationTreeModal/organizationTreeModal.service');
// var customerLabelService = require('../../biz/customer/customerLabelModal/customerLabelModal.service');
var ShopCartService=require('./shopCart.service');
var commonService = require('./common.service');
var service = angular.module('app.service', []);

service
    // .service('ErrorService', ErrorService)
    // .service('HttpIntercepterService', HttpIntercepterService)
    // .service('LoggerService', LoggerService)
    // .service('RouterHelperProvider', RouterHelperProvider)
    .service('ModalService', ['$uibModal', ModalService])
    .service('GirdService', [GirdService])
    .service('ValidationService', ['$rootScope', 'toastr', 'timeFormatFilterFilter','$q',ValidationService])
    .service('ShopCartService', ShopCartService)
    .service('CircularListService', [CircularListService])
    .service('EventBusService', ['$rootScope', 'CircularListService', EventBusService])
    .factory('HttpService', ['$http', '$q', 'CONFIG','$rootScope','$stateParams','ModalService','$state',HttpService])
    .factory('CommonService',[commonService])
    .factory('fileReader',['$q','$log',fileReader])
    // .factory('organizationTreeService', ['$rootScope', '$q', 'ModalService', 'SettingsService', organizationTreeService])
    // .factory('customerLabelService', ['ModalService', customerLabelService])
    .factory('HttpInterceptor', ['$rootScope','EventBusService',HttpInterceptor]);
module.exports = service;
