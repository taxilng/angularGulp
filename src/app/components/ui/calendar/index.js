'use strict';

var calendarDirective = require('./calendar.directive');

require('./calendar.skin.styl');
require('./calendar.layout.styl');

var calendar = angular.module('calendar',[])
    .directive('cfoCalendar', calendarDirective);

module.exports = calendar;
