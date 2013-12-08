function click_multiply(obj){
	alert('deletado linha '+obj.attr('data-index-row')+'!');
}

$(function(){
	
	var actions_header = '\
	<form id="form_new" method="POST" action="new.php">\
			  <button class="btn btn-xs btn-default" name="action" value="new" type="submit" id="save">Novo registro</button>\
	</form>\
	';
	
	var actions = '\
			  <button class="btn btn-primary" name="action" value="save" type="submit" id="save">Save</button>\
			  <button onclick="click_multiply($(this));" class="btn btn-warning" name="action" value="mult" type="button" id="multiply">*</button>\
			  <button class="btn btn-danger" name="action" value="delete" type="submit" id="delete">Delete</button>\
			';

	$("#table").grid({
		url_edit: 'save.php',
		url_load: 'load.php',
		actions_header: actions_header,
		actions: actions,
		action_style: "width:200px;",
		grid_data: [],
		fields: [
			{ 
				label: "Identificação", 
				name: "identificacao",
				type: "text",
				style: "width:140px;"
			},
			{ 
				label: "Vaterinario", 
				name: "veterinario_id",				
				type: "select",
				option_value: "id",
				option_text: "name",
				options: data_veterinarios,
				style: "width:100px;"
			}
		],
		load_data: function (){
			$.ajax({
				url: 'load.php', 
				success: function( data ) {
					//atualiza as informações
					$("#table").grid('update', jQuery.parseJSON( data ) );			

					//form dinamico para cada linha
					$("#table").find('form[id^=grid_row]').ajaxForm({
						error: function(data) { 
							alert('erro!');						
						},
						success: function(data) { 
							alert('atualizado!');
						}
					});
					
					//form dinamico para cada linha
					$("#table").find('[id=form_new]').ajaxForm({
						error: function(data) { 
							alert('erro!');						
						},
						success: function(data) { 
							alert('atualizado!');
						}
					});
				}
			});				
		}
	});			

	$("#table").grid('load');

});