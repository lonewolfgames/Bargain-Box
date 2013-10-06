(function( window, document, $, undefined ){
	var URL = "http://appdev.bargain-box.com:3000",
		
		CACHE = false,
		json = "json",
		ext = ".json"
		
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		PATCH = "PATCH";
	
	$.ajax({
		url: URL +"/carts"+ ext,
		cache: CACHE,
		crossDomain: true,
		contentType: "application/json",
		success: function( data, textStatus, xhr ){
			
			console.log(data);
		},
		error: function( xhr, textStatus, errorThrown ){
			
			$.ajax({
				url: URL +"/users/sign_in",
				success: function( data, textStatus, xhr ){
					
					console.log(data);
					document.write(data);
				},
			})
		}
	});
	
}( window, document, $, void 0 ));