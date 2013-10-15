(function( window, document, $, undefined ){
	var body = document.body,
		baseURL = "http://appdev.bargain-box.com:3000",
		
		TOKEN = "3bacae91697fc0a70f6f4c761b87bc4ed525a606",
		SIGNED_IN = false,
		CARTS = undefined,
		DOMAIN_PARSE = /^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/,
		
		new_chart_form_html = '<p>New Cart</p>'+
		'<form class="block">'+
			'<div class="grid_8">'+
				'<input class="form-control" autofocus="autofocus" id="title" name="title" type="text" value="" placeholder="Title">'+
			'</div>'+
			'<div class="grid_4">'+
				'<input class="btn btn-primary" name="commit" type="submit" value="Create">'+
			'</div>'+
		'</form>'
	
	$(init);
	
	function init() {
		ajaxGet("/carts.json",
			function(data) {
				start(data);
			},
			function(error){
				sign_in();
			}
		);
	}
	
	function sign_in() {
		ajaxGet("/users/sign_in",
			function(html){
				var app_div = $("#app");
				SIGNED_IN = false;
				
				$("#sign_out").html("&nbsp;");
				clear();
				app_div.append(html);
				
				$("#app form").prependString("action", baseURL);
				
				var atag = $("#app a");
				atag.prependString("href", baseURL);
				atag.attr("target", "_blank");
				
				$("#app form").on("submit", function(e){
					e.preventDefault();
					
					var email = $("#app form #user_email").val(),
						password = $("#app form #user_password").val();
					
					if (!email.length){
						displayError("email is invalid");
						return;
					}
					if (!password.length){
						displayError("password is invalid");
						return;
					}
					
					ajaxPost("/users/sign_in",
						{
							commit: "Sign in",
							authenticity_token: $("#app form input[name='authenticity_token']").val(),
							user: {
								email: email,
								password: password
							}
						},
						function(data) {
							init();
						},
						function(error) {
							displayError(error);
						}
					);
				});
			},
			function(error){
				displayError("Something went wrong, try reopening the extension or reloading the browser");
			}
		);
	}
	
	function sign_out() {
		
		ajaxDelete("/users/sign_out",
			function(data) {
				sign_in();
				displayMessage("Your where sign out successfully");
			},
			function(error) {
				home();
				displayError(errorThrown);
			}
		);
	}
	
	function displayError(error) {
		var el = createElement(undefined, "text-danger", "p", error);
		el.delay(4000).fadeOut(250, function(){
			$(this).remove();
		});
		$("#messages").prepend(el);
	}
	
	function displayMessage(message) {
		var el = createElement(undefined, "text-success", "p", message);
		el.delay(4000).fadeOut(250, function(){
			$(this).remove();
		});
		$("#messages").prepend(el);
	}
	
	function start(carts) {
		SIGNED_IN = true;
		CARTS = carts;
		
		var sign_out_div = $("#sign_out"),
			sign_out_btn = createElement(undefined, "padding-right", "a", "Sign Out");
		
		sign_out_div.empty();
		sign_out_div.append(sign_out_btn);
		sign_out_btn.on("click", sign_out);
		
		home();
	}
	
	function home(active) {
		var app_div = $("#app"),
			
			top_bar = createElement(undefined, "padding block", "div"),
			select_holder = createElement(undefined, "padding block", "div"),
			bottom_bar = createElement(undefined, "padding block", "div"),
			
			new_cart_btn = createElement(undefined, "btn btn-primary grid_6", "button", "New Cart"),
			delete_cart_btn = createElement(undefined, "btn btn-danger grid_6", "button", "Delete Cart"),
			
			carts_select = createOptions("carts-select", "grid_12 form-control", CARTS, "title"),
			
			save_btn = createElement(undefined, "btn btn-primary grid_6", "button", "Save Item"),
			compare_btn = createElement(undefined, "btn btn-primary grid_6", "button", "Compare");
		
		clear();
		
		select_holder.append(carts_select);
		top_bar.append(new_cart_btn, delete_cart_btn);
		
		new_cart_btn.on("click", new_cart);
		delete_cart_btn.on("click", delete_cart);
		
		bottom_bar.append(save_btn, compare_btn);
		save_btn.on("click", save_item);
		
		compare_btn.on("click", compare_items);
		
		if (active) carts_select.val(active);
		
		app_div.append(top_bar, select_holder, bottom_bar);
	}
	
	function new_cart() {
		var app_div = $("#app"),
			top_bar = createElement(undefined, "block", "div"),
			back_btn = createElement(undefined, "btn btn-primary grid_4 push_8", "button", "Back"),
			form = $(new_chart_form_html);
		
		clear();
		
		top_bar.append(back_btn);
		back_btn.on("click", home);
		
		app_div.append(top_bar, form);
		
		$("#app form").on("submit", function(e){
			e.preventDefault();
			
			var title = $("#app form #title").val();
			if (!title.length) {
				displayError("Cart needs a title");
				return;
			}
			
			ajaxPost("/carts.json",
				{cart: { title: title }},
				function(data) {
					CARTS.push(data);
					home(data.id);
					displayMessage("New cart "+ title +" created");
				},
				function(error) {
					displayError(error);
				}
			);
		});
	}
	
	function delete_cart() {
		var cart_id = $("#carts-select").val();
		
		if (!cart_id) {
			displayError("You don't any carts to delete");
			return;
		}
		
		ajaxDelete("/carts/"+ cart_id +".json",
			function(data) {
				var cart = arrayWhere(CARTS, "id", cart_id);
				
				if (cart) {
					index = CARTS.indexOf(cart);
					CARTS.splice(index, 1);
				}
				home();
				displayMessage("Cart "+ cart.title +" was deleted");
			},
			function(error) {
				displayError(error);
			}
		);
	}
	
	function save_item() {
		var cart_id = $("#carts-select").val();
		
		if (!cart_id) {
			displayError("You must select a cart first");
			return;
		}
		
		chrome.windows.getCurrent(function(w) {
			chrome.tabs.getSelected(w.id,
				function (response){
					var url = response.url;
					
					ajaxPost("/carts/"+ cart_id +"/items",
						{
							title: response.title,
							url: url,
							host: url.match(DOMAIN_PARSE)[1]
						},
						function(data){
							console.log(data);
							displayMessage("Item was saved successfully");
						},
						function(error){
							displayError(error);
						}
					);
				}
			);
		});
	}
	
	function compare_items() {
		var cart_id = $("#carts-select").val();
		
		if (!cart_id) {
			displayError("You must select a cart first");
			return;
		}
		
		window.open(baseURL +"/carts/"+ cart_id);
	}
	
	function clear() {
		$("#app, #messages").empty();
	}
	
	function createElement(id, className, tag, text) {
		var el = $(document.createElement(tag));
		
		if (id) el.attr("id", id);
		if (className) el.attr("class", className);
		if (text) el.html(text);
		
		return el;
	}
	
	function createOptions(id, className, array, field) {
		if (!array) return undefined;
		var select = createElement(id, className, "select");
			option,
			i;
		
		for (i = 0; i < array.length; i++) {
			option = array[i];
			select.append( createElement(id, className, "option", option[field]).attr("value", option.id ) );
		}
		
		return select;
	}
	
	function ajaxGet(url, success, error) {
		
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
	
	function ajaxPost(url, data, success, error) {
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
	
	function ajaxDelete(url, success, error) {
		
		$.ajax({
			url: baseURL + url,
			type: "DELETE",
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
	
	function arrayWhere(array, attr, value){
		
		for (var i = array.length; i--;) {
			if( array[i][attr] == value ) return array[i];
		}
		return undefined;
	};
	
	$.fn.prependString = function(attr, string) {
		var value = this.attr(attr);
		this.attr(attr, string + value);
		
		return this;
	};
	
}( window, document, $, void 0 ));