(function( window, document, $, undefined ){
	var URL = "http://appdev.bargain-box.com:3000",
		AUTH_ROKEN = "451f7863a829a70ce7f1d50155b11822b41aafe7",
		
		CACHE = false,
		json = "json",
		
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		PATCH = "PATCH";
	
	get("/carts", function( json ){
		console.log( json );
	});
	
	
	function get( url, success, error ){
		
		$.ajax({
			type: GET,
			url: URL + url + ".json",
			cache: CACHE,
			crossDomain: true,
			contentType: "application/json",
			beforeSend: function(xhr, settings) {
				xhr.setRequestHeader("X-AUTH-TOKEN", AUTH_TOKEN);
			},
			success: function( data, textStatus, xhr ){
				
				success( data, textStatus, xhr );
			},
			error: function( xhr, textStatus, errorThrown ){
				
				error && error( xhr, textStatus, errorThrown );
			}
		});
	});
}( window, document, $, void 0 ));
