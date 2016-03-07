app.directive('gridPager', function() {
    var _template =
    '<div class="pull-right">' +
        '<div ng-show="Grid.operation.show" class="opMsg fade" ng-class="Grid.setOperationClass()">{{Grid.operation.msg}}</div>' +
        '<ul class="pagination">' +
            '<li><a ng-click="Grid.prevPage()" class="arrow" ng-class="{disabled: !Grid.hasPrevPages}">&laquo;</a></li>' +
            '<li class="desc">{{Grid.pagerText()}}</li>' +
            '<li><a ng-click="Grid.nextPage()" class="arrow" ng-class="{disabled: !Grid.hasNextPages}">&raquo;</a></li>' +
        '</ul>'
    '</div>';
    return {
        restrict: 'A',
        replace: true,
        scope: {
            Grid: '=gridPager'
        },
        template: _template
    }
});
