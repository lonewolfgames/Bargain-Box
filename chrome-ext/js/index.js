(function( window, document, $, undefined ){
	var URL = "http://appdev.bargin-box.com:3000",
		AUTH_TOKEN = "451f7863a829a70ce7f1d50155b11822b41aafe7",
		
		HEADERS = {
			
		},
		CACHE = false,
		json = "json",
		
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		PACTH = "PATCH";
	
	get("/carts", function( xhr, textStatus ){
		
		console.log( xhr, textStatus );
	});
	
	
	function get( url, callback ){
		
		$.ajax({
			type: GET,
			url: URL + url,
			cache: CACHE,
			crossDomain: true,
			dataType: json,
			beforeSend: function( req ){
				req.setRequestHeader("X-AUTH-TOKEN", AUTH_TOKEN );
				req.setRequestHeader("Content-Type", "application/json");
			},
			complete: function( xhr, textStatus ){
				
				callback( xhr, textStatus );
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