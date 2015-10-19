/**
 * Created by Kateryna_Porkhun on 10/15/2015.
 */
(function(){
	mainModule.controller("index", ["$scope", function($scope){
			$scope.todo =  {
				title: "Todo List"
			};
			if(localStorage.todoStorage){
				$scope.todo.currentValue = JSON.parse(localStorage.todoStorage).reverse();
			}
		}]);
})();
