module.exports = function(){
    return(function(index, constant){
        var returnContent = '';
        if(!constant){
            return '';
        };

        var arr = constant.filter(function(item){
            return index == item.value;
        });

        if(!arr.length){
            return '';
        }

        if(arr[0].name){
            returnContent = arr[0].name;
        }else{
            returnContent = arr[0].label;
        }

        return returnContent;
    })
}
