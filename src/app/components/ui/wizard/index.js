'use strict';

var wizardDirective = require('./wizard.directive');
var wizardService = require('./wizard.service');
require('./wizard.layout.styl');
require('./wizard.skin.styl');
var wizard = angular.module('wizard', [])
    .directive('cfoWizard', ['$state', '$window', 'WizardService', wizardDirective])
    .factory('WizardService',['$rootScope', wizardService]);

module.exports = wizard;
