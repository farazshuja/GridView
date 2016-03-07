/**
 * @class GridView service, which will return object to dealer with Grid View
 * @param {String} url
 * @param {Object} params
 * { page: 1, rows: 10, sidx: 'id', sord: 'asc' }
 *
 * @usage:
 * $scope.Grid = GridView.init('url/to/api/of/grid', [optional params]);
 *
 */
app.factory('GridView', ['$http', '$timeout', function($http, $timeout) {
    //default params
    var defaultParams = {
        page: 1,
        rows: 10,
        sidx: 'id',
        sord: 'asc'
    };

    /**
     * @constructor
     */
    function Grid(url, params) {
        var that = this;

        that._url = url;
        that.params = angular.extend(defaultParams, params);  //params that will set while calling the url
        that.isGridLoading = false;     //to check whether some request is in progress
        that.data = null;   //after successful API call data will be filled by row data returned by server
        that.hasNextPages = false;  //to check whether there are some next pages
        that.hasPrevPages = false;  //to check whether there are some prev pages

        //to show operational related messages above the grid
        that.operation = null;
        // { success: true, msg: 'msg', show: true }

        that.refresh();
    }

    /**
     * refresh the Grid based on current params or passed one
     * use this method in case you want to refresh the grid after operations like Enable/Disable row
     * @param params
     * @returns $promise
     *
     */
    Grid.prototype.refresh = function(params) {
        var that = this;
        if(that.isGridLoading)
            return; //do nothing if Grid is already loading or in progress

        that.params = angular.extend(that.params, params);
        that.isGridLoading = true;
        return $http({
            method: 'GET',
            url: that._url,
            params: that.params
        }).success(function(data) {
            that.data = data;
            that.isGridLoading = false;
        });
    };

    /**
     * sort the grid and reset the page number to one
     * @param {String} name: the attribute on which the Grid must be sorted like id, name, date etc
     * @returns see refresh() method
     */
    Grid.prototype.sort = function(name) {
        var that = this;
        var sordOrder = that.params.sord == 'asc' ? 'desc' : 'asc';
        that.params = angular.extend(that.params, {sidx: name, sord: sordOrder, page: 1});
        return that.refresh();
    };

    /**
     * set the correct class to show the up/down icon of sort
     * @param name
     * @returns {String} class name
     */
    Grid.prototype.setSortClass = function(name) {
        var that = this;
        return that.params.sidx == name ? that.params.sord : '';

    };

    /**
     * Load the next page, if its available
     */
    Grid.prototype.nextPage = function() {
        var that = this;
        if(!that.isGridLoading && that.hasNextPages) {
            that.params.page++;
            that.refresh();
        }
    };

    /**
     * Load the previous page if its available
     */
    Grid.prototype.prevPage = function() {
        var that = this;
        if(!that.isGridLoading && that.hasPrevPages) {
            that.params.page--;
            that.refresh();
        }
    };

    /**
     * set the correct class name in case of success or error type of messages
     * @returns class name for success or error cases
     */
    Grid.prototype.setOperationClass = function() {
        var that = this;
        if(that.operation) {
            return that.operation.success ? 'success-msg' : 'error-msg';
        }
        else {
            return '';
        }
    };

    /**
     * show the pager title text like Showing 1 - 10 of 20
     * @returns {string}
     */
    Grid.prototype.pagerText = function() {
        var that = this;
        var label = 'Showing 1 - 1 of 1';
        if(that.data) {
            var start = ((that.data.page - 1) * that.params.rows) + 1;
            var end = that.data.page * that.params.rows;
            var total = parseInt(that.data.records);
            end = end > total ? total : end;
            label = isNaN(total) || total == 0 ? null : 'Showing ' + start + ' - ' + end + ' of ' + total;
            that.hasNextPages = end < total ? true : false;
            that.hasPrevPages = start > 1 ? true : false;
        }

        return label;

    };

    var timer = null;
    /**
     * to show the message above the grid, usable after Enable/Disable/Delete type of operations when these
     * operations are appllied on same page. It will show the message in css3 fade in/out style, message will
     * be hide after 8 seconds
     * @param ops
     */
    Grid.prototype.showMessage = function(ops) {
        if(!ops) {
            return;
        }

        var that = this;
        that.operation = ops;
        that.operation.msg = ops.success ? ops.success : ops.error;
        $timeout.cancel(timer);

        $timeout(function() {
            that.operation.show = true;
            timer = $timeout(function() {
                that.operation.show = false;
            }, 8000);
        }, 200);
    }

    // Initialize the grid using url, params and return new Grid Object
    var init = function(url, params, msg) {
        var grid = new Grid(url, params);
        if(msg) {
            msg.force = false;
            grid.showMessage(msg);
        }
        return  grid;
    };

    return {
        init: init
    }
}]);
