(function( window, document, $, undefined ){
	var body = document.body,
		baseURL = "http://appdev.bargain-box.com:3000",
		
		CACHE = false,
		
		json = "json",
		jsonExt = ".json",
		application_json = "application/json",
		
		GET = "GET",
		POST = "POST",
		PUT = "PUT",
		PATCH = "PATCH";
	
	$(function() {
		
		get("/carts.json",
			function(data) {
				console.log(data);
			},
			function(error){
				get("/users/sign_in",
					function(data){
						$("#app").append(data);
						
						$("#app form").prependString("action", baseURL);
						
						var atag = $("#app a");
						atag.prependString("href", baseURL);
						atag.attr("target", "_blank");
						
						$("#app form").on("submit", function(e) {
							e.preventDefault();
							
							post("/users/sign_in", $("#app form").serializeObject(),
								function(data) {
									console.log(data);
								},
								function(error) {
									console.log(error);
								}
							);
						});
					},
					function(error){
						console.log(error);
					}
				);
			}
		);
	});
	
	function get(url, success, error) {
		
		$.ajax({
			url: baseURL + url,
			type: GET,
			cache: CACHE,
			crossDomain: true,
			success: function(data) {
				
				success && success(data);
			},
			error: function(xhr, textStatus, errorThrown) {
				
				if (error) {
					error(errorThrown);
				} else {
					throw errorThrown;
				}
			}
		});
	}
	
	function post(url, data, success, error) {
		if (typeof(data) !== "string") data = JSON.stringify(data);
		
		$.ajax({
			url: baseURL + url,
			type: POST,
			cache: CACHE,
			crossDomain: true,
			contentType: application_json,
			data: data,
			success: function(data) {
				
				success && success(data);
			},
			error: function(xhr, textStatus, errorThrown) {
				
				if (error) {
					error(errorThrown);
				} else {
					throw errorThrown;
				}
			}
		});
	}
	
	
	$.fn.prependString = function(attr, string) {
		var value = this.attr(attr);
		this.attr(attr, string + value);
		
		return this;
	};
	
	$.fn.serializeObject = function() {
		var obj = {},
			array = this.serializeArray();
		
		$.each(array, function() {
			if (obj[this.name] !== undefined) {
				if (!obj[this.name].push) {
					obj[this.name] = [obj[this.name]];
				}
				obj[this.name].push(this.value || '');
			} else {
				obj[this.name] = this.value || '';
			}
		});
		return obj;
	};
	
}( window, document, $, void 0 ));