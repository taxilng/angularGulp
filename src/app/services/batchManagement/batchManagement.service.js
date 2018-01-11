'use strict';
var batchManagementService = function(HttpService, CONFIG) {
    var service = {
        querySysDay:querySysDay,
        submitSysDay:submitSysDay,
        querySchedule:querySchedule,
        queryBatchJobConfig:queryBatchJobConfig,
        createSchedule:createSchedule,
        delSchedule:delSchedule,
        queryBatchTaskInfo:queryBatchTaskInfo,
        updateSchedule:updateSchedule,
        queryBatchTaskSteps:queryBatchTaskSteps,
        suspendTask:suspendTask,
        continueTask:continueTask,
        skipFailStep:skipFailStep,
        queryBatchData:queryBatchData,
        createBatchTask:createBatchTask
    };

    return service;

    // 日终切日查询
    function querySysDay(params) {
        return HttpService.request(CONFIG.API.QUERYSYSDAY, params);
    }

    // 日终切日提交
    function submitSysDay(params){
        return HttpService.request(CONFIG.API.SUBMITSYSDAY, params);
    }

    // 定时配置-查询
    function querySchedule(params){
        return HttpService.request(CONFIG.API.QUERYSCHEDULE, params);
    }

    //定时配置-查询作业标识
    function queryBatchJobConfig(params) {
        return HttpService.request(CONFIG.API.QUERYBATCHCONFIG,params);
    }

    //定时配置-创建调度
    function createSchedule(params) {
        return HttpService.request(CONFIG.API.CREATESCHEDULE,params);
    }

     //定时配置-编辑调度
    function updateSchedule(params) {
        return HttpService.request(CONFIG.API.UPDATESCHEDULE,params);
    }

    //定时配置-删除作业
    function delSchedule(params)  {
        return HttpService.request(CONFIG.API.DELETESCHEDULE,params);
    }

    //查看任务-查看批量任务
    function queryBatchTaskInfo(params) {
        return HttpService.request(CONFIG.API.QUERYBATCHTASKINFO,params);
    }

    //查看任务-查询任务步骤
    function queryBatchTaskSteps(params) {
        return HttpService.request(CONFIG.API.QUERYBATCHTASKSTEPS,params);
    }

    //任务-终止任务
    function suspendTask(params) {
        return HttpService.request(CONFIG.API.SUSPENDTASK,params);
    }

    //任务-继续任务
    function continueTask(params) {
        return HttpService.request(CONFIG.API.CONTINUETASK,params);
    }

    //任务-跳过任务
    function skipFailStep(params) {
        return HttpService.request(CONFIG.API.SKIPFAILSTEP,params);
    }

    function queryBatchData(params) {
        return HttpService.request(CONFIG.API.QUERYBATCHDATA,params);
    }

    // 创建作业-创建任务
    function createBatchTask(params) {
        return HttpService.request(CONFIG.API.CREATEBATCHTASK,params);
    }
}


module.exports = batchManagementService;
