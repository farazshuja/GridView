# GridView
Show Tabular type of data easily using angularjs factory, directive, bootstrap css.

## html
```html
<div class="lpsGrid">
  <div class="grid-header">
	<h3>Showing {{Grid.data.records}} Type(s)</h3>
	<div grid-pager="Grid" />
	<div class="clearfix"></div>
  </div>
  <div class="grid-con">
	<div class="grid-con-header row">
	  <div ng-click="Grid.sort('name')" ng-class="Grid.setSortClass('name')" class="col-xs-2 sortable"><span>Name</span></div>
	  <div ng-click="Grid.sort('type')" ng-class="Grid.setSortClass('type')" class="col-xs-4 sortable"><span>Type</span></div>
	  <div ng-click="Grid.sort('destination')" ng-class="Grid.setSortClass('destination')" class="col-xs-2 sortable"><span>Destination</span></div>
	  <div ng-click="Grid.sort('medium')" ng-class="Grid.setSortClass('medium')" class="col-xs-2 sortable"><span>Medium</span></div>
	</div>
	<div class="grid-con-body">
	  <div ng-hide="Grid.isGridLoading" class="row" ng-repeat="row in Grid.data.rows" ng-class="{'disabled': !row.enabled}">
		<div class="col-xs-2">
		  <a ng-show="row.enabled" href="#/to/modify/{{row.id}}">{{row.name}}</a>
		  <span ng-show="!row.enabled">{{row.name}}</span>
		</div>
		<div class="col-xs-4">{{row.type}}</div>
		<div class="col-xs-2">{{row.destination}}</div>
		<div class="col-xs-2">{{row.medium}}</div>
		<div class="col-xs-2 ta-right">
		  <a ng-href="#/to/modify/{{row.id}}" class="btn btn-success" ng-show="row.enabled">
			<span class="mct-icons pen-icon"></span>
			<span class="btn-title">Modify</span>
		  </a>
		  <button type="button" ng-click="showEnableDisableModal(row)" class="btn btn-success">
			<span class="mct-icons cancel-icon"></span><span class="btn-title">{{row.enabled ? 'Disable' : 'Enable'}}</span>
		  </button>
		</div>
	  </div>
	  <div class="row empty-row hide">
		<span class="mct-icons nurturing-icon-gray"></span>No Data Found!
	  </div>
	  <div class="row ajax-ngview" ng-show="Grid.isGridLoading"></div>
	</div>
  </div>
</div>
```

