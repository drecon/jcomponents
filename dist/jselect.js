

$.fn.jselect = function( action, opt) {
	$.select = this;

	//create input select
	$.create_options = function(opt){
		var field_html = '';			
		for( var option_index = 0; option_index < opt.data.length; option_index++ ){
			var selected = '';
			/*
			if(data[opt.field_value] == opt.value ){
				selected = 'selected';
			}
			*/
		
			field_html  += '<option  value='+opt.field_value+' 	'+selected+'>'+ opt.data[option_index][opt.field_text]+'</option>';
		}

		$.select .html(field_html);
	}
	
	if( action == 'create' ){
		$.create_options(opt);
	}
	

};








