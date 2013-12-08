jgrid
=====

JGrid - Biblioteca para criar uma grade dinâmica.

Motivo: Os grid atuais não te dão liberdade para fazer alterações na biblioteca, por este motivo criei uma grade simplificada com as funcionalidades que tinha necessidade.

Modo de usar:
<code>
 $("#table").grid({
	url_edit: 'save.php',
	url_load: 'load.php',
	grid_data: [],
	fields: [
		{ 
			label: "identificacao", 
			name: "identificacao",
			type: "text",
			style: "width:170px;"
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
				$("#table").grid('update', jQuery.parseJSON( data ) );				
			}
		});				
	}
});			

$("#table").grid('load');

</code>


Dependencias:
* JQuery 1.10
* Bootstrap 3
