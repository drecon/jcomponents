

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

		$.sort_grid = function(){
			var sort_name_field = $(this).attr('data-sort-field');
			var sort_order = $(this).attr('data-sort-order');
						
			if(sort_order == 'asc'){
				$(this).attr('data-sort-order', 'desc');
			}else
			if(sort_order == 'desc'){
				$(this).attr('data-sort-order', 'asc');
			}
			
			function sort_by_field(a,b){
				if(sort_order == 'asc'){
					return b[sort_name_field] < a[sort_name_field];
				}else
				if(sort_order == 'desc'){
					return b[sort_name_field] > a[sort_name_field];
				}
			};
			
			$.grid_options.grid_data = $.grid_options.grid_data.sort(sort_by_field);
			$.update_rows_body();
		}
		
		//create input select
		$.createInputSelect = function(field, row, index_row, field_index){
			var field_html = '<select class="form-control" name="'+field.name+'" data-index-row="'+index_row+'" >';			
			field_html += '<option value=""></option>'
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
			var field_html = '<input type="text" class="form-control" name="'+field.name+'" value="'+row[field.name]+'" data-index-row="'+index_row+'">';

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

		$.update_rows_body= function(){
			var grid_data = $.grid_options.grid_data;
			var fields = $.grid_options.fields;

			$tbody = $.table.find("[id=grid_body]");
			$tbody.html('');
			var html_grid = '';
			//create rows body
			for( var index_row = 0; index_row < grid_data.length; index_row++ ){	
			
				html_grid += '<form role="form" id="grid_row_'+index_row+'" data-index-row="'+index_row+'"  action="'+grid_options.url_edit+'" method="POST" >';

				html_grid += '<input type="hidden" name="'+grid_options.id+'" value="'+grid_data[index_row][grid_options.id]+'" />';
				
				html_grid += '<div class="row">';
				
				for( var field_index = 0; field_index < fields.length; field_index++ ){
					var field = fields[field_index];
					html_grid += '<div class="col-md-1" '+field.html_attributes+' id="col-'+field.name+'" >';
					html_grid += $.createField(field, grid_data[index_row], index_row, field_index);
					html_grid += '</div>';
				}
				
				html_grid += '<div class="col-md-1" '+$.grid_options.action_html_attributes+' >';
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
			
			$.hint_in_componentes();
		};
				
		$.hint_in_componentes= function(){
			$.table.find('input').hover(function(){
				$(this).attr('title', $(this).val() );
			});
			
			$.table.find('select').hover(function(){
				$(this).attr('title', $(this).find('option:selected').text() );
			});
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
				html_grid += '<div class="col-md-1" '+field.html_attributes+' id="header-'+field.name+'" >';
				html_grid += '<label id="sort_title" data-sort-field="'+field.name+'" data-sort-order="asc">'+field.label+'</label>';
				html_grid += '</div>';
			}
			html_grid += '<div class="col-md-1" '+$.grid_options.action_html_attributes+' >';
			html_grid += $.grid_options.actions_header;				
			html_grid += '</div>';
			html_grid += '</div>';
			html_grid += '<div id="grid_body">';
			html_grid += '</div>';
			$tbody.html( html_grid );
				
			$.update_rows_body();	
			
			$.table.find('label[id=sort_title]').click($.sort_grid);
							
		}
	
	}
};








