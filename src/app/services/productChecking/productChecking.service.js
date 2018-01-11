'use strict';

var productCheckingService = function(HttpService, CONFIG) {
    var service = {
        repeatBatchUploadPurOrRedeFile:repeatBatchUploadPurOrRedeFile,          //润和宝重新对账
        repeatBatchDownloadBalOfAccResultFile:repeatBatchDownloadBalOfAccResultFile //润和宝对账结果更新
    };

    return service;

    function repeatBatchUploadPurOrRedeFile(param) {
        return HttpService.request(CONFIG.API.REPEATBATCHUPLOAD, param);
    }
    function repeatBatchDownloadBalOfAccResultFile(param) {
        return HttpService.request(CONFIG.API.REPEATBATCHDOWNLOAD,param);
    }
}

module.exports = productCheckingService;

