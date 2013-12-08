
 
    $.fn.grid = function( grid_options, data ) {
		$.table = this;

		if( grid_options == 'load' ){
			$.grid_options.load_data();
		}else		
		if( grid_options == 'update' ){
			$.grid_options.grid_data = data;
			$.update();
		}else{
	
			$.grid_options = grid_options;
			
			$.createInputSelect = function(field, row, index_row, field_index){
				var field_html = '<select name="'+field.name+'" >';			
				for( var option_index = 0; option_index < field.options.length; option_index++ ){
				
					var selected = '';
					if(row[field.name] == field.options[option_index][ field.option_value ] ){
						selected = 'selected';
					}
				
					field_html  += '<option  value='+field.options[option_index][ field.option_value ]+' 	'+selected+'>'+ field.options[ option_index][ field.option_text ]+'</option>';
				}

				field_html  += '</select>';			
				return field_html;
			}

			$.createInputText= function(field, row, index_row, field_index){
				var field_html = '<input type="text" name="'+field.name+'" value="'+row[field.name]+'" >';

				return field_html;		
			}
			
			$.createField= function(field, row, index_row, field_index){
				var field_html = '';
				
				if( field.type == 'select' ){
					field_html = $.createInputSelect(field, row, index_row, field_index);
				}else
				if( field.type == 'text' ){
					field_html = $.createInputText(field, row, index_row, field_index);
				}
					
				return field_html;
			}
					
					
			$.update= function(){

				var grid_data = $.grid_options.grid_data;
				var fields = $.grid_options.fields;
				
				$tbody = $.table;
				$tbody.html('');
				for( var index_row = 0; index_row < grid_data.length; index_row++ ){	
					var html_grid = '';
				
					html_grid += '<form id="grid_row_'+index_row+'"  action="'+grid_options.url_edit+'" method="POST" >';
					html_grid += '<div class="row">';
					
					for( var field_index = 0; field_index < fields.length; field_index++ ){
						var field = fields[field_index];
						html_grid += '<div class="col-md-1" style="'+field.style+'" >';
						html_grid += $.createField(field, grid_data[index_row], index_row, field_index);
						html_grid += '</div>';
					}
					
					html_grid += '<div class="col-md-1">';
					html_grid += '\
					  <button name="action" value="save" type="submit" id="save">Save</button>\
					  <button name="action" value="delete" type="submit" id="delete">Delete</button>\
					';
					html_grid += '</div>';
					html_grid += '</div>';

					html_grid += '</form>';

					
					$tbody.append( html_grid );
					$.table.find('form[id=grid_row_'+index_row+']').ajaxForm({
						error: function() { 
							$.grid_options.save_error(data);
						},
						success: function(data) { 
							$.grid_options.save_success(data);
						}
					});
				}
			}
		
		}
    };
 


	
	
	


