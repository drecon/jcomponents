var alert_id = 0;

function alert_success(msg){
	alert_id++;
	var my_alert_id  =alert_id;
	
	var alert_html = '\
	<div id="alert_'+my_alert_id+'" class="alert alert-success fade in" >\
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
			<h4>Uhuu! \\o/</h4>\
			<p id="msg" ></p>\
	 </div>';
	$('#alerts').append(alert_html);
	$('#alert_'+my_alert_id).find("#msg").html(msg);
	$('#alert_'+my_alert_id).css('opacity', '0');
	$('#alert_'+my_alert_id).animate({opacity: 1}).delay(1000).animate({opacity: 0}, 500, function() {
		$('#alert_'+my_alert_id).remove();
	});
	
}

function alert_warning(msg){
	alert_id++;
	var my_alert_id  =alert_id;
	
	var alert_html = '\
	  <div id="alert_'+my_alert_id+'" class="alert alert-warning fade in" style="display:none;">\
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
			<h4>Atenção: (O.o)</h4>\
			<p id="msg" ></p>\
	 </div>';
	 
	$('#alerts').append(alert_html);
	$('#alert_'+my_alert_id).find("#msg").html(msg);
	$('#alert_'+my_alert_id).css('opacity', '0');
	$('#alert_'+my_alert_id).animate({opacity: 1}).delay(1000).animate({opacity: 0}, 500, function() {
		$('#alert_'+my_alert_id).remove();
	});

}

function alert_error(msg){
	alert_id++;
	var my_alert_id  =alert_id;
	
	var alert_html = '\
		<div id="alert_'+my_alert_id+'" class="alert alert-danger fade in" style="display:none;">\
			<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>\
			<h4>Ops! Nossa aconteceu um erro.</h4>\
			<p id="msg" ></p>\
	 </div>';
	 
	$('#alerts').append(alert_html);
	$('#alert_'+my_alert_id).find("#msg").html(msg);
	$('#alert_'+my_alert_id).css('opacity', '0');
	$('#alert_'+my_alert_id).animate({opacity: 1}).delay(1000);

}
