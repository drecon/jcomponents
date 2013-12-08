
$.fn.grid = function( grid_options, data ) {
	$.table = this;

	if( grid_options == 'load' ){
		$.grid_options.load_data();
	}else		
	if( grid_options == 'update' ){
		$.grid_options.grid_data = data;
		$.update();
	}else{
		//grid options
		$.grid_options = grid_options;
		
		//create input select
		$.createInputSelect = function(field, row, index_row, field_index){
			var field_html = '<select class="form-control" name="'+field.name+'" >';			
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

		//create input text
		$.createInputText= function(field, row, index_row, field_index){
			var field_html = '<input type="text" class="form-control" name="'+field.name+'" value="'+row[field.name]+'" >';

			return field_html;		
		}
		
		//crete fields in table
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
				
		//update grid
		$.update= function(){

			var grid_data = $.grid_options.grid_data;
			var fields = $.grid_options.fields;
			
			$tbody = $.table;
			$tbody.html('');
			
			var html_grid = '';
			
			//create rows header
			html_grid += '<div class="row">';
			for( var field_index = 0; field_index < fields.length; field_index++ ){
				var field = fields[field_index];
				html_grid += '<div class="col-md-1" style="'+field.style+'" >';
				html_grid += '<label>'+field.label+'</label>';
				html_grid += '</div>';
			}
			html_grid += '<div class="col-md-1" style="'+$.grid_options.action_style+'" >';
			html_grid += $.grid_options.actions_header;				
			html_grid += '</div>';
			html_grid += '</div>';
				
			//create rows body
			for( var index_row = 0; index_row < grid_data.length; index_row++ ){	
			
				html_grid += '<form role="form" id="grid_row_'+index_row+'" data-index-row="'+index_row+'"  action="'+grid_options.url_edit+'" method="POST" >';
				html_grid += '<div class="row">';
				
				for( var field_index = 0; field_index < fields.length; field_index++ ){
					var field = fields[field_index];
					html_grid += '<div class="col-md-1" style="'+field.style+'" >';
					html_grid += $.createField(field, grid_data[index_row], index_row, field_index);
					html_grid += '</div>';
				}
				
				html_grid += '<div class="col-md-1" style="'+$.grid_options.action_style+'">';
				html_grid += $.grid_options.actions;
				html_grid += '</div>';

				html_grid += '</div>';
				html_grid += '</form>';
				
			}
			
			$tbody.html( html_grid );
			
			$.table.find('form[id^=grid_row]').each(function(){
				var index_row = $(this).attr( 'data-index-row' );
									
				$(this).find('button, a').each(function(){
					var button = $(this);
					var pseudo_id = button.attr('data-pseudo-id');
					var id = pseudo_id +'_'+ index_row;
					
					button.attr('data-index-row', index_row);											
				});					
			});
							
		}
	
	}
};








