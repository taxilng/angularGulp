'use strict';

var matrixHtml = require('./matrix.html');

module.exports = function matrix() {
    var directive = {
        restrict: 'E',
        template: matrixHtml,
        scope: {
            data:'=',
            xaxis:'=',
            yaxis:'=',
            matrixAction:'&'
        },
        link: linkFunc
    };

    return directive;

    function linkFunc(scope) {
        scope.$watch('data',function(){
            var arr = scope.data;
            if(arr && arr.length){
                var sort_arr = sortArr(arr);
            }
            scope.dataList = sort_arr;
        });

        //排序
        function sortArr(arr){
            var newArr = [];

            newArr[0] = {'index':4,'title':arr[3],isTrue:false};
            newArr[1] = {'index':7,'title':arr[6],isTrue:false};
            newArr[2] = {'index':9,'title':arr[8],isTrue:false};
            newArr[3] = {'index':2,'title':arr[1],isTrue:false};
            newArr[4] = {'index':5,'title':arr[4],isTrue:false};
            newArr[5] = {'index':8,'title':arr[7],isTrue:false};
            newArr[6] = {'index':1,'title':arr[0],isTrue:false};
            newArr[7] = {'index':3,'title':arr[2],isTrue:false};
            newArr[8] = {'index':6,'title':arr[5],isTrue:false};

            return newArr;
        }

        scope.itemClick = function(item){
            scope.dataList.forEach(function(item){
                item.isTrue=false;
            });
            item.isTrue = true;
            console.log(item);
            debugger;
            //scope.matrixAction({item});
        };
    }
};
