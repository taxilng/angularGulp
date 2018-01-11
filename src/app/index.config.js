'use strict';

module.exports = function config($logProvider, $httpProvider, toastrConfig,$ngBootboxConfigProvider) {
    $logProvider.debugEnabled(true);                    // Enable log
    $httpProvider.interceptors.push('HttpInterceptor'); // add http interceptor
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 2000;
    toastrConfig.positionClass = 'toast-top-center';
    toastrConfig.preventOpenDuplicates = true;
    toastrConfig.progressBar = false;
    $ngBootboxConfigProvider.setDefaultLocale('zh_CN');
};
