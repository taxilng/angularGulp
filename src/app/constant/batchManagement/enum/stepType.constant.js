'use strict';
/**
 * 步骤类型
 */
var stepTypeConstant = [
    {
        value: 'DB_PARSE',
        name: '数据库解析步骤'
    }, {
        value: 'EXECUTE_DATA',
        name: '数据执行步骤'
    },{
        value: 'FILE_COMPRESSION',
        name: '文件解压步骤'
    },{
        value: 'FILE_DOWNLOAD',
        name: '文件下载步骤'
    },{
        value: 'FILE_PARSE',
        name: '文件解析步骤'
    },{
        value: 'FILE_PARSE_BATCH_ONLINE',
        name: '批联机文件解析步骤'
    },{
        value: 'FILE_UPLOAD',
        name: '文件上传步骤'
    },{
        value: 'RESULT_FILE_GENERATE_BATCH_ONLINE',
        name: '批联机结果文件生成步骤'
    },{
        value: 'USER_DEFINED',
        name: '自定义步骤'
    }
];

module.exports = stepTypeConstant;
