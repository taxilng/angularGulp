'use strict';

var addTreeNodeHtml = require('./addTreeNode.html');
var addTreeNodeController = require('./addTreeNode.controller');

require('./addTreeNode.layout.styl');

module.exports = {
    html: addTreeNodeHtml,
    controller: addTreeNodeController
};
