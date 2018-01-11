'use strict';
module.exports = function ShopCartService() {
    return {
        //添加产品
        addProduct: function(data) {
            //获取本地缓存的产品
            if(data){
                var productData = JSON.parse(window.localStorage.getItem('productData')) || [];
                for (var i = 0; i < data.length; i++) {
                    productData.push(data[i]);
                }
                productData = unique(productData, 'productCode');
                console.log(111, productData);
                window.localStorage.setItem('productData', JSON.stringify(productData));
            }
        },
        //获取产品
        getProductList: function() {
            var productData = window.localStorage.getItem('productData') || [];
            return JSON.parse(productData);
        }
    };
    //数组去重复
    function unique(arr, key) {
        var res = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            var repeat = false;
            for (var j = 0; j < res.length; j++) {
                if (arr[i][key] == res[j][key]) {
                    repeat = true;
                    break;
                }
            }
            if (!repeat) {
                res.push(arr[i]);
            }
        }
        console.log(res);
        return res;
    }
};
