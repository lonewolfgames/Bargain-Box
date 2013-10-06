(function( window, document, $, undefined ){
	var URL = "http://appdev.bargain-box.com:3000",
		AUTH_ROKEN = "451f7863a829a70ce7f1d50155b11822b41aafe7",
		
		CACHE = false,
		json = "json",
		
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		PACTH = "PATCH";
	
	get("/carts", function( json ){
		
		console.log( json );
	});
	
	
	function get( url, success, error ){
		
		$.ajax({
			type: GET,
			url: URL + url + ".json",
			cache: CACHE,
			crossDomain: true,
			dataType: json,
			beforeSend: function( req ){
				req.setRequestHeader("X-AUTH-TOKEN", AUTH_ROKEN );
				req.setRequestHeader("Content-Type", "application/json");
			},
			success: function( data, textStatus, xhr ){
				
				success( data, textStatus, xhr );
			},
			error: function( xhr, textStatus, errorThrown ){
				
				error && error( xhr, textStatus, errorThrown );
			}
		});
	}
	
	function post( data, url, onsuccess, onerror ){
		
		$.ajax({
			type: POST,
			url: URL + url,
			cache: CACHE,
			crossDomain: true,
			dataType: json,
			data: data,
			beforeSend: function( req ){
				req.setRequestHeader("X-CSRF-Token", API_KEY );
				req.setRequestHeader("Content-Type", "application/json");
			},
			complete: function( xhr, textStatus ){
				
				callback( xhr, textStatus );
			}
		})
	}
	
}( window, document, $, void 0 ));