'use strict';

module.exports = function cfoDataTable($filter) {
    var directive = {
        restrict: 'A',
        scope: {
            model: '=cfoDataTable'
        },
        link: link
    };
    return directive;

    function link(scope, element, attrs){

        scope.current = {
            order: 0
        };
        element.find('th').addClass('fa fa-unsorted');

        var thSelected = function(index){
            var selectedCell = element.find('th').eq(index);
            var key = $(selectedCell).data('key');
            $(selectedCell).removeClass();

            if(scope.current.order == 0){
                selectedCell.addClass('fa fa-sort-desc');
                scope.current.order = 1;
            }

            else if(scope.current.order == 1){
                selectedCell.addClass('fa fa-sort-asc');
                scope.current.order = 2;
                key = '-' + key;
            }

            else if(scope.current.order == 2){
                selectedCell.addClass('fa fa-sort-desc');
                scope.current.order = 1;
            }

            scope.model = $filter('orderBy')(scope.model, key);
            scope.$apply();
            console.log(123456777, scope.model)
        };

        if(element[0].tagName == 'TABLE'){

            element.on('click', function(event){
                if(!scope.model || scope.model.length == 0){
                    return;
                };

                var index = $(event.target).index();
                thSelected(index);
            })

        }


    }
};
