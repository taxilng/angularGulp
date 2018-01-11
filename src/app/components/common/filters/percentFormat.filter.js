'use strict';

module.exports = function percentFormat($filter) {
    return function (input, decimals) {
        return $filter('number')(input * 100, decimals) + '%';
    };
};
