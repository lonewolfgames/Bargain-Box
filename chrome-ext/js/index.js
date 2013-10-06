(function( window, document, $, undefined ){
	var URL = "http://appdev.bargin-box.com:3000",
		AUTH_TOKEN = "451f7863a829a70ce7f1d50155b11822b41aafe7";
	
	$(function(){
		
		$.ajax(URL +"/carts", {
			type: "GET",
			jsonp: false,
			dataType: "json",
			crossDomain: true,
			contentType: "application/json",
			beforeSend: function(xhr, settings) {
				xhr.setRequestHeader("X-AUTH-TOKEN", AUTH_TOKEN);
			},
			complete: function(data) {
				document.write(data.responseText);
			}
		});
	});
}( window, document, $, void 0 ));