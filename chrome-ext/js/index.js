(function( window, document, $, undefined ){
	var body = document.body,
		baseURL = "http://appdev.bargain-box.com:3000",
		
		TOKEN = "3bacae91697fc0a70f6f4c761b87bc4ed525a606",
		SIGNED_IN = false,
		CARTS = undefined;
	
	$(init);
	
	function init() {
		get("/carts.json",
			function(data) {
				start(data);
			},
			function(error){
				sign_in();
			}
		);
	}
	
	function sign_in() {
		get("/users/sign_in",
			function(html){
				var app_div = $("#app");
				SIGNED_IN = false;
				
				app_div.empty();
				app_div.append(html);
				
				$("#app form").prependString("action", baseURL);
				
				var atag = $("#app a");
				atag.prependString("href", baseURL);
				atag.attr("target", "_blank");
				
				$("#app form").on("submit", function(e){
					e.preventDefault();
					
					post("/users/sign_in",
						{
							commit: "Sign in",
							authenticity_token: $("input[name='authenticity_token']").val(),
							user: {
								email: $("#user_email").val(),
								password: $("#user_password").val()
							}
						},
						function(data) {
							console.log(data);
							init();
						},
						function(error) {
							displayError(error);
						}
					);
				});
			},
			function(error){
				displayError(error);
			}
		);
	}
	
	function displayError(error) {
		console.log(error);
	}
	
	function start(carts) {
		SIGNED_IN = true;
		CARTS = carts;
		home();
	}
	
	function home() {
		var app_div = $("#app"),
			top_bar = $("<div class='padding block'>"),
			bottom_bar = $("<div class='padding block'>"),
			new_btn = $("<button class='grid_4'>New</button>"),
			save_btn = $("<button class='grid_6'>Save</button>"),
			compare_btn = $("<button class='grid_6'>Compare</button>");
		
		app_div.empty();
		
		top_bar.append(createOptions("carts-select", "grid_8", CARTS, "title"), new_btn);
		bottom_bar.append(save_btn, compare_btn);
		
		save_btn.on("click", save_page);
		
		app_div.append(top_bar, bottom_bar);
	}
	
	function save_page() {
		var cart_id = $("#carts-select").val();
		
		if (cart_id === -1) {
			displayError("You must select a cart to save item to")
			return;
		}
		
		chrome.windows.getCurrent(function(w) {
			chrome.tabs.getSelected(w.id,
				function (response){
					var url = response.url;
					
					post("/carts/"+ cart_id +"/items",
						{
							title: response.title,
							url: url,
							host: url.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[1]
						},
						function(data){
							console.log(data);
						},
						function(error){
							displayError(error);
						}
					);
				}
			);
		});
	}
	
	function sign_out() {
		
		$.ajax({
			url:baseUrl +"/users/sign_out",
			type: "DELETE",
			crossDomain: true,
			beforeSend: function(xhr) {
				if (SIGNED_IN) xhr.setRequestHeader("X-CSRF-Token", TOKEN);
			},
			success: function(data) {
				sign_in();
			},
			error: function(xhr, textStatus, errorThrown) {
				displayError(errorThrown);
				home();
			}
		});
	}
	
	function createOptions(id, className, array, field) {
		var select = $("<select>"),
			option,
			i;
		
		if (id) select.attr("id", id);
		if (className) select.attr("class", className);
		
		for (i = 0; i < array.length; i++) {
			option = array[i];
			select.append( $("<option>").attr("value", option.id ).html( option[field] ) )
		}
		
		return select;
	}
	
	function get(url, success, error) {
		
		$.ajax({
			url: baseURL + url,
			type: "GET",
			crossDomain: true,
			beforeSend: function(xhr) {
				if (SIGNED_IN) xhr.setRequestHeader("X-CSRF-Token", TOKEN);
			},
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
			type: "POST",
			crossDomain: true,
			contentType: "application/json",
			data: data,
			beforeSend: function(xhr) {
				if (SIGNED_IN) xhr.setRequestHeader("X-CSRF-Token", TOKEN);
			},
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
	
}( window, document, $, void 0 ));