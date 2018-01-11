'use strict';

var avatarDirective = require('./avatar.directive');

require('./avatar.skin.styl');
require('./avatar.layout.styl');
var avatar = angular.module('avatar',[])
    .directive('cfoAvatar', ['RoleConstant',avatarDirective]);

module.exports = avatar;
