'use strict';
/**
 * 状态Constant
 */
var jobStatusConstant = [
    {
        value: '',
        name:'--请选择--'
    },{
        value: 'SUSPEND',
        name:'中止'
    }, {
        value: 'FAIL',
        name: '失败'
    },{
        value:'SUCCESS',
        name:'成功'
    },{
        value:'ACCEPT',
        name:'受理'
    },{
        value:'INIT',
        name:'初始化'
    },{
        value:'SKIP_FAIL',
        name:'跳过'
    },{
        value:'WAIT',
        name:'等待'
    },{
        value:'FAIL_RETRY',
        name:'失败重试'
    },{
        value:'RUNNING',
        name:'运行中'
    }
];

module.exports = jobStatusConstant;
