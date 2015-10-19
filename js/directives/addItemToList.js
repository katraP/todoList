/**
 * Created by Kateryna_Porkhun on 10/19/2015.
 */
(function(){
	mainModule.directive('addItem',  addItem);

	function addItem($compile){
		return {
			link: function(scope, element) {
				element.on('keypress', function(e){
					var self = this,
						itemValue = self.value;
					if(e.keyCode==13) {
						if(itemValue.replace(/\s+/,'')=='') {
							itemValue="";
							return false;
						}
						var parentBlock = self.parentNode,
							currentValue = document.createElement("span"),
							todoList =  parentBlock.querySelector('.todo-list'),
							item = document.createElement("LI"),
							itemState = document.createElement("span"),
							listNumber = todoList.children.length,
						    storageObj = {
								"index": listNumber,
								"title": itemValue,
								"status": "incomplete"
							};

						//creating new LI element
						item.setAttribute('class', 'todo-list__item');
						item.setAttribute('data-number', listNumber);
						itemState.setAttribute('class', 'todo-list__state');
						itemState.setAttribute('list-state', '');
						currentValue.innerHTML=itemValue;
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
							localStorage.todoStorage = JSON.stringify([storageObj])
						}
						else {
							var currentStore = JSON.parse(localStorage.todoStorage);
							currentStore.push(storageObj);
							localStorage.todoStorage = JSON.stringify(currentStore);
						}

						self.value="";
					}
				})
			}
		}
	}
})();
