jgrid
=====

JGrid - Biblioteca para criar uma grade dinâmica.

Motivo: Os grid atuais não te dão liberdade para fazer alterações na biblioteca, por este motivo criei uma grade simplificada com as funcionalidades que tinha necessidade.

Modo de usar:
<code>
<html>
<head>
        <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css" />

		<script type="text/javascript" src="assets/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="assets/js/jquery.form.min.js"></script>
		<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="assets/js/grid.js"></script>
		<!-- data -->
		<script>
			var data_formulario = {
				'protocolo' : 'A1', 
				'veterinario_id': 2
			};

			var data_veterinarios = [
				{id: 1, name: "A"},
				{id: 2, name: "B"},
				{id: 3, name: "C"},
			];
			
		
			$(function(){
			
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
					},
					save_success: function(){
						//alert("Thank you for your comment!"); 
					},
					save_error: function(){
						//alert("ops..."); 
					}
				});			
				
				$("#table").grid('load');
			
			});
		</script>
</head>
<body>

	<div id="table" border=1>
	</div>
</body>
</html>


</code>


Dependencias:
* JQuery 1.10
* Bootstrap 3
