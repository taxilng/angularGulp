'use strict';

module.exports = function httpInterceptor() {
    var httpInterceptor = {
        request: request,
        requestError: requestError,
        response: response,
        responseError: responseError
    };

    return httpInterceptor;

    function request(config) {
        // console.log(config);
        return config;
    }

    function requestError(config) {
        // console.log(config);
        return config;
    }

    function response(response) {
        // if(response.data && angular.isObject(response.data)) {
        //     console.log(response);
        //     return response;
        // }
        return response;
    }

    function responseError(responseError) {
        // console.log(responseError);
        return responseError;
    }
};
