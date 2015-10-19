/**
 * Created by Kateryna_Porkhun on 10/19/2015.
 */
(function(){
	mainModule.directive('listState', listState);

	function listState(){
		return {
			link: function(scope, element) {
				element.on('click', function(){
					element.toggleClass('complete incomplete');
					var currentStorage = JSON.parse(localStorage.todoStorage);
					for(var i= 0, length = currentStorage.length; i<length; i++) {
						var currentElement = currentStorage[i];
						if(currentElement['index']== element.parent().attr('data-number')) {
							switch(currentElement['status']) {
								case 'incomplete':
									currentElement['status'] = 'complete';
									break;
								case 'complete':
									currentElement['status'] = 'incomplete';
									break;
							}
							break;
						}
					}
					localStorage.todoStorage = JSON.stringify(currentStorage);
				})
			}
		}
	}
})();