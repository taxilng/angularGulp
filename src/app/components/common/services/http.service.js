'use strict';
module.exports = function HttpService($http, $q, CONFIG, $rootScope, $stateParams, ModalService, $state) {
    var _config, _send, _timeout, _serviceUrl;
    _timeout = 60000;
    _serviceUrl = CONFIG.ROOT_URL;
    _config = function(method, url, options) {
        var c;
        c = {
            method: method,
            url: _serviceUrl,
            timeout: _timeout,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'x-ajax': '1'
            } //form data
        };
        return angular.extend({}, c, options);
    };
    _send = function(verb, url, options) {
        options = options || {};
        options.data = options.params;
        options.params = null;
        var config = _config(verb, url, options);
        return $http(config);
    };

    return {
        request: function(txCode, reqParams) {
            // 锁屏
            ModalService.wait_submit();
            var defer = $q.defer();
            reqParams = reqParams || {};

            // for (var index in reqParams) {
            //     reqParams[index] = window.encodeURI(reqParams[index]);
            // }
            // var ReqSvcHeader = {
            //     serviceName: txCode
            // };
            var newParam = {
                serviceName: txCode
            };
            newParam = angular.extend(newParam, reqParams);
            var params = {
                params: newParam
            };
            if (CONFIG.OFFLINE) {
                _serviceUrl = CONFIG.ROOT_URL + '/' + CONFIG.ROUTE_URL + '/' + txCode;
            } else {
                _serviceUrl = CONFIG.ROOT_URL + '/' + CONFIG.ROUTE_URL;
            }
            _send('POST', _serviceUrl, params).success(function(result) {
                // 解屏
                ModalService.close_wait_submit();
                if (result) {
                    var replyData = result;
                    if (!replyData.returnCode) {
                        replyData.returnCode = {
                            domain: '',
                            type: '',
                            code: '',
                            message: ''
                        };
                    }
                    if (replyData.returnCode && replyData.returnCode.type === 'E') {
                        defer.reject({
                            message: replyData.returnCode.returnMsg,
                            code: replyData.returnCode.returnCode,
                            type: replyData.returnCode.type
                        });
                        if (replyData.returnCode.returnCode === '85983527') {
                            $rootScope.hasLogin = false;
                            $rootScope.userName = null;
                            sessionStorage.removeItem(CONFIG.SESSION.CURRENT_USER);
                            $state.go('login');
                        }
                    } else {
                        defer.resolve(replyData.reply.resBody);
                    }
                } else {
                    // defer.reject(CONFIG.ERROR.NO_SERVER);
                    defer.reject({
                        message: CONFIG.ERROR.NO_SERVER
                    });
                }

            }).error(function(err) {
                $log.log(err);
                defer.reject(err);
            });
            return defer.promise;
        }
    };
};
