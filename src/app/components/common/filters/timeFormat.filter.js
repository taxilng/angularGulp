module.exports = function(){
    return(function(input, format){
        if(!input){
            return '';
        }
        var timeParsed = moment(input);
        if(format){
            return timeParsed.format(format);
        }

        return timeParsed.format('YYYY-MM-DD');
    });
}



