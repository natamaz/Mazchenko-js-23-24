define('controller',['jquery'],function($){
	
	function Controller(model, view){
		var self = this;
		
		view.elements.addBtn.on('click', addItem);
		view.elements.listContainer.on('click', '.item-delete',removeItem);
		view.elements.listContainer.on('click','.item-show', editItem);
		
		function addItem(){
			var newItem = view.elements.input.val();
			if(newItem.length === 0){
				return;
			} else {
			model.addItem(newItem);
			view.renderList(model.data);
			view.elements.input.val('');
			}
		}
		
		function removeItem(){
			var item = $(this).attr('data-value');
			
			model.removeItem(item);
			view.renderList(model.data);
		}
		
		function editItem() {
			var item = $(this).attr('data-show');
			var index = $('.item-show').index(this);
			var editItem = $('.item-show').eq(index);
			var editItemInput = $('.item-edit').eq(index);
			var newItem = editItem.html();
	
			editItemInput.val(editItem.html());
			editItem.hide();
			editItemInput.show();
			editItemInput.select();
	
			editItemInput.focusout(function(){
			editItemInput.hide();
			editItem.html(editItemInput.val());
			editItem.show();
			newItem = editItem.html();
			
			model.editItem(item, newItem);
			view.renderList(model.data);
			});
		};
		
	}
	return Controller;
});