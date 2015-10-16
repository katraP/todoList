/**
 * Created by Kateryna_Porkhun on 10/15/2015.
 */
angular.module('root',[])
	.controller("index", ["$scope", function($scope){
		$scope.todo =  {
			title: "Todo List"
		};
		if(localStorage.todoStorage){
			$scope.todo.currentValue = JSON.parse(localStorage.todoStorage);
		}
	}])
	.directive('todoTitle', function(){
		return {
			template: '{{todo.title}}'
		}
	})
	.directive('addItem',  function($compile){
		return {
			link: function(scope, element) {
				element.on('keypress', function(e){
					var self = this;
					if(e.keyCode==13) {
						if(self.value.replace(/\s+/,'')=='') {
							self.value="";
							return false;
						}
						var parentBlock = self.parentNode,
							currentValue = document.createElement("span"),
							todoList =  parentBlock.querySelector('.todo-list'),
							item = document.createElement("LI"),
							itemState = document.createElement("span");
							item.setAttribute('class', 'todo-list__item');
							itemState.setAttribute('class', 'todo-list__state');
							itemState.setAttribute('list-state', '');
							currentValue.innerHTML=self.value;
							$compile(itemState)(scope);
							item.appendChild(itemState);
							item.appendChild(currentValue);

						if(!todoList) {
							var list = document.createElement("UL");
							list.setAttribute('class', 'todo-list');
							list.appendChild(item);
							parentBlock.appendChild(list);
						}
						else {
							todoList.insertBefore(item, todoList.firstChild );
						}
						if(!localStorage.todoStorage) {
							localStorage.todoStorage = JSON.stringify([{
								"title": self.value,
								"status": "incomplete"
							}])
						}
						else {
							var currentStore = JSON.parse(localStorage.todoStorage);
							currentStore.push({
								"title": self.value,
								"status": "incomplete"
							});
							localStorage.todoStorage = JSON.stringify(currentStore);
						}
						self.value="";
					}
				})
			}
		}
	})
	.directive('listState', function(){
		return {
			link: function(scope, element) {
				element.on('click', function(){
					element.toggleClass('completed');
				})
			}
		}
	});