/**
 * Created by Kateryna_Porkhun on 10/19/2015.
 */
(function(){
	mainModule.directive('insertTitle', insertTitle);

	function insertTitle(){
		return {
			template: '{{todo.title}}'
		}
	}

})();
